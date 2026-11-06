import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import type { Dashboard } from "@/core/dashboard/dashboard-calculator";
import { formatCurrency, formatDateShortPt } from "@/lib/utils";

type InstallmentGroup = Dashboard["overdue"];
type Installment = InstallmentGroup["installments"][number];

function formatLateDays(days: number) {
    return days === 1 ? "há 1 dia" : `há ${days} dias`;
}

function formatDaysUntilDue(days: number) {
    if (days === 0) return "hoje";
    if (days === 1) return "amanhã";

    return `em ${days} dias`;
}

function InstallmentRow({
    installment,
    formatDays,
}: {
    installment: Installment;
    formatDays: (days: number) => string;
}) {
    return (
        <li className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 border-b border-zinc-200 py-3 first:pt-0 last:border-b-0 last:pb-0 dark:border-zinc-800">
            <p
                className="truncate font-semibold text-zinc-900 dark:text-zinc-50"
                title={installment.debtorName}
            >
                {installment.debtorName}
            </p>
            <p className="text-right font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                {formatCurrency(installment.remaining)}
            </p>
            <p className="col-span-2 truncate text-sm text-zinc-600 sm:col-span-1 dark:text-zinc-400">
                {installment.description} · Parcela {installment.installmentNumber} de{" "}
                {installment.installmentQty}
            </p>
            <p className="col-span-2 text-sm tabular-nums text-zinc-600 sm:col-span-1 sm:text-right dark:text-zinc-400">
                {formatDateShortPt(installment.dueDate)} · {formatDays(installment.days)}
            </p>
        </li>
    );
}

function InstallmentCard({
    title,
    group,
    emptyMessage,
    formatDays,
    highlight = false,
}: {
    title: string;
    group: InstallmentGroup;
    emptyMessage: string;
    formatDays: (days: number) => string;
    highlight?: boolean;
}) {
    const hasMore = group.count > group.installments.length;

    return (
        <section className="flex min-w-0 flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    {highlight && group.count > 0 ? (
                        <AlertTriangle className="h-4 w-4 shrink-0 text-[#d03b3b]" aria-hidden />
                    ) : null}
                    {title}
                </h2>
                {group.count > 0 ? (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Total{" "}
                        <span className="text-lg font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                            {formatCurrency(group.total)}
                        </span>
                    </p>
                ) : null}
            </div>
            {group.count > 0 ? (
                <ul>
                    {group.installments.map((installment) => (
                        <InstallmentRow
                            key={installment.id}
                            installment={installment}
                            formatDays={formatDays}
                        />
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{emptyMessage}</p>
            )}
            {hasMore ? (
                <Link
                    href="/dashboard/installments"
                    className="mt-3 self-start rounded text-sm font-medium text-zinc-600 underline-offset-4 outline-none hover:text-zinc-900 hover:underline focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                    Ver todas as {group.count} parcelas
                </Link>
            ) : null}
        </section>
    );
}

export function DashboardInstallments({
    overdue,
    upcoming,
}: Pick<Dashboard, "overdue" | "upcoming">) {
    return (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <InstallmentCard
                title="Em atraso"
                group={overdue}
                emptyMessage="Nenhuma parcela atrasada."
                formatDays={formatLateDays}
                highlight
            />
            <InstallmentCard
                title="Vencem em 7 dias"
                group={upcoming}
                emptyMessage="Nenhuma parcela vence nos próximos 7 dias."
                formatDays={formatDaysUntilDue}
            />
        </div>
    );
}
