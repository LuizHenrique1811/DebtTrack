"use client";

import { useState } from "react";
import { InstallmentRow, ROW_COLUMNS } from "@/components/installment/installment-row";
import { FilterSelect } from "@/components/ui/filter-select";
import {
    DEFAULT_FILTERS,
    filterInstallments,
    getFilterOptions,
    InstallmentFilters,
    STATUS_FILTERS,
    StatusFilter,
    sumRemaining,
} from "@/core/installment/installment-filter";
import type { InstallmentView } from "@/core/installment/installment.service";
import { formatCurrency, formatMonthPt } from "@/lib/utils";

export function InstallmentList({ installments }: { installments: InstallmentView[] }) {
    const [filters, setFilters] = useState<InstallmentFilters>(DEFAULT_FILTERS);

    const { months, debtors } = getFilterOptions(installments);
    const visible = filterInstallments(installments, filters);
    const remaining = sumRemaining(visible);
    const isFiltered = (Object.keys(filters) as (keyof InstallmentFilters)[]).some(
        (key) => filters[key] !== DEFAULT_FILTERS[key],
    );

    const updateFilter = (changes: Partial<InstallmentFilters>) =>
        setFilters((current) => ({ ...current, ...changes }));

    return (
        <div className="flex flex-col gap-4">
            <div className="grid gap-3 sm:grid-cols-3">
                <FilterSelect
                    label="Situação"
                    value={filters.status}
                    onChange={(value) => updateFilter({ status: value as StatusFilter })}
                >
                    {STATUS_FILTERS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </FilterSelect>
                <FilterSelect
                    label="Mês de vencimento"
                    value={filters.month}
                    onChange={(month) => updateFilter({ month })}
                >
                    <option value="">Todos</option>
                    {months.map((month) => (
                        <option key={month} value={month}>
                            {formatMonthPt(month, "long")}
                        </option>
                    ))}
                </FilterSelect>
                <FilterSelect
                    label="Devedor"
                    value={filters.debtorId}
                    onChange={(debtorId) => updateFilter({ debtorId })}
                >
                    <option value="">Todos</option>
                    {debtors.map((debtor) => (
                        <option key={debtor.id} value={debtor.id}>
                            {debtor.name}
                        </option>
                    ))}
                </FilterSelect>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                <p role="status">
                    {visible.length === 1 ? "1 parcela" : `${visible.length} parcelas`}
                    {remaining > 0 ? (
                        <>
                            {" · "}
                            <span className="font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                                {formatCurrency(remaining)}
                            </span>{" "}
                            a receber
                        </>
                    ) : null}
                </p>
                {isFiltered ? (
                    <button
                        type="button"
                        onClick={() => setFilters(DEFAULT_FILTERS)}
                        className="font-medium underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
                    >
                        Limpar filtros
                    </button>
                ) : null}
            </div>

            {visible.length > 0 ? (
                <div className="rounded-xl border border-zinc-200 bg-white px-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div
                        className={`hidden gap-x-4 border-b border-zinc-200 py-3 text-sm font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-400 lg:grid ${ROW_COLUMNS}`}
                        aria-hidden
                    >
                        <span>Devedor</span>
                        <span>Débito</span>
                        <span>Parcela</span>
                        <span>Vencimento</span>
                        <span className="text-right">Valor</span>
                        <span>Situação</span>
                        <span />
                    </div>
                    <ul>
                        {visible.map((installment) => (
                            <InstallmentRow key={installment.id} installment={installment} />
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-12 text-center">
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                        Nenhuma parcela com esses filtros
                    </p>
                </div>
            )}
        </div>
    );
}
