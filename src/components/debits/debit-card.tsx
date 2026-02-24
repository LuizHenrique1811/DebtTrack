"use client";

import { Debit, Debtor } from "@prisma/client";
import { CalendarDays, CreditCard, User, MoreVertical, ArrowDownLeft } from "lucide-react";

type ParsedDebit = Omit<Debit, "totalAmount"> & {
    totalAmount: number;
    debtor?: Pick<Debtor, "name">;
};

export function DebitCard({ debit }: { debit: ParsedDebit }) {
    const installmentPreview = debit.totalAmount / debit.installmentQty;

    const statusConfig = {
        ACTIVE: {
            label: "A Receber",
            colors: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
        },
        PAID: {
            label: "Recebido",
            colors: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
        },
        CANCELLED: {
            label: "Cancelado",
            colors: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400"
        },
    };

    const currentStatus = statusConfig[debit.status as keyof typeof statusConfig] || statusConfig.ACTIVE;

    return (
        <article className="group relative flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
            
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
                        <User className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="truncate font-semibold text-zinc-900 dark:text-zinc-50" title={debit.debtor?.name}>
                            {debit.debtor?.name || "Devedor não encontrado"}
                        </h3>
                        <p className="truncate text-sm text-zinc-500 dark:text-zinc-400" title={debit.description}>
                            {debit.description}
                        </p>
                    </div>
                </div>

                <button className="shrink-0 rounded-md p-1 text-zinc-400 opacity-0 transition-all hover:bg-zinc-100 hover:text-zinc-900 focus:opacity-100 group-hover:opacity-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-50">
                    <MoreVertical className="h-5 w-5" />
                </button>
            </div>

            <div className="my-5 flex items-end justify-between">
                <div>
                    <p className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        Total a receber
                        {debit.status === "ACTIVE" && <ArrowDownLeft className="h-4 w-4 text-amber-500" />}
                    </p>
                    <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        R$ {debit.totalAmount.toFixed(2)}
                    </p>
                </div>
                
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${currentStatus.colors}`}>
                    {currentStatus.label}
                </span>
            </div>

            <div className="flex items-center justify-between border-t border-zinc-100 pt-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                <div className="flex items-center gap-1.5" title={`Dividido em ${debit.installmentQty} parcelas`}>
                    <CreditCard className="h-4 w-4 text-zinc-400" />
                    <span className="truncate">
                        {debit.installmentQty}x <span className="hidden sm:inline">de R$ {installmentPreview.toFixed(2)}</span>
                    </span>
                </div>
                
                <div className="flex items-center gap-1.5 shrink-0 bg-zinc-50 dark:bg-zinc-800/50 px-2 py-1 rounded-md">
                    <CalendarDays className="h-4 w-4 text-zinc-400" />
                    <span className="font-medium">Cobrar dia {String(debit.dueDay).padStart(2, '0')}</span>
                </div>
            </div>
            
        </article>
    );
}