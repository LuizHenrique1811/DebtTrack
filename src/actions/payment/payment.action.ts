"use server";

import { getCurrentUser } from "@/core/auth/current-user.service";
import { PaymentError } from "@/core/payment/payment.errors";
import { paymentSchema, PaymentSchema } from "@/core/payment/payment.schema";
import { registerPayment, undoPayment } from "@/core/payment/payment.service";
import { revalidatePath } from "next/cache";

export async function registerPaymentAction(data: PaymentSchema) {
  const user = await getCurrentUser();
  if (!user) {
    return {
      error: "Usuário não encontrado",
    };
  }

  const validatedData = paymentSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  try {
    const payment = await registerPayment(user.id, validatedData.data);
    revalidatePath("/dashboard/installments");
    revalidatePath("/dashboard/debits");
    return {
      success: true,
      payment,
    };
  } catch (error) {
    return {
      error: error instanceof PaymentError ? error.message : "Erro ao registrar pagamento",
    };
  }
}

export async function undoPaymentAction(paymentId: string) {
  const user = await getCurrentUser();
  if (!user) {
    return {
      error: "Usuário não encontrado",
    };
  }

  try {
    await undoPayment(user.id, paymentId);
    revalidatePath("/dashboard/installments");
    revalidatePath("/dashboard/debits");
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: error instanceof PaymentError ? error.message : "Erro ao desfazer pagamento",
    };
  }
}
