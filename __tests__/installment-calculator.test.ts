// __tests__/installment-calculator.test.ts

import { generateInstallments } from "@/core/debit/installment-calculator";
import { InstallmentStatus } from "@prisma/client";

describe("generateInstallments", () => {
  it("should generate correct installments with proper amounts", () => {
    const installments = generateInstallments({
      totalAmount: 300,
      installmentQty: 3,
      startMonth: 1,
      dueDay: 15,
      debitId: "debit-1",
    });

    // Checando o número de parcelas geradas
    expect(installments.length).toBe(3);

    // Checando o valor da primeira parcela (espera-se que seja 100)
    expect(installments[0].amount).toBeCloseTo(100, 2);

    // Checando a data de vencimento da primeira parcela
    expect(installments[0].dueDate.getDate()).toBe(15);
    expect(installments[0].dueDate.getMonth()).toBe(0); // Janeiro

    // Checando a quantidade de parcelas (deve ser 3)
    expect(installments[installments.length - 1].installmentNumber).toBe(3);

    // Checando o status das parcelas
    expect(installments[0].status).toBe(InstallmentStatus.PENDING);
    expect(installments[installments.length - 1].status).toBe(InstallmentStatus.PENDING);
  });

  it("should apply remainder to the last installment", () => {
    const installments = generateInstallments({
      totalAmount: 301,
      installmentQty: 3,
      startMonth: 1,
      dueDay: 15,
      debitId: "debit-1",
    });

    // Verificando que o valor das parcelas não seja igual
    expect(installments[0].amount).toBeCloseTo(100.33, 2);
    expect(installments[1].amount).toBeCloseTo(100.33, 2);
    expect(installments[2].amount).toBeCloseTo(100.34, 2); // Última parcela recebe o restante
  });

  it("should generate installments with the correct number of installments", () => {
    const installments = generateInstallments({
      totalAmount: 500,
      installmentQty: 5,
      startMonth: 2,
      dueDay: 10,
      debitId: "debit-2",
    });

    // Verificando a quantidade de parcelas
    expect(installments.length).toBe(5);
  });
});