import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getCurrentUser } from "@/core/auth/current-user.service";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUser();

    return <DashboardShell userEmail={user?.email ?? null}>{children}</DashboardShell>;
}
