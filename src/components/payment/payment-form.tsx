"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerPaymentAction } from "@/actions/payment/payment.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { paymentSchema, PaymentSchema } from "@/core/payment/payment.schema";
import { formatCurrency, getTodayDateKey, parseCurrency } from "@/lib/utils";

interface PaymentFormProps {
    installmentId: string;
    remainingAmount: number;
    onSuccess: () => void;
}

export function PaymentForm({ installmentId, remainingAmount, onSuccess }: PaymentFormProps) {
    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors, isSubmitting },
    } = useForm<PaymentSchema>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            installmentId,
            amount: remainingAmount,
            paymentDate: getTodayDateKey(),
        },
    });

    const onSubmit = async (data: PaymentSchema) => {
        const result = await registerPaymentAction(data);

        if (result.errors) {
            Object.entries(result.errors).forEach(([field, messages]) => {
                if (messages && messages.length > 0) {
                    setError(field as keyof PaymentSchema, {
                        type: "server",
                        message: messages[0],
                    });
                }
            });
        }

        if (result.error) {
            setError("root.server", { type: "server", message: result.error });
        }

        if (result.success) {
            onSuccess();
        }
    };

    return (
        <form
            className="flex flex-col gap-4 rounded-lg bg-zinc-50/80 p-4 dark:bg-zinc-900/50"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                    <Input
                        label="Valor recebido"
                        type="text"
                        inputMode="numeric"
                        name={field.name}
                        value={formatCurrency(field.value)}
                        onChange={(e) => field.onChange(parseCurrency(e.target.value))}
                        error={errors.amount?.message}
                    />
                )}
            />
            <Input
                label="Data do pagamento"
                type="date"
                max={getTodayDateKey()}
                registration={register("paymentDate")}
                error={errors.paymentDate?.message}
            />
            {errors.root?.server?.message && (
                <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                    {errors.root.server.message}
                </p>
            )}
            <Button loadingText="Registrando..." isLoading={isSubmitting} variant="green">
                Confirmar pagamento
            </Button>
        </form>
    );
}
