"use client";

import type { InstallmentStatus } from "@prisma/client";
import { PaymentDialog } from "@/components/payment/payment-dialog";
import { PaymentHistoryDialog } from "@/components/payment/payment-history-dialog";
import type { InstallmentView } from "@/core/installment/installment.service";
import { formatCurrency, formatDateShortPt } from "@/lib/utils";

const statusLabels: Record<InstallmentStatus, string> = {
    PENDING: "Pendente",
    PAID: "Paga",
    PARTIALLY_PAID: "Parcial",
    OVERDUE: "Atrasada",
    CANCELLED: "Cancelada",
};

const statusClassName: Record<InstallmentStatus, string> = {
    PENDING:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    PAID: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    PARTIALLY_PAID:
        "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
    OVERDUE: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
    CANCELLED:
        "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
};

// Colunas no desktop, compartilhadas com o cabeçalho da lista.
export const ROW_COLUMNS =
    "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)_6.5rem_6rem_7.5rem_6rem_11rem]";

export function InstallmentRow({ installment }: { installment: InstallmentView }) {
    const { status, paidAmount, remainingAmount, payments } = installment;
    const canReceivePayment = status !== "PAID" && status !== "CANCELLED";
    const isPartiallyPaid = paidAmount > 0 && remainingAmount > 0;

    return (
        <li
            className={`grid grid-cols-2 items-center gap-x-4 gap-y-1 border-b border-zinc-200 py-4 last:border-b-0 dark:border-zinc-800 ${ROW_COLUMNS}`}
        >
            <p
                className="order-1 min-w-0 truncate font-semibold text-zinc-900 dark:text-zinc-50 lg:order-none"
                title={installment.debtorName}
            >
                {installment.debtorName}
            </p>
            <p
                className="order-3 min-w-0 truncate text-sm text-zinc-600 dark:text-zinc-400 lg:order-none"
                title={installment.description}
            >
                {installment.description}
            </p>
            <p className="order-4 text-right text-sm text-zinc-600 dark:text-zinc-400 lg:order-none lg:text-left">
                Parcela {installment.installmentNumber} de {installment.installmentQty}
            </p>
            <p className="order-5 text-sm tabular-nums text-zinc-600 dark:text-zinc-400 lg:order-none">
                <span className="lg:hidden">Vence em </span>
                {formatDateShortPt(installment.dueDate)}
            </p>
            <div className="order-2 text-right tabular-nums lg:order-none">
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {formatCurrency(installment.amount)}
                </p>
                {isPartiallyPaid ? (
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        Falta {formatCurrency(remainingAmount)}
                    </p>
                ) : null}
            </div>
            <div className="order-6 text-right lg:order-none lg:text-left">
                <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusClassName[status]}`}
                >
                    {statusLabels[status]}
                </span>
                {installment.paidDate ? (
                    <p className="mt-0.5 text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
                        {formatDateShortPt(installment.paidDate)}
                    </p>
                ) : null}
            </div>
            <div className="order-7 col-span-2 mt-2 flex items-center justify-end gap-3 lg:order-none lg:col-span-1 lg:mt-0 lg:flex-col lg:items-end lg:gap-1.5">
                {canReceivePayment ? (
                    <PaymentDialog installmentId={installment.id} remainingAmount={remainingAmount} />
                ) : null}
                {payments.length > 0 ? <PaymentHistoryDialog payments={payments} /> : null}
            </div>
        </li>
    );
}
