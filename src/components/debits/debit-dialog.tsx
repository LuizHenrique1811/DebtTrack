import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Plus } from "lucide-react";
import { DebitForm } from "@/components/debits/debit-form";

export function DebitDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="green">
                    <Plus className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogTitle className="sr-only">Adicionar Débito</DialogTitle>
                <DebitForm />
            </DialogContent>
        </Dialog>
    );
}