

import { Select, SelectTrigger, SelectValue } from "../ui/select";

export function DebtorSelect({ debtors }: { debtors: Debtor[] }) {
    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Selecione o devedor" />
            </SelectTrigger>
        </Select>
    );
}