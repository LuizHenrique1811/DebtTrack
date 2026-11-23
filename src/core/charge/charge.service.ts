import { prisma } from "@/lib/prisma";
import {
    buildCharge,
    buildChargeMessage,
    buildWhatsAppUrl,
} from "@/core/charge/charge-calculator";
import { getPeriodLabel, type ChargeFilters } from "@/core/charge/charge-filter";
import {
    buildPeriodChargeMessage,
    buildPeriodCharges,
    summarizePeriodCharges,
} from "@/core/charge/period-charge-calculator";
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

export async function getPeriodCharges(userId: string, filters: ChargeFilters, now = new Date()) {
    const [debtors, installments] = await Promise.all([
        prisma.debtor.findMany({
            where: { userId },
            select: { id: true, name: true, phone: true },
            orderBy: { name: "asc" },
        }),
        listReportInstallments(userId),
    ]);

    const phones = new Map(debtors.map((debtor) => [debtor.id, debtor.phone]));
    const charges = buildPeriodCharges(installments, filters, now);

    return {
        debtors: debtors.map(({ id, name }) => ({ id, name })),
        periodLabel: getPeriodLabel(filters, now),
        summary: summarizePeriodCharges(charges),
        charges: charges.map((charge) => ({
            ...charge,
            phone: phones.get(charge.debtorId) ?? null,
            message: buildPeriodChargeMessage(charge, filters, now),
        })),
    };
}

export type PeriodChargesResult = Awaited<ReturnType<typeof getPeriodCharges>>;
