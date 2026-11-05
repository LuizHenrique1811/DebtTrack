import { InstallmentStatus } from "@prisma/client";

interface GenerateInstallmentsParams {
totalAmount: number;
installmentQty: number;
startMonth: number;
dueDay: number;
debitId: string;
now?: Date;
}

// Mês de início já passado no ano corrente significa o ano seguinte. O mês
// corrente continua neste ano, mesmo que o dia de vencimento já tenha passado.
function getStartYear(startMonth: number, now: Date) {
    const currentMonth = now.getMonth() + 1;

    return startMonth < currentMonth ? now.getFullYear() + 1 : now.getFullYear();
}

// Limita o dia ao fim do mês: dia 31 vira 28 ou 29 em fevereiro e 30 em abril.
function getDueDate(year: number, monthIndex: number, dueDay: number) {
    const lastDayOfMonth = new Date(year, monthIndex + 1, 0).getDate();

    return new Date(year, monthIndex, Math.min(dueDay, lastDayOfMonth));
}

export function generateInstallments({
    totalAmount,
    installmentQty,
    startMonth,
    dueDay,
    debitId,
    now = new Date(),
}: GenerateInstallmentsParams) {
const baseInstallmentValue =
    Math.floor((totalAmount / installmentQty) * 100) / 100;

const totalBase = baseInstallmentValue * installmentQty;
const remainder = Number((totalAmount - totalBase).toFixed(2));

const startYear = getStartYear(startMonth, now);

return Array.from({ length: installmentQty }, (_, index) => {
    const monthIndex = startMonth - 1 + index;
    const dueDate = getDueDate(startYear, monthIndex, dueDay);

    const isLast = index === installmentQty - 1;

    return {
    debitId,
    amount: isLast ? baseInstallmentValue + remainder : baseInstallmentValue,
    installmentNumber: index + 1,
    dueDate,
    status: InstallmentStatus.PENDING,
    };
});
}
