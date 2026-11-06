"use server";

import { getCurrentUser } from "@/core/auth/current-user.service";
import { getDashboard } from "@/core/dashboard/dashboard.service";

export async function getDashboardAction() {
  const user = await getCurrentUser();
  if (!user) {
    return {
      error: "Usuário não encontrado",
    };
  }

  try {
    const dashboard = await getDashboard(user.id);
    return {
      success: true,
      dashboard,
    };
  } catch {
    return {
      error: "Erro ao carregar o dashboard",
    };
  }
}
