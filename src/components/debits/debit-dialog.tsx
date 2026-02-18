import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { DebitForm } from "@/components/debits/debit-form";
import type { Debtor } from "@prisma/client";

interface DebitDialogProps {
    debtors?: Debtor[];
}

export function DebitDialog({ debtors = [] }: DebitDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="green" className="w-fit flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Adicionar Débito
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogTitle className="sr-only">Adicionar Débito</DialogTitle>
                <DebitForm debtors={debtors} />
            </DialogContent>
        </Dialog>
    );
}