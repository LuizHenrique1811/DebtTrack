import { AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";
import type { Report } from "@/core/report/report-calculator";
import { formatCurrency } from "@/lib/utils";

export function StatTile({ label, value, note }: { label: string; value: string; note?: ReactNode }) {
    return (
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                {value}
            </p>
            {note ? (
                <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                    {note}
                </p>
            ) : null}
        </div>
    );
}

export function ReportSummary({ summary }: { summary: Report["summary"] }) {
    const receivedShare = Math.round((summary.received / summary.total) * 100);
    const { overdueCount } = summary;

    return (
        <section aria-label="Resumo" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatTile label="Total emprestado" value={formatCurrency(summary.total)} />
            <StatTile
                label="Recebido"
                value={formatCurrency(summary.received)}
                note={`${receivedShare}% do total`}
            />
            <StatTile label="A receber" value={formatCurrency(summary.remaining)} />
            <StatTile
                label="Em atraso"
                value={formatCurrency(summary.overdue)}
                note={
                    overdueCount > 0 ? (
                        <>
                            <AlertTriangle className="h-4 w-4 shrink-0 text-[#d03b3b]" aria-hidden />
                            {overdueCount === 1 ? "1 parcela atrasada" : `${overdueCount} parcelas atrasadas`}
                        </>
                    ) : (
                        "Nenhuma parcela atrasada"
                    )
                }
            />
        </section>
    );
}
