import { listDebitAction } from "@/actions/debit/debit.action";
import { DebitDialog } from "@/components/debits/debit-dialog";
import { DebitCard } from "@/components/debits/debit-card";

export default async function DebitsPage() {

    const { debits, error } = await listDebitAction();
    console.log(debits);

    return (
        <main className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                    Débtos
                    <DebitDialog />
                </h1>
            </div>
        </main>
    );
}