"use client";

import { DebtorForm } from "@/components/debtor/debtor-form";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Debtor } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";

export function DebtorDialog({ className, debtor }: { className?: string, debtor?: Debtor }) {

    const isEditing = !!debtor;

    return (
        <Dialog>
            <DialogTrigger asChild>
                {isEditing ? (
                    <button
                        type="button"
                        aria-label={`Editar devedor ${debtor.name}`}
                        title="Editar devedor"
                        className="rounded-md p-2.5 text-zinc-600 transition-colors hover:text-emerald-600 md:p-1 dark:text-zinc-400 dark:hover:text-emerald-400"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>
                ) : (
                    <Button variant="green" className="w-fit flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Adicionar Devedor
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className={className}>
                <DialogTitle className="sr-only">Adicionar Devedor</DialogTitle>
                <DebtorForm debtor={debtor} />
            </DialogContent>
        </Dialog>
    );
}