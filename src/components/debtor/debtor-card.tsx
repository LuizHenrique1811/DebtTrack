"use client";

import { Debtor } from "@prisma/client";
import { deleteDebtorAction } from "@/actions/debtor/debtor.action";
import { User, Mail, Phone, Trash } from "lucide-react";
import { DebtorDialog } from "@/components/debtor/debtor-dialog";
import { ChargeDialog } from "@/components/charge/charge-dialog";

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
                <div className="flex shrink-0 items-center gap-1 transition-opacity focus-within:opacity-100 group-hover:opacity-100 [@media(hover:hover)]:opacity-0">
                    <ChargeDialog debtorId={debtor.id} debtorName={debtor.name} variant="icon" />
                    <DebtorDialog className="max-w-2xl" debtor={debtor} />
                    <button
                        type="button"
                        onClick={() => deleteDebtorAction(debtor.id)}
                        aria-label={`Excluir devedor ${debtor.name}`}
                        title="Excluir devedor"
                        className="rounded-md p-2.5 text-zinc-600 transition-colors hover:text-red-600 md:p-1 dark:text-zinc-400 dark:hover:text-red-400"
                    >
                        <Trash className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </article>

    );
}