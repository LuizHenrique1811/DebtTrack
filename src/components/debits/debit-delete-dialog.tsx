"use client";

import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { deleteDebitAction } from "@/actions/debit/debit.action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { DebitView } from "@/core/debit/debit.service";

export function DebitDeleteDialog({ debit }: { debit: DebitView }) {
    const [error, setError] = useState<string>();
    const [isPending, startTransition] = useTransition();
    const hasPayments = debit.paymentCount > 0;

    const remove = () => {
        startTransition(async () => {
            const result = await deleteDebitAction(debit.id);

            if (result.error) {
                setError(result.error);
            }
        });
    };

    return (
        <Dialog onOpenChange={() => setError(undefined)}>
            <DialogTrigger asChild>
                <button
                    type="button"
                    aria-label={`Excluir débito ${debit.description}`}
                    title="Excluir débito"
                    className="rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-red-600 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-red-400"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogTitle>Excluir débito</DialogTitle>
                {hasPayments ? (
                    <>
                        <p className="text-sm text-zinc-300">
                            &ldquo;{debit.description}&rdquo; tem pagamentos registrados. Desfaça os
                            pagamentos em Parcelas para poder excluir.
                        </p>
                        <DialogClose asChild>
                            <Button type="button" variant="gray" className="text-sm">
                                Entendi
                            </Button>
                        </DialogClose>
                    </>
                ) : (
                    <>
                        <p className="text-sm text-zinc-300">
                            Excluir &ldquo;{debit.description}&rdquo; de {debit.debtor.name}? As{" "}
                            {debit.installmentQty} parcela(s) também serão removidas. Isso não pode ser
                            desfeito.
                        </p>
                        {error ? (
                            <p role="alert" className="text-sm text-red-400">
                                {error}
                            </p>
                        ) : null}
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="red"
                                className="text-sm"
                                isLoading={isPending}
                                loadingText="Excluindo..."
                                onClick={remove}
                            >
                                Sim, excluir
                            </Button>
                            <DialogClose asChild>
                                <Button type="button" variant="gray" className="text-sm" disabled={isPending}>
                                    Manter
                                </Button>
                            </DialogClose>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
