import { InstallmentStatus, Prisma } from "@prisma/client";
import { buildDashboard } from "@/core/dashboard/dashboard-calculator";
import { ReportInstallment } from "@/core/report/report-calculator";

// 12h de 15/11/2026 no Brasil
const NOW = new Date("2026-11-15T15:00:00.000Z");

function installment({
  amount = "100.00",
  dueDate = "2026-11-20",
  status = InstallmentStatus.PENDING as InstallmentStatus,
  debtor = "ana",
  installmentNumber = 1,
  payments = [] as [string, string][],
} = {}): ReportInstallment {
  return {
    id: `${debtor}-${dueDate}-${installmentNumber}`,
    amount: new Prisma.Decimal(amount),
    dueDate: new Date(`${dueDate}T00:00:00.000Z`),
    status,
    debtorId: debtor,
    debtorName: debtor.toUpperCase(),
    description: "Empréstimo",
    installmentNumber,
    installmentQty: 3,
    payments: payments.map(([value, date]) => ({
      amount: new Prisma.Decimal(value),
      paymentDate: new Date(`${date}T00:00:00.000Z`),
    })),
  };
}

describe("buildDashboard", () => {
  it("should return empty lists without installments", () => {
    const dashboard = buildDashboard([], NOW);

    expect(dashboard.overdue).toEqual({ total: 0, count: 0, installments: [] });
    expect(dashboard.upcoming).toEqual({ total: 0, count: 0, installments: [] });
    expect(dashboard.debtors).toEqual([]);
    expect(dashboard.currentMonth).toMatchObject({ key: "2026-11", expected: 0, received: 0 });
  });

  it("should count how many days an installment is late", () => {
    const { overdue } = buildDashboard([installment({ dueDate: "2026-11-12" })], NOW);

    expect(overdue.installments[0]).toMatchObject({ days: 3, remaining: 100 });
  });

  it("should list only what is left of a partially paid overdue installment", () => {
    const { overdue } = buildDashboard(
      [
        installment({
          dueDate: "2026-11-01",
          status: InstallmentStatus.PARTIALLY_PAID,
          payments: [["30.10", "2026-11-02"]],
        }),
      ],
      NOW,
    );

    expect(overdue.total).toBe(69.9);
  });

  it("should show the oldest overdue installment first", () => {
    const { overdue } = buildDashboard(
      [installment({ dueDate: "2026-11-10" }), installment({ dueDate: "2026-09-10" })],
      NOW,
    );

    expect(overdue.installments.map((item) => item.days)).toEqual([66, 5]);
  });

  it("should treat today as upcoming, not overdue", () => {
    const { overdue, upcoming } = buildDashboard([installment({ dueDate: "2026-11-15" })], NOW);

    expect(overdue.count).toBe(0);
    expect(upcoming.installments[0].days).toBe(0);
  });

  it("should include the seventh day and leave out the eighth", () => {
    const { upcoming } = buildDashboard(
      [
        installment({ dueDate: "2026-11-22", amount: "10.00" }),
        installment({ dueDate: "2026-11-23", amount: "20.00" }),
      ],
      NOW,
    );

    expect(upcoming.count).toBe(1);
    expect(upcoming.total).toBe(10);
  });

  it("should cross the month boundary in the upcoming window", () => {
    const { upcoming } = buildDashboard(
      [installment({ dueDate: "2026-12-02" })],
      new Date("2026-11-28T15:00:00.000Z"),
    );

    expect(upcoming.installments[0].days).toBe(4);
  });

  it("should leave out paid and cancelled installments", () => {
    const { overdue, upcoming } = buildDashboard(
      [
        installment({
          dueDate: "2026-11-01",
          status: InstallmentStatus.PAID,
          payments: [["100.00", "2026-11-01"]],
        }),
        installment({ dueDate: "2026-11-02", status: InstallmentStatus.CANCELLED }),
        installment({
          dueDate: "2026-11-16",
          status: InstallmentStatus.PAID,
          payments: [["100.00", "2026-11-10"]],
        }),
        installment({ dueDate: "2026-11-17", status: InstallmentStatus.CANCELLED }),
      ],
      NOW,
    );

    expect(overdue.count).toBe(0);
    expect(upcoming.count).toBe(0);
  });

  it("should limit the list to five items but keep every installment in the totals", () => {
    const { overdue } = buildDashboard(
      Array.from({ length: 7 }, (_, index) =>
        installment({ dueDate: `2026-11-0${index + 1}`, amount: "0.10" }),
      ),
      NOW,
    );

    expect(overdue.installments).toHaveLength(5);
    expect(overdue.count).toBe(7);
    expect(overdue.total).toBe(0.7);
  });

  it("should agree with the report on the overdue summary", () => {
    const { summary, overdue } = buildDashboard(
      [installment({ dueDate: "2026-11-01" }), installment({ dueDate: "2026-11-30" })],
      NOW,
    );

    expect(summary.overdue).toBe(overdue.total);
    expect(summary.overdueCount).toBe(overdue.count);
  });

  it("should show the five main debtors and leave out those fully paid", () => {
    const { debtors } = buildDashboard(
      [
        ...["a", "b", "c", "d", "e", "f"].map((debtor) => installment({ debtor })),
        installment({
          debtor: "quitado",
          status: InstallmentStatus.PAID,
          payments: [["100.00", "2026-11-01"]],
        }),
      ],
      NOW,
    );

    expect(debtors).toHaveLength(5);
    expect(debtors.map((debtor) => debtor.id)).not.toContain("quitado");
  });

  it("should use the Brazilian day when UTC has already moved on", () => {
    // 22h de 15/11 no Brasil, mas já 16/11 em UTC
    const { overdue, upcoming } = buildDashboard(
      [installment({ dueDate: "2026-11-15" })],
      new Date("2026-11-16T01:00:00.000Z"),
    );

    expect(overdue.count).toBe(0);
    expect(upcoming.installments[0].days).toBe(0);
  });

  it("should separate this month's expected and received amounts", () => {
    const { currentMonth } = buildDashboard(
      [
        installment({
          amount: "100.00",
          dueDate: "2026-11-05",
          status: InstallmentStatus.PARTIALLY_PAID,
          payments: [["40.00", "2026-11-05"]],
        }),
      ],
      NOW,
    );

    expect(currentMonth).toMatchObject({ expected: 100, received: 40 });
  });
});
