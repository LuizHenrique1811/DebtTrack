import { DashboardForm } from "@/components/dashboard/dashboard-form";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function DashboardDialog({ className }: { className?: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="green" className="w-fit flex items-center gap-2 ml-auto">
                    <Plus className="w-4 h-4" />
                    Adicionar Devedor
                </Button>
            </DialogTrigger>
            <DialogContent className={className}>
                <DashboardForm />
            </DialogContent>
        </Dialog>
    );
}