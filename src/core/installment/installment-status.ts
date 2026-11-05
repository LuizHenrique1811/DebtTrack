import { InstallmentStatus } from "@prisma/client";
import { getTodayDateKey } from "@/lib/utils";

const OPEN_STATUSES: InstallmentStatus[] = [
    InstallmentStatus.PENDING,
    InstallmentStatus.PARTIALLY_PAID,
    InstallmentStatus.OVERDUE,
];

// O atraso é calculado na leitura, e não gravado: assim não depende de uma
// rotina agendada e a parcela nunca fica com um status desatualizado.
export function getEffectiveStatus(
    installment: { status: InstallmentStatus; dueDate: Date },
    now = new Date(),
) {
    if (!OPEN_STATUSES.includes(installment.status)) {
        return installment.status;
    }

    const dueDateKey = installment.dueDate.toISOString().slice(0, 10);

    return dueDateKey < getTodayDateKey(now)
        ? InstallmentStatus.OVERDUE
        : installment.status;
}
