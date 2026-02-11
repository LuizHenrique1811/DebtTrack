"use server"

import { getCurrentUser } from "@/core/services/current-user.service";
import { debitSchema, DebitSchema } from "@/core/validators/debit.schema";
import { createDebit } from "@/core/services/debit.service";
import { getDebits } from "@/core/services/debit.service";
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
    // console.log(validatedData)
    // return
    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
        };
    }

    try {
        await createDebit(user.id, data);
        revalidatePath("/dashboard/debits");
        return {
            success: true,
        };
    } catch (error) {
        return {
            error: "Erro ao criar débito",
        };
    }
}