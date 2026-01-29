"use server";

import { InvalidCredentialsError } from "@/core/errors/auth.errors";
import { login } from "@/core/services/auth.service";
import { LoginSchema, loginSchema } from "@/core/validators/login.schema";

export async function loginAction(data: LoginSchema) {
    
    const validatedData = loginSchema.safeParse(data);

    if (!validatedData.success) {
        return { errors: validatedData.error.flatten().fieldErrors };
    }

    try {
        await login(validatedData.data);
        return { success: true };
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return { success: false, errors: { email: [error.message], password: [error.message] } };
        }
        return { success: false, errors: { email: ["Erro ao fazer login"] } };
    }
}