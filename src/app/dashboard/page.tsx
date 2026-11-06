import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { getDashboardAction } from "@/actions/dashboard/dashboard.action";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { getCurrentUser } from "@/core/auth/current-user.service";
import { formatDatePt, getTodayDateKey } from "@/lib/utils";

export default async function DashboardPage() {
    const [user, { dashboard, error }] = await Promise.all([
        getCurrentUser(),
        getDashboardAction(),
    ]);

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                    Olá, {user?.name}
                </h1>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {formatDatePt(new Date(getTodayDateKey()))}
                </p>
            </div>
            {error ? (
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-12 text-center">
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                        {error}
                    </p>
                </div>
            ) : !dashboard?.summary.total ? (
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-12 text-center">
                    <LayoutDashboard className="mx-auto h-12 w-12 text-zinc-400 dark:text-zinc-500 mb-4" />
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                        Ainda não há dados para mostrar
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">
                        Cadastre um{" "}
                        <Link href="/dashboard/debtors" className="font-medium underline underline-offset-4">
                            devedor
                        </Link>{" "}
                        e depois um{" "}
                        <Link href="/dashboard/debits" className="font-medium underline underline-offset-4">
                            débito
                        </Link>{" "}
                        para começar.
                    </p>
                </div>
            ) : (
                <DashboardOverview dashboard={dashboard} />
            )}
        </div>
    );
}
