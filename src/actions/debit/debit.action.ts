"use server";

import { getCurrentUser } from "@/core/auth/current-user.service";
import { DebitError } from "@/core/debit/debit.errors";
import { debitSchema, DebitSchema } from "@/core/debit/debit.schema";
import { createDebit, deleteDebit, getDebits, updateDebit } from "@/core/debit/debit.service";
import { revalidatePath } from "next/cache";

function revalidateDebitPages() {
  revalidatePath("/dashboard/debits");
  revalidatePath("/dashboard/installments");
  revalidatePath("/dashboard/reports");
}

export async function listDebitAction() {
  const user = await getCurrentUser();
  if (!user) {
    return {
      error: "Usuário não encontrado",
    };
  }

  try {
    const debits = await getDebits(user.id);
    return {
      success: true,
      debits,
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
    const debit = await createDebit(user.id, validatedData.data);
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

export async function updateDebitAction(id: string, data: DebitSchema) {
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
    await updateDebit(user.id, id, validatedData.data);
    revalidateDebitPages();
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: error instanceof DebitError ? error.message : "Erro ao editar débito",
    };
  }
}

export async function deleteDebitAction(id: string) {
  const user = await getCurrentUser();
  if (!user) {
    return {
      error: "Usuário não encontrado",
    };
  }

  try {
    await deleteDebit(user.id, id);
    revalidateDebitPages();
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: error instanceof DebitError ? error.message : "Erro ao excluir débito",
    };
  }
}
