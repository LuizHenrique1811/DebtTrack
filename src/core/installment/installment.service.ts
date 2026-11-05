import { prisma } from "@/lib/prisma";
import { getEffectiveStatus } from "@/core/installment/installment-status";
import { sumPayments } from "@/core/payment/payment.service";

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
            payments: {
                select: { id: true, amount: true, paymentDate: true },
                orderBy: { paymentDate: "desc" },
            },
        },
        orderBy: [{ dueDate: "asc" }, { installmentNumber: "asc" }],
    });

    return installments.map((installment) => {
        const paidAmount = sumPayments(installment.payments);

        return {
            id: installment.id,
            description: installment.debit.description,
            amount: installment.amount.toNumber(),
            paidAmount: paidAmount.toNumber(),
            remainingAmount: installment.amount.minus(paidAmount).toNumber(),
            dueDate: installment.dueDate,
            paidDate: installment.paidDate,
            status: getEffectiveStatus(installment),
            payments: installment.payments.map((payment) => ({
                id: payment.id,
                amount: payment.amount.toNumber(),
                paymentDate: payment.paymentDate,
            })),
        };
    });
}

export type InstallmentView = Awaited<ReturnType<typeof getInstallments>>[number];

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