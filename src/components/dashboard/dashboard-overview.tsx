import { AlertTriangle } from "lucide-react";
import { DashboardDebtors } from "@/components/dashboard/dashboard-debtors";
import { DashboardInstallments } from "@/components/dashboard/dashboard-installments";
import { ReportByMonth } from "@/components/report/report-by-month";
import { StatTile } from "@/components/report/report-summary";
import type { Dashboard } from "@/core/dashboard/dashboard-calculator";
import { formatCurrency } from "@/lib/utils";

const countInstallments = (count: number) =>
    count === 1 ? "1 parcela" : `${count} parcelas`;

export function DashboardOverview({ dashboard }: { dashboard: Dashboard }) {
    const { summary, currentMonth, months, overdue, upcoming, debtors } = dashboard;
    const receivedShare = Math.round((summary.received / summary.total) * 100);

    return (
        <>
            <section aria-label="Resumo" className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
                <StatTile
                    label="A receber"
                    value={formatCurrency(summary.remaining)}
                    note={`${receivedShare}% do total já recebido`}
                />
                <StatTile
                    label="Em atraso"
                    value={formatCurrency(summary.overdue)}
                    note={
                        summary.overdueCount > 0 ? (
                            <>
                                <AlertTriangle className="h-4 w-4 shrink-0 text-[#d03b3b]" aria-hidden />
                                {countInstallments(summary.overdueCount)}
                            </>
                        ) : (
                            "Nenhuma parcela atrasada"
                        )
                    }
                />
                <StatTile
                    label="Recebido no mês"
                    value={formatCurrency(currentMonth.received)}
                    note={`de ${formatCurrency(currentMonth.expected)} previstos`}
                />
                <StatTile
                    label="Vence em 7 dias"
                    value={formatCurrency(upcoming.total)}
                    note={upcoming.count > 0 ? countInstallments(upcoming.count) : "Nenhuma parcela"}
                />
            </section>

            <DashboardInstallments overdue={overdue} upcoming={upcoming} />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className={`min-w-0 [&>section]:h-full ${debtors.length > 0 ? "xl:col-span-2" : "xl:col-span-3"}`}>
                    <ReportByMonth title="Previsto e recebido" months={months} />
                </div>
                {debtors.length > 0 ? <DashboardDebtors debtors={debtors} /> : null}
            </div>
        </>
    );
}
