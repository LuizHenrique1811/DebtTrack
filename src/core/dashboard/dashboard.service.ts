import { buildDashboard } from "@/core/dashboard/dashboard-calculator";
import { listReportInstallments } from "@/core/report/report.service";

export async function getDashboard(userId: string) {
    return buildDashboard(await listReportInstallments(userId));
}
