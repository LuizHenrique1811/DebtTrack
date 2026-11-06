"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, Plus } from "lucide-react";
import { DebitForm } from "@/components/debits/debit-form";
import type { DebitView } from "@/core/debit/debit.service";
import type { Debtor } from "@prisma/client";

interface DebitDialogProps {
    debtors?: Debtor[];
    debit?: DebitView;
}

export function DebitDialog({ debtors = [], debit }: DebitDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const title = debit ? "Editar Débito" : "Adicionar Débito";

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {debit ? (
                    <button
                        type="button"
                        aria-label={`Editar débito ${debit.description}`}
                        title="Editar débito"
                        className="rounded-md p-2.5 text-zinc-500 md:p-1.5 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>
                ) : (
                    <Button type="button" variant="green" className="w-fit flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Adicionar Débito
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogTitle className={debit ? undefined : "sr-only"}>{title}</DialogTitle>
                <DebitForm
                    debit={debit}
                    debtors={debtors}
                    onSuccess={debit ? () => setIsOpen(false) : undefined}
                />
            </DialogContent>
        </Dialog>
    );
}
