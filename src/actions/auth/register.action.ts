"use server";

import { signIn } from "@/auth";
import { UserAlreadyExistsError } from "@/core/errors/auth.errors";
import { createUser } from "@/core/services/auth.service";
import {
  registerSchema,
  RegisterSchema,
} from "@/core/validators/register.schema";
import { redirect } from "next/navigation";

export async function registerAction(formData: RegisterSchema) {
  const validatedData = registerSchema.safeParse(formData);

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedData.data;
  
  try {
    await createUser(validatedData.data);
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return { success: false, errors: { email: [error.message] } };
    }
    return { success: false, errors: { email: ["Erro ao criar usuário"] } };
  }

  redirect("/dashboard");
}
