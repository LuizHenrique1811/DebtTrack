"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerAction } from "@/actions/auth/register.action";
import { type RegisterSchema, registerSchema } from "@/core/validators/register.schema";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export function RegisterForm() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterSchema) => {
        const result = await registerAction(data);

        if (!result.success && result.errors) {
            Object.entries(result.errors).forEach(([field, messages]) => {
                if (messages && messages.length > 0) {
                    setError(field as keyof RegisterSchema, {
                        type: "server",
                        message: messages[0]
                    });
                }
            });
        }
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Nome Completo"
                placeholder="Seu nome"
                registration={register("name")}
                error={errors.name?.message}
            />

            <Input
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                registration={register("email")}
                error={errors.email?.message}
            />

            <Input
                label="Senha"
                type="password"
                placeholder="******"
                registration={register("password")}
                error={errors.password?.message}
            />

            <Input
                label="Confirmar Senha"
                type="password"
                placeholder="******"
                registration={register("confirmPassword")}
                error={errors.confirmPassword?.message}
            />

            <Button loadingText="Cadastrando..." isLoading={isSubmitting} variant="green">
                Criar Conta
            </Button>
        </form>
    );
}