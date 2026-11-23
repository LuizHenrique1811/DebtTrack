"use client";

import { ChevronDown, Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { FilterSearch } from "@/components/ui/filter-search";
import { FilterSelect } from "@/components/ui/filter-select";
import {
    CHARGE_STATUS_FILTERS,
    DEFAULT_CHARGE_FILTERS,
    PERIOD_PRESETS,
    resolvePeriod,
    toChargeSearchParams,
    type ChargeFilters as Filters,
    type ChargeStatusFilter,
} from "@/core/charge/charge-filter";
import { cn } from "@/lib/utils";

interface ChargeFiltersProps {
    filters: Filters;
    debtors: { id: string; name: string }[];
}

const FIELD =
    "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base font-normal text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:ring-zinc-500 sm:text-sm";

const LABEL = "flex min-w-0 flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300";

function DebtorPicker({
    debtors,
    selected,
    onChange,
}: {
    debtors: ChargeFiltersProps["debtors"];
    selected: string[];
    onChange: (ids: string[]) => void;
}) {
    const summary =
        selected.length === 0
            ? "Todos"
            : selected.length === 1
              ? (debtors.find((debtor) => debtor.id === selected[0])?.name ?? "1 selecionado")
              : `${selected.length} selecionados`;

    const toggle = (id: string) =>
        onChange(selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]);

    return (
        <div className={LABEL}>
            <span id="debtor-picker-label">Devedores</span>
            <details className="group relative">
                <summary
                    aria-labelledby="debtor-picker-label"
                    className={cn(FIELD, "flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden")}
                >
                    <span className="truncate">{summary}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-open:rotate-180" />
                </summary>
                <div className="absolute inset-x-0 z-20 mt-1 max-h-64 overflow-auto rounded-lg border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
                    {debtors.length === 0 ? (
                        <p className="p-2 text-sm font-normal text-zinc-500">Nenhum devedor cadastrado.</p>
                    ) : null}
                    {debtors.map((debtor) => (
                        <label
                            key={debtor.id}
                            className="flex cursor-pointer items-center gap-2 rounded px-2 py-2 text-sm font-normal text-zinc-800 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-700"
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(debtor.id)}
                                onChange={() => toggle(debtor.id)}
                                className="h-4 w-4 accent-zinc-900 dark:accent-zinc-100"
                            />
                            <span className="truncate">{debtor.name}</span>
                        </label>
                    ))}
                    {selected.length > 0 ? (
                        <button
                            type="button"
                            onClick={() => onChange([])}
                            className="mt-1 w-full rounded px-2 py-2 text-left text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
                        >
                            Limpar seleção
                        </button>
                    ) : null}
                </div>
            </details>
        </div>
    );
}

export function ChargeFilters({ filters, debtors }: ChargeFiltersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [search, setSearch] = useState(filters.search);
    const [draft, setDraft] = useState({ from: filters.from, to: filters.to });

    const apply = (next: Filters) => {
        const query = toChargeSearchParams(next).toString();
        startTransition(() => {
            router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
        });
    };

    const update = (patch: Partial<Filters>) => apply({ ...filters, ...patch });

    // A busca espera a pessoa parar de digitar para não recarregar a cada letra.
    useEffect(() => {
        if (search === filters.search) return;

        const timer = setTimeout(() => update({ search }), 350);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const choosePreset = (preset: Filters["preset"]) => {
        if (preset !== "custom") {
            update({ preset, from: "", to: "" });
            return;
        }

        // Começa o personalizado com o período que estava na tela.
        const range = resolvePeriod(filters).range ?? resolvePeriod(DEFAULT_CHARGE_FILTERS).range!;
        setDraft(range);
        update({ preset, ...range });
    };

    const changeDate = (key: "from" | "to", value: string) => {
        const next = { ...draft, [key]: value };
        setDraft(next);
        if (next.from && next.to) update(next);
    };

    const isFiltered = toChargeSearchParams(filters).toString() !== "";

    return (
        <section aria-label="Filtros" className="flex flex-col gap-3">
            <div role="radiogroup" aria-label="Período" className="flex flex-wrap gap-2">
                {PERIOD_PRESETS.map((preset) => {
                    const isActive = filters.preset === preset.value;
                    return (
                        <button
                            key={preset.value}
                            type="button"
                            role="radio"
                            aria-checked={isActive}
                            onClick={() => choosePreset(preset.value)}
                            className={cn(
                                "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                                isActive
                                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                                    : "border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800",
                            )}
                        >
                            {preset.label}
                        </button>
                    );
                })}
                {isPending ? (
                    <Loader2 aria-label="Atualizando" className="h-4 w-4 animate-spin self-center text-zinc-500" />
                ) : null}
            </div>

            {filters.preset === "custom" ? (
                <div className="grid grid-cols-2 gap-3 sm:max-w-md">
                    <label className={LABEL}>
                        De
                        <input
                            type="date"
                            value={draft.from}
                            onChange={(event) => changeDate("from", event.target.value)}
                            className={FIELD}
                        />
                    </label>
                    <label className={LABEL}>
                        Até
                        <input
                            type="date"
                            value={draft.to}
                            onChange={(event) => changeDate("to", event.target.value)}
                            className={FIELD}
                        />
                    </label>
                </div>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-3 lg:max-w-4xl">
                <DebtorPicker
                    debtors={debtors}
                    selected={filters.debtorIds}
                    onChange={(debtorIds) => update({ debtorIds })}
                />
                <FilterSelect
                    label="Situação"
                    value={filters.status}
                    onChange={(status) => update({ status: status as ChargeStatusFilter })}
                >
                    {CHARGE_STATUS_FILTERS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </FilterSelect>
                <FilterSearch
                    label="Débito"
                    placeholder="Ex: Empréstimo"
                    value={search}
                    onChange={setSearch}
                />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
                {filters.preset !== "overdue" && filters.status !== "PAID" ? (
                    <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                        <input
                            type="checkbox"
                            checked={filters.includeOverdue}
                            onChange={(event) => update({ includeOverdue: event.target.checked })}
                            className="h-4 w-4 accent-zinc-900 dark:accent-zinc-100"
                        />
                        Incluir parcelas em atraso de antes do período
                    </label>
                ) : (
                    <span />
                )}
                {isFiltered ? (
                    <button
                        type="button"
                        onClick={() => {
                            setSearch("");
                            apply(DEFAULT_CHARGE_FILTERS);
                        }}
                        className="text-sm font-medium text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400"
                    >
                        Limpar filtros
                    </button>
                ) : null}
            </div>
        </section>
    );
}
