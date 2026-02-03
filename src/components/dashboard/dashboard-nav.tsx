"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/actions/auth/logout.action";
import {
    LayoutDashboard,
    Users,
    Receipt,
    BarChart3,
    LogOut,
} from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/debtors", label: "Devedores", icon: Users },
    { href: "/dashboard/debits", label: "Débitos", icon: Receipt },
    { href: "/dashboard/reports", label: "Relatórios", icon: BarChart3 },
];

interface DashboardNavProps {
    userEmail?: string | null;
}

export function DashboardNav({ userEmail }: DashboardNavProps) {
    const pathname = usePathname();

    return (
        <aside className="flex w-56 flex-col border-r border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/40">
            <nav className="flex flex-1 flex-col gap-1 p-3">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive =
                        pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                                    : "text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                                }`}
                        >
                            <Icon className="size-4 shrink-0" />
                            {label}
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t border-neutral-200 p-3 dark:border-neutral-800">
                {userEmail && (
                    <p className="mb-2 truncate px-3 text-xs text-neutral-500 dark:text-neutral-400">
                        {userEmail}
                    </p>
                )}
                <form action={logoutAction}>
                    <button
                        type="submit"
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                    >
                        <LogOut className="size-4 shrink-0" />
                        Sair
                    </button>
                </form>
            </div>
        </aside>
    );
}
