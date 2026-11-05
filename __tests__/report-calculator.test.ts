import { InstallmentStatus, Prisma } from "@prisma/client";
import { buildReport, ReportInstallment } from "@/core/report/report-calculator";

// 12h de 15/11/2026 no Brasil
const NOW = new Date("2026-11-15T15:00:00.000Z");

function installment({
  amount = "100.00",
  dueDate = "2026-12-10",
  status = InstallmentStatus.PENDING as InstallmentStatus,
  debtor = "ana",
  description = "Empréstimo",
  installmentNumber = 1,
  installmentQty = 3,
  payments = [] as [string, string][],
} = {}): ReportInstallment {
  return {
    id: `${debtor}-${dueDate}-${installmentNumber}`,
    amount: new Prisma.Decimal(amount),
    dueDate: new Date(`${dueDate}T00:00:00.000Z`),
    status,
    debtorId: debtor,
    debtorName: debtor.toUpperCase(),
    description,
    installmentNumber,
    installmentQty,
    payments: payments.map(([value, date]) => ({
      amount: new Prisma.Decimal(value),
      paymentDate: new Date(`${date}T00:00:00.000Z`),
    })),
  };
}

const month = (report: ReturnType<typeof buildReport>, key: string) =>
  report.months.find((item) => item.key === key);

describe("buildReport", () => {
  it("should return zeros without installments", () => {
    const report = buildReport([], NOW);

    expect(report.summary).toEqual({ total: 0, received: 0, remaining: 0, overdue: 0, overdueCount: 0 });
    expect(report.debtors).toEqual([]);
    expect(report.months).toHaveLength(12);
  });

  it("should add totals, received and remaining amounts", () => {
    const { summary } = buildReport(
      [
        installment({ amount: "100.00", payments: [["40.00", "2026-11-02"]] }),
        installment({ amount: "50.00" }),
      ],
      NOW,
    );

    expect(summary.total).toBe(150);
    expect(summary.received).toBe(40);
    expect(summary.remaining).toBe(110);
  });

  it("should not lose cents when adding values", () => {
    const { summary } = buildReport(
      [
        installment({ amount: "0.10" }),
        installment({ amount: "0.20" }),
        installment({ amount: "100.33", payments: [["0.10", "2026-11-01"], ["0.20", "2026-11-02"]] }),
      ],
      NOW,
    );

    expect(summary.total).toBe(100.63);
    expect(summary.received).toBe(0.3);
    expect(summary.remaining).toBe(100.33);
  });

  it("should count only what is left of an overdue installment", () => {
    const { summary } = buildReport(
      [
        installment({
          amount: "100.00",
          dueDate: "2026-10-10",
          status: InstallmentStatus.PARTIALLY_PAID,
          payments: [["30.00", "2026-10-11"]],
        }),
      ],
      NOW,
    );

    expect(summary.overdue).toBe(70);
    expect(summary.overdueCount).toBe(1);
  });

  it("should not treat paid or future installments as overdue", () => {
    const { summary } = buildReport(
      [
        installment({ dueDate: "2026-10-10", status: InstallmentStatus.PAID, payments: [["100.00", "2026-10-10"]] }),
        installment({ dueDate: "2026-11-15" }),
        installment({ dueDate: "2027-01-10" }),
      ],
      NOW,
    );

    expect(summary.overdue).toBe(0);
    expect(summary.overdueCount).toBe(0);
  });

  it("should ignore cancelled installments", () => {
    const { summary, debtors, months } = buildReport(
      [installment({ dueDate: "2026-11-20", status: InstallmentStatus.CANCELLED })],
      NOW,
    );

    expect(summary.total).toBe(0);
    expect(debtors).toEqual([]);
    expect(months.every((item) => item.expected === 0)).toBe(true);
  });

  it("should group installments by debtor", () => {
    const { debtors } = buildReport(
      [
        installment({ debtor: "ana", amount: "100.00" }),
        installment({ debtor: "ana", amount: "50.00", payments: [["50.00", "2026-11-01"]] }),
        installment({ debtor: "bia", amount: "20.00" }),
      ],
      NOW,
    );

    expect(debtors).toHaveLength(2);
    expect(debtors[0]).toEqual({
      id: "ana",
      name: "ANA",
      total: 150,
      received: 50,
      remaining: 100,
      overdue: 0,
    });
  });

  it("should list overdue debtors first, then the largest balance", () => {
    const { debtors } = buildReport(
      [
        installment({ debtor: "maior", amount: "900.00" }),
        installment({ debtor: "atrasado", amount: "10.00", dueDate: "2026-10-01" }),
        installment({ debtor: "menor", amount: "5.00" }),
      ],
      NOW,
    );

    expect(debtors.map((debtor) => debtor.id)).toEqual(["atrasado", "maior", "menor"]);
  });

  it("should use the Brazilian month when UTC has already moved on", () => {
    // 22h de 30/11 no Brasil, mas já 01/12 em UTC
    const report = buildReport([], new Date("2026-12-01T01:00:00.000Z"));

    expect(report.months.find((item) => item.isCurrent)?.key).toBe("2026-11");
  });

  it("should show five past months, the current one and six ahead", () => {
    const { months } = buildReport([], NOW);

    expect(months[0].key).toBe("2026-06");
    expect(months[5]).toMatchObject({ key: "2026-11", isCurrent: true });
    expect(months[11].key).toBe("2027-05");
    expect(months.filter((item) => item.isCurrent)).toHaveLength(1);
  });

  it("should cross the year boundary in January", () => {
    const { months } = buildReport([], new Date("2027-01-15T15:00:00.000Z"));

    expect(months[0].key).toBe("2026-08");
    expect(months[5].key).toBe("2027-01");
  });

  it("should place expected amounts by due month and received by payment month", () => {
    const report = buildReport(
      [
        installment({
          amount: "100.00",
          dueDate: "2026-09-10",
          status: InstallmentStatus.PAID,
          payments: [["100.00", "2026-11-05"]],
        }),
        installment({ amount: "30.00", dueDate: "2026-12-10" }),
      ],
      NOW,
    );

    expect(month(report, "2026-09")).toMatchObject({ expected: 100, received: 0 });
    expect(month(report, "2026-11")).toMatchObject({ expected: 0, received: 100 });
    expect(month(report, "2026-12")).toMatchObject({ expected: 30, received: 0 });
  });

  it("should keep values outside the window in the totals", () => {
    const report = buildReport([installment({ amount: "70.00", dueDate: "2030-01-10" })], NOW);

    expect(report.summary.total).toBe(70);
    expect(report.months.every((item) => item.expected === 0)).toBe(true);
  });

  it("should accept dates saved by a server in the Brazilian time zone", () => {
    const report = buildReport(
      [{ ...installment(), dueDate: new Date("2026-12-01T03:00:00.000Z") }],
      NOW,
    );

    expect(month(report, "2026-12")?.expected).toBe(100);
  });
});

describe("buildReport collection", () => {
  const collectionOf = (installments: ReportInstallment[], now = NOW) =>
    buildReport(installments, now).collection;

  it("should be empty without installments due this month", () => {
    const collection = collectionOf([installment({ dueDate: "2026-12-10" })]);

    expect(collection).toEqual({ month: "2026-11", total: 0, debtors: [] });
  });

  it("should only include installments due in the current month", () => {
    const collection = collectionOf([
      installment({ dueDate: "2026-10-31" }),
      installment({ dueDate: "2026-11-01", amount: "10.00" }),
      installment({ dueDate: "2026-11-30", amount: "20.00" }),
      installment({ dueDate: "2026-12-01" }),
      installment({ dueDate: "2025-11-15" }),
    ]);

    expect(collection.total).toBe(30);
    expect(collection.debtors[0].installments.map((item) => item.dueDay)).toEqual([1, 30]);
  });

  it("should leave out paid installments", () => {
    const collection = collectionOf([
      installment({
        dueDate: "2026-11-20",
        status: InstallmentStatus.PAID,
        payments: [["100.00", "2026-11-10"]],
      }),
    ]);

    expect(collection.debtors).toEqual([]);
  });

  it("should leave out cancelled installments", () => {
    const collection = collectionOf([
      installment({ dueDate: "2026-11-20", status: InstallmentStatus.CANCELLED }),
    ]);

    expect(collection.debtors).toEqual([]);
  });

  it("should charge only what is left of a partial payment", () => {
    const collection = collectionOf([
      installment({
        amount: "100.33",
        dueDate: "2026-11-20",
        status: InstallmentStatus.PARTIALLY_PAID,
        payments: [["40.10", "2026-11-05"]],
      }),
    ]);

    expect(collection.total).toBe(60.23);
    expect(collection.debtors[0].installments[0]).toMatchObject({ amount: 100.33, remaining: 60.23 });
  });

  it("should keep charging installments whose day already passed this month", () => {
    const collection = collectionOf([
      installment({ dueDate: "2026-11-05", amount: "40.00" }),
      installment({ dueDate: "2026-11-20", amount: "60.00", installmentNumber: 2 }),
    ]);

    expect(collection.total).toBe(100);
    expect(collection.debtors[0].installments).toHaveLength(2);
  });

  it("should add up each debtor without losing cents", () => {
    const collection = collectionOf([
      installment({ debtor: "ana", amount: "0.10", dueDate: "2026-11-10" }),
      installment({ debtor: "ana", amount: "0.20", dueDate: "2026-11-11", installmentNumber: 2 }),
      installment({ debtor: "bia", amount: "1.00", dueDate: "2026-11-12" }),
    ]);

    expect(collection.total).toBe(1.3);
    expect(collection.debtors.map((debtor) => debtor.total)).toEqual([0.3, 1]);
  });

  it("should put who pays first at the top", () => {
    const collection = collectionOf([
      installment({ debtor: "cida", dueDate: "2026-11-25" }),
      installment({ debtor: "bia", dueDate: "2026-11-05" }),
      installment({ debtor: "ana", dueDate: "2026-11-05" }),
    ]);

    expect(collection.debtors.map((debtor) => debtor.id)).toEqual(["ana", "bia", "cida"]);
  });

  it("should keep the installment details for the list", () => {
    const collection = collectionOf([
      installment({
        dueDate: "2026-11-28",
        description: "Compra da moto",
        installmentNumber: 2,
        installmentQty: 12,
      }),
    ]);

    expect(collection.debtors[0].installments[0]).toMatchObject({
      description: "Compra da moto",
      installmentNumber: 2,
      installmentQty: 12,
      dueDay: 28,
    });
  });

  it("should use the Brazilian month on the last evening of the month", () => {
    // 22h de 30/11 no Brasil, mas já 01/12 em UTC
    const collection = collectionOf(
      [installment({ dueDate: "2026-11-30" }), installment({ dueDate: "2026-12-01" })],
      new Date("2026-12-01T01:00:00.000Z"),
    );

    expect(collection.month).toBe("2026-11");
    expect(collection.debtors[0].installments).toHaveLength(1);
  });

  it("should show the right day for dates saved at Brazilian midnight", () => {
    const collection = collectionOf([
      { ...installment(), dueDate: new Date("2026-11-15T03:00:00.000Z") },
    ]);

    expect(collection.debtors[0].installments[0].dueDay).toBe(15);
  });
});
