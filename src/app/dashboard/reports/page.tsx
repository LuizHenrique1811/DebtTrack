import { BarChart3 } from "lucide-react";
import { getReportAction } from "@/actions/report/report.action";
import { ReportByDebtor } from "@/components/report/report-by-debtor";
import { ReportByMonth } from "@/components/report/report-by-month";
import { ReportCollection } from "@/components/report/report-collection";
import { ReportSummary } from "@/components/report/report-summary";

export default async function ReportsPage() {
    const { report, error } = await getReportAction();

    return (
        <main className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                Relatórios
            </h1>
            {error ? (
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-12 text-center">
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                        {error}
                    </p>
                </div>
            ) : !report?.summary.total ? (
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-12 text-center">
                    <BarChart3 className="mx-auto h-12 w-12 text-zinc-400 dark:text-zinc-500 mb-4" />
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                        Ainda não há dados para mostrar
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">
                        Cadastre um débito para ver seus relatórios.
                    </p>
                </div>
            ) : (
                <>
                    <ReportSummary summary={report.summary} />
                    <ReportCollection collection={report.collection} />
                    <ReportByMonth months={report.months} />
                    <ReportByDebtor debtors={report.debtors} />
                </>
            )}
        </main>
    );
}
