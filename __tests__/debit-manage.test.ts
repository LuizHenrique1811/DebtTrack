import { Prisma } from "@prisma/client";
import { deleteDebitAction, updateDebitAction } from "@/actions/debit/debit.action";
import {
  DEFAULT_DEBIT_FILTERS,
  DebitFilters,
  filterDebits,
  getDebitDebtors,
} from "@/core/debit/debit-filter";
import type { DebitView } from "@/core/debit/debit.service";
import { auth } from "@/auth";

const MOCK_USER_ID = "mock-user-id";
const DEBIT_ID = "mock-debit-id";

const debitData = {
  debtorId: "mock-debtor-id",
  description: "Empréstimo",
  totalAmount: 300,
  installmentQty: 3,
  startMonth: 11,
  startYear: 2026,
  dueDay: 10,
};

const mockTx = {
  debit: {
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  debtor: {
    findFirst: jest.fn(),
  },
  payment: {
    count: jest.fn(),
  },
  installment: {
    findFirst: jest.fn(),
    deleteMany: jest.fn(),
    createMany: jest.fn(),
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

beforeEach(() => {
  jest.clearAllMocks();
  (auth as jest.Mock).mockResolvedValue({ user: { id: MOCK_USER_ID } });
  mockTx.debit.findFirst.mockResolvedValue({
    ...debitData,
    id: DEBIT_ID,
    totalAmount: new Prisma.Decimal(300),
    createdAt: new Date(2026, 10, 5),
  });
  mockTx.debtor.findFirst.mockResolvedValue({ id: debitData.debtorId });
  mockTx.payment.count.mockResolvedValue(0);
  mockTx.installment.findFirst.mockResolvedValue({
    dueDate: new Date("2026-11-10T00:00:00.000Z"),
  });
});

describe("updateDebitAction", () => {
  it("should require a session", async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    const result = await updateDebitAction(DEBIT_ID, debitData);

    expect(result.error).toBe("Usuário não encontrado");
    expect(mockTx.debit.update).not.toHaveBeenCalled();
  });

  it("should validate the data", async () => {
    const result = await updateDebitAction(DEBIT_ID, { ...debitData, description: "" });

    expect(result.errors).toHaveProperty("description");
    expect(mockTx.debit.update).not.toHaveBeenCalled();
  });

  it("should not touch a debit from another user", async () => {
    mockTx.debit.findFirst.mockResolvedValue(null);

    const result = await updateDebitAction(DEBIT_ID, debitData);

    expect(result.error).toBe("Débito não encontrado");
    expect(mockTx.debit.findFirst).toHaveBeenCalledWith({
      where: { id: DEBIT_ID, debtor: { userId: MOCK_USER_ID } },
    });
    expect(mockTx.debit.update).not.toHaveBeenCalled();
  });

  it("should not move a debit to a debtor from another user", async () => {
    mockTx.debtor.findFirst.mockResolvedValue(null);

    const result = await updateDebitAction(DEBIT_ID, { ...debitData, debtorId: "other" });

    expect(result.error).toBe("Devedor não encontrado");
    expect(mockTx.debtor.findFirst).toHaveBeenCalledWith({
      where: { id: "other", userId: MOCK_USER_ID },
    });
    expect(mockTx.debit.update).not.toHaveBeenCalled();
  });

  it("should keep the installments when only the description changes", async () => {
    const result = await updateDebitAction(DEBIT_ID, { ...debitData, description: "Novo nome" });

    expect(result.success).toBe(true);
    expect(mockTx.debit.update).toHaveBeenCalled();
    expect(mockTx.installment.deleteMany).not.toHaveBeenCalled();
    expect(mockTx.installment.createMany).not.toHaveBeenCalled();
  });

  it("should allow changing the description of a debit with payments", async () => {
    mockTx.payment.count.mockResolvedValue(2);

    const result = await updateDebitAction(DEBIT_ID, { ...debitData, description: "Novo nome" });

    expect(result.success).toBe(true);
    expect(mockTx.installment.deleteMany).not.toHaveBeenCalled();
  });

  it.each([
    ["total", { totalAmount: 400 }],
    ["quantidade", { installmentQty: 4 }],
    ["mes", { startMonth: 12 }],
    ["ano", { startYear: 2027 }],
    ["dia", { dueDay: 20 }],
  ])("should recreate the installments when %s changes", async (_, change) => {
    await updateDebitAction(DEBIT_ID, { ...debitData, ...change });

    expect(mockTx.installment.deleteMany).toHaveBeenCalledWith({ where: { debitId: DEBIT_ID } });
    expect(mockTx.installment.createMany).toHaveBeenCalled();
  });

  it("should generate the new number of installments", async () => {
    await updateDebitAction(DEBIT_ID, { ...debitData, installmentQty: 4, totalAmount: 400 });

    const { data } = mockTx.installment.createMany.mock.calls[0][0];

    expect(data).toHaveLength(4);
    expect(data[0].amount).toBeCloseTo(100, 2);
  });

  it("should move installments saved in the wrong year back to the right one", async () => {
    // Débito de setembro que foi gerado em 2027 por engano
    mockTx.debit.findFirst.mockResolvedValue({
      ...debitData,
      id: DEBIT_ID,
      startMonth: 9,
      totalAmount: new Prisma.Decimal(300),
    });
    mockTx.installment.findFirst.mockResolvedValue({
      dueDate: new Date("2027-09-10T00:00:00.000Z"),
    });

    await updateDebitAction(DEBIT_ID, { ...debitData, startMonth: 9, startYear: 2026 });

    const { data } = mockTx.installment.createMany.mock.calls[0][0];

    expect(mockTx.installment.deleteMany).toHaveBeenCalled();
    expect(data[0].dueDate.getFullYear()).toBe(2026);
    expect(data[0].dueDate.getMonth()).toBe(8);
  });

  it("should refuse changing the year of a debit with payments", async () => {
    mockTx.payment.count.mockResolvedValue(1);

    const result = await updateDebitAction(DEBIT_ID, { ...debitData, startYear: 2027 });

    expect(result.error).toBe(
      "Este débito tem pagamentos. Desfaça os pagamentos para alterar valores ou datas",
    );
    expect(mockTx.installment.deleteMany).not.toHaveBeenCalled();
  });

  it("should not recreate installments when the year stays the same", async () => {
    mockTx.installment.findFirst.mockResolvedValue({
      dueDate: new Date("2026-11-10T03:00:00.000Z"),
    });

    await updateDebitAction(DEBIT_ID, { ...debitData, description: "Novo nome" });

    expect(mockTx.installment.deleteMany).not.toHaveBeenCalled();
  });

  it("should refuse changing values of a debit with payments", async () => {
    mockTx.payment.count.mockResolvedValue(1);

    const result = await updateDebitAction(DEBIT_ID, { ...debitData, totalAmount: 400 });

    expect(result.error).toBe(
      "Este débito tem pagamentos. Desfaça os pagamentos para alterar valores ou datas",
    );
    expect(mockTx.debit.update).not.toHaveBeenCalled();
    expect(mockTx.installment.deleteMany).not.toHaveBeenCalled();
  });

  it("should hide unexpected database errors", async () => {
    mockTx.debit.findFirst.mockRejectedValue(new Error("connection string with secrets"));

    const result = await updateDebitAction(DEBIT_ID, debitData);

    expect(result.error).toBe("Erro ao editar débito");
  });
});

describe("deleteDebitAction", () => {
  it("should require a session", async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    const result = await deleteDebitAction(DEBIT_ID);

    expect(result.error).toBe("Usuário não encontrado");
    expect(mockTx.debit.delete).not.toHaveBeenCalled();
  });

  it("should not touch a debit from another user", async () => {
    mockTx.debit.findFirst.mockResolvedValue(null);

    const result = await deleteDebitAction(DEBIT_ID);

    expect(result.error).toBe("Débito não encontrado");
    expect(mockTx.debit.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: DEBIT_ID, debtor: { userId: MOCK_USER_ID } } }),
    );
    expect(mockTx.installment.deleteMany).not.toHaveBeenCalled();
    expect(mockTx.debit.delete).not.toHaveBeenCalled();
  });

  it("should refuse deleting a debit with payments", async () => {
    mockTx.payment.count.mockResolvedValue(1);

    const result = await deleteDebitAction(DEBIT_ID);

    expect(result.error).toBe("Este débito tem pagamentos. Desfaça os pagamentos para excluir");
    expect(mockTx.installment.deleteMany).not.toHaveBeenCalled();
    expect(mockTx.debit.delete).not.toHaveBeenCalled();
  });

  it("should delete the installments before the debit", async () => {
    const result = await deleteDebitAction(DEBIT_ID);

    expect(result.success).toBe(true);
    expect(mockTx.installment.deleteMany).toHaveBeenCalledWith({ where: { debitId: DEBIT_ID } });
    expect(mockTx.debit.delete).toHaveBeenCalledWith({ where: { id: DEBIT_ID } });
    expect(mockTx.installment.deleteMany.mock.invocationCallOrder[0]).toBeLessThan(
      mockTx.debit.delete.mock.invocationCallOrder[0],
    );
  });

  it("should hide unexpected database errors", async () => {
    mockTx.debit.findFirst.mockRejectedValue(new Error("connection string with secrets"));

    const result = await deleteDebitAction(DEBIT_ID);

    expect(result.error).toBe("Erro ao excluir débito");
  });
});

describe("filterDebits", () => {
  const debit = (id: string, status: string, debtorId: string, name: string) =>
    ({ id, status, debtorId, debtor: { name } }) as DebitView;

  const debits = [
    debit("a", "ACTIVE", "ana", "Ana"),
    debit("b", "PAID", "ana", "Ana"),
    debit("c", "ACTIVE", "bia", "Bia"),
  ];

  const filtered = (filters: Partial<DebitFilters>) =>
    filterDebits(debits, { ...DEFAULT_DEBIT_FILTERS, ...filters }).map((item) => item.id);

  it("should start showing everything", () => {
    expect(filtered({})).toEqual(["a", "b", "c"]);
  });

  it("should filter by status", () => {
    expect(filtered({ status: "PAID" })).toEqual(["b"]);
  });

  it("should filter by debtor", () => {
    expect(filtered({ debtorId: "bia" })).toEqual(["c"]);
  });

  it("should combine the filters", () => {
    expect(filtered({ status: "ACTIVE", debtorId: "ana" })).toEqual(["a"]);
  });

  it("should search by debit name, ignoring case and accents", () => {
    const named = [
      { ...debit("ar", "ACTIVE", "ana", "Ana"), description: "Ar condicionado" },
      { ...debit("emprestimo", "ACTIVE", "ana", "Ana"), description: "Empréstimo" },
    ];
    const search = (text: string) =>
      filterDebits(named, { ...DEFAULT_DEBIT_FILTERS, search: text }).map((item) => item.id);

    expect(search("ar cond")).toEqual(["ar"]);
    expect(search("  EMPRESTIMO ")).toEqual(["emprestimo"]);
    expect(search("geladeira")).toEqual([]);
  });

  it("should list each debtor once, in alphabetical order", () => {
    expect(getDebitDebtors(debits)).toEqual([
      { id: "ana", name: "Ana" },
      { id: "bia", name: "Bia" },
    ]);
  });
});
