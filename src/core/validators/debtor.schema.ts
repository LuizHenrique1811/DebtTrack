import { z } from "zod";

export const debtorSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.union([z.literal(""), z.string().email("Email inválido")]),
  phone: z.string().optional(),
});

export type DebtorSchema = z.infer<typeof debtorSchema>;