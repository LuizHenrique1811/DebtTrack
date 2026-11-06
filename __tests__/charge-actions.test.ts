import { Prisma } from "@prisma/client";
import { getDebtorChargeAction } from "@/actions/charge/charge.action";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const MOCK_USER_ID = "mock-user-id";
const MOCK_DEBTOR_ID = "mock-debtor-id";

jest.mock("@/auth", () => ({
  auth: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
  handlers: { GET: jest.fn(), POST: jest.fn() },
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    debtor: { findFirst: jest.fn() },
    installment: { findMany: jest.fn() },
  },
}));

describe("getDebtorChargeAction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers({ now: new Date("2026-11-15T15:00:00.000Z") });
    (auth as jest.Mock).mockResolvedValue({ user: { id: MOCK_USER_ID } });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should not read anything without a session", async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    const result = await getDebtorChargeAction(MOCK_DEBTOR_ID);

    expect(result.error).toBe("Usuário não encontrado");
    expect(prisma.debtor.findFirst).not.toHaveBeenCalled();
    expect(prisma.installment.findMany).not.toHaveBeenCalled();
  });

  it("should not read the installments of another user's debtor", async () => {
    (prisma.debtor.findFirst as jest.Mock).mockResolvedValue(null);

    const result = await getDebtorChargeAction(MOCK_DEBTOR_ID);

    expect(result.error).toBe("Devedor não encontrado");
    expect(prisma.debtor.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: MOCK_DEBTOR_ID, userId: MOCK_USER_ID },
      }),
    );
    expect(prisma.installment.findMany).not.toHaveBeenCalled();
  });

  it("should build the charge from that debtor's installments only", async () => {
    (prisma.debtor.findFirst as jest.Mock).mockResolvedValue({
      name: "Maria",
      phone: "(12) 34567-8901",
    });
    (prisma.installment.findMany as jest.Mock).mockResolvedValue([
      {
        id: "installment-id",
        amount: new Prisma.Decimal("100.00"),
        dueDate: new Date("2026-11-20T00:00:00.000Z"),
        status: "PENDING",
        installmentNumber: 1,
        debit: {
          description: "Empréstimo",
          installmentQty: 3,
          debtor: { id: MOCK_DEBTOR_ID, name: "Maria" },
        },
        payments: [],
      },
    ]);

    const result = await getDebtorChargeAction(MOCK_DEBTOR_ID);

    expect(prisma.installment.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          debit: { debtor: { userId: MOCK_USER_ID, id: MOCK_DEBTOR_ID } },
        },
      }),
    );
    expect(result.charge?.total).toBe(100);
    expect(result.charge?.message).toContain("Olá, Maria!");
    expect(result.charge?.whatsAppUrl).toContain("https://wa.me/5512345678901?text=");
  });

  it("should return a friendly error when the query fails", async () => {
    (prisma.debtor.findFirst as jest.Mock).mockRejectedValue(new Error("db"));

    const result = await getDebtorChargeAction(MOCK_DEBTOR_ID);

    expect(result.error).toBe("Erro ao gerar cobrança");
  });
});
