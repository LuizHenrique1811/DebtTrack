import { ChevronRight } from "lucide-react";
import type { Report } from "@/core/report/report-calculator";
import { formatCurrency, formatMonthPt } from "@/lib/utils";

type Debtor = Report["collection"]["debtors"][number];
type Installment = Debtor["installments"][number];

function formatDueDate(month: string, dueDay: number) {
    const [year, monthNumber] = month.split("-");

    return `${String(dueDay).padStart(2, "0")}/${monthNumber}/${year}`;
}

// Colunas a partir de telas médias, compartilhadas com o cabeçalho.
const DETAIL_COLUMNS = "sm:grid-cols-[6rem_minmax(0,1fr)_7rem]";

function InstallmentRow({ installment, month }: { installment: Installment; month: string }) {
    const isPartiallyPaid = installment.remaining < installment.amount;

    return (
        <li
            className={`grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 border-t border-zinc-200 py-2 dark:border-zinc-800 ${DETAIL_COLUMNS}`}
        >
            <p className="tabular-nums">
                <span className="sm:hidden">Vence em </span>
                {formatDueDate(month, installment.dueDay)}
            </p>
            <p className="order-3 col-span-2 min-w-0 sm:order-none sm:col-span-1">
                {installment.description} · Parcela {installment.installmentNumber} de{" "}
                {installment.installmentQty}
            </p>
            <div className="text-right tabular-nums">
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

function CollectionDebtor({ debtor, month }: { debtor: Debtor; month: string }) {
    return (
        <li className="border-b border-zinc-200 last:border-b-0 dark:border-zinc-800">
            <details className="group">
                <summary className="flex cursor-pointer list-none items-center gap-2 rounded py-3 outline-none hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-zinc-400 dark:hover:bg-zinc-800/50 [&::-webkit-details-marker]:hidden">
                    <ChevronRight
                        className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-open:rotate-90 dark:text-zinc-400"
                        aria-hidden
                    />
                    <span className="min-w-0 flex-1 truncate font-semibold text-zinc-900 dark:text-zinc-50">
                        {debtor.name}
                    </span>
                    <span className="shrink-0 font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                        {formatCurrency(debtor.total)}
                    </span>
                </summary>
                <div className="mb-3 ml-6 text-sm text-zinc-600 dark:text-zinc-400">
                    <div className={`hidden gap-x-3 pb-2 font-medium sm:grid ${DETAIL_COLUMNS}`} aria-hidden>
                        <span>Vencimento</span>
                        <span>Parcela</span>
                        <span className="text-right">Valor</span>
                    </div>
                    <ul>
                        {debtor.installments.map((installment) => (
                            <InstallmentRow key={installment.id} installment={installment} month={month} />
                        ))}
                    </ul>
                </div>
            </details>
        </li>
    );
}

export function ReportCollection({ collection }: { collection: Report["collection"] }) {
    const monthName = formatMonthPt(collection.month, "long");

    return (
        <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
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
                        <CollectionDebtor key={debtor.id} debtor={debtor} month={collection.month} />
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
