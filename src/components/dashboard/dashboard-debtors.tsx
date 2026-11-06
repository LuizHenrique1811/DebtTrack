import { AlertTriangle } from "lucide-react";
import type { Dashboard } from "@/core/dashboard/dashboard-calculator";
import { formatCurrency } from "@/lib/utils";

function DebtorRow({ debtor }: { debtor: Dashboard["debtors"][number] }) {
    const receivedShare = Math.round((debtor.received / debtor.total) * 100);

    return (
        <li className="border-b border-zinc-200 py-2 first:pt-0 last:border-b-0 last:pb-0 dark:border-zinc-800">
            <div className="flex items-center gap-2">
                <p className="min-w-0 truncate font-semibold text-zinc-900 dark:text-zinc-50" title={debtor.name}>
                    {debtor.name}
                </p>
                {debtor.overdue > 0 ? (
                    <span title={`${formatCurrency(debtor.overdue)} em atraso`} className="shrink-0">
                        <AlertTriangle className="h-4 w-4 text-[#d03b3b]" aria-hidden />
                        <span className="sr-only">{formatCurrency(debtor.overdue)} em atraso</span>
                    </span>
                ) : null}
                <p className="ml-auto shrink-0 font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                    {formatCurrency(debtor.remaining)}
                </p>
            </div>
            <div
                role="meter"
                aria-label={`Recebido de ${debtor.name}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={receivedShare}
                className="mt-1.5 h-1.5 overflow-hidden rounded bg-[#d6e6f8] dark:bg-[#1f3a5c]"
            >
                <div
                    className="h-full rounded bg-[#2a78d6] dark:bg-[#3987e5]"
                    style={{ width: `${receivedShare}%` }}
                />
            </div>
        </li>
    );
}

export function DashboardDebtors({ debtors }: { debtors: Dashboard["debtors"] }) {
    const hasOverdue = debtors.some((debtor) => debtor.overdue > 0);

    return (
        <section className="min-w-0 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Saldos em aberto</h2>
                {hasOverdue ? (
                    <p className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                        <AlertTriangle className="h-4 w-4 shrink-0 text-[#d03b3b]" aria-hidden />
                        Em atraso
                    </p>
                ) : null}
            </div>
            <ul>
                {debtors.map((debtor) => (
                    <DebtorRow key={debtor.id} debtor={debtor} />
                ))}
            </ul>
        </section>
    );
}
