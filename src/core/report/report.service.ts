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
            amount: true,
            dueDate: true,
            status: true,
            debit: { select: { debtor: { select: { id: true, name: true } } } },
            payments: { select: { amount: true, paymentDate: true } },
        },
    });

    return buildReport(
        installments.map(({ debit, ...installment }) => ({
            ...installment,
            debtorId: debit.debtor.id,
            debtorName: debit.debtor.name,
        })),
    );
}
