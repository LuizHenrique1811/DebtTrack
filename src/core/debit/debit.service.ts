import { prisma } from "@/lib/prisma";
import { generateInstallments } from "@/core/debit/installment-calculator";
import { DebitError } from "@/core/debit/debit.errors";
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
      installments: {
        select: { dueDate: true, _count: { select: { payments: true } } },
        orderBy: { dueDate: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return debits.map(({ installments, ...debit }) => ({
    ...debit,
    // Decimal não pode ser enviado para componentes de cliente.
    totalAmount: debit.totalAmount.toNumber(),
    // O ano não é gravado no débito: vem da primeira parcela.
    startYear: installments[0]?.dueDate.getUTCFullYear() ?? debit.createdAt.getUTCFullYear(),
    paymentCount: installments.reduce(
      (total, installment) => total + installment._count.payments,
      0,
    ),
  }));
}

export type DebitView = Awaited<ReturnType<typeof getDebits>>[number];

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
        startYear: data.startYear,
        dueDay: data.dueDay,
        debitId: debit.id,
    });

    await tx.installment.createMany({
        data: installmentsData,
    });

    return { success: true, debitId: debit.id };
  });
}

export async function updateDebit(userId: string, debitId: string, data: DebitSchema) {
  return await prisma.$transaction(async (tx) => {
    const debit = await tx.debit.findFirst({
      where: { id: debitId, debtor: { userId } },
    });

    if (!debit) throw new DebitError("Débito não encontrado");

    const debtor = await tx.debtor.findFirst({
      where: { id: data.debtorId, userId },
    });

    if (!debtor) throw new DebitError("Devedor não encontrado");

    const firstInstallment = await tx.installment.findFirst({
      where: { debitId },
      orderBy: { dueDate: "asc" },
      select: { dueDate: true },
    });

    const changesInstallments =
      !debit.totalAmount.equals(data.totalAmount) ||
      debit.installmentQty !== data.installmentQty ||
      debit.startMonth !== data.startMonth ||
      firstInstallment?.dueDate.getUTCFullYear() !== data.startYear ||
      debit.dueDay !== data.dueDay;

    if (changesInstallments) {
      const payments = await tx.payment.count({
        where: { installment: { debitId } },
      });

      if (payments > 0) {
        throw new DebitError(
          "Este débito tem pagamentos. Desfaça os pagamentos para alterar valores ou datas",
        );
      }
    }

    await tx.debit.update({
      where: { id: debitId },
      data: {
        description: data.description,
        debtorId: data.debtorId,
        totalAmount: data.totalAmount,
        installmentQty: data.installmentQty,
        startMonth: data.startMonth,
        dueDay: data.dueDay,
      },
    });

    if (changesInstallments) {
      await tx.installment.deleteMany({ where: { debitId } });
      await tx.installment.createMany({
        data: generateInstallments({
          totalAmount: data.totalAmount,
          installmentQty: data.installmentQty,
          startMonth: data.startMonth,
          startYear: data.startYear,
          dueDay: data.dueDay,
          debitId,
        }),
      });
    }

    return { debitId };
  });
}

export async function deleteDebit(userId: string, debitId: string) {
  return await prisma.$transaction(async (tx) => {
    const debit = await tx.debit.findFirst({
      where: { id: debitId, debtor: { userId } },
      select: { id: true },
    });

    if (!debit) throw new DebitError("Débito não encontrado");

    const payments = await tx.payment.count({
      where: { installment: { debitId } },
    });

    if (payments > 0) {
      throw new DebitError("Este débito tem pagamentos. Desfaça os pagamentos para excluir");
    }

    await tx.installment.deleteMany({ where: { debitId } });
    await tx.debit.delete({ where: { id: debitId } });

    return { debitId };
  });
}
