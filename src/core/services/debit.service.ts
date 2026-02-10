import { prisma } from "@/lib/prisma";
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

    const debtorOwner = await prisma.debtor.findUnique({
        where: {
            id: data.debtorId,
            userId: userId,
        }
    });

    if (!debtorOwner) {
        throw new Error("Devedor não encontrado");
    }

    const debit = await prisma.debit.create({
        data: {
            description: data.description,
            totalAmount: data.totalAmount,
            installmentQty: data.installmentQty,
            startDate: data.startDate,
            dueDay: data.dueDay,

            debtorId: data.debtorId,
            accountId: data.accountId,
        }
    });

    const installments = await prisma.installment.createMany({
        data: Array.from({ length: data.installmentQty }, (_, index) => ({
            debitId: debit.id,
            amount: data.totalAmount / data.installmentQty,
            dueDate: new Date(data.startDate.setMonth(data.startDate.getMonth() + index)),
        })),
    });

    return { success: true };
}