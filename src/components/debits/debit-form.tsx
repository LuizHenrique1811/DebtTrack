"use client";

import { formatCurrency, parseCurrency } from "@/lib/utils"
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { debitSchema, DebitSchema } from "@/core/debit/debit.schema";
import type { DebitView } from "@/core/debit/debit.service";
import type { Debtor } from "@prisma/client";
import { createDebitAction, updateDebitAction } from "@/actions/debit/debit.action";
import { DebtorSelect } from "@/components/debtor/debtor-select"
import { Button } from "@/components/ui/button";
import { MonthSelect } from "@/components/ui/month-select";
import { DaySelect } from "@/components/ui/day-select";

interface DebitFormProps {
    debit?: DebitView;
    debtors?: Debtor[];
    onSuccess?: () => void;
}

export function DebitForm({ debit, debtors = [], onSuccess }: DebitFormProps) {
    const hasPayments = (debit?.paymentCount ?? 0) > 0;

    const {
        register,
        handleSubmit,
        setError,
        reset,
        watch,
        control,
        formState: { errors, isSubmitting },
    } = useForm<DebitSchema>({
        resolver: zodResolver(debitSchema),
        defaultValues: debit
            ? {
                  debtorId: debit.debtorId,
                  description: debit.description,
                  totalAmount: debit.totalAmount,
                  installmentQty: debit.installmentQty,
                  startMonth: debit.startMonth,
                  dueDay: debit.dueDay,
              }
            : { installmentQty: 1 },
    });

    const watchedAmount = watch("totalAmount");
    const watchedQty = watch("installmentQty");

    const installmentPreview = (() => {
        const amount = Number(watchedAmount) || 0;
        const qty = Number(watchedQty) || 1;

        if (qty <= 0) return 0;
        return amount / qty;
    })();

    const onSubmit = async (data: DebitSchema) => {
        const result = debit
            ? await updateDebitAction(debit.id, data)
            : await createDebitAction(data);

        if (!result.success && result.errors) {
            Object.entries(result.errors).forEach(([field, messages]) => {
                if (messages && messages.length > 0) {
                    setError(field as keyof DebitSchema, {
                        type: "server",
                        message: messages[0]
                    });
                }
            });
        }
        if (result.error) {
            setError("root.server", { type: "server", message: result.error });
        }
        if (result.success) {
            if (!debit) reset();
            onSuccess?.();
        }
    }

    return (
        <form
            className="flex flex-col gap-4 rounded-lg bg-zinc-50/80 p-4 dark:bg-zinc-900/50 sm:gap-3 sm:p-3"
            onSubmit={handleSubmit(onSubmit)}
        >
            <section className="flex flex-col gap-4" aria-label="Identificação">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Identificação
                </h3>
                <DebtorSelect
                    debtors={debtors ?? []}
                    registration={register("debtorId")}
                    error={errors.debtorId?.message}
                />
                <Input
                    label="Descrição"
                    type="text"
                    placeholder="Ex.: Empréstimo, Compra parcelada"
                    registration={register("description")}
                    error={errors.description?.message}
                />
            </section>

            {/* fieldset desabilitado mantém os valores no formulário, ao contrário de cada campo desabilitado */}
            <fieldset disabled={hasPayments} className="flex flex-col gap-4 disabled:opacity-60 sm:gap-3">
            {hasPayments ? (
                <p className="rounded-lg bg-amber-100 p-3 text-sm text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">
                    Este débito tem pagamentos, então valores e datas estão travados. Para alterá-los, desfaça os pagamentos em Parcelas.
                </p>
            ) : null}
            <section className="flex flex-col gap-4" aria-label="Valores e parcelas">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Valores e parcelas
                </h3>
                <div className="grid gap-4 sm:grid-cols-3">
                    <Controller
                        name="totalAmount"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="Valor total"
                                type="text"
                                placeholder="0,00"
                                name={field.name}
                                value={formatCurrency(field.value)}
                                onChange={(e) => field.onChange(parseCurrency(e.target.value))}
                                error={errors.totalAmount?.message}
                            />
                        )}
                    />
                    <Input
                        label="Quantidade de parcelas"
                        type="number"
                        min="01"
                        registration={register("installmentQty")}
                        error={errors.installmentQty?.message}
                    />
                    <Input
                        label="Valor da Parcela (Prévia)"
                        type="text"
                        value={formatCurrency(installmentPreview)}
                        readOnly
                        disabled
                        className="cursor-not-allowed bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                    />
                </div>
            </section>

            <section className="flex flex-col gap-4" aria-label="Datas">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Datas
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                    <MonthSelect
                        label="Mês de início"
                        registration={register("startMonth")}
                        error={errors.startMonth?.message}
                    />
                    <DaySelect
                        label="Dia de vencimento"
                        registration={register("dueDay")}
                        error={errors.dueDay?.message}
                    />
                </div>
            </section>
            </fieldset>

            <div className="mt-2 flex flex-col gap-2 border-t border-zinc-200 pt-4 dark:border-zinc-700">
                {errors.root?.server?.message && (
                    <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                        {errors.root.server.message}
                    </p>
                )}
                <Button
                    loadingText={debit ? "Salvando..." : "Adicionando..."}
                    isLoading={isSubmitting}
                    variant="green"
                >
                    {debit ? "Salvar alterações" : "Adicionar Débito"}
                </Button>
            </div>
        </form>
    );
}