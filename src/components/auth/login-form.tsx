"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/ui/form-input";
import { LoginSchema, loginSchema } from "@/core/validators/login.schema";
import { useForm } from "react-hook-form";
import { loginAction } from "@/actions/auth/login.action";
import { FormButton } from "../ui/form-button";

export function LoginForm() {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginSchema) => {
        const result = await loginAction(data);
        if (!result.success && result.errors) {
            Object.entries(result.errors).forEach(([field, messages]) => {
                if (messages && messages.length > 0) {
                    setError(field as keyof LoginSchema, {
                        type: "server",
                        message: messages[0]
                    });
                }
            });
        }
        else {
            // Sucesso! Redirecionar ou mostrar toast
            console.log("Sucesso!");
        }
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={(handleSubmit(onSubmit))}>
            <FormInput
                label="Email"
                type="email"
                placeholder="seu@email.com"
                registration={register("email")}
                error={errors.email?.message}
            />
            <FormInput
                label="Senha"
                type="password"
                placeholder="******"
                registration={register("password")}
                error={errors.password?.message}
            />
            <FormButton isLoading={isSubmitting} variant="primary">
                Entrar
            </FormButton>
        </form>
    );
}