import { listDebitAction } from "@/actions/debit/debit.action";
import { listDebtorAction } from "@/actions/debtor/debtor.action";
import { DebitDialog } from "@/components/debits/debit-dialog";
import { DebitCard } from "@/components/debits/debit-card";
import { DollarSign } from "lucide-react";


export default async function DebitsPage() {

    const { debits, error } = await listDebitAction();
    const {debtors, error: debtorError} = await listDebtorAction();

    return (
        <main className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                    Débtos
                </h1>
                <DebitDialog debtors={debtors} />
            </div>
            {error ? (
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-12 text-center">
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                        {error}
                    </p>
                </div>
            ) : !debits?.length ? (
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-12 text-center">
                    <DollarSign className="mx-auto h-12 w-12 text-zinc-400 dark:text-zinc-500 mb-4" />
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                        Nenhum débito cadastrado
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">
                        Clique em Adicionar Débito para começar.
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {debits.map((debit) => (
                       <DebitCard key={debit.id} debit={debit} />
                    ))}
                </div>
            )}
        </main>
    );
    
}