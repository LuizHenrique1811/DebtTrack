import type { InstallmentView } from "@/core/installment/installment.service";

export const STATUS_FILTERS = [
    { value: "OPEN", label: "Em aberto" },
    { value: "OVERDUE", label: "Atrasadas" },
    { value: "PAID", label: "Pagas" },
    { value: "ALL", label: "Todas" },
] as const;

export type StatusFilter = (typeof STATUS_FILTERS)[number]["value"];

export interface InstallmentFilters {
    status: StatusFilter;
    month: string;
    debtorId: string;
}

export const DEFAULT_FILTERS: InstallmentFilters = {
    status: "OPEN",
    month: "",
    debtorId: "",
};

const OPEN_STATUSES = ["PENDING", "PARTIALLY_PAID", "OVERDUE"];

const getMonthKey = (date: Date) => new Date(date).toISOString().slice(0, 7);

function matchesStatus(status: InstallmentView["status"], filter: StatusFilter) {
    if (filter === "ALL") return true;
    if (filter === "OPEN") return OPEN_STATUSES.includes(status);

    return status === filter;
}

export function filterInstallments(installments: InstallmentView[], filters: InstallmentFilters) {
    return installments.filter(
        (installment) =>
            matchesStatus(installment.status, filters.status) &&
            (!filters.month || getMonthKey(installment.dueDate) === filters.month) &&
            (!filters.debtorId || installment.debtorId === filters.debtorId),
    );
}

export function getFilterOptions(installments: InstallmentView[]) {
    const months = [...new Set(installments.map((item) => getMonthKey(item.dueDate)))].sort();
    const debtors = new Map(installments.map((item) => [item.debtorId, item.debtorName]));

    return {
        months,
        debtors: [...debtors.entries()]
            .map(([id, name]) => ({ id, name }))
            .sort((a, b) => a.name.localeCompare(b.name, "pt-BR")),
    };
}

// Soma em centavos para não acumular erro de ponto flutuante.
export function sumRemaining(installments: InstallmentView[]) {
    const cents = installments.reduce(
        (total, item) => total + Math.round(item.remainingAmount * 100),
        0,
    );

    return cents / 100;
}
