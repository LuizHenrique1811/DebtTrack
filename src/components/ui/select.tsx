import { SelectHTMLAttributes, useId } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
  options: SelectOption[];
  placeholder?: string;
  emptyMessage?: string;
}

export function Select({
  label,
  error,
  registration,
  options,
  placeholder = "Selecione...",
  emptyMessage = "Nenhuma opção disponível",
  id: idProp,
  className,
  ...props
}: FormSelectProps) {

  const id = idProp ?? registration.name ?? useId();

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <select
        id={id}
        {...registration}
        {...props}
        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-base text-zinc-900 shadow-sm transition-colors placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-500 ${
          error ? "border-red-500 dark:border-red-400" : "border-zinc-300 dark:border-zinc-600"
        } ${className ?? ""}`}
      >
        <option value="" className="bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
            {opt.label}
          </option>
        ))}
      </select>
      {options.length === 0 && (
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{emptyMessage}</span>
      )}
      {error && <span className="text-xs text-red-600 dark:text-red-400">{error}</span>}
    </div>
  );
}