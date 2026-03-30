"use server";

import { getCurrentUser } from "@/core/auth/current-user.service";
import { debitSchema, DebitSchema } from "@/core/debit/debit.schema";
import { createDebit } from "@/core/debit/debit.service";
import { getDebits } from "@/core/debit/debit.service";
import { revalidatePath } from "next/cache";

export async function listDebitAction() {
  const user = await getCurrentUser();
  if (!user) {
    return {
      error: "Usuário não encontrado",
    };
  }

  try {
    const debits = await getDebits(user.id);
    // Removing  complex data types like "decimal"
    const parsedDebits = debits.map((debit) => ({
      ...debit,
      totalAmount: Number(debit.totalAmount),
    }));
    return {
      success: true,
      debits: parsedDebits,
    };
  } catch (error) {
    return {
      error: "Erro ao buscar débitos",
    };
  }
}

export async function createDebitAction(data: DebitSchema) {
  const user = await getCurrentUser();
  if (!user) {
    return {
      error: "Usuário não encontrado",
    };
  }

  const validatedData = debitSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  try {
    const debit = await createDebit(user.id, data);
    revalidatePath("/dashboard/debits");
    return {
      success: true,
      debitObj:debit
    };
  } catch (error) {
    return {
      error: "Erro ao criar débito",
    };
  }
}
