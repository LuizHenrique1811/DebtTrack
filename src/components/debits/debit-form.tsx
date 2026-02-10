"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { debitSchema, DebitSchema } from "@/core/validators/debit.schema";
import { Debit } from "@/app/generated/prisma";
import { createDebitAction } from "@/actions/debit/debit.action";
import { Button } from "../ui/button";
import { listDebtorAction } from "@/actions/debtor/debtor.action";

export function DebitForm({ debit }: { debit?: Debit }) {
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<DebitSchema>({
        resolver: zodResolver(debitSchema),
    });

    const onSubmit = async (data: DebitSchema) => {
        const result = await createDebitAction(data);
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
        if (result.success) {
            reset();
        }
    }

    const { debtors, error } = listDebtorAction();
    console.log(debtors);

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Devedor"
                type="text"
                placeholder="Selecione o devedor"
                registration={register("description")}
                error={errors.description?.message}
            />
            <Input
                label="Descrição"
                type="text"
                placeholder="Descrição do débito"
                registration={register("description")}
                error={errors.description?.message}
            />
            <Input
                label="Valor"
                type="text"
                placeholder="Valor do débito"
                registration={register("totalAmount")}
                error={errors.totalAmount?.message}
            />
            <Input
                label="Quantidade de parcelas"
                type="text"
                placeholder="Quantidade de parcelas"
                registration={register("installmentQty")}
                error={errors.installmentQty?.message}
            />
            <Input
                label="Data de início"
                type="date"
                placeholder="Data de início"
                registration={register("startDate")}
                error={errors.startDate?.message}
            />
            <Input
                label="Data de vencimento"
                type="date"
                placeholder="Data de vencimento"
                registration={register("dueDay")}
                error={errors.dueDay?.message}
            />
            <Button loadingText="Adicionando..." isLoading={isSubmitting} variant="green">
                {debit ? "Atualizar Débito" : "Adicionar Débito"}
            </Button>
        </form>
    );
}