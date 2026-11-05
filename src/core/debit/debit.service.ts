import { prisma } from "@/lib/prisma";
import { generateInstallments } from "@/core/debit/installment-calculator";
import { DebitSchema } from "@/core/debit/debit.schema";

export async function getDebits(userId: string) {
  const debits = await prisma.debit.findMany({
    where: {
      debtor: {
        userId,
      },
    },
    include: {
      debtor: true,
    },
  });
  return debits;
}

export async function createDebit(userId: string, data: DebitSchema) {
  // 1. Validação (Leitura pode ficar fora da transação)
  const debtorOwner = await prisma.debtor.findUnique({
    where: { id: data.debtorId, userId: userId },
  });

  if (!debtorOwner) throw new Error("Devedor não encontrado");

  return await prisma.$transaction(async (tx) => {
    const debit = await tx.debit.create({
      data: {
        description: data.description,
        totalAmount: data.totalAmount,
        installmentQty: data.installmentQty,
        startMonth: data.startMonth,
        dueDay: data.dueDay,
        debtorId: data.debtorId,
      },
    });

    const installmentsData = generateInstallments({
        totalAmount: Number(data.totalAmount),
        installmentQty: data.installmentQty,
        startMonth: data.startMonth,
        dueDay: data.dueDay,
        debitId: debit.id,
    });

    await tx.installment.createMany({
        data: installmentsData,
    });

    return { success: true, debitId: debit.id };
  });
}
