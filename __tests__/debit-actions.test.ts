import { createDebitAction } from "@/actions/debit/debit.action";
import { prisma } from "@/lib/prisma";
import { InstallmentStatus } from "@prisma/client";
import { auth } from "@/auth";

const MOCK_USER_ID = "mock-user-id";
const MOCK_DEBTOR_ID = "mock-debtor-id";
const MOCK_DEBIT_ID = "mock-debit-id";

const mockTx = {
  debit: {
    create: jest.fn().mockResolvedValue({ id: MOCK_DEBIT_ID }),
  },
  installment: {
    createMany: jest.fn().mockResolvedValue(undefined),
  },
};

jest.mock("@/auth", () => ({
  auth: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
  handlers: { GET: jest.fn(), POST: jest.fn() },
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    debtor: {
      findUnique: jest.fn(),
    },
    $transaction: jest.fn((cb: (tx: typeof mockTx) => Promise<unknown>) => cb(mockTx)),
  },
}));

describe("Debit creation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (auth as jest.Mock).mockResolvedValue({
      user: { id: MOCK_USER_ID },
    });
  });

  it("should create a debit and generate installments correctly", async () => {
    (prisma.debtor.findUnique as jest.Mock).mockResolvedValue({
      id: MOCK_DEBTOR_ID,
      userId: MOCK_USER_ID,
    });

    const debitData = {
      debtorId: MOCK_DEBTOR_ID,
      description: "Credit card bill",
      totalAmount: 301,
      installmentQty: 3,
      startMonth: 1,
      startYear: 2026,
      dueDay: 15,
    };

    const result = await createDebitAction(debitData);

    expect(result.success).toBe(true);
    expect(result.debitObj?.debitId).toBe(MOCK_DEBIT_ID);

    expect(prisma.debtor.findUnique).toHaveBeenCalledWith({
      where: { id: MOCK_DEBTOR_ID, userId: MOCK_USER_ID },
    });
    expect(prisma.$transaction).toHaveBeenCalled();

    expect(mockTx.debit.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        description: debitData.description,
        totalAmount: debitData.totalAmount,
        installmentQty: debitData.installmentQty,
        debtorId: debitData.debtorId,
      }),
    });

    const createManyCallArgs = mockTx.installment.createMany.mock.calls[0][0];
    const generatedInstallments = createManyCallArgs.data;

    expect(generatedInstallments).toHaveLength(3);
    expect(generatedInstallments[0].status).toBe(InstallmentStatus.PENDING);
    expect(generatedInstallments[0].amount).toBeCloseTo(100.33, 2);
    expect(generatedInstallments[1].amount).toBeCloseTo(100.33, 2);
    expect(generatedInstallments[2].amount).toBeCloseTo(100.34, 2);

    // Verifica a numeração
    expect(generatedInstallments[0].installmentNumber).toBe(1);
    expect(generatedInstallments[2].installmentNumber).toBe(3);

    // Verifica as datas de vencimento (startMonth=1 → janeiro, dueDay=15)
    expect(generatedInstallments[0].dueDate).toBeInstanceOf(Date);
    expect(generatedInstallments[0].dueDate.getFullYear()).toBe(debitData.startYear);
    expect(generatedInstallments[0].dueDate.getMonth() + 1).toBe(debitData.startMonth);
    expect(generatedInstallments[0].dueDate.getDate()).toBe(debitData.dueDay);
  });

  it("should return error if debtor not found", async () => {
    (prisma.debtor.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await createDebitAction({
      debtorId: "non-existing-uuid-or-cuid",
      description: "Credit card bill",
      totalAmount: 300.99,
      installmentQty: 3,
      startMonth: 1,
      startYear: 2026,
      dueDay: 15,
    });

    expect(result.success).toBeFalsy();
    expect(result.error).toBe("Erro ao criar débito");
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("should validate debit data correctly", async () => {
    const result = await createDebitAction({
      debtorId: MOCK_DEBTOR_ID,
      description: "Invalid debit",
      totalAmount: -100,
      installmentQty: 3,
      startMonth: 1,
      startYear: 2026,
      dueDay: 15,
    });

    expect(result.success).toBeFalsy();
    expect(result.errors).toHaveProperty("totalAmount");
    expect(result.errors?.totalAmount).toContain("Valor é obrigatório");
    expect(prisma.debtor.findUnique).not.toHaveBeenCalled();
  });
});
