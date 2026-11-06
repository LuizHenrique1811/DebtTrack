import { prisma } from "@/lib/prisma";
import { buildReport } from "@/core/report/report-calculator";

export async function listReportInstallments(userId: string, debtorId?: string) {
    const installments = await prisma.installment.findMany({
        where: {
            debit: {
                debtor: {
                    userId,
                    id: debtorId,
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

    return installments.map(({ debit, ...installment }) => ({
        ...installment,
        description: debit.description,
        installmentQty: debit.installmentQty,
        debtorId: debit.debtor.id,
        debtorName: debit.debtor.name,
    }));
}

export async function getReport(userId: string) {
    return buildReport(await listReportInstallments(userId));
}
