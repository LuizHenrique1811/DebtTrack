import type { ReactNode } from "react";

interface FilterSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    children: ReactNode;
}

export function FilterSelect({ label, value, onChange, children }: FilterSelectProps) {
    return (
        <label className="flex min-w-0 flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {label}
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base font-normal text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:ring-zinc-500 sm:text-sm"
            >
                {children}
            </select>
        </label>
    );
}
