import {
  createDebtorAction,
  deleteDebtorAction,
  editDebtorAction,
} from "@/actions/debtor/debtor.action";
import type { DebtorSchema } from "@/core/debit/debtor.schema";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const MOCK_USER_ID = "mock-user-id";
const OTHER_USER_ID = "other-user-id";
const MOCK_DEBTOR_ID = "mock-debtor-id";

const debtorData = { name: "Maria", email: "", phone: "" };

// Campos extras simulam um cliente chamando a server action diretamente.
const payloadWithOwner = {
  ...debtorData,
  userId: OTHER_USER_ID,
} as DebtorSchema;

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
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Debtor authorization", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (auth as jest.Mock).mockResolvedValue({
      user: { id: MOCK_USER_ID },
    });
  });

  describe("without a session", () => {
    beforeEach(() => {
      (auth as jest.Mock).mockResolvedValue(null);
    });

    it("should not edit a debtor", async () => {
      const result = await editDebtorAction(MOCK_DEBTOR_ID, debtorData);

      expect(result.error).toBe("Usuário não encontrado");
      expect(prisma.debtor.update).not.toHaveBeenCalled();
    });

    it("should not delete a debtor", async () => {
      const result = await deleteDebtorAction(MOCK_DEBTOR_ID);

      expect(result.error).toBe("Usuário não encontrado");
      expect(prisma.debtor.delete).not.toHaveBeenCalled();
    });
  });

  describe("with a session", () => {
    it("should only edit debtors owned by the current user", async () => {
      await editDebtorAction(MOCK_DEBTOR_ID, debtorData);

      expect(prisma.debtor.update).toHaveBeenCalledWith({
        where: { id: MOCK_DEBTOR_ID, userId: MOCK_USER_ID },
        data: debtorData,
      });
    });

    it("should only delete debtors owned by the current user", async () => {
      await deleteDebtorAction(MOCK_DEBTOR_ID);

      expect(prisma.debtor.delete).toHaveBeenCalledWith({
        where: { id: MOCK_DEBTOR_ID, userId: MOCK_USER_ID },
      });
    });

    it("should return an error when the debtor belongs to another user", async () => {
      (prisma.debtor.update as jest.Mock).mockRejectedValue(
        new Error("Record not found"),
      );
      (prisma.debtor.delete as jest.Mock).mockRejectedValue(
        new Error("Record not found"),
      );

      const editResult = await editDebtorAction(MOCK_DEBTOR_ID, debtorData);
      const deleteResult = await deleteDebtorAction(MOCK_DEBTOR_ID);

      expect(editResult.error).toBe("Erro ao editar devedor");
      expect(deleteResult.error).toBe("Erro ao excluir devedor");
    });

    it("should ignore an owner sent in the create payload", async () => {
      await createDebtorAction(payloadWithOwner);

      expect(prisma.debtor.create).toHaveBeenCalledWith({
        data: { ...debtorData, userId: MOCK_USER_ID },
      });
    });

    it("should ignore an owner sent in the edit payload", async () => {
      await editDebtorAction(MOCK_DEBTOR_ID, payloadWithOwner);

      expect(prisma.debtor.update).toHaveBeenCalledWith({
        where: { id: MOCK_DEBTOR_ID, userId: MOCK_USER_ID },
        data: debtorData,
      });
    });
  });
});
