import { z } from "zod";

export const MAX_INSTALLMENTS = 360;

export const debitSchema = z.object({
    description: z.string().min(1, { message: "Descrição é obrigatória" }),
    debtorId: z.string().min(1, { message: "Devedor é obrigatório" }),
    totalAmount: z.number().min(1, { message: "Valor é obrigatório" }),
    installmentQty: z.coerce
        .number()
        .int({ message: "Quantidade de parcelas deve ser um número inteiro" })
        .min(1, { message: "Quantidade de parcelas é obrigatória" })
        .max(MAX_INSTALLMENTS, { message: `Máximo de ${MAX_INSTALLMENTS} parcelas` }),
    startMonth: z.coerce
        .number()
        .int({ message: "Mês de início inválido" })
        .min(1, { message: "Data de início é obrigatória" })
        .max(12, { message: "Mês de início inválido" }),
    dueDay: z.coerce
        .number()
        .int({ message: "Dia de vencimento inválido" })
        .min(1, { message: "Dia de vencimento é obrigatório" })
        .max(31, { message: "Dia de vencimento inválido" }),
});

export type DebitSchema = z.infer<typeof debitSchema>;