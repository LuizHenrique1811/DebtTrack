import { z } from "zod";
import { getTodayDateKey } from "@/lib/utils";

function isCalendarDate(value: string) {
    const date = new Date(`${value}T00:00:00.000Z`);

    return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

export const paymentSchema = z.object({
    installmentId: z.string().min(1, { message: "Parcela é obrigatória" }),
    amount: z
        .number({ required_error: "Informe o valor recebido" })
        .positive({ message: "Informe o valor recebido" })
        .multipleOf(0.01, { message: "Valor inválido" }),
    paymentDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Data inválida" })
        .refine(isCalendarDate, { message: "Data inválida" })
        .refine((value) => value <= getTodayDateKey(), {
            message: "A data não pode estar no futuro",
        }),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;
