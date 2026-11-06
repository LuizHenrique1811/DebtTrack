"use server";

import { getCurrentUser } from "@/core/auth/current-user.service";
import { getDebtorCharge } from "@/core/charge/charge.service";

export async function getDebtorChargeAction(debtorId: string) {
  const user = await getCurrentUser();
  if (!user) {
    return {
      error: "Usuário não encontrado",
    };
  }

  try {
    const charge = await getDebtorCharge(user.id, debtorId);
    if (!charge) {
      return {
        error: "Devedor não encontrado",
      };
    }

    return {
      success: true,
      charge,
    };
  } catch {
    return {
      error: "Erro ao gerar cobrança",
    };
  }
}
