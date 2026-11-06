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
    CreditCard,
} from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/debtors", label: "Devedores", icon: Users },
    { href: "/dashboard/debits", label: "Débitos", icon: Receipt },
    { href: "/dashboard/installments", label: "Parcelas", icon: CreditCard },
    { href: "/dashboard/reports", label: "Relatórios", icon: BarChart3 },
];

function isActivePath(pathname: string, href: string) {
    return pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
}

function LogoutForm({ className }: { className: string }) {
    return (
        <form action={logoutAction}>
            <button type="submit" className={className}>
                <LogOut className="size-4 shrink-0" />
                Sair
            </button>
        </form>
    );
}

function Sidebar({ pathname, userEmail }: { pathname: string; userEmail?: string | null }) {
    return (
        <aside className="hidden w-56 flex-col border-r border-neutral-200 bg-neutral-50 md:flex dark:border-neutral-800 dark:bg-neutral-900/40">
            <nav aria-label="Navegação principal" className="flex flex-1 flex-col gap-1 p-3">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = isActivePath(pathname, href);
                    return (
                        <Link
                            key={href}
                            href={href}
                            aria-current={isActive ? "page" : undefined}
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
                <LogoutForm className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100" />
            </div>
        </aside>
    );
}

function MobileHeader({ userEmail }: { userEmail?: string | null }) {
    return (
        <header className="flex items-center justify-between gap-3 border-b border-neutral-200 bg-neutral-50 px-4 py-2 md:hidden dark:border-neutral-800 dark:bg-neutral-900/40">
            <div className="min-w-0">
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">DebtTrack</p>
                {userEmail && (
                    <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">{userEmail}</p>
                )}
            </div>
            <LogoutForm className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100" />
        </header>
    );
}

function BottomNav({ pathname }: { pathname: string }) {
    return (
        <nav
            aria-label="Navegação principal"
            className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-neutral-200 bg-neutral-50 pb-[env(safe-area-inset-bottom)] md:hidden dark:border-neutral-800 dark:bg-neutral-900"
        >
            {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = isActivePath(pathname, href);
                return (
                    <Link
                        key={href}
                        href={href}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex h-16 min-w-0 flex-col items-center justify-center gap-1 text-[11px] font-medium ${isActive
                            ? "text-neutral-900 dark:text-neutral-100"
                            : "text-neutral-600 dark:text-neutral-400"
                            }`}
                    >
                        <span
                            className={`flex h-7 w-12 items-center justify-center rounded-full transition-colors ${isActive
                                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                                : ""
                                }`}
                        >
                            <Icon className="size-5" />
                        </span>
                        <span className="max-w-full truncate">{label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}

interface DashboardNavProps {
    userEmail?: string | null;
}

export function DashboardNav({ userEmail }: DashboardNavProps) {
    const pathname = usePathname();

    return (
        <>
            <MobileHeader userEmail={userEmail} />
            <Sidebar pathname={pathname} userEmail={userEmail} />
            <BottomNav pathname={pathname} />
        </>
    );
}
