import { AlertTriangle } from "lucide-react";
import type { Report } from "@/core/report/report-calculator";
import { formatCurrency } from "@/lib/utils";

function DebtorRow({ debtor }: { debtor: Report["debtors"][number] }) {
    const receivedShare = Math.round((debtor.received / debtor.total) * 100);

    return (
        <li className="border-b border-zinc-200 py-4 first:pt-0 last:border-b-0 last:pb-0 dark:border-zinc-800">
            <div className="flex items-baseline justify-between gap-3">
                <h3 className="min-w-0 truncate font-semibold text-zinc-900 dark:text-zinc-50" title={debtor.name}>
                    {debtor.name}
                </h3>
                <p className="shrink-0 text-sm text-zinc-600 dark:text-zinc-400">
                    {debtor.remaining > 0 ? (
                        <>
                            Falta{" "}
                            <span className="font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                                {formatCurrency(debtor.remaining)}
                            </span>
                        </>
                    ) : (
                        "Quitado"
                    )}
                </p>
            </div>
            <div
                role="meter"
                aria-label={`Recebido de ${debtor.name}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={receivedShare}
                className="mt-2 h-2 overflow-hidden rounded bg-[#d6e6f8] dark:bg-[#1f3a5c]"
            >
                <div
                    className="h-full rounded bg-[#2a78d6] dark:bg-[#3987e5]"
                    style={{ width: `${receivedShare}%` }}
                />
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                <p className="tabular-nums">
                    {formatCurrency(debtor.received)} de {formatCurrency(debtor.total)} recebidos
                </p>
                {debtor.overdue > 0 ? (
                    <p className="flex items-center gap-1.5 tabular-nums">
                        <AlertTriangle className="h-4 w-4 shrink-0 text-[#d03b3b]" aria-hidden />
                        {formatCurrency(debtor.overdue)} em atraso
                    </p>
                ) : null}
            </div>
        </li>
    );
}

export function ReportByDebtor({ debtors }: { debtors: Report["debtors"] }) {
    return (
        <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">Por devedor</h2>
            <ul>
                {debtors.map((debtor) => (
                    <DebtorRow key={debtor.id} debtor={debtor} />
                ))}
            </ul>
        </section>
    );
}
