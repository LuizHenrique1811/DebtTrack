import { BarChart3 } from "lucide-react";

export default function ReportsPage() {
    return (
        <main className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                Relatórios
            </h1>
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-12 text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-zinc-400 dark:text-zinc-500 mb-4" />
                <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                    Relatórios ainda não disponíveis
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">
                    Esta página está em desenvolvimento.
                </p>
            </div>
        </main>
    );
}
