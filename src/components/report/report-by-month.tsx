import type { Report } from "@/core/report/report-calculator";
import { formatCompactCurrency, formatCurrency, formatMonthPt } from "@/lib/utils";

type Month = Report["months"][number];

const EXPECTED_COLOR = "bg-[#8f8f88] dark:bg-[#7c7c75]";
const RECEIVED_COLOR = "bg-[#2a78d6] dark:bg-[#3987e5]";

// Arredonda o topo do eixo para 1, 2 ou 5 vezes uma potência de 10.
function getChartMax(months: Month[]) {
    const highest = Math.max(...months.flatMap((month) => [month.expected, month.received]), 0);

    if (highest === 0) return 1;

    const magnitude = 10 ** Math.floor(Math.log10(highest));
    const step = [1, 2, 5, 10].find((candidate) => highest <= candidate * magnitude) ?? 10;

    return step * magnitude;
}

function getTooltipPosition(index: number, total: number) {
    if (index < 3) return "left-0";
    if (index >= total - 3) return "right-0";

    return "left-1/2 -translate-x-1/2";
}

function Column({ value, chartMax, color }: { value: number; chartMax: number; color: string }) {
    if (value === 0) {
        return <div className="w-full max-w-5" />;
    }

    return (
        <div
            className={`w-full max-w-5 rounded-t ${color}`}
            style={{ height: `${(value / chartMax) * 100}%` }}
        />
    );
}

function MonthColumn({
    month,
    chartMax,
    tooltipPosition,
}: {
    month: Month;
    chartMax: number;
    tooltipPosition: string;
}) {
    const title = formatMonthPt(month.key, "long");

    return (
        <div
            tabIndex={0}
            aria-label={`${title}: previsto ${formatCurrency(month.expected)}, recebido ${formatCurrency(month.received)}`}
            className="group relative flex h-full items-end justify-center gap-0.5 rounded-t px-px outline-none hover:bg-zinc-100/70 focus-visible:ring-2 focus-visible:ring-zinc-400 dark:hover:bg-zinc-800/50"
        >
            <Column value={month.expected} chartMax={chartMax} color={EXPECTED_COLOR} />
            <Column value={month.received} chartMax={chartMax} color={RECEIVED_COLOR} />
            <div
                role="tooltip"
                className={`pointer-events-none absolute bottom-full z-10 mb-2 hidden w-48 rounded-lg border border-zinc-200 bg-white p-3 text-sm shadow-lg group-hover:block group-focus-visible:block dark:border-zinc-700 dark:bg-zinc-800 ${tooltipPosition}`}
            >
                <p className="mb-1 font-medium text-zinc-600 dark:text-zinc-300">{title}</p>
                <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                    <span className={`h-0.5 w-3 ${EXPECTED_COLOR}`} aria-hidden />
                    <span className="font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                        {formatCurrency(month.expected)}
                    </span>
                    Previsto
                </p>
                <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                    <span className={`h-0.5 w-3 ${RECEIVED_COLOR}`} aria-hidden />
                    <span className="font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                        {formatCurrency(month.received)}
                    </span>
                    Recebido
                </p>
            </div>
        </div>
    );
}

function MonthTable({ months }: { months: Month[] }) {
    return (
        <details className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            <summary className="cursor-pointer font-medium hover:text-zinc-900 dark:hover:text-zinc-50">
                Ver em tabela
            </summary>
            <table className="mt-3 w-full text-left">
                <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800">
                        <th scope="col" className="py-2 font-medium">Mês</th>
                        <th scope="col" className="py-2 text-right font-medium">Previsto</th>
                        <th scope="col" className="py-2 text-right font-medium">Recebido</th>
                    </tr>
                </thead>
                <tbody>
                    {months.map((month) => (
                        <tr key={month.key} className="border-b border-zinc-100 last:border-b-0 dark:border-zinc-800/60">
                            <th scope="row" className="py-2 font-normal">
                                {formatMonthPt(month.key, "long")}
                            </th>
                            <td className="py-2 text-right tabular-nums">{formatCurrency(month.expected)}</td>
                            <td className="py-2 text-right tabular-nums">{formatCurrency(month.received)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </details>
    );
}

export function ReportByMonth({ months }: { months: Report["months"] }) {
    const chartMax = getChartMax(months);
    const axisValues = [
        { value: chartMax, top: "0%" },
        { value: chartMax / 2, top: "50%" },
        { value: 0, top: "100%" },
    ];

    return (
        <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Por mês</h2>
                <ul className="flex gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                    <li className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-sm ${EXPECTED_COLOR}`} aria-hidden />
                        Previsto
                    </li>
                    <li className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-sm ${RECEIVED_COLOR}`} aria-hidden />
                        Recebido
                    </li>
                </ul>
            </div>

            <div className="flex gap-2">
                <div className="relative h-48 w-12 shrink-0 text-xs tabular-nums text-zinc-500 dark:text-zinc-400" aria-hidden>
                    {axisValues.map(({ value, top }) => (
                        <span
                            key={top}
                            className="absolute right-0 -translate-y-1/2 whitespace-nowrap"
                            style={{ top }}
                        >
                            {value === 0 ? "R$ 0" : formatCompactCurrency(value)}
                        </span>
                    ))}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="relative h-48 border-b border-[#c3c2b7] dark:border-[#383835]">
                        <div className="absolute inset-x-0 top-0 border-t border-[#e1e0d9] dark:border-[#2c2c2a]" aria-hidden />
                        <div className="absolute inset-x-0 top-1/2 border-t border-[#e1e0d9] dark:border-[#2c2c2a]" aria-hidden />
                        <div className="relative grid h-full grid-cols-12">
                            {months.map((month, index) => (
                                <MonthColumn
                                    key={month.key}
                                    month={month}
                                    chartMax={chartMax}
                                    tooltipPosition={getTooltipPosition(index, months.length)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mt-1.5 grid grid-cols-12 text-center text-[11px] text-zinc-500 dark:text-zinc-400" aria-hidden>
                        {months.map((month) => (
                            <span
                                key={month.key}
                                className={month.isCurrent ? "font-semibold text-zinc-900 dark:text-zinc-50" : ""}
                            >
                                <span className="uppercase sm:hidden">
                                    {formatMonthPt(month.key, "short").charAt(0)}
                                </span>
                                <span className="hidden sm:inline">
                                    {formatMonthPt(month.key, "short")}
                                </span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <MonthTable months={months} />
        </section>
    );
}
