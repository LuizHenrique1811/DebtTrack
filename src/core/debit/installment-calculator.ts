import { InstallmentStatus } from "@prisma/client";

interface GenerateInstallmentsParams {
totalAmount: number;
installmentQty: number;
startMonth: number;
dueDay: number;
debitId: string;
}

export function generateInstallments({
    totalAmount,
    installmentQty,
    startMonth,
    dueDay,
    debitId,
}: GenerateInstallmentsParams) {
const baseInstallmentValue =
    Math.floor((totalAmount / installmentQty) * 100) / 100;

const totalBase = baseInstallmentValue * installmentQty;
const remainder = Number((totalAmount - totalBase).toFixed(2));

const currentYear = new Date().getFullYear();

return Array.from({ length: installmentQty }, (_, index) => {
    const monthIndex = startMonth - 1 + index;
    const dueDate = new Date(currentYear, monthIndex, dueDay);

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
