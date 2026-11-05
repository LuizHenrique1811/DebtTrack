"use client";

import { useState, useTransition } from "react";
import { undoPaymentAction } from "@/actions/payment/payment.action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { InstallmentView } from "@/core/installment/installment.service";
import { formatCurrency, formatDatePt } from "@/lib/utils";

type Payment = InstallmentView["payments"][number];

function PaymentHistoryItem({ payment }: { payment: Payment }) {
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState<string>();
    const [isPending, startTransition] = useTransition();

    const undo = () => {
        startTransition(async () => {
            const result = await undoPaymentAction(payment.id);

            if (result.error) {
                setError(result.error);
                setIsConfirming(false);
            }
        });
    };

    return (
        <li className="flex flex-col gap-2 border-b border-zinc-700/80 py-3 last:border-b-0">
            <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <p className="font-semibold tabular-nums text-zinc-100">
                        {formatCurrency(payment.amount)}
                    </p>
                    <p className="text-sm text-zinc-400">{formatDatePt(payment.paymentDate)}</p>
                </div>
                {!isConfirming ? (
                    <Button
                        type="button"
                        variant="gray"
                        className="w-auto px-3 py-1.5 text-sm"
                        onClick={() => {
                            setError(undefined);
                            setIsConfirming(true);
                        }}
                    >
                        Desfazer
                    </Button>
                ) : null}
            </div>
            {isConfirming ? (
                <div className="flex flex-col gap-2 rounded-lg bg-zinc-800 p-3">
                    <p className="text-sm text-zinc-200">Desfazer este pagamento?</p>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="red"
                            className="text-sm"
                            isLoading={isPending}
                            loadingText="Desfazendo..."
                            onClick={undo}
                        >
                            Sim, desfazer
                        </Button>
                        <Button
                            type="button"
                            variant="gray"
                            className="text-sm"
                            disabled={isPending}
                            onClick={() => setIsConfirming(false)}
                        >
                            Manter
                        </Button>
                    </div>
                </div>
            ) : null}
            {error ? (
                <p role="alert" className="text-sm text-red-400">
                    {error}
                </p>
            ) : null}
        </li>
    );
}

export function PaymentHistoryDialog({ payments }: { payments: Payment[] }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="whitespace-nowrap text-sm font-medium text-zinc-600 underline underline-offset-2 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                    Pagamentos ({payments.length})
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogTitle>Pagamentos</DialogTitle>
                <ul className="-my-1">
                    {payments.map((payment) => (
                        <PaymentHistoryItem key={payment.id} payment={payment} />
                    ))}
                </ul>
            </DialogContent>
        </Dialog>
    );
}
