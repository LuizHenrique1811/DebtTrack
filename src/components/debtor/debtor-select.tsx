"use client";

import { Select, SelectOption } from "@/components/ui/select";
import type { Debtor } from "@/app/generated/prisma";
import { UseFormRegisterReturn } from "react-hook-form";

interface DebtorSelectProps {
  debtors?: Debtor[];
  registration: UseFormRegisterReturn;
  error?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function DebtorSelect({
  debtors = [],
  registration,
  error,
  label = "Devedor",
  placeholder = "Selecione o devedor",
  disabled,
}: DebtorSelectProps) {
  const options: SelectOption[] = debtors.map((d) => ({
    value: d.id,
    label: d.name,
  }));

  return (
    <Select
      label={label}
      placeholder={placeholder}
      options={options}
      registration={registration}
      error={error}
      disabled={disabled}
      emptyMessage="Nenhum devedor cadastrado"
    />
  );
}