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

export function formatDatePt(date: Date) {
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
}
