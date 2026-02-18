import { prisma } from "@/lib/prisma";
import { InstallmentStatus } from "@prisma/client";
import { DebitSchema } from "@/core/validators/debit.schema";

export async function getDebits(userId: string) {
  const debits = await prisma.debit.findMany({
    where: {
      debtor: {
        userId,
      },
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

    const totalAmount = Number(data.totalAmount);
    const qty = data.installmentQty;

    // Calcula o valor base (truncado para 2 casas decimais)
    const baseInstallmentValue = Math.floor((totalAmount / qty) * 100) / 100;

    // Calcula o total gerado com o valor base
    const totalBase = baseInstallmentValue * qty;

    // Pega o valor que faltou
    const remainder = Number((totalAmount - totalBase).toFixed(2));

    const currentYear = new Date().getFullYear();

    const installmentsData = Array.from({ length: qty }, (_, index) => {
        const monthIndex = (data.startMonth - 1) + index;
        const dueDate = new Date(currentYear, monthIndex, data.dueDay);

        // Adiciona a diferença apenas na última parcela
        const isLastInstallment = index === qty - 1;
        const finalAmount = isLastInstallment 
            ? baseInstallmentValue + remainder 
            : baseInstallmentValue;

        return {
            debitId: debit.id,
            amount: finalAmount,
            installmentNumber: index + 1,
            dueDate: dueDate,
            status: InstallmentStatus.PENDING
        };
    });

    await tx.installment.createMany({
      data: installmentsData,
    });

    return { success: true, debitId: debit.id };
  });
}
