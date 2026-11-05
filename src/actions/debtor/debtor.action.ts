"use server";

import { getCurrentUser } from "@/core/auth/current-user.service";
import {
  createDebtor,
  getDebtors,
  updateDebtor,
  deleteDebtor,
} from "@/core/debtor/debtor.service";
import { debtorSchema, DebtorSchema } from "@/core/debit/debtor.schema";
import { revalidatePath } from "next/cache";

export async function listDebtorAction() {
  const user = await getCurrentUser();
  if (!user) {
    return {
      error: "Usuário não encontrado",
    };
  }

  try {
    const debtors = await getDebtors(user.id);
    return {
      success: true,
      debtors,
    };
  } catch (error) {
    return {
      error: "Erro ao buscar devedores",
    };
  }
}

export async function createDebtorAction(data: DebtorSchema) {
  const user = await getCurrentUser();
  if (!user) {
    return {
      error: "Usuário não encontrado",
    };
  }

  const validatedData = debtorSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  try {
    const debtor = await createDebtor(user.id, validatedData.data);

    revalidatePath("/dashboard/debtors");

    return {
      success: true,
      debtor,
    };
  } catch (error) {
    return {
      error: "Erro ao criar devedor",
    };
  }
}

export async function editDebtorAction(id: string, data: DebtorSchema) {
  const user = await getCurrentUser();
  if (!user) {
    return {
      error: "Usuário não encontrado",
    };
  }

  const validatedData = debtorSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  try {
    const debtor = await updateDebtor(user.id, id, validatedData.data);
    revalidatePath("/dashboard/debtors");
    return {
      success: true,
      debtor,
    };
  } catch (error) {
    return {
      error: "Erro ao editar devedor",
    };
  }
}

export async function deleteDebtorAction(id: string) {
  const user = await getCurrentUser();
  if (!user) {
    return {
      error: "Usuário não encontrado",
    };
  }

  try {
    await deleteDebtor(user.id, id);
    revalidatePath("/dashboard/debtors");
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Erro ao excluir devedor",
    };
  }
}
