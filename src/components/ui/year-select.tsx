import { Select, SelectOption } from "@/components/ui/select";
import { getTodayDateKey } from "@/lib/utils";
import { UseFormRegisterReturn } from "react-hook-form";

const YEARS_BEFORE = 5;
const YEARS_AFTER = 2;

interface YearSelectProps {
    registration: UseFormRegisterReturn;
    error?: string;
    label?: string;
    selectedYear?: number;
}

export function YearSelect({ label = "Ano", registration, error, selectedYear }: YearSelectProps) {
    const currentYear = Number(getTodayDateKey().slice(0, 4));

    const years = Array.from(
        { length: YEARS_BEFORE + 1 + YEARS_AFTER },
        (_, index) => currentYear - YEARS_BEFORE + index,
    );

    // Um débito antigo pode ter começado fora do intervalo padrão.
    if (selectedYear && !years.includes(selectedYear)) {
        years.push(selectedYear);
        years.sort((a, b) => a - b);
    }

    const options: SelectOption[] = years.map((year) => ({
        value: String(year),
        label: String(year),
    }));

    return <Select label={label} options={options} registration={registration} error={error} />;
}
