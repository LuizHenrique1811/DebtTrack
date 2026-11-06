"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ROW_COLUMNS } from "@/components/installment/installment-columns";
import { Skeleton } from "@/components/ui/skeleton";

const CARD =
    "rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900";

const CHART_BARS = [
    [70, 60],
    [85, 70],
    [55, 40],
    [90, 75],
    [65, 65],
    [80, 50],
    [60, 35],
    [75, 45],
    [50, 20],
    [65, 15],
    [45, 10],
    [35, 5],
];

function repeat(count: number, render: (index: number) => ReactNode) {
    return Array.from({ length: count }, (_, index) => render(index));
}

function PageSkeleton({ children }: { children: ReactNode }) {
    return (
        <div aria-busy="true" className="flex flex-col gap-6">
            <span role="status" className="sr-only">
                Carregando...
            </span>
            {children}
        </div>
    );
}

function PageHeader({ title, hasAction = false }: { title: string; hasAction?: boolean }) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{title}</h1>
            {hasAction ? <Skeleton className="h-10 w-44 rounded-lg" /> : null}
        </div>
    );
}

function FiltersSkeleton({ count, className }: { count: number; className: string }) {
    return (
        <div className={`grid gap-3 ${className}`}>
            {repeat(count, (index) => (
                <div key={index} className="flex flex-col gap-1.5">
                    <Skeleton className="my-0.5 h-4 w-20" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                </div>
            ))}
        </div>
    );
}

function ResultCountSkeleton() {
    return <Skeleton className="my-0.5 h-4 w-40" />;
}

function StatTilesSkeleton() {
    return (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            {repeat(4, (index) => (
                <div
                    key={index}
                    className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5 dark:border-zinc-800 dark:bg-zinc-900"
                >
                    <Skeleton className="my-0.5 h-4 w-24 max-w-full" />
                    <Skeleton className="mt-2 h-6 w-32 max-w-full sm:h-7" />
                    <Skeleton className="mt-2 h-3.5 w-36 max-w-full" />
                </div>
            ))}
        </div>
    );
}

function DebitCardSkeleton() {
    return (
        <div className={CARD}>
            <div className="flex items-start gap-3">
                <Skeleton className="size-10 shrink-0 rounded-full" />
                <div className="min-w-0 flex-1">
                    <Skeleton className="my-1 h-4 w-32 max-w-full" />
                    <Skeleton className="my-1 h-3.5 w-24 max-w-full" />
                </div>
                <Skeleton className="size-6 shrink-0" />
            </div>
            <div className="my-5 flex items-end justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <Skeleton className="my-0.5 h-4 w-24 max-w-full" />
                    <Skeleton className="mt-2 h-7 w-36 max-w-full" />
                </div>
                <Skeleton className="h-6 w-20 shrink-0 rounded-full" />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-7 w-28" />
            </div>
        </div>
    );
}

function DebtorCardSkeleton() {
    return (
        <div className={CARD}>
            <div className="flex items-start gap-3">
                <Skeleton className="size-10 shrink-0 rounded-full" />
                <div className="min-w-0 flex-1">
                    <Skeleton className="my-1 h-4 w-32 max-w-full" />
                    <Skeleton className="mt-3 h-3.5 w-44 max-w-full" />
                    <Skeleton className="mt-2.5 h-3.5 w-28 max-w-full" />
                </div>
            </div>
        </div>
    );
}

function InstallmentRowSkeleton() {
    return (
        <div
            className={`grid grid-cols-2 items-center gap-x-4 gap-y-2 border-b border-zinc-200 py-4 last:border-b-0 dark:border-zinc-800 ${ROW_COLUMNS}`}
        >
            <Skeleton className="order-1 h-4 w-28 max-w-full lg:order-none" />
            <Skeleton className="order-3 h-3.5 w-32 max-w-full lg:order-none" />
            <Skeleton className="order-4 ml-auto h-3.5 w-20 lg:order-none lg:ml-0" />
            <Skeleton className="order-5 h-3.5 w-20 lg:order-none" />
            <Skeleton className="order-2 ml-auto h-4 w-20 lg:order-none" />
            <Skeleton className="order-6 ml-auto h-5 w-16 rounded-full lg:order-none lg:ml-0" />
            <Skeleton className="order-7 col-span-2 ml-auto h-9 w-40 rounded-lg lg:order-none lg:col-span-1" />
        </div>
    );
}

function ChartSkeleton() {
    return (
        <div className={CARD}>
            <div className="mb-4 flex items-center justify-between gap-4">
                <Skeleton className="my-1 h-5 w-40" />
                <Skeleton className="h-4 w-36" />
            </div>
            <div className="flex gap-2">
                <div className="flex h-48 w-12 shrink-0 flex-col items-end justify-between">
                    {repeat(3, (index) => (
                        <Skeleton key={index} className="h-3 w-9" />
                    ))}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="grid h-48 grid-cols-12 border-b border-zinc-200 dark:border-zinc-800">
                        {CHART_BARS.map(([expected, received], index) => (
                            <div key={index} className="flex items-end justify-center gap-0.5 px-px">
                                <Skeleton
                                    className="w-full max-w-5 rounded-b-none"
                                    style={{ height: `${expected}%` }}
                                />
                                <Skeleton
                                    className="w-full max-w-5 rounded-b-none"
                                    style={{ height: `${received}%` }}
                                />
                            </div>
                        ))}
                    </div>
                    <Skeleton className="mt-2 h-3 w-full" />
                </div>
            </div>
            <Skeleton className="mt-4 h-4 w-24" />
        </div>
    );
}

function DashboardInstallmentsSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {repeat(2, (card) => (
                <div key={card} className={`min-w-0 ${CARD}`}>
                    <div className="mb-3 flex items-center justify-between gap-4">
                        <Skeleton className="my-1 h-5 w-32" />
                        <Skeleton className="h-5 w-28" />
                    </div>
                    {repeat(3, (row) => (
                        <div
                            key={row}
                            className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2 border-b border-zinc-200 py-3 first:pt-0 last:border-b-0 last:pb-0 dark:border-zinc-800"
                        >
                            <Skeleton className="h-4 w-28 max-w-full" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-3.5 w-40 max-w-full" />
                            <Skeleton className="h-3.5 w-28" />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

function DebtorBalancesSkeleton({ rows }: { rows: number }) {
    return (
        <div className={`min-w-0 ${CARD}`}>
            <Skeleton className="mb-5 mt-1 h-5 w-36" />
            {repeat(rows, (row) => (
                <div
                    key={row}
                    className="border-b border-zinc-200 py-3 first:pt-0 last:border-b-0 last:pb-0 dark:border-zinc-800"
                >
                    <div className="flex items-center justify-between gap-4">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="mt-2.5 h-1.5 w-full" />
                </div>
            ))}
        </div>
    );
}

function CollectionSkeleton() {
    return (
        <div className={CARD}>
            <div className="mb-2 flex items-center justify-between gap-4">
                <Skeleton className="my-1 h-5 w-48 max-w-full" />
                <Skeleton className="h-5 w-28" />
            </div>
            {repeat(3, (row) => (
                <div
                    key={row}
                    className="flex items-center justify-between gap-4 border-b border-zinc-200 py-4 last:border-b-0 dark:border-zinc-800"
                >
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-20" />
                </div>
            ))}
        </div>
    );
}

function OverviewSkeleton() {
    return (
        <PageSkeleton>
            <div>
                <Skeleton className="my-0.5 h-7 w-56" />
                <Skeleton className="mt-2 h-4 w-40" />
            </div>
            <StatTilesSkeleton />
            <DashboardInstallmentsSkeleton />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="min-w-0 xl:col-span-2">
                    <ChartSkeleton />
                </div>
                <DebtorBalancesSkeleton rows={5} />
            </div>
        </PageSkeleton>
    );
}

function DebtorsSkeleton() {
    return (
        <PageSkeleton>
            <PageHeader title="Devedores" hasAction />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {repeat(6, (index) => (
                    <DebtorCardSkeleton key={index} />
                ))}
            </div>
        </PageSkeleton>
    );
}

function DebitsSkeleton() {
    return (
        <PageSkeleton>
            <PageHeader title="Débitos" hasAction />
            <div className="flex flex-col gap-4">
                <FiltersSkeleton count={3} className="sm:grid-cols-3 lg:max-w-3xl" />
                <ResultCountSkeleton />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {repeat(6, (index) => (
                        <DebitCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        </PageSkeleton>
    );
}

function InstallmentsSkeleton() {
    return (
        <PageSkeleton>
            <PageHeader title="Parcelas" />
            <div className="flex flex-col gap-4">
                <FiltersSkeleton count={4} className="sm:grid-cols-2 lg:grid-cols-4" />
                <ResultCountSkeleton />
                <div className="rounded-xl border border-zinc-200 bg-white px-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    {repeat(8, (index) => (
                        <InstallmentRowSkeleton key={index} />
                    ))}
                </div>
            </div>
        </PageSkeleton>
    );
}

function ReportsSkeleton() {
    return (
        <PageSkeleton>
            <PageHeader title="Relatórios" />
            <StatTilesSkeleton />
            <CollectionSkeleton />
            <ChartSkeleton />
            <DebtorBalancesSkeleton rows={3} />
        </PageSkeleton>
    );
}

const PAGE_SKELETONS: Record<string, ReactNode> = {
    "/dashboard/debtors": <DebtorsSkeleton />,
    "/dashboard/debits": <DebitsSkeleton />,
    "/dashboard/installments": <InstallmentsSkeleton />,
    "/dashboard/reports": <ReportsSkeleton />,
};

export function DashboardPageSkeleton() {
    const pathname = usePathname();

    return PAGE_SKELETONS[pathname] ?? <OverviewSkeleton />;
}
