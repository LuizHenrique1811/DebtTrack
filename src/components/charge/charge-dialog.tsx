"use client";

import { useState, useTransition } from "react";
import { Check, Copy, Loader2, MessageCircle, Send } from "lucide-react";
import { getDebtorChargeAction } from "@/actions/charge/charge.action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";

type ChargeResult = Awaited<ReturnType<typeof getDebtorChargeAction>>;
type Charge = NonNullable<ChargeResult["charge"]>;

function ChargePreview({ charge }: { charge: Charge }) {
    const [isCopied, setIsCopied] = useState(false);
    const [copyError, setCopyError] = useState<string>();

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(charge.message);
            setCopyError(undefined);
            setIsCopied(true);
        } catch {
            setCopyError("Não foi possível copiar a mensagem");
        }
    };

    return (
        <>
            <p className="whitespace-pre-wrap break-words rounded-lg bg-zinc-800 p-3 text-sm text-zinc-200">
                {charge.message}
            </p>
            <p className="flex items-baseline justify-between gap-3 text-sm text-zinc-400">
                Total a pagar
                <span className="text-lg font-semibold tabular-nums text-zinc-100">
                    {formatCurrency(charge.total)}
                </span>
            </p>
            {!charge.whatsAppUrl ? (
                <p className="text-sm text-zinc-400">
                    Cadastre um telefone com DDD no devedor para enviar pelo WhatsApp.
                </p>
            ) : null}
            <div className="flex flex-col gap-2 sm:flex-row">
                {charge.whatsAppUrl ? (
                    <a
                        href={charge.whatsAppUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded bg-green-600 p-2 font-medium text-white transition-colors hover:bg-green-700"
                    >
                        <MessageCircle className="h-4 w-4" />
                        Abrir no WhatsApp
                    </a>
                ) : null}
                <Button type="button" variant="gray" onClick={copy}>
                    {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {isCopied ? "Copiado!" : "Copiar mensagem"}
                </Button>
            </div>
            {copyError ? (
                <p role="alert" className="text-sm text-red-400">
                    {copyError}
                </p>
            ) : null}
        </>
    );
}

export function ChargeDialog({
    debtorId,
    debtorName,
    variant = "button",
}: {
    debtorId: string;
    debtorName: string;
    variant?: "button" | "icon";
}) {
    const [result, setResult] = useState<ChargeResult>();
    const [isPending, startTransition] = useTransition();

    // Busca ao abrir para mostrar o saldo atual, e não o da hora em que a página carregou.
    const load = (isOpen: boolean) => {
        if (!isOpen) return;

        setResult(undefined);
        startTransition(async () => {
            setResult(await getDebtorChargeAction(debtorId));
        });
    };

    return (
        <Dialog onOpenChange={load}>
            <DialogTrigger asChild>
                {variant === "icon" ? (
                    <button
                        type="button"
                        aria-label={`Enviar cobrança para ${debtorName}`}
                        title="Enviar cobrança"
                        className="rounded-md p-2.5 text-zinc-600 transition-colors hover:text-emerald-600 md:p-1 dark:text-zinc-400 dark:hover:text-emerald-400"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                ) : (
                    <Button
                        type="button"
                        variant="gray"
                        aria-label={`Enviar cobrança para ${debtorName}`}
                        className="w-auto px-3 py-1.5 text-sm"
                    >
                        <Send className="h-4 w-4" />
                        Enviar cobrança
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-md" aria-describedby={undefined}>
                <DialogTitle className="pr-6 leading-snug">Cobrança de {debtorName}</DialogTitle>
                {isPending || !result ? (
                    <p className="flex items-center gap-2 text-sm text-zinc-400">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Buscando pendências...
                    </p>
                ) : result.error ? (
                    <p role="alert" className="text-sm text-red-400">
                        {result.error}
                    </p>
                ) : result.charge && result.charge.total > 0 ? (
                    <ChargePreview charge={result.charge} />
                ) : (
                    <p className="text-sm text-zinc-400">Nenhuma pendência para cobrar.</p>
                )}
            </DialogContent>
        </Dialog>
    );
}
