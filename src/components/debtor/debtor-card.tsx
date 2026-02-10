"use client";

import { Debtor } from "@/app/generated/prisma";
import { deleteDebtorAction } from "@/actions/debtor/debtor.action";
import { User, Mail, Phone, Trash } from "lucide-react";
import { DebtorDialog } from "@/components/debtor/debtor-dialog";

export function DebtorCard({ debtor }: { debtor: Debtor }) {
    return (
        <article
            key={debtor.id}
            className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm transition-shadow hover:shadow-md"
        >
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                    <User className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-zinc-900 dark:text-zinc-50">
                        {debtor.name}
                    </h3>
                    {debtor.email ? (
                        <a
                            href={`mailto:${debtor.email}`}
                            className="mt-2 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                        >
                            <Mail className="h-4 w-4 shrink-0" />
                            <span className="truncate">{debtor.email}</span>
                        </a>
                    ) : null}
                    {debtor.phone ? (
                        <a
                            href={`tel:${debtor.phone}`}
                            className="mt-1 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                        >
                            <Phone className="h-4 w-4 shrink-0" />
                            <span>{debtor.phone}</span>
                        </a>
                    ) : null}
                </div>
                <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100" >
                    <DebtorDialog className="max-w-2xl" debtor={debtor} />
                    <Trash onClick={() => deleteDebtorAction(debtor.id)} className="w-4 h-4 text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400" />
                </div>
            </div>
        </article>

    );
}