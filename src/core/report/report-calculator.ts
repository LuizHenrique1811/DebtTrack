import { InstallmentStatus, Prisma } from "@prisma/client";
import { getEffectiveStatus } from "@/core/installment/installment-status";
import { sumPayments } from "@/core/payment/payment-calculator";
import { getTodayDateKey } from "@/lib/utils";

const MONTHS_BEFORE = 5;
const MONTHS_AFTER = 6;
const ZERO = new Prisma.Decimal(0);

export interface ReportInstallment {
    amount: Prisma.Decimal;
    dueDate: Date;
    status: InstallmentStatus;
    debtorId: string;
    debtorName: string;
    payments: { amount: Prisma.Decimal; paymentDate: Date }[];
}

function getMonthKeys(todayKey: string) {
    const [year, month] = todayKey.split("-").map(Number);

    return Array.from({ length: MONTHS_BEFORE + 1 + MONTHS_AFTER }, (_, index) =>
        new Date(Date.UTC(year, month - 1 - MONTHS_BEFORE + index, 1))
            .toISOString()
            .slice(0, 7),
    );
}

const toMonthKey = (date: Date) => date.toISOString().slice(0, 7);

export function buildReport(installments: ReportInstallment[], now = new Date()) {
    const todayKey = getTodayDateKey(now);
    const currentMonth = todayKey.slice(0, 7);

    const months = new Map(
        getMonthKeys(todayKey).map((key) => [key, { expected: ZERO, received: ZERO }]),
    );
    const debtors = new Map<
        string,
        { id: string; name: string; total: Prisma.Decimal; received: Prisma.Decimal; overdue: Prisma.Decimal }
    >();

    let total = ZERO;
    let received = ZERO;
    let overdue = ZERO;
    let overdueCount = 0;

    for (const installment of installments) {
        if (installment.status === InstallmentStatus.CANCELLED) continue;

        const paid = sumPayments(installment.payments);
        const isOverdue = getEffectiveStatus(installment, now) === InstallmentStatus.OVERDUE;
        const overdueAmount = isOverdue ? installment.amount.minus(paid) : ZERO;

        total = total.plus(installment.amount);
        received = received.plus(paid);
        overdue = overdue.plus(overdueAmount);
        overdueCount += isOverdue ? 1 : 0;

        const debtor = debtors.get(installment.debtorId) ?? {
            id: installment.debtorId,
            name: installment.debtorName,
            total: ZERO,
            received: ZERO,
            overdue: ZERO,
        };
        debtors.set(installment.debtorId, {
            ...debtor,
            total: debtor.total.plus(installment.amount),
            received: debtor.received.plus(paid),
            overdue: debtor.overdue.plus(overdueAmount),
        });

        const dueMonth = months.get(toMonthKey(installment.dueDate));
        if (dueMonth) {
            dueMonth.expected = dueMonth.expected.plus(installment.amount);
        }

        for (const payment of installment.payments) {
            const paymentMonth = months.get(toMonthKey(payment.paymentDate));
            if (paymentMonth) {
                paymentMonth.received = paymentMonth.received.plus(payment.amount);
            }
        }
    }

    return {
        summary: {
            total: total.toNumber(),
            received: received.toNumber(),
            remaining: total.minus(received).toNumber(),
            overdue: overdue.toNumber(),
            overdueCount,
        },
        debtors: [...debtors.values()]
            .map((debtor) => ({
                id: debtor.id,
                name: debtor.name,
                total: debtor.total.toNumber(),
                received: debtor.received.toNumber(),
                remaining: debtor.total.minus(debtor.received).toNumber(),
                overdue: debtor.overdue.toNumber(),
            }))
            .sort(
                (a, b) =>
                    b.overdue - a.overdue ||
                    b.remaining - a.remaining ||
                    a.name.localeCompare(b.name, "pt-BR"),
            ),
        months: [...months.entries()].map(([key, month]) => ({
            key,
            expected: month.expected.toNumber(),
            received: month.received.toNumber(),
            isCurrent: key === currentMonth,
        })),
    };
}

export type Report = ReturnType<typeof buildReport>;
