import { InstallmentStatus, Prisma } from "@prisma/client";
import { sumPayments } from "@/core/payment/payment-calculator";
import { ReportInstallment, toMonthKey } from "@/core/report/report-calculator";
import {
    formatCurrency,
    formatDateShortPt,
    formatMonthPt,
    getTodayDateKey,
} from "@/lib/utils";

const BRAZIL_COUNTRY_CODE = "55";

interface ChargeItem {
    id: string;
    description: string;
    installmentNumber: number;
    installmentQty: number;
    dueDate: Date;
    amount: number;
    remaining: number;
}

const byDueDate = (a: ChargeItem, b: ChargeItem) =>
    a.dueDate.getTime() - b.dueDate.getTime() ||
    a.description.localeCompare(b.description, "pt-BR");

// "Em atraso" são só os meses anteriores: uma parcela deste mês fica no bloco do
// mês mesmo com o dia vencido, para ele bater com a lista "A cobrar" do relatório.
export function buildCharge(installments: ReportInstallment[], now = new Date()) {
    const month = getTodayDateKey(now).slice(0, 7);
    const overdue: ChargeItem[] = [];
    const current: ChargeItem[] = [];
    let total = new Prisma.Decimal(0);

    for (const installment of installments) {
        if (installment.status === InstallmentStatus.CANCELLED) continue;

        const dueMonth = toMonthKey(installment.dueDate);
        const remaining = installment.amount.minus(sumPayments(installment.payments));

        if (dueMonth > month || !remaining.greaterThan(0)) continue;

        const target = dueMonth < month ? overdue : current;
        target.push({
            id: installment.id,
            description: installment.description,
            installmentNumber: installment.installmentNumber,
            installmentQty: installment.installmentQty,
            dueDate: installment.dueDate,
            amount: installment.amount.toNumber(),
            remaining: remaining.toNumber(),
        });
        total = total.plus(remaining);
    }

    return {
        month,
        overdue: overdue.sort(byDueDate),
        current: current.sort(byDueDate),
        total: total.toNumber(),
    };
}

export type Charge = ReturnType<typeof buildCharge>;

function formatItem(item: ChargeItem, dueLabel: string) {
    const value =
        item.remaining < item.amount
            ? `${formatCurrency(item.remaining)} (restante de ${formatCurrency(item.amount)})`
            : formatCurrency(item.remaining);

    return `• ${item.description.trim()} (${item.installmentNumber}/${item.installmentQty}) — ${dueLabel} ${formatDateShortPt(item.dueDate)} — ${value}`;
}

export function buildChargeMessage(debtorName: string, charge: Charge) {
    const currentLines = charge.current.map((item) => formatItem(item, "vence"));
    const overdueLines = charge.overdue.map((item) => formatItem(item, "venceu"));

    const blocks =
        overdueLines.length > 0
            ? [
                  ["Em atraso:", ...overdueLines].join("\n"),
                  ...(currentLines.length > 0
                      ? [["Deste mês:", ...currentLines].join("\n")]
                      : []),
              ]
            : [currentLines.join("\n")];

    return [
        `Olá, ${debtorName}! Segue a cobrança de ${formatMonthPt(charge.month, "long")}:`,
        ...blocks,
        `Total a pagar: ${formatCurrency(charge.total)}`,
    ].join("\n\n");
}

// O telefone é texto livre no cadastro, então só vira link quando dá para
// reconhecer o número completo: DDD + número, com ou sem o código do país.
function toWhatsAppNumber(phone: string) {
    const digits = phone.replace(/\D/g, "");

    if (digits.length === 10 || digits.length === 11) {
        return `${BRAZIL_COUNTRY_CODE}${digits}`;
    }

    const hasCountryCode =
        (digits.length === 12 || digits.length === 13) &&
        digits.startsWith(BRAZIL_COUNTRY_CODE);

    return hasCountryCode ? digits : null;
}

export function buildWhatsAppUrl(phone: string | null, message: string) {
    const number = toWhatsAppNumber(phone ?? "");

    return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : null;
}
