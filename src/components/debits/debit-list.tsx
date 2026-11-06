"use client";

import type { Debtor } from "@prisma/client";
import { useState } from "react";
import { DebitCard } from "@/components/debits/debit-card";
import { FilterSelect } from "@/components/ui/filter-select";
import {
    DEBIT_STATUS_FILTERS,
    DebitFilters,
    DebitStatusFilter,
    DEFAULT_DEBIT_FILTERS,
    filterDebits,
    getDebitDebtors,
} from "@/core/debit/debit-filter";
import type { DebitView } from "@/core/debit/debit.service";

interface DebitListProps {
    debits: DebitView[];
    debtors: Debtor[];
}

export function DebitList({ debits, debtors }: DebitListProps) {
    const [filters, setFilters] = useState<DebitFilters>(DEFAULT_DEBIT_FILTERS);

    const visible = filterDebits(debits, filters);
    const isFiltered =
        filters.status !== DEFAULT_DEBIT_FILTERS.status ||
        filters.debtorId !== DEFAULT_DEBIT_FILTERS.debtorId;

    return (
        <div className="flex flex-col gap-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:max-w-xl">
                <FilterSelect
                    label="Situação"
                    value={filters.status}
                    onChange={(value) =>
                        setFilters((current) => ({ ...current, status: value as DebitStatusFilter }))
                    }
                >
                    {DEBIT_STATUS_FILTERS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </FilterSelect>
                <FilterSelect
                    label="Devedor"
                    value={filters.debtorId}
                    onChange={(debtorId) => setFilters((current) => ({ ...current, debtorId }))}
                >
                    <option value="">Todos</option>
                    {getDebitDebtors(debits).map((debtor) => (
                        <option key={debtor.id} value={debtor.id}>
                            {debtor.name}
                        </option>
                    ))}
                </FilterSelect>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                <p role="status">
                    {visible.length === 1 ? "1 débito" : `${visible.length} débitos`}
                </p>
                {isFiltered ? (
                    <button
                        type="button"
                        onClick={() => setFilters(DEFAULT_DEBIT_FILTERS)}
                        className="font-medium underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
                    >
                        Limpar filtros
                    </button>
                ) : null}
            </div>

            {visible.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {visible.map((debit) => (
                        <DebitCard key={debit.id} debit={debit} debtors={debtors} />
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-12 text-center">
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                        Nenhum débito com esses filtros
                    </p>
                </div>
            )}
        </div>
    );
}
