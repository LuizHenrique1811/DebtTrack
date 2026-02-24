import { prisma } from "@/lib/prisma";
import { DebtorSchema } from "../debit/debtor.schema";

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

export async function updateDebtor(id: string, data: DebtorSchema) {
  const debtor = await prisma.debtor.update({
    where: { id },
    data,
  });
  return debtor;
}

export async function deleteDebtor(id: string) {
  const debtor = await prisma.debtor.delete({
    where: { id },
  });
  return debtor;
}
