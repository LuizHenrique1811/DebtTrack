import { DebitStatus, InstallmentStatus, Prisma } from "@prisma/client";
import { registerPaymentAction } from "@/actions/payment/payment.action";
import { paymentSchema, PaymentSchema } from "@/core/payment/payment.schema";
import { getTodayDateKey } from "@/lib/utils";
import { auth } from "@/auth";

const MOCK_USER_ID = "mock-user-id";
const INSTALLMENT_ID = "mock-installment-id";
const DEBIT_ID = "mock-debit-id";
const TODAY = getTodayDateKey();

const mockTx = {
  $queryRaw: jest.fn(),
  installment: {
    findUniqueOrThrow: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  },
  payment: {
    create: jest.fn(),
  },
  debit: {
    update: jest.fn(),
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
    $transaction: jest.fn((callback: (tx: typeof mockTx) => Promise<unknown>) => callback(mockTx)),
  },
}));

function mockInstallment({
  amount = "100.33",
  status = InstallmentStatus.PENDING as InstallmentStatus,
  payments = [] as string[],
} = {}) {
  mockTx.installment.findUniqueOrThrow.mockResolvedValue({
    id: INSTALLMENT_ID,
    debitId: DEBIT_ID,
    amount: new Prisma.Decimal(amount),
    status,
    payments: payments.map((value) => ({ amount: new Prisma.Decimal(value) })),
  });
}

const payment = (amount: number, paymentDate = TODAY): PaymentSchema => ({
  installmentId: INSTALLMENT_ID,
  amount,
  paymentDate,
});

describe("registerPaymentAction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (auth as jest.Mock).mockResolvedValue({ user: { id: MOCK_USER_ID } });
    mockTx.$queryRaw.mockResolvedValue([{ id: INSTALLMENT_ID }]);
    mockTx.payment.create.mockResolvedValue({ id: "mock-payment-id" });
    mockTx.installment.count.mockResolvedValue(1);
    mockInstallment();
  });

  it("should require a session", async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    const result = await registerPaymentAction(payment(100.33));

    expect(result.error).toBe("Usuário não encontrado");
    expect(mockTx.payment.create).not.toHaveBeenCalled();
  });

  it("should not touch an installment from another user", async () => {
    mockTx.$queryRaw.mockResolvedValue([]);

    const result = await registerPaymentAction(payment(100.33));

    expect(result.error).toBe("Parcela não encontrada");
    expect(mockTx.payment.create).not.toHaveBeenCalled();
    expect(mockTx.installment.update).not.toHaveBeenCalled();
  });

  it("should check the owner when locking the installment", async () => {
    await registerPaymentAction(payment(100.33));

    const [, installmentId, userId] = mockTx.$queryRaw.mock.calls[0];

    expect(installmentId).toBe(INSTALLMENT_ID);
    expect(userId).toBe(MOCK_USER_ID);
  });

  it("should mark the installment as paid on a full payment", async () => {
    const result = await registerPaymentAction(payment(100.33));

    expect(result.success).toBe(true);
    expect(mockTx.installment.update).toHaveBeenCalledWith({
      where: { id: INSTALLMENT_ID },
      data: {
        status: InstallmentStatus.PAID,
        paidDate: new Date(`${TODAY}T00:00:00.000Z`),
      },
    });
  });

  it("should mark the installment as partially paid", async () => {
    await registerPaymentAction(payment(40));

    expect(mockTx.installment.update).toHaveBeenCalledWith({
      where: { id: INSTALLMENT_ID },
      data: { status: InstallmentStatus.PARTIALLY_PAID, paidDate: null },
    });
    expect(mockTx.installment.count).not.toHaveBeenCalled();
  });

  it("should finish the installment when a later payment covers the rest", async () => {
    mockInstallment({ status: InstallmentStatus.PARTIALLY_PAID, payments: ["40.00", "20.00"] });

    await registerPaymentAction(payment(40.33));

    expect(mockTx.installment.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: InstallmentStatus.PAID }),
      }),
    );
  });

  it("should not lose cents when adding payments", async () => {
    mockInstallment({ amount: "0.30", payments: ["0.10", "0.10"] });

    const result = await registerPaymentAction(payment(0.1));

    expect(result.success).toBe(true);
    expect(mockTx.installment.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: InstallmentStatus.PAID }),
      }),
    );
  });

  it("should reject a payment above the remaining amount", async () => {
    mockInstallment({ status: InstallmentStatus.PARTIALLY_PAID, payments: ["100.00"] });

    const result = await registerPaymentAction(payment(0.34));

    expect(result.error).toBe("O valor é maior do que o restante da parcela");
    expect(mockTx.payment.create).not.toHaveBeenCalled();
  });

  it("should reject a payment on a paid installment", async () => {
    mockInstallment({ status: InstallmentStatus.PAID, payments: ["100.33"] });

    const result = await registerPaymentAction(payment(1));

    expect(result.error).toBe("Esta parcela já está paga");
    expect(mockTx.payment.create).not.toHaveBeenCalled();
  });

  it("should reject a payment on a cancelled installment", async () => {
    mockInstallment({ status: InstallmentStatus.CANCELLED });

    const result = await registerPaymentAction(payment(1));

    expect(result.error).toBe("Esta parcela foi cancelada");
    expect(mockTx.payment.create).not.toHaveBeenCalled();
  });

  it("should keep the debit active while other installments are open", async () => {
    mockTx.installment.count.mockResolvedValue(2);

    await registerPaymentAction(payment(100.33));

    expect(mockTx.debit.update).not.toHaveBeenCalled();
  });

  it("should close the debit when the last installment is paid", async () => {
    mockTx.installment.count.mockResolvedValue(0);

    await registerPaymentAction(payment(100.33));

    expect(mockTx.debit.update).toHaveBeenCalledWith({
      where: { id: DEBIT_ID },
      data: { status: DebitStatus.PAID },
    });
  });

  it("should hide unexpected database errors", async () => {
    mockTx.$queryRaw.mockRejectedValue(new Error("connection string with secrets"));

    const result = await registerPaymentAction(payment(100.33));

    expect(result.error).toBe("Erro ao registrar pagamento");
  });
});

describe("paymentSchema", () => {
  const isValid = (data: Partial<PaymentSchema>) =>
    paymentSchema.safeParse({ ...payment(100.33), ...data }).success;

  it("should accept a valid payment", () => {
    expect(isValid({})).toBe(true);
  });

  it.each([0, -1, 1.005])("should reject the amount %s", (amount) => {
    expect(isValid({ amount })).toBe(false);
  });

  it.each(["", "15/11/2026", "2026-02-31", "2026-13-01"])(
    "should reject the date %s",
    (paymentDate) => {
      expect(isValid({ paymentDate })).toBe(false);
    },
  );

  it("should reject a date in the future", () => {
    expect(isValid({ paymentDate: "2999-01-01" })).toBe(false);
  });
});
