"use client";

import type { InstallmentStatus } from "@prisma/client";
import { Banknote, Calendar } from "lucide-react";
import { PaymentDialog } from "@/components/payment/payment-dialog";
import type { InstallmentView } from "@/core/installment/installment.service";
import { formatCurrency, formatDatePt } from "@/lib/utils";

const statusLabels: Record<InstallmentStatus, string> = {
    PENDING: "Pendente",
    PAID: "Paga",
    PARTIALLY_PAID: "Parcialmente paga",
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

export function InstallmentCard({ installment }: { installment: InstallmentView }) {
    const { status, paidAmount, remainingAmount } = installment;
    const canReceivePayment = status !== "PAID" && status !== "CANCELLED";

    return (
        <article className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                    <Banknote className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                            {installment.description}
                        </h3>
                        <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusClassName[status]}`}
                        >
                            {statusLabels[status]}
                        </span>
                    </div>
                    <p className="mt-1 text-lg font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                        {formatCurrency(installment.amount)}
                    </p>
                    {paidAmount > 0 && remainingAmount > 0 ? (
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                            Recebido {formatCurrency(paidAmount)} · Falta {formatCurrency(remainingAmount)}
                        </p>
                    ) : null}
                    <p className="mt-2 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span>
                            Vence em {formatDatePt(installment.dueDate)}
                        </span>
                    </p>
                    {installment.paidDate ? (
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                            Paga em {formatDatePt(installment.paidDate)}
                        </p>
                    ) : null}
                </div>
            </div>
            {canReceivePayment ? (
                <PaymentDialog installmentId={installment.id} remainingAmount={remainingAmount} />
            ) : null}
        </article>
    );
}
