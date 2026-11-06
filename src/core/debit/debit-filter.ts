import type { DebitView } from "@/core/debit/debit.service";
import { matchesSearch } from "@/lib/utils";

export const DEBIT_STATUS_FILTERS = [
    { value: "ALL", label: "Todos" },
    { value: "ACTIVE", label: "A receber" },
    { value: "PAID", label: "Recebidos" },
] as const;

export type DebitStatusFilter = (typeof DEBIT_STATUS_FILTERS)[number]["value"];

export interface DebitFilters {
    search: string;
    status: DebitStatusFilter;
    debtorId: string;
}

export const DEFAULT_DEBIT_FILTERS: DebitFilters = {
    search: "",
    status: "ALL",
    debtorId: "",
};

export function filterDebits(debits: DebitView[], filters: DebitFilters) {
    return debits.filter(
        (debit) =>
            (!filters.search || matchesSearch(debit.description, filters.search)) &&
            (filters.status === "ALL" || debit.status === filters.status) &&
            (!filters.debtorId || debit.debtorId === filters.debtorId),
    );
}

export function getDebitDebtors(debits: DebitView[]) {
    const debtors = new Map(debits.map((debit) => [debit.debtorId, debit.debtor.name]));

    return [...debtors.entries()]
        .map(([id, name]) => ({ id, name }))
        .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}
