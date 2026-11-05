import { DebitStatus, InstallmentStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PaymentError } from "@/core/payment/payment.errors";
import { PaymentSchema } from "@/core/payment/payment.schema";

export function sumPayments(payments: { amount: Prisma.Decimal }[]) {
    return payments.reduce(
        (total, payment) => total.plus(payment.amount),
        new Prisma.Decimal(0),
    );
}

export async function registerPayment(userId: string, data: PaymentSchema) {
    const amount = new Prisma.Decimal(data.amount);
    const paymentDate = new Date(`${data.paymentDate}T00:00:00.000Z`);

    return await prisma.$transaction(async (tx) => {
        // Confere o dono e trava a parcela: dois pagamentos simultâneos não
        // podem somar mais do que o valor restante.
        const owned = await tx.$queryRaw<{ id: string }[]>`
            SELECT installment."id"
            FROM "Installment" AS installment
            JOIN "Debit" AS debit ON debit."id" = installment."debitId"
            JOIN "Debtor" AS debtor ON debtor."id" = debit."debtorId"
            WHERE installment."id" = ${data.installmentId}
              AND debtor."userId" = ${userId}
            FOR UPDATE OF installment
        `;

        if (owned.length === 0) {
            throw new PaymentError("Parcela não encontrada");
        }

        const installment = await tx.installment.findUniqueOrThrow({
            where: { id: data.installmentId },
            include: { payments: { select: { amount: true } } },
        });

        if (installment.status === InstallmentStatus.PAID) {
            throw new PaymentError("Esta parcela já está paga");
        }

        if (installment.status === InstallmentStatus.CANCELLED) {
            throw new PaymentError("Esta parcela foi cancelada");
        }

        const remaining = installment.amount.minus(sumPayments(installment.payments));

        if (amount.greaterThan(remaining)) {
            throw new PaymentError("O valor é maior do que o restante da parcela");
        }

        const payment = await tx.payment.create({
            data: {
                amount,
                paymentDate,
                installmentId: installment.id,
            },
        });

        const isFullyPaid = amount.equals(remaining);

        await tx.installment.update({
            where: { id: installment.id },
            data: {
                status: isFullyPaid
                    ? InstallmentStatus.PAID
                    : InstallmentStatus.PARTIALLY_PAID,
                paidDate: isFullyPaid ? paymentDate : null,
            },
        });

        if (isFullyPaid) {
            const openInstallments = await tx.installment.count({
                where: {
                    debitId: installment.debitId,
                    status: {
                        notIn: [InstallmentStatus.PAID, InstallmentStatus.CANCELLED],
                    },
                },
            });

            if (openInstallments === 0) {
                await tx.debit.update({
                    where: { id: installment.debitId },
                    data: { status: DebitStatus.PAID },
                });
            }
        }

        return { paymentId: payment.id, isFullyPaid };
    });
}
