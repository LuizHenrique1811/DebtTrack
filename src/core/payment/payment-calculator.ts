import { Prisma } from "@prisma/client";

export function sumPayments(payments: { amount: Prisma.Decimal }[]) {
    return payments.reduce(
        (total, payment) => total.plus(payment.amount),
        new Prisma.Decimal(0),
    );
}
