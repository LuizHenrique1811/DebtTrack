import { InputHTMLAttributes, useId } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration?: UseFormRegisterReturn; 
}

export function Input({ label, error, registration, className, defaultValue, ...props }: FormInputProps) {
  
  const inputId = props.id || registration?.name || useId();

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <input
        id={inputId}
        {...registration}
        {...props}
        defaultValue={defaultValue}
        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-base text-zinc-900 shadow-sm transition-colors placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-500 ${
          error ? "border-red-500 dark:border-red-400" : "border-zinc-300 dark:border-zinc-600"
        } ${className ?? ""}`}
      />
      {error && <span className="text-xs text-red-600 dark:text-red-400">{error}</span>}
    </div>
  );
}