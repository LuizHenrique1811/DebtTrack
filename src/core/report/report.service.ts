import { prisma } from "@/lib/prisma";
import { buildReport } from "@/core/report/report-calculator";

export async function getReport(userId: string) {
    const installments = await prisma.installment.findMany({
        where: {
            debit: {
                debtor: {
                    userId,
                },
            },
        },
        select: {
            id: true,
            amount: true,
            dueDate: true,
            status: true,
            installmentNumber: true,
            debit: {
                select: {
                    description: true,
                    installmentQty: true,
                    debtor: { select: { id: true, name: true } },
                },
            },
            payments: { select: { amount: true, paymentDate: true } },
        },
    });

    return buildReport(
        installments.map(({ debit, ...installment }) => ({
            ...installment,
            description: debit.description,
            installmentQty: debit.installmentQty,
            debtorId: debit.debtor.id,
            debtorName: debit.debtor.name,
        })),
    );
}
