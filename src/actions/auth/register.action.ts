"use server";

import { UserAlreadyExistsError } from "@/core/errors/auth.errors";
import { createUser } from "@/core/services/auth.service";
import { registerSchema, RegisterSchema } from "@/core/validators/register.schema";

export async function registerAction(formData: RegisterSchema) {

    const validatedData = registerSchema.safeParse(formData);
    
    if (!validatedData.success) {
        return{
            errors: validatedData.error.flatten().fieldErrors,  
        } 
    }

    try {
        await createUser(validatedData.data);
        return { success: true };
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return { success: false, errors: { email: [error.message] } };
        }
        return { success: false, errors: { email: ["Erro ao criar usuário"] } };
    }
} 