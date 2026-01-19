"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { registerAction } from "../../../actions/auth/register.action";
import {
  type RegisterSchema,
  registerSchema,
} from "../../../core/validators/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerAction(data);

    if (!result.success && result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        if (message && message.length > 0) {
          setError(field as keyof RegisterSchema, {
            type: "server",
            message: message[0],
          });
        }
      });
    }
  };

  return (
    <main className="max-w-md w-full">
      <h1 className="text-2xl font-bold text-center mb-4">Cadastro</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Nome é obrigatório" })}
          className="border border-gray-300 rounded-md p-2"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: "Email é obrigatório" })}
          className="border border-gray-300 rounded-md p-2"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: "Senha é obrigatória" })}
          className="border border-gray-300 rounded-md p-2"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <label htmlFor="confirmPassword">Confirmar Senha</label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "Confirmar senha é obrigatório",
          })}
          className="border border-gray-300 rounded-md p-2"
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
          Cadastrar
        </button>
        <p className="text-sm text-center">
          Já possui uma conta?{" "}
          <Link href="/login" className="text-blue-500">
            Faça login
          </Link>
        </p>
      </form>
    </main>
  );
}
