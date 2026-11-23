import { InstallmentStatus, Prisma } from "@prisma/client";
import { DEFAULT_CHARGE_FILTERS, type ChargeFilters } from "@/core/charge/charge-filter";
import {
  buildPeriodChargeMessage,
  buildPeriodCharges,
  summarizePeriodCharges,
} from "@/core/charge/period-charge-calculator";
import type { ReportInstallment } from "@/core/report/report-calculator";

// 12h de 15/11/2026 no Brasil
const NOW = new Date("2026-11-15T15:00:00.000Z");

// formatCurrency separa "R$" do valor com um espaço não separável.
const brl = (value: string) => `R$ ${value}`;

const filters = (patch: Partial<ChargeFilters> = {}): ChargeFilters => ({
  ...DEFAULT_CHARGE_FILTERS,
  ...patch,
});

function installment({
  amount = "100.00",
  dueDate = "2026-12-10",
  status = InstallmentStatus.PENDING as InstallmentStatus,
  description = "Empréstimo",
  installmentNumber = 1,
  installmentQty = 3,
  debtorId = "ana",
  debtorName = "Ana",
  payments = [] as string[],
} = {}): ReportInstallment {
  return {
    id: `${debtorId}-${description}-${dueDate}-${installmentNumber}`,
    amount: new Prisma.Decimal(amount),
    dueDate: new Date(`${dueDate}T00:00:00.000Z`),
    status,
    debtorId,
    debtorName,
    description,
    installmentNumber,
    installmentQty,
    payments: payments.map((value) => ({
      amount: new Prisma.Decimal(value),
      paymentDate: NOW,
    })),
  };
}

describe("buildPeriodCharges", () => {
  it("should keep only the chosen period plus the overdue installments", () => {
    const [charge] = buildPeriodCharges(
      [
        installment({ dueDate: "2026-10-10", amount: "10.00" }),
        installment({ dueDate: "2026-11-20", amount: "20.00" }),
        installment({ dueDate: "2026-12-10", amount: "40.00" }),
        installment({ dueDate: "2027-01-10", amount: "80.00" }),
      ],
      filters({ preset: "next-month" }),
      NOW,
    );

    expect(charge.overdue.map((item) => item.remaining)).toEqual([10]);
    expect(charge.open.map((item) => item.remaining)).toEqual([40]);
    expect(charge.total).toBe(50);
  });

  it("should leave the overdue installments out when asked", () => {
    const charges = buildPeriodCharges(
      [installment({ dueDate: "2026-10-10" })],
      filters({ preset: "next-month", includeOverdue: false }),
      NOW,
    );

    expect(charges).toEqual([]);
  });

  it("should keep a current month installment past its due day in the period block", () => {
    const [charge] = buildPeriodCharges([installment({ dueDate: "2026-11-01" })], filters(), NOW);

    expect(charge.overdue).toHaveLength(0);
    expect(charge.open).toHaveLength(1);
  });

  it("should show only overdue installments with that preset", () => {
    const [charge] = buildPeriodCharges(
      [
        installment({ dueDate: "2026-11-14" }),
        installment({ dueDate: "2026-11-15" }),
        installment({ dueDate: "2026-12-10" }),
      ],
      filters({ preset: "overdue", includeOverdue: false }),
      NOW,
    );

    expect(charge.overdue.map((item) => item.dueDate.toISOString().slice(0, 10))).toEqual(["2026-11-14"]);
    expect(charge.open).toHaveLength(0);
  });

  it("should filter by status", () => {
    const items = [
      installment({ dueDate: "2026-12-05", payments: ["100.00"], status: InstallmentStatus.PAID }),
      installment({ dueDate: "2026-12-10", installmentNumber: 2 }),
    ];

    const [paidOnly] = buildPeriodCharges(items, filters({ preset: "next-month", status: "PAID" }), NOW);
    expect(paidOnly.paid).toHaveLength(1);
    expect(paidOnly.open).toHaveLength(0);
    expect(paidOnly.paidTotal).toBe(100);

    const [everything] = buildPeriodCharges(items, filters({ preset: "next-month", status: "ALL" }), NOW);
    expect(everything.paid).toHaveLength(1);
    expect(everything.open).toHaveLength(1);
    expect(everything.total).toBe(100);
  });

  it("should filter by debtor and by description ignoring accents", () => {
    const charges = buildPeriodCharges(
      [
        installment({ debtorId: "ana", debtorName: "Ana", description: "Empréstimo" }),
        installment({ debtorId: "ana", debtorName: "Ana", description: "Celular" }),
        installment({ debtorId: "bia", debtorName: "Bia", description: "Empréstimo" }),
      ],
      filters({ preset: "next-month", debtorIds: ["ana"], search: "emprestimo" }),
      NOW,
    );

    expect(charges).toHaveLength(1);
    expect(charges[0].open.map((item) => item.description)).toEqual(["Empréstimo"]);
  });

  it("should group by debtor sorted by name and skip cancelled installments", () => {
    const charges = buildPeriodCharges(
      [
        installment({ debtorId: "bia", debtorName: "Bia" }),
        installment({ debtorId: "ana", debtorName: "Ana" }),
        installment({ debtorId: "caio", debtorName: "Caio", status: InstallmentStatus.CANCELLED }),
      ],
      filters({ preset: "next-month" }),
      NOW,
    );

    expect(charges.map((charge) => charge.debtorName)).toEqual(["Ana", "Bia"]);
  });

  it("should charge only what is left of a partial payment", () => {
    const [charge] = buildPeriodCharges(
      [installment({ amount: "100.00", payments: ["30.00"], status: InstallmentStatus.PARTIALLY_PAID })],
      filters({ preset: "next-month" }),
      NOW,
    );

    expect(charge.open[0]).toMatchObject({ amount: 100, remaining: 70 });
    expect(charge.total).toBe(70);
  });

  it("should add totals without floating point errors", () => {
    const charges = buildPeriodCharges(
      [
        installment({ amount: "0.10", dueDate: "2026-10-10" }),
        installment({ amount: "0.20", installmentNumber: 2 }),
        installment({ amount: "0.10", debtorId: "bia", debtorName: "Bia" }),
      ],
      filters({ preset: "next-month" }),
      NOW,
    );

    expect(charges[0].total).toBe(0.3);
    expect(summarizePeriodCharges(charges)).toEqual({ total: 0.4, overdue: 0.1, paid: 0, count: 3 });
  });
});

describe("buildPeriodChargeMessage", () => {
  it("should list the next month's installments", () => {
    const [charge] = buildPeriodCharges(
      [installment({ dueDate: "2026-12-10" })],
      filters({ preset: "next-month", includeOverdue: false }),
      NOW,
    );

    expect(buildPeriodChargeMessage(charge, filters({ preset: "next-month" }), NOW)).toBe(
      [
        "Olá, Ana! Seguem suas pendências de dezembro de 2026:",
        `• Empréstimo (1/3) — vence 10/12/2026 — ${brl("100,00")}`,
        `Total a pagar: ${brl("100,00")}`,
      ].join("\n\n"),
    );
  });

  it("should split overdue and period blocks", () => {
    const current = filters({ preset: "next-month" });
    const [charge] = buildPeriodCharges(
      [installment({ dueDate: "2026-10-10" }), installment({ dueDate: "2026-12-10", installmentNumber: 2 })],
      current,
      NOW,
    );

    const message = buildPeriodChargeMessage(charge, current, NOW);

    expect(message).toContain(`Em atraso:\n• Empréstimo (1/3) — venceu 10/10/2026 — ${brl("100,00")}`);
    expect(message).toContain(`No período:\n• Empréstimo (2/3) — vence 10/12/2026 — ${brl("100,00")}`);
    expect(message).toContain(`Total a pagar: ${brl("200,00")}`);
  });

  it("should say a period installment already fell due when its date has passed", () => {
    const current = filters({ preset: "custom", from: "2026-11-01", to: "2026-12-31" });
    const [charge] = buildPeriodCharges(
      [installment({ dueDate: "2026-11-10" }), installment({ dueDate: "2026-12-10", installmentNumber: 2 })],
      current,
      NOW,
    );

    const message = buildPeriodChargeMessage(charge, current, NOW);

    expect(message).toContain("(1/3) — venceu 10/11/2026");
    expect(message).toContain("(2/3) — vence 10/12/2026");
  });

  it("should greet with the overdue wording on that preset", () => {
    const current = filters({ preset: "overdue" });
    const [charge] = buildPeriodCharges([installment({ dueDate: "2026-10-10" })], current, NOW);

    const message = buildPeriodChargeMessage(charge, current, NOW);

    expect(message.startsWith("Olá, Ana! Seguem suas parcelas em atraso:\n\n•")).toBe(true);
  });

  it("should describe payments when nothing is open", () => {
    const current = filters({ preset: "next-month", status: "PAID" });
    const [charge] = buildPeriodCharges(
      [installment({ payments: ["100.00"], status: InstallmentStatus.PAID })],
      current,
      NOW,
    );

    expect(buildPeriodChargeMessage(charge, current, NOW)).toBe(
      [
        "Olá, Ana! Seguem os pagamentos de dezembro de 2026:",
        `• Empréstimo (1/3) — ${brl("100,00")}`,
        `Total pago: ${brl("100,00")}`,
      ].join("\n\n"),
    );
  });
});
