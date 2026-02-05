import { listDebtorAction } from "@/actions/debtor/debtor.action";
import { DebtorDialog } from "@/components/debtor/debtor-dialog";
import { DebtorCard } from "@/components/debtor/debtor-card";
import { User } from "lucide-react";

export default async function DebtorsPage() {

    const { debtors, error } = await listDebtorAction();

    return (
        <main className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                    Devedores
                </h1>
                <DebtorDialog className="max-w-2xl" />
            </div>

            {error ? (
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-12 text-center">
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                        {error}
                    </p>
                </div>
            ) : !debtors?.length ? (
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-12 text-center">
                    <User className="mx-auto h-12 w-12 text-zinc-400 dark:text-zinc-500 mb-4" />
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                        Nenhum devedor cadastrado
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">
                        Clique em Adicionar Devedor para começar.
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {debtors.map((debtor) => (
                       <DebtorCard key={debtor.id} debtor={debtor} />
                    ))}
                </div>
            )}
        </main>
    );
}