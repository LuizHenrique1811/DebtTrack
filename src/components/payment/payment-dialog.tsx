"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PaymentForm } from "@/components/payment/payment-form";

interface PaymentDialogProps {
    installmentId: string;
    remainingAmount: number;
}

export function PaymentDialog({ installmentId, remainingAmount }: PaymentDialogProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button type="button" variant="green" className="w-auto whitespace-nowrap px-3 py-1.5 text-sm">
                    Registrar pagamento
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogTitle>Registrar pagamento</DialogTitle>
                <PaymentForm
                    installmentId={installmentId}
                    remainingAmount={remainingAmount}
                    onSuccess={() => setIsOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
