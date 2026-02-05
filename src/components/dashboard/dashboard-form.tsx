"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { debtorSchema, DebtorSchema } from "@/core/validators/debtor.schema";
import { createDebtorAction } from "@/actions/debtor/debtor.action";

export function DashboardForm() {

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
        const result = await createDebtorAction(data);
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
            />
            <Input
                label="Email"
                type="email"
                placeholder="devedor@email.com"
                registration={register("email")}
                error={errors.email?.message}
            />
            <Input label="Telefone"
                type="tel"
                placeholder="(12) 34567-890"
                size={20}
                minLength={9}
                maxLength={14}
                registration={register("phone")}
                error={errors.phone?.message}
            />
            <Button loadingText="Adicionando..." isLoading={isSubmitting} variant="green">
                Adicionar Devedor
            </Button>
        </form>
    );
}   