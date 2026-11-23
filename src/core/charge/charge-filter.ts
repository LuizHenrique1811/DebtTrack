import { z } from "zod";
import { formatDateShortPt, formatMonthPt, getTodayDateKey } from "@/lib/utils";

// Só módulos sem Prisma aqui: os filtros também rodam no navegador.

export const PERIOD_PRESETS = [
    { value: "this-month", label: "Este mês" },
    { value: "next-month", label: "Mês que vem" },
    { value: "next-30", label: "Próximos 30 dias" },
    { value: "overdue", label: "Só atrasados" },
    { value: "custom", label: "Personalizado" },
] as const;

export type PeriodPreset = (typeof PERIOD_PRESETS)[number]["value"];

export const CHARGE_STATUS_FILTERS = [
    { value: "OPEN", label: "Em aberto" },
    { value: "PAID", label: "Pagas" },
    { value: "ALL", label: "Todas" },
] as const;

export type ChargeStatusFilter = (typeof CHARGE_STATUS_FILTERS)[number]["value"];

const DATE_KEY = /^\d{4}-\d{2}-\d{2}$/;

export interface ChargeFilters {
    preset: PeriodPreset;
    // Só valem no período personalizado.
    from: string;
    to: string;
    includeOverdue: boolean;
    debtorIds: string[];
    status: ChargeStatusFilter;
    search: string;
}

export const DEFAULT_CHARGE_FILTERS: ChargeFilters = {
    preset: "this-month",
    from: "",
    to: "",
    includeOverdue: true,
    debtorIds: [],
    status: "OPEN",
    search: "",
};

const dateKey = z.string().regex(DATE_KEY).refine((value) => !Number.isNaN(Date.parse(value)));

export const chargeFiltersSchema = z
    .object({
        preset: z.enum(PERIOD_PRESETS.map((item) => item.value) as [PeriodPreset, ...PeriodPreset[]]),
        from: z.union([dateKey, z.literal("")]),
        to: z.union([dateKey, z.literal("")]),
        includeOverdue: z.boolean(),
        debtorIds: z.array(z.string().min(1).max(64)).max(200),
        status: z.enum(["OPEN", "PAID", "ALL"]),
        search: z.string().max(100),
    })
    .refine((filters) => filters.preset !== "custom" || (filters.from && filters.to), {
        message: "Informe o início e o fim do período",
    });

function addDays(key: string, days: number) {
    const date = new Date(`${key}T00:00:00.000Z`);
    date.setUTCDate(date.getUTCDate() + days);

    return date.toISOString().slice(0, 10);
}

function lastDayOfMonth(monthKey: string) {
    const [year, month] = monthKey.split("-").map(Number);

    return new Date(Date.UTC(year, month, 0)).toISOString().slice(0, 10);
}

function nextMonthKey(monthKey: string) {
    const [year, month] = monthKey.split("-").map(Number);

    return new Date(Date.UTC(year, month, 1)).toISOString().slice(0, 7);
}

export interface ResolvedPeriod {
    today: string;
    // null quando o filtro mostra só atrasados.
    range: { from: string; to: string } | null;
}

// Datas no formato AAAA-MM-DD, comparadas como texto, no fuso do app.
export function resolvePeriod(filters: ChargeFilters, now = new Date()): ResolvedPeriod {
    const today = getTodayDateKey(now);
    const month = today.slice(0, 7);

    switch (filters.preset) {
        case "this-month":
            return { today, range: { from: `${month}-01`, to: lastDayOfMonth(month) } };
        case "next-month": {
            const next = nextMonthKey(month);
            return { today, range: { from: `${next}-01`, to: lastDayOfMonth(next) } };
        }
        case "next-30":
            return { today, range: { from: today, to: addDays(today, 29) } };
        case "overdue":
            return { today, range: null };
        case "custom": {
            const [from, to] = [filters.from, filters.to].sort();
            return { today, range: { from, to } };
        }
    }
}

const shortDate = (key: string) => formatDateShortPt(new Date(`${key}T00:00:00.000Z`));

function isWholeMonth({ from, to }: { from: string; to: string }) {
    return from.endsWith("-01") && from.slice(0, 7) === to.slice(0, 7) && to === lastDayOfMonth(from.slice(0, 7));
}

// Complemento de "pendências ...": "de dezembro de 2026", "de 01/12/2026 a 15/12/2026".
export function getPeriodLabel(filters: ChargeFilters, now = new Date()) {
    const { range } = resolvePeriod(filters, now);

    if (!range) return "em atraso";
    if (filters.preset === "next-30") return `dos próximos 30 dias (até ${shortDate(range.to)})`;
    if (isWholeMonth(range)) return `de ${formatMonthPt(range.from.slice(0, 7), "long")}`;
    if (range.from === range.to) return `de ${shortDate(range.from)}`;

    return `de ${shortDate(range.from)} a ${shortDate(range.to)}`;
}

type SearchParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";
const all = (value: string | string[] | undefined) =>
    (Array.isArray(value) ? value : value ? [value] : []).filter(Boolean);

// Os filtros ficam na URL para recarregar a página e abrir a impressão com a mesma seleção.
// Um valor inválido volta para o padrão em vez de mostrar erro.
export function parseChargeFilters(params: SearchParams): ChargeFilters {
    const candidate: ChargeFilters = {
        preset: (first(params.periodo) || DEFAULT_CHARGE_FILTERS.preset) as PeriodPreset,
        from: first(params.de),
        to: first(params.ate),
        includeOverdue: first(params.atrasados) !== "0",
        debtorIds: all(params.devedor),
        status: (first(params.status) || DEFAULT_CHARGE_FILTERS.status) as ChargeStatusFilter,
        search: first(params.busca),
    };

    const parsed = chargeFiltersSchema.safeParse(candidate);
    if (parsed.success) return parsed.data;

    const fields = chargeFiltersSchema.innerType().shape;
    const keep = <K extends keyof ChargeFilters>(key: K) =>
        fields[key].safeParse(candidate[key]).success ? candidate[key] : DEFAULT_CHARGE_FILTERS[key];

    const fallback: ChargeFilters = {
        preset: keep("preset"),
        from: keep("from"),
        to: keep("to"),
        includeOverdue: candidate.includeOverdue,
        debtorIds: keep("debtorIds"),
        status: keep("status"),
        search: keep("search"),
    };

    return chargeFiltersSchema.safeParse(fallback).success
        ? fallback
        : { ...fallback, preset: DEFAULT_CHARGE_FILTERS.preset, from: "", to: "" };
}

export function toChargeSearchParams(filters: ChargeFilters) {
    const params = new URLSearchParams();

    if (filters.preset !== DEFAULT_CHARGE_FILTERS.preset) params.set("periodo", filters.preset);
    if (filters.preset === "custom") {
        if (filters.from) params.set("de", filters.from);
        if (filters.to) params.set("ate", filters.to);
    }
    if (!filters.includeOverdue) params.set("atrasados", "0");
    for (const id of filters.debtorIds) params.append("devedor", id);
    if (filters.status !== DEFAULT_CHARGE_FILTERS.status) params.set("status", filters.status);
    if (filters.search.trim()) params.set("busca", filters.search.trim());

    return params;
}
