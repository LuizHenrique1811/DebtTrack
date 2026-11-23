import { FileText, Inbox } from "lucide-react";
import Link from "next/link";
import { getPeriodChargesAction } from "@/actions/charge/charge.action";
import { ChargeFilters } from "@/components/charge/charge-filters";
import { ChargeSummary } from "@/components/charge/charge-summary";
import { PeriodChargeCard } from "@/components/charge/period-charge-card";
import { parseChargeFilters, toChargeSearchParams } from "@/core/charge/charge-filter";

const EMPTY =
    "rounded-xl border border-zinc-200 bg-zinc-50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900/50";

function printHref(params: URLSearchParams) {
    const query = params.toString();

    return query ? `/dashboard/charges/print?${query}` : "/dashboard/charges/print";
}

export default async function ChargesPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    const filters = parseChargeFilters(await searchParams);
    const { result, error } = await getPeriodChargesAction(filters);
    const params = toChargeSearchParams(filters);

    return (
        <main className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Cobranças</h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Escolha o período e as pessoas, revise a mensagem e envie.
                    </p>
                </div>
                {result && result.charges.length > 0 ? (
                    <Link
                        href={printHref(params)}
                        target="_blank"
                        className="flex items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
                    >
                        <FileText className="h-4 w-4" />
                        PDF do relatório
                    </Link>
                ) : null}
            </div>

            <ChargeFilters key={params.toString()} filters={filters} debtors={result?.debtors ?? []} />

            {error || !result ? (
                <div className={EMPTY}>
                    <p className="font-medium text-zinc-600 dark:text-zinc-400">{error}</p>
                </div>
            ) : result.charges.length === 0 ? (
                <div className={EMPTY}>
                    <Inbox className="mx-auto mb-4 h-12 w-12 text-zinc-400 dark:text-zinc-500" />
                    <p className="font-medium text-zinc-600 dark:text-zinc-400">
                        Nenhuma parcela {result.periodLabel} com esses filtros
                    </p>
                </div>
            ) : (
                <>
                    <ChargeSummary summary={result.summary} />
                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                        {result.charges.map((charge) => {
                            const debtorParams = new URLSearchParams(params);
                            debtorParams.delete("devedor");
                            debtorParams.append("devedor", charge.debtorId);

                            return (
                                <PeriodChargeCard
                                    key={`${charge.debtorId}-${charge.message}`}
                                    charge={charge}
                                    periodLabel={result.periodLabel}
                                    printHref={printHref(debtorParams)}
                                />
                            );
                        })}
                    </div>
                </>
            )}
        </main>
    );
}
