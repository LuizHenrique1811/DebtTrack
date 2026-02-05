import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { getCurrentUser } from "@/core/services/current-user.service";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUser();

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <DashboardNav userEmail={user?.email ?? null} />
            <main className="flex-1 overflow-auto bg-background p-6">
                {children}
            </main>
        </div>
    );
}
