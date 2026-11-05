import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatCurrency(value: unknown) {
    const num = typeof value === "number" ? value : Number(value || 0);
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(num);
}

export function parseCurrency(raw: string): number {
    const digits = raw.replace(/\D/g, "");
    const cents = Number(digits || "0");
    return cents / 100;
}

// Vencimentos e pagamentos representam um dia do calendário, gravado em UTC.
// Sem fixar o fuso, o navegador no Brasil mostraria o dia anterior.
export function formatDatePt(date: Date) {
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(date));
}

// Dia atual no fuso do app, no formato AAAA-MM-DD.
export function getTodayDateKey(now = new Date()) {
    return new Intl.DateTimeFormat("en-CA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "America/Sao_Paulo",
    }).format(now);
}
