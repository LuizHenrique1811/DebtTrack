import { Select, SelectOption } from "@/components/ui/select";
import { UseFormRegisterReturn } from "react-hook-form";

interface MonthsSelectProps {
    registration: UseFormRegisterReturn;
    error?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
  }

export function MonthSelect({ label = "Mês", placeholder, registration, error, disabled }:MonthsSelectProps ) {

    const months: SelectOption[] = [
        { value: "1", label: "Janeiro" },
        { value: "2", label: "Fevereiro" },
        { value: "3", label: "Março" },
        { value: "4", label: "Abril" },
        { value: "5", label: "Maio" },
        { value: "6", label: "Junho" },
        { value: "7", label: "Julho" },
        { value: "8", label: "Agosto" },
        { value: "9", label: "Setembro" },
        { value: "10", label: "Outubro" },
        { value: "11", label: "Novembro" },
        { value: "12", label: "Dezembro" },
    ];

    return (
        <Select
            label={label}
            placeholder={placeholder}
            options={months}
            registration={registration}
            error={error}
            disabled={disabled}
        />
    )
}