import { z } from "zod";

export const debitSchema = z.object({
    description: z.string().min(1, { message: "Descrição é obrigatória" }),
    debtorId: z.string().min(1, { message: "Devedor é obrigatório" }),
    totalAmount: z.number().min(1, { message: "Valor é obrigatório" }),
    installmentQty: z.coerce.number().min(1, { message: "Quantidade de parcelas é obrigatória" }),
    startMonth: z.coerce.number().min(1, { message: "Data de início é obrigatória" }),
    dueDay: z.coerce.number().min(1, { message: "Dia de vencimento é obrigatório" }),
});

export type DebitSchema = z.infer<typeof debitSchema>;