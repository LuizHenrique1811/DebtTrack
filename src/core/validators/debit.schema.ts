import { z } from "zod";

export const debitSchema = z.object({
    description: z.string().min(1, { message: "Descrição é obrigatória" }),
    debtorId: z.string().min(1, { message: "Devedor é obrigatório" }),
    totalAmount: z.number().min(1, { message: "Valor é obrigatório" }),
    installmentQty: z.number().min(1, { message: "Quantidade de parcelas é obrigatória" }),
    startDate: z.date().min(new Date(), { message: "Data de início é obrigatória" }),
    dueDay: z.number().min(1, { message: "Dia de vencimento é obrigatório" }),
    accountId: z.string().min(1, { message: "Conta é obrigatória" }),
});

export type DebitSchema = z.infer<typeof debitSchema>;