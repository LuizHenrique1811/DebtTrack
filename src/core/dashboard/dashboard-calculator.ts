import { InstallmentStatus, Prisma } from "@prisma/client";
import { getEffectiveStatus } from "@/core/installment/installment-status";
import { sumPayments } from "@/core/payment/payment-calculator";
import { buildReport, ReportInstallment } from "@/core/report/report-calculator";
import { getTodayDateKey } from "@/lib/utils";

const UPCOMING_DAYS = 7;
const LIST_LIMIT = 5;
const MS_PER_DAY = 86_400_000;
const ZERO = new Prisma.Decimal(0);

interface DashboardItem extends Pick<
    ReportInstallment,
    "id" | "debtorName" | "description" | "installmentNumber" | "installmentQty" | "dueDate"
> {
    days: number;
    remaining: Prisma.Decimal;
}

const toDayNumber = (dateKey: string) => Date.parse(`${dateKey}T00:00:00.000Z`) / MS_PER_DAY;

function getDaysUntilDue(dueDate: Date, todayKey: string) {
    return toDayNumber(dueDate.toISOString().slice(0, 10)) - toDayNumber(todayKey);
}

// A lista mostra só as primeiras parcelas, mas os totais consideram todas.
function summarize(items: DashboardItem[]) {
    return {
        total: items.reduce((total, item) => total.plus(item.remaining), ZERO).toNumber(),
        count: items.length,
        installments: items.slice(0, LIST_LIMIT).map((item) => ({
            ...item,
            remaining: item.remaining.toNumber(),
        })),
    };
}

export function buildDashboard(installments: ReportInstallment[], now = new Date()) {
    const report = buildReport(installments, now);
    const todayKey = getTodayDateKey(now);
    const overdue: DashboardItem[] = [];
    const upcoming: DashboardItem[] = [];

    for (const installment of installments) {
        const { status, amount, payments, dueDate } = installment;
        if (status === InstallmentStatus.CANCELLED || status === InstallmentStatus.PAID) continue;

        const remaining = amount.minus(sumPayments(payments));
        if (!remaining.greaterThan(0)) continue;

        const daysUntilDue = getDaysUntilDue(dueDate, todayKey);
        const item = {
            id: installment.id,
            debtorName: installment.debtorName,
            description: installment.description,
            installmentNumber: installment.installmentNumber,
            installmentQty: installment.installmentQty,
            dueDate,
            remaining,
        };

        if (getEffectiveStatus(installment, now) === InstallmentStatus.OVERDUE) {
            overdue.push({ ...item, days: -daysUntilDue });
        } else if (daysUntilDue <= UPCOMING_DAYS) {
            upcoming.push({ ...item, days: daysUntilDue });
        }
    }

    const byDueDate = (a: DashboardItem, b: DashboardItem) =>
        a.dueDate.getTime() - b.dueDate.getTime() ||
        a.debtorName.localeCompare(b.debtorName, "pt-BR");

    return {
        summary: report.summary,
        currentMonth: report.months.find((month) => month.isCurrent)!,
        months: report.months,
        overdue: summarize(overdue.sort(byDueDate)),
        upcoming: summarize(upcoming.sort(byDueDate)),
        debtors: report.debtors.filter((debtor) => debtor.remaining > 0).slice(0, LIST_LIMIT),
    };
}

export type Dashboard = ReturnType<typeof buildDashboard>;
