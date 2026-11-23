import { getPeriodChargesAction } from "@/actions/charge/charge.action";
import { PrintOnLoad } from "@/components/charge/print-on-load";
import type { ChargeItem } from "@/core/charge/charge-calculator";
import { parseChargeFilters } from "@/core/charge/charge-filter";
import { formatCurrency, formatDateShortPt } from "@/lib/utils";

export const metadata = { title: "Relatório de cobranças" };

function Rows({ title, items, paid = false }: { title: string; items: ChargeItem[]; paid?: boolean }) {
    if (items.length === 0) return null;

    return (
        <>
            <tr>
                <th
                    colSpan={3}
                    className="pb-1 pt-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500"
                >
                    {title}
                </th>
            </tr>
            {items.map((item) => (
                <tr key={item.id} className="break-inside-avoid border-t border-zinc-200">
                    <td className="py-1.5 pr-3 tabular-nums">{formatDateShortPt(item.dueDate)}</td>
                    <td className="py-1.5 pr-3">
                        {item.description} · {item.installmentNumber}/{item.installmentQty}
                    </td>
                    <td className="py-1.5 text-right tabular-nums">
                        {formatCurrency(paid ? item.amount : item.remaining)}
                        {!paid && item.remaining < item.amount ? (
                            <span className="block text-xs text-zinc-500">de {formatCurrency(item.amount)}</span>
                        ) : null}
                    </td>
                </tr>
            ))}
        </>
    );
}

export default async function ChargesPrintPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    const filters = parseChargeFilters(await searchParams);
    const { result, error } = await getPeriodChargesAction(filters);
    const issuedAt = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "America/Sao_Paulo",
    }).format(new Date());

    return (
        <main className="mx-auto max-w-3xl rounded-xl bg-white p-6 text-zinc-900 shadow-sm print:max-w-none print:rounded-none print:p-0 print:shadow-none">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold">Relatório de cobranças</h1>
                    {result ? (
                        <p className="text-sm text-zinc-600">
                            Parcelas {result.periodLabel} · emitido em {issuedAt}
                        </p>
                    ) : null}
                </div>
                <PrintOnLoad />
            </div>

            {error || !result ? (
                <p className="text-zinc-600">{error}</p>
            ) : result.charges.length === 0 ? (
                <p className="text-zinc-600">Nenhuma parcela com esses filtros.</p>
            ) : (
                <div className="flex flex-col gap-6">
                    {result.charges.map((charge) => (
                        <section key={charge.debtorId} className="break-inside-avoid">
                            <div className="flex items-baseline justify-between gap-3 border-b-2 border-zinc-900 pb-1">
                                <h2 className="text-lg font-semibold">{charge.debtorName}</h2>
                                <p className="font-semibold tabular-nums">
                                    {charge.total > 0
                                        ? `A pagar ${formatCurrency(charge.total)}`
                                        : `Pago ${formatCurrency(charge.paidTotal)}`}
                                </p>
                            </div>
                            <table className="w-full text-sm">
                                <tbody>
                                    <Rows title="Em atraso" items={charge.overdue} />
                                    <Rows title="No período" items={charge.open} />
                                    <Rows title="Pagas" items={charge.paid} paid />
                                </tbody>
                            </table>
                        </section>
                    ))}

                    {result.charges.length > 1 ? (
                        <div className="flex flex-col gap-1 border-t-2 border-zinc-900 pt-3 text-sm">
                            <p className="flex justify-between">
                                <span>Total a pagar</span>
                                <span className="font-semibold tabular-nums">
                                    {formatCurrency(result.summary.total)}
                                </span>
                            </p>
                            {result.summary.overdue > 0 ? (
                                <p className="flex justify-between">
                                    <span>Em atraso</span>
                                    <span className="tabular-nums">{formatCurrency(result.summary.overdue)}</span>
                                </p>
                            ) : null}
                            {result.summary.paid > 0 ? (
                                <p className="flex justify-between">
                                    <span>Pago no período</span>
                                    <span className="tabular-nums">{formatCurrency(result.summary.paid)}</span>
                                </p>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            )}
        </main>
    );
}
