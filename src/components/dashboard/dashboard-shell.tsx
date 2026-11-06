import type { ReactNode } from "react";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";

interface DashboardShellProps {
    userEmail?: string | null;
    children: ReactNode;
}

export function DashboardShell({ userEmail, children }: DashboardShellProps) {
    return (
        <div className="flex min-h-dvh flex-col md:flex-row">
            <DashboardNav userEmail={userEmail} />
            <main className="flex-1 overflow-auto bg-background p-4 pb-[calc(5rem+env(safe-area-inset-bottom))] md:p-6">
                {children}
            </main>
        </div>
    );
}
