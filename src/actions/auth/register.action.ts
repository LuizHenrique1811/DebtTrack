'use server'

import { createUser } from "../../core/services/auth.service";
import { RegisterActionResult, registerSchema } from "../../core/validators/register.schema";

export async function registerAction(formData: FormData): Promise<RegisterActionResult> {

    const rawData = Object.fromEntries(formData);

    const validatedData = registerSchema.safeParse(rawData);
    
    if (!validatedData.success) {
        console.log(validatedData.error.flatten().fieldErrors);
        return{
            success: false,
            errors: validatedData.error.flatten().fieldErrors,  
        } 
    }

    try {
        await createUser(validatedData.data);
    } catch (error) {
        return {
            success: false,
            errors: error as Record<string, string[]>,
        }
    }

    return {
        success: true,
    };
} 