"use client";

import { Check, Copy, FileText, ImageDown, MessageCircle, RotateCcw } from "lucide-react";
import { useRef, useState } from "react";
import type { ChargeItem } from "@/core/charge/charge-calculator";
import type { PeriodChargesResult } from "@/core/charge/charge.service";
import { cn, formatCurrency, formatDateShortPt, getTodayDateKey } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Charge = PeriodChargesResult["charges"][number];

const IMAGE_TIMEOUT_MS = 20_000;

const ACTION =
    "flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50";
const SECONDARY =
    "border border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800";

function ItemRows({ title, items, tone }: { title: string; items: ChargeItem[]; tone?: "overdue" | "paid" }) {
    if (items.length === 0) return null;

    const today = getTodayDateKey();

    return (
        <div>
            <p
                className={cn(
                    "mb-1 text-xs font-semibold uppercase tracking-wide",
                    tone === "overdue"
                        ? "text-red-600 dark:text-red-400"
                        : tone === "paid"
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-zinc-500 dark:text-zinc-400",
                )}
            >
                {title}
            </p>
            <ul>
                {items.map((item) => {
                    const isPartial = item.remaining > 0 && item.remaining < item.amount;
                    return (
                        <li
                            key={item.id}
                            className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 border-t border-zinc-200 py-2 text-sm dark:border-zinc-800"
                        >
                            <div className="min-w-0">
                                <p className="truncate text-zinc-900 dark:text-zinc-50">
                                    {item.description} · {item.installmentNumber}/{item.installmentQty}
                                </p>
                                <p className="tabular-nums text-zinc-500 dark:text-zinc-400">
                                    {tone === "paid"
                                        ? "Vencimento"
                                        : item.dueDate.toISOString().slice(0, 10) < today
                                          ? "Venceu"
                                          : "Vence"}{" "}
                                    em{" "}
                                    {formatDateShortPt(item.dueDate)}
                                </p>
                            </div>
                            <div className="text-right tabular-nums">
                                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                                    {formatCurrency(tone === "paid" ? item.amount : item.remaining)}
                                </p>
                                {isPartial ? (
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                        de {formatCurrency(item.amount)}
                                    </p>
                                ) : null}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function fileName(name: string) {
    const slug = name
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();

    return `cobranca-${slug || "devedor"}.png`;
}

export function PeriodChargeCard({
    charge,
    periodLabel,
    printHref,
}: {
    charge: Charge;
    periodLabel: string;
    printHref: string;
}) {
    const summaryRef = useRef<HTMLDivElement>(null);
    const [message, setMessage] = useState(charge.message);
    const [feedback, setFeedback] = useState<{ kind: "ok" | "error"; text: string }>();
    const [isExporting, setIsExporting] = useState(false);

    const whatsAppUrl = buildWhatsAppUrl(charge.phone, message);
    const isEdited = message !== charge.message;
    const hasOpen = charge.total > 0;

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(message);
            setFeedback({ kind: "ok", text: "Mensagem copiada" });
        } catch {
            setFeedback({ kind: "error", text: "Não foi possível copiar a mensagem" });
        }
    };

    // No celular abre o compartilhamento com a imagem; no computador baixa o arquivo.
    const exportImage = async () => {
        if (!summaryRef.current) return;

        setIsExporting(true);
        setFeedback(undefined);
        try {
            const { toBlob } = await import("html-to-image");
            // Sem limite o botão ficaria em "Gerando..." se o navegador não desenhar a imagem.
            const blob = await Promise.race([
                toBlob(summaryRef.current, { pixelRatio: 2, cacheBust: true }),
                new Promise<null>((resolve) => setTimeout(() => resolve(null), IMAGE_TIMEOUT_MS)),
            ]);
            if (!blob) throw new Error("empty image");

            const file = new File([blob], fileName(charge.debtorName), { type: "image/png" });

            if (navigator.canShare?.({ files: [file] })) {
                try {
                    await navigator.share({ files: [file], title: `Cobrança de ${charge.debtorName}` });
                    return;
                } catch (error) {
                    if (error instanceof DOMException && error.name === "AbortError") return;
                }
            }

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = file.name;
            link.click();
            URL.revokeObjectURL(url);
            setFeedback({ kind: "ok", text: "Imagem baixada" });
        } catch {
            setFeedback({ kind: "error", text: "Não foi possível gerar a imagem" });
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <article className="flex min-w-0 flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            {/* Este bloco vira a imagem: tem fundo próprio para sair legível no tema escuro. */}
            <div ref={summaryRef} className="flex flex-col gap-3 bg-white dark:bg-zinc-900">
                <header className="flex items-baseline justify-between gap-3">
                    <div className="min-w-0">
                        <h2 className="truncate text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                            {charge.debtorName}
                        </h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {charge.overdue.length > 0 && charge.open.length === 0 && charge.paid.length === 0
                                ? "Parcelas em atraso"
                                : `Parcelas ${periodLabel}`}
                        </p>
                    </div>
                    <div className="shrink-0 text-right">
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {hasOpen ? "A pagar" : "Pago"}
                        </p>
                        <p className="text-lg font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                            {formatCurrency(hasOpen ? charge.total : charge.paidTotal)}
                        </p>
                    </div>
                </header>
                <ItemRows title="Em atraso" items={charge.overdue} tone="overdue" />
                <ItemRows title="No período" items={charge.open} />
                <ItemRows title="Pagas" items={charge.paid} tone="paid" />
            </div>

            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                    <label
                        htmlFor={`message-${charge.debtorId}`}
                        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                        Mensagem
                    </label>
                    {isEdited ? (
                        <button
                            type="button"
                            onClick={() => setMessage(charge.message)}
                            className="flex items-center gap-1 text-xs font-medium text-zinc-600 hover:underline dark:text-zinc-400"
                        >
                            <RotateCcw className="h-3 w-3" />
                            Restaurar texto
                        </button>
                    ) : null}
                </div>
                <textarea
                    id={`message-${charge.debtorId}`}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={Math.min(12, message.split("\n").length + 1)}
                    className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 sm:text-sm"
                />
            </div>

            {!whatsAppUrl ? (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Cadastre um telefone com DDD no devedor para enviar pelo WhatsApp.
                </p>
            ) : null}

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {whatsAppUrl ? (
                    <a
                        href={whatsAppUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(ACTION, "col-span-2 bg-green-600 text-white hover:bg-green-700 sm:col-span-1")}
                    >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                    </a>
                ) : null}
                <button type="button" onClick={copy} className={cn(ACTION, SECONDARY)}>
                    {feedback?.text === "Mensagem copiada" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copiar
                </button>
                <button
                    type="button"
                    onClick={exportImage}
                    disabled={isExporting}
                    className={cn(ACTION, SECONDARY)}
                >
                    <ImageDown className="h-4 w-4" />
                    {isExporting ? "Gerando..." : "Imagem"}
                </button>
                <a href={printHref} target="_blank" rel="noreferrer" className={cn(ACTION, SECONDARY)}>
                    <FileText className="h-4 w-4" />
                    PDF
                </a>
            </div>

            {feedback ? (
                <p
                    role={feedback.kind === "error" ? "alert" : "status"}
                    className={cn(
                        "text-sm",
                        feedback.kind === "error" ? "text-red-600 dark:text-red-400" : "text-zinc-500 dark:text-zinc-400",
                    )}
                >
                    {feedback.text}
                </p>
            ) : null}
        </article>
    );
}
