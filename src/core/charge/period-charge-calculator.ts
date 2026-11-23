import { InstallmentStatus } from "@prisma/client";
import { formatChargeItem, type ChargeItem } from "@/core/charge/charge-calculator";
import { getPeriodLabel, resolvePeriod, type ChargeFilters } from "@/core/charge/charge-filter";
import { sumPayments } from "@/core/payment/payment-calculator";
import type { ReportInstallment } from "@/core/report/report-calculator";
import { formatCurrency, getTodayDateKey, matchesSearch } from "@/lib/utils";

export interface PeriodCharge {
    debtorId: string;
    debtorName: string;
    overdue: ChargeItem[];
    open: ChargeItem[];
    paid: ChargeItem[];
    // Quanto falta pagar entre atrasadas e em aberto.
    total: number;
    paidTotal: number;
}

const byDueDate = (a: ChargeItem, b: ChargeItem) =>
    a.dueDate.getTime() - b.dueDate.getTime() ||
    a.description.localeCompare(b.description, "pt-BR");

// Soma em centavos para não acumular erro de ponto flutuante.
const sumCents = (values: number[]) =>
    values.reduce((total, value) => total + Math.round(value * 100), 0) / 100;

export function buildPeriodCharges(
    installments: ReportInstallment[],
    filters: ChargeFilters,
    now = new Date(),
): PeriodCharge[] {
    const { today, range } = resolvePeriod(filters, now);
    const showOpen = filters.status !== "PAID";
    const showPaid = filters.status !== "OPEN";
    const showOverdue = showOpen && (filters.includeOverdue || !range);
    const debtorIds = new Set(filters.debtorIds);
    const charges = new Map<string, PeriodCharge>();

    for (const installment of installments) {
        if (installment.status === InstallmentStatus.CANCELLED) continue;
        if (debtorIds.size > 0 && !debtorIds.has(installment.debtorId)) continue;
        if (filters.search && !matchesSearch(installment.description, filters.search)) continue;

        const dueKey = installment.dueDate.toISOString().slice(0, 10);
        const remaining = installment.amount.minus(sumPayments(installment.payments));
        const isPaid = !remaining.greaterThan(0);
        const inRange = range !== null && dueKey >= range.from && dueKey <= range.to;
        // Atrasada é o que venceu antes de hoje e antes do período escolhido;
        // o que vence dentro do período fica no bloco do período.
        const isOverdue = !isPaid && !inRange && dueKey < today && (!range || dueKey < range.from);

        const block =
            isPaid && inRange && showPaid
                ? "paid"
                : !isPaid && inRange && showOpen
                  ? "open"
                  : isOverdue && showOverdue
                    ? "overdue"
                    : null;

        if (!block) continue;

        const charge = charges.get(installment.debtorId) ?? {
            debtorId: installment.debtorId,
            debtorName: installment.debtorName,
            overdue: [],
            open: [],
            paid: [],
            total: 0,
            paidTotal: 0,
        };

        charge[block].push({
            id: installment.id,
            description: installment.description,
            installmentNumber: installment.installmentNumber,
            installmentQty: installment.installmentQty,
            dueDate: installment.dueDate,
            amount: installment.amount.toNumber(),
            remaining: isPaid ? 0 : remaining.toNumber(),
        });
        charges.set(installment.debtorId, charge);
    }

    return [...charges.values()]
        .map((charge) => ({
            ...charge,
            overdue: charge.overdue.sort(byDueDate),
            open: charge.open.sort(byDueDate),
            paid: charge.paid.sort(byDueDate),
            total: sumCents([...charge.overdue, ...charge.open].map((item) => item.remaining)),
            paidTotal: sumCents(charge.paid.map((item) => item.amount)),
        }))
        .sort((a, b) => a.debtorName.localeCompare(b.debtorName, "pt-BR"));
}

export function summarizePeriodCharges(charges: PeriodCharge[]) {
    return {
        total: sumCents(charges.map((charge) => charge.total)),
        overdue: sumCents(charges.flatMap((charge) => charge.overdue.map((item) => item.remaining))),
        paid: sumCents(charges.map((charge) => charge.paidTotal)),
        count: charges.reduce(
            (count, charge) => count + charge.overdue.length + charge.open.length + charge.paid.length,
            0,
        ),
    };
}

function formatPaidItem(item: ChargeItem) {
    return `• ${item.description.trim()} (${item.installmentNumber}/${item.installmentQty}) — ${formatCurrency(item.amount)}`;
}

export function buildPeriodChargeMessage(
    charge: PeriodCharge,
    filters: ChargeFilters,
    now = new Date(),
) {
    const label = getPeriodLabel(filters, now);
    const hasOpen = charge.overdue.length > 0 || charge.open.length > 0;
    const blocks: string[] = [];

    if (charge.overdue.length > 0) {
        const lines = charge.overdue.map((item) => formatChargeItem(item, "venceu"));
        // No filtro "só atrasados" o cabeçalho já diz que é atraso.
        blocks.push(filters.preset === "overdue" ? lines.join("\n") : ["Em atraso:", ...lines].join("\n"));
    }

    if (charge.open.length > 0) {
        // Um período que começa no passado pode ter parcela já vencida no bloco do período.
        const today = getTodayDateKey(now);
        const lines = charge.open.map((item) =>
            formatChargeItem(item, item.dueDate.toISOString().slice(0, 10) < today ? "venceu" : "vence"),
        );
        blocks.push(charge.overdue.length > 0 ? ["No período:", ...lines].join("\n") : lines.join("\n"));
    }

    if (charge.paid.length > 0) {
        const lines = charge.paid.map(formatPaidItem);
        blocks.push(hasOpen ? ["Já pagas:", ...lines].join("\n") : lines.join("\n"));
    }

    const greeting = !hasOpen
        ? `Olá, ${charge.debtorName}! Seguem os pagamentos ${label}:`
        : filters.preset === "overdue"
          ? `Olá, ${charge.debtorName}! Seguem suas parcelas em atraso:`
          : `Olá, ${charge.debtorName}! Seguem suas pendências ${label}:`;

    const totals = hasOpen
        ? [`Total a pagar: ${formatCurrency(charge.total)}`]
        : [`Total pago: ${formatCurrency(charge.paidTotal)}`];

    return [greeting, ...blocks, ...totals].join("\n\n");
}
