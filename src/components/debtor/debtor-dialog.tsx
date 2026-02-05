import { DebtorForm } from "@/components/debtor/debtor-form";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function DebtorDialog({ className }: { className?: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="green" className="w-fit flex items-center gap-2 ml-auto">
                    <Plus className="w-4 h-4" />
                    Adicionar Devedor
                </Button>
            </DialogTrigger>
            <DialogContent className={className}>
                <DialogTitle className="sr-only">Adicionar Devedor</DialogTitle>
                <DebtorForm />
            </DialogContent>
        </Dialog>
    );
}