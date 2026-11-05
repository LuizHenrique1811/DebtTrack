import { AppError } from "@/core/auth/auth.errors";

// Regra de negócio violada, com uma mensagem que pode ser mostrada ao usuário.
export class PaymentError extends AppError {
    constructor(message: string) {
        super(message);
        this.name = "PaymentError";
    }
}
