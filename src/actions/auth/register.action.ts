'use server'

import { createUser } from "../../core/services/auth.service";
import { registerSchema, RegisterSchema } from "../../core/validators/register.schema";

export async function registerAction(formData: RegisterSchema) {

    const validatedData = registerSchema.safeParse(formData);
    
    if (!validatedData.success) {
        return{
            errors: validatedData.error.flatten().fieldErrors,  
        } 
    }

    await createUser(validatedData.data);

    return { success: true };
} 