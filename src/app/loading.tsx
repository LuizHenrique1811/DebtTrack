"use client";

import { usePathname } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardPageSkeleton } from "@/components/dashboard/dashboard-skeleton";

// Aparece enquanto o layout do dashboard busca o usuário, por isso repete a navegação.
export default function Loading() {
    const pathname = usePathname();

    if (!pathname.startsWith("/dashboard")) return null;

    return (
        <DashboardShell>
            <DashboardPageSkeleton />
        </DashboardShell>
    );
}
