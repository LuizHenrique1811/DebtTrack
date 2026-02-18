import { Select, SelectOption } from "@/components/ui/select";
import { UseFormRegisterReturn } from "react-hook-form";

interface DaysSelectProps {
    registration: UseFormRegisterReturn;
    error?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
}

export function DaySelect({ label = "Dia", placeholder, registration, error, disabled }: DaysSelectProps) {

    const days: SelectOption[] = Array.from({ length: 31 }, (_, i) => {
        const day = String(i + 1);
        return {
            value: day,
            label: day,
        };
    });

    return (
        <Select
            label={label}
            placeholder={placeholder}
            options={days}
            registration={registration}
            error={error}
            disabled={disabled}
        />
    )
}