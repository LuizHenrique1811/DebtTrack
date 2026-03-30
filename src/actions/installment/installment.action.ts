"use server";

import { getCurrentUser } from "@/core/auth/current-user.service";
import { getInstallments } from "@/core/installment/installment.service";

export async function listInstallmentAction() {
    const user = await getCurrentUser();
    if (!user) {
        return {
            error: "Usuário não encontrado",
        };
    }

    try {
        const installments = await getInstallments(user.id);
        console.log(installments);
        return {
            success: true,
            installments,
        };
    } catch (error) {
        return {
            error: "Erro ao buscar parcelas",
        };
    }
}