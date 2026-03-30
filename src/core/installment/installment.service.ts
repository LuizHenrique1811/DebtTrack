import { prisma } from "@/lib/prisma";

export async function getInstallments(userId: string) {
    const installments = await prisma.installment.findMany({
        where: {
            debit: {
                debtor: {
                    userId,
                },
            },
        },
        include: {
            debit: true,
        },
    });
    return installments;
}

export async function getInstallmentByMonth(userId: string, month: number) {
    const installments = await prisma.installment.findMany({
        where: {
            debit: {
                debtor: {
                    userId,
                },
            },
            dueDate: {
                gte: new Date(new Date().getFullYear(), month - 1, 1),
                lte: new Date(new Date().getFullYear(), month, 0),
            },
        },
    });
}