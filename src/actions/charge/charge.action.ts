"use server";

import { getCurrentUser } from "@/core/auth/current-user.service";
import { chargeFiltersSchema, type ChargeFilters } from "@/core/charge/charge-filter";
import { getDebtorCharge, getPeriodCharges } from "@/core/charge/charge.service";

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

export async function getPeriodChargesAction(filters: ChargeFilters) {
  const user = await getCurrentUser();
  if (!user) {
    return {
      error: "Usuário não encontrado",
    };
  }

  const parsed = chargeFiltersSchema.safeParse(filters);
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Filtros inválidos",
    };
  }

  try {
    return {
      success: true,
      result: await getPeriodCharges(user.id, parsed.data),
    };
  } catch {
    return {
      error: "Erro ao montar cobranças",
    };
  }
}
