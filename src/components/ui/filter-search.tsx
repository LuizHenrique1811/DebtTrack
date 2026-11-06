interface FilterSearchProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function FilterSearch({ label, value, onChange, placeholder }: FilterSearchProps) {
    return (
        <label className="flex min-w-0 flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {label}
            <input
                type="search"
                value={value}
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base font-normal text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-500 sm:text-sm"
            />
        </label>
    );
}
