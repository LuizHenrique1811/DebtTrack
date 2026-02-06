"use server";

import { signIn } from "@/auth";
import { LoginSchema, loginSchema } from "@/core/validators/login.schema";
import { redirect } from "next/navigation";

export async function loginAction(data: LoginSchema) {
  const validatedData = loginSchema.safeParse(data);

  if (!validatedData.success) {
    return { errors: validatedData.error.flatten().fieldErrors };
  }

  const { email, password } = validatedData.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === "AuthError" &&
      "type" in error
    ) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            errors: {
              email: ["Credenciais inválidas."],
              password: ["Verifique sua senha."],
            },
          };
        default:
          return {
            success: false,
            errors: { email: ["Erro ao conectar ao serviço de autenticação."] },
          };
      }
    }
    return {
      success: false,
      errors: { email: ["Erro ao fazer login."] },
    };
  }

  redirect("/dashboard");
}
