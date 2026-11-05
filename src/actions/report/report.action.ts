"use server";

import { getCurrentUser } from "@/core/auth/current-user.service";
import { getReport } from "@/core/report/report.service";

export async function getReportAction() {
  const user = await getCurrentUser();
  if (!user) {
    return {
      error: "Usuário não encontrado",
    };
  }

  try {
    const report = await getReport(user.id);
    return {
      success: true,
      report,
    };
  } catch {
    return {
      error: "Erro ao gerar relatório",
    };
  }
}
