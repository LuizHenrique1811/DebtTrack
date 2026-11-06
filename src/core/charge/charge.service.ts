import { prisma } from "@/lib/prisma";
import {
    buildCharge,
    buildChargeMessage,
    buildWhatsAppUrl,
} from "@/core/charge/charge-calculator";
import { listReportInstallments } from "@/core/report/report.service";

export async function getDebtorCharge(userId: string, debtorId: string) {
    const debtor = await prisma.debtor.findFirst({
        where: { id: debtorId, userId },
        select: { name: true, phone: true },
    });

    if (!debtor) return null;

    const charge = buildCharge(await listReportInstallments(userId, debtorId));
    const message = buildChargeMessage(debtor.name, charge);

    return {
        total: charge.total,
        message,
        whatsAppUrl: buildWhatsAppUrl(debtor.phone, message),
    };
}
