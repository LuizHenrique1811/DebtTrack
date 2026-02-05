import { prisma } from "@/lib/prisma";
import { DebtorSchema } from "../validators/debtor.schema";

export async function getDebtors(userId: string) {
    const debtors = await prisma.debtor.findMany({
        where: {
            userId,
        },
    });
    return debtors;
}

export async function createDebtor(userId: string, data: DebtorSchema) {
    const debtor = await prisma.debtor.create({
        data: {
            userId,
            ...data,
        },
    });
    return debtor;
}