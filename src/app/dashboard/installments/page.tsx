import { listInstallmentAction } from "@/actions/installment/installment.action";
import { InstallmentCard } from "@/components/installment/installment-card";

export default async function InstallmentsPage() {

    const { installments, error } = await listInstallmentAction();

    return (
        <main className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                Parcelas
            </h1>
            {error ? (
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-12 text-center">
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                        {error}
                    </p>
                </div>
            ) : !installments?.length ? (
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-12 text-center">
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                        Nenhuma parcela encontrada
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {installments.map((installment) => (
                        <InstallmentCard key={installment.id} installment={installment} />
                    ))}
                </div>
            )}
        </main>
    );
}
