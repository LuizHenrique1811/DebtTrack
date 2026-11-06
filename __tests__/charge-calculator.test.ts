import { InstallmentStatus, Prisma } from "@prisma/client";
import {
  buildCharge,
  buildChargeMessage,
  buildWhatsAppUrl,
} from "@/core/charge/charge-calculator";
import type { ReportInstallment } from "@/core/report/report-calculator";

// 12h de 15/11/2026 no Brasil
const NOW = new Date("2026-11-15T15:00:00.000Z");

// formatCurrency separa "R$" do valor com um espaço não separável.
const brl = (value: string) => `R$ ${value}`;

function installment({
  amount = "100.00",
  dueDate = "2026-11-20",
  status = InstallmentStatus.PENDING as InstallmentStatus,
  description = "Empréstimo",
  installmentNumber = 1,
  installmentQty = 3,
  payments = [] as string[],
} = {}): ReportInstallment {
  return {
    id: `${description}-${dueDate}-${installmentNumber}`,
    amount: new Prisma.Decimal(amount),
    dueDate: new Date(`${dueDate}T00:00:00.000Z`),
    status,
    debtorId: "ana",
    debtorName: "Ana",
    description,
    installmentNumber,
    installmentQty,
    payments: payments.map((value) => ({
      amount: new Prisma.Decimal(value),
      paymentDate: NOW,
    })),
  };
}

describe("buildCharge", () => {
  it("should return an empty charge without installments", () => {
    expect(buildCharge([], NOW)).toEqual({
      month: "2026-11",
      overdue: [],
      current: [],
      total: 0,
    });
  });

  it("should separate past months from the current one and skip future months", () => {
    const charge = buildCharge(
      [
        installment({ dueDate: "2026-10-10", amount: "10.00" }),
        installment({ dueDate: "2026-11-10", amount: "20.00" }),
        installment({ dueDate: "2026-12-10", amount: "40.00" }),
      ],
      NOW,
    );

    expect(charge.overdue.map((item) => item.remaining)).toEqual([10]);
    expect(charge.current.map((item) => item.remaining)).toEqual([20]);
    expect(charge.total).toBe(30);
  });

  it("should keep a current month installment past its due day in the current block", () => {
    const charge = buildCharge([installment({ dueDate: "2026-11-01" })], NOW);

    expect(charge.overdue).toHaveLength(0);
    expect(charge.current).toHaveLength(1);
  });

  it("should treat the previous year as overdue", () => {
    const charge = buildCharge([installment({ dueDate: "2025-12-10" })], NOW);

    expect(charge.overdue).toHaveLength(1);
  });

  it("should follow the Brazilian month at the turn of the month", () => {
    // 22h de 31/10/2026 no Brasil, já 1º de novembro em UTC
    const charge = buildCharge(
      [installment({ dueDate: "2026-10-31" })],
      new Date("2026-11-01T01:00:00.000Z"),
    );

    expect(charge.month).toBe("2026-10");
    expect(charge.current).toHaveLength(1);
  });

  it("should ignore cancelled and fully paid installments", () => {
    const charge = buildCharge(
      [
        installment({ status: InstallmentStatus.CANCELLED }),
        installment({ status: InstallmentStatus.PAID, payments: ["100.00"] }),
      ],
      NOW,
    );

    expect(charge.current).toHaveLength(0);
    expect(charge.total).toBe(0);
  });

  it("should charge only what is left of a partial payment", () => {
    const charge = buildCharge(
      [
        installment({
          status: InstallmentStatus.PARTIALLY_PAID,
          payments: ["40.00"],
        }),
      ],
      NOW,
    );

    expect(charge.current[0]).toMatchObject({ amount: 100, remaining: 60 });
    expect(charge.total).toBe(60);
  });

  it("should sort by due date", () => {
    const charge = buildCharge(
      [
        installment({ dueDate: "2026-11-20", description: "Celular" }),
        installment({ dueDate: "2026-11-05", description: "Empréstimo" }),
      ],
      NOW,
    );

    expect(charge.current.map((item) => item.description)).toEqual([
      "Empréstimo",
      "Celular",
    ]);
  });

  it("should add decimals without floating point errors", () => {
    const charge = buildCharge(
      [
        installment({ amount: "0.10" }),
        installment({ amount: "0.20", installmentNumber: 2 }),
      ],
      NOW,
    );

    expect(charge.total).toBe(0.3);
  });
});

describe("buildChargeMessage", () => {
  it("should list the items without block titles when nothing is overdue", () => {
    const charge = buildCharge(
      [
        installment({
          dueDate: "2026-11-10",
          installmentNumber: 2,
          installmentQty: 3,
        }),
        installment({
          dueDate: "2026-11-15",
          description: "Celular",
          amount: "80.00",
          installmentNumber: 5,
          installmentQty: 12,
        }),
      ],
      NOW,
    );

    expect(buildChargeMessage("Maria", charge)).toBe(
      [
        "Olá, Maria! Segue a cobrança de novembro de 2026:",
        "",
        `• Empréstimo (2/3) — vence 10/11/2026 — ${brl("100,00")}`,
        `• Celular (5/12) — vence 15/11/2026 — ${brl("80,00")}`,
        "",
        `Total a pagar: ${brl("180,00")}`,
      ].join("\n"),
    );
  });

  it("should separate overdue installments from the current month", () => {
    const charge = buildCharge(
      [
        installment({ dueDate: "2026-10-10" }),
        installment({ dueDate: "2026-11-10", installmentNumber: 2 }),
      ],
      NOW,
    );

    expect(buildChargeMessage("Maria", charge)).toBe(
      [
        "Olá, Maria! Segue a cobrança de novembro de 2026:",
        "",
        "Em atraso:",
        `• Empréstimo (1/3) — venceu 10/10/2026 — ${brl("100,00")}`,
        "",
        "Deste mês:",
        `• Empréstimo (2/3) — vence 10/11/2026 — ${brl("100,00")}`,
        "",
        `Total a pagar: ${brl("200,00")}`,
      ].join("\n"),
    );
  });

  it("should omit the current month block when only overdue installments exist", () => {
    const charge = buildCharge([installment({ dueDate: "2026-10-10" })], NOW);
    const message = buildChargeMessage("Maria", charge);

    expect(message).toContain("Em atraso:");
    expect(message).not.toContain("Deste mês:");
  });

  it("should drop spaces left around the description", () => {
    const charge = buildCharge(
      [installment({ description: "Ar Condicionado " })],
      NOW,
    );

    expect(buildChargeMessage("Maria", charge)).toContain(
      "• Ar Condicionado (1/3)",
    );
  });

  it("should show the original amount of a partially paid installment", () => {
    const charge = buildCharge([installment({ payments: ["40.00"] })], NOW);

    expect(buildChargeMessage("Maria", charge)).toContain(
      `${brl("60,00")} (restante de ${brl("100,00")})`,
    );
  });
});

describe("buildWhatsAppUrl", () => {
  it.each([
    ["(12) 34567-8901", "5512345678901"],
    ["(12) 3456-7890", "551234567890"],
    ["12345678901", "5512345678901"],
    ["+55 12 34567-8901", "5512345678901"],
    ["55 12 3456-7890", "551234567890"],
  ])("should normalize %s", (phone, number) => {
    expect(buildWhatsAppUrl(phone, "oi")).toBe(`https://wa.me/${number}?text=oi`);
  });

  it.each([[null], [""], ["34567-8901"], ["1 212 555 0123 44"]])(
    "should not build a link for %s",
    (phone) => {
      expect(buildWhatsAppUrl(phone, "oi")).toBeNull();
    },
  );

  it("should encode the message", () => {
    const url = buildWhatsAppUrl("12345678901", "Olá\n• R$ 1 & 2");

    expect(new URL(url!).searchParams.get("text")).toBe("Olá\n• R$ 1 & 2");
  });
});
