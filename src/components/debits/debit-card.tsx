"use client";

import { Debit } from "@/app/generated/prisma";
import { deleteDebtorAction } from "@/actions/debtor/debtor.action";
import { User, DollarSign } from "lucide-react";
import { DebtorDialog } from "@/components/debtor/debtor-dialog";

export function DebitCard({ debit }: { debit: Debit }) {
    return (
        <article
            key={debit.id}
            className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm transition-shadow hover:shadow-md"
        >
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                    <DollarSign className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-zinc-900 dark:text-zinc-50">
                        {debit.description}
                    </h3>
                </div>
                <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100" >
                </div>
            </div>
        </article>

    );
}