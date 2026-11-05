import { AlertTriangle } from "lucide-react";
import type { Report } from "@/core/report/report-calculator";
import { formatCurrency, formatMonthPt } from "@/lib/utils";

type Debtor = Report["collection"]["debtors"][number];
type Installment = Debtor["installments"][number];

function CollectionItem({ installment }: { installment: Installment }) {
    const isPartiallyPaid = installment.remaining < installment.amount;

    return (
        <li className="flex items-start justify-between gap-3 py-1.5 text-sm">
            <div className="min-w-0 text-zinc-600 dark:text-zinc-400">
                <p className="truncate" title={installment.description}>
                    {installment.description}
                </p>
                <p className="flex flex-wrap items-center gap-x-2">
                    <span>
                        Dia {String(installment.dueDay).padStart(2, "0")} · Parcela{" "}
                        {installment.installmentNumber} de {installment.installmentQty}
                    </span>
                    {installment.isOverdue ? (
                        <span className="flex items-center gap-1">
                            <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-[#d03b3b]" aria-hidden />
                            Atrasada
                        </span>
                    ) : null}
                </p>
            </div>
            <div className="shrink-0 text-right tabular-nums">
                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                    {formatCurrency(installment.remaining)}
                </p>
                {isPartiallyPaid ? (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        de {formatCurrency(installment.amount)}
                    </p>
                ) : null}
            </div>
        </li>
    );
}

function CollectionDebtor({ debtor }: { debtor: Debtor }) {
    return (
        <li className="border-b border-zinc-200 py-4 first:pt-0 last:border-b-0 last:pb-0 dark:border-zinc-800">
            <div className="flex items-baseline justify-between gap-3">
                <h3 className="min-w-0 truncate font-semibold text-zinc-900 dark:text-zinc-50" title={debtor.name}>
                    {debtor.name}
                </h3>
                <p className="shrink-0 font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                    {formatCurrency(debtor.total)}
                </p>
            </div>
            <ul className="mt-1">
                {debtor.installments.map((installment) => (
                    <CollectionItem key={installment.id} installment={installment} />
                ))}
            </ul>
        </li>
    );
}

export function ReportCollection({ collection }: { collection: Report["collection"] }) {
    const monthName = formatMonthPt(collection.month, "long");

    return (
        <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    A cobrar em {monthName}
                </h2>
                {collection.debtors.length > 0 ? (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Total{" "}
                        <span className="text-lg font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                            {formatCurrency(collection.total)}
                        </span>
                    </p>
                ) : null}
            </div>
            {collection.debtors.length > 0 ? (
                <ul>
                    {collection.debtors.map((debtor) => (
                        <CollectionDebtor key={debtor.id} debtor={debtor} />
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Nenhuma parcela a cobrar neste mês.
                </p>
            )}
        </section>
    );
}
