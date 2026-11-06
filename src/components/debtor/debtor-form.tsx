"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { debtorSchema, DebtorSchema } from "@/core/debit/debtor.schema";
import { createDebtorAction, editDebtorAction } from "@/actions/debtor/debtor.action";
import { Debtor } from "@prisma/client";

export function DebtorForm({ debtor }: { debtor?: Debtor }) {

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<DebtorSchema>({
        resolver: zodResolver(debtorSchema),
    });

    const onSubmit = async (data: DebtorSchema) => {
        const result = debtor ? await editDebtorAction(debtor.id, data) : await createDebtorAction(data);

        if (!result.success && result.errors) {
            Object.entries(result.errors).forEach(([field, messages]) => {
                if (messages && messages.length > 0) {
                    setError(field as keyof DebtorSchema, {
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

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Nome"
                type="text"
                placeholder="Nome do devedor"
                registration={register("name")}
                error={errors.name?.message}
                defaultValue={debtor?.name ?? ""}
            />
            <Input
                label="Email"
                type="email"
                placeholder="devedor@email.com"
                registration={register("email")}
                error={errors.email?.message}
                defaultValue={debtor?.email ?? ""}
            />
            <Input label="Telefone"
                type="tel"
                placeholder="(12) 34567-8901"
                size={20}
                minLength={9}
                maxLength={15}
                registration={register("phone")}
                error={errors.phone?.message}
                defaultValue={debtor?.phone ?? ""}
            />
            <Button loadingText="Adicionando..." isLoading={isSubmitting} variant="green">
                {debtor ? "Atualizar Devedor" : "Adicionar Devedor"}
            </Button>
        </form>
    );
}   