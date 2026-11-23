import type { PeriodChargesResult } from "@/core/charge/charge.service";
import { cn, formatCurrency } from "@/lib/utils";

export function ChargeSummary({ summary }: { summary: PeriodChargesResult["summary"] }) {
    const tiles = [
        { label: "A pagar", value: formatCurrency(summary.total), isAlert: false },
        { label: "Em atraso", value: formatCurrency(summary.overdue), isAlert: summary.overdue > 0 },
        { label: "Pago no período", value: formatCurrency(summary.paid), isAlert: false },
        { label: "Parcelas", value: String(summary.count), isAlert: false },
    ];

    return (
        <dl className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            {tiles.map((tile) => (
                <div
                    key={tile.label}
                    className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5 dark:border-zinc-800 dark:bg-zinc-900"
                >
                    <dt className="text-sm text-zinc-600 dark:text-zinc-400">{tile.label}</dt>
                    <dd
                        className={cn(
                            "mt-1 text-lg font-semibold tabular-nums sm:text-xl",
                            tile.isAlert ? "text-red-600 dark:text-red-400" : "text-zinc-900 dark:text-zinc-50",
                        )}
                    >
                        {tile.value}
                    </dd>
                </div>
            ))}
        </dl>
    );
}
