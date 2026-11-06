// __tests__/installment-calculator.test.ts

import { generateInstallments } from "@/core/debit/installment-calculator";
import { InstallmentStatus } from "@prisma/client";

describe("generateInstallments", () => {
  it("should generate correct installments with proper amounts", () => {
    const installments = generateInstallments({
      totalAmount: 300,
      installmentQty: 3,
      startMonth: 1,
      startYear: 2026,
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
      startYear: 2026,
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
      startYear: 2026,
      dueDay: 10,
      debitId: "debit-2",
    });

    // Verificando a quantidade de parcelas
    expect(installments.length).toBe(5);
  });
});

describe("generateInstallments due dates", () => {
  function dueDates({
    startYear = 2026,
    ...params
  }: {
    startMonth: number;
    startYear?: number;
    dueDay: number;
    installmentQty: number;
  }) {
    return generateInstallments({ totalAmount: 1000, debitId: "debit-1", startYear, ...params }).map(
      ({ dueDate }) => {
        const month = String(dueDate.getMonth() + 1).padStart(2, "0");
        const day = String(dueDate.getDate()).padStart(2, "0");
        return `${dueDate.getFullYear()}-${month}-${day}`;
      },
    );
  }

  describe("month length", () => {
    it("should clamp day 31 to February 28 in a common year", () => {
      expect(dueDates({ startMonth: 1, startYear: 2027, dueDay: 31, installmentQty: 3 })).toEqual([
        "2027-01-31",
        "2027-02-28",
        "2027-03-31",
      ]);
    });

    it("should clamp day 31 to February 29 in a leap year", () => {
      expect(dueDates({ startMonth: 1, startYear: 2028, dueDay: 31, installmentQty: 3 })).toEqual([
        "2028-01-31",
        "2028-02-29",
        "2028-03-31",
      ]);
    });

    it("should keep day 29 in a leap year and clamp it the next year", () => {
      const dates = dueDates({ startMonth: 2, startYear: 2028, dueDay: 29, installmentQty: 13 });

      expect(dates[0]).toBe("2028-02-29");
      expect(dates[12]).toBe("2029-02-28");
    });

    it("should clamp day 31 in 30-day months", () => {
      expect(dueDates({ startMonth: 4, dueDay: 31, installmentQty: 3 })).toEqual([
        "2026-04-30",
        "2026-05-31",
        "2026-06-30",
      ]);
    });

    it.each([29, 30, 31])("should generate one installment per month for day %d", (dueDay) => {
      const dates = dueDates({ startMonth: 1, startYear: 2027, dueDay, installmentQty: 360 });
      const months = dates.map((date) => date.slice(0, 7));

      expect(new Set(months).size).toBe(360);
      expect(months[0]).toBe("2027-01");
      expect(months[359]).toBe("2056-12");
    });
  });

  describe("year rollover", () => {
    it("should continue into the next year", () => {
      expect(dueDates({ startMonth: 11, dueDay: 15, installmentQty: 4 })).toEqual([
        "2026-11-15",
        "2026-12-15",
        "2027-01-15",
        "2027-02-15",
      ]);
    });

    it("should clamp the day after crossing into the next year", () => {
      expect(dueDates({ startMonth: 12, dueDay: 31, installmentQty: 3 })).toEqual([
        "2026-12-31",
        "2027-01-31",
        "2027-02-28",
      ]);
    });
  });

  describe("start date", () => {
    // Datas fixas: o resultado não pode depender de quando o débito é cadastrado
    afterEach(() => {
      jest.useRealTimers();
    });

    it("should start in the informed month and year when they are in the past", () => {
      jest.useFakeTimers({ now: new Date(2026, 10, 5) });

      expect(dueDates({ startMonth: 9, startYear: 2026, dueDay: 7, installmentQty: 6 })).toEqual([
        "2026-09-07",
        "2026-10-07",
        "2026-11-07",
        "2026-12-07",
        "2027-01-07",
        "2027-02-07",
      ]);
    });

    it("should start in the informed year when it is in the future", () => {
      jest.useFakeTimers({ now: new Date(2026, 10, 5) });

      expect(dueDates({ startMonth: 1, startYear: 2027, dueDay: 10, installmentQty: 1 })).toEqual([
        "2027-01-10",
      ]);
    });

    it("should accept a debit that started in a previous year", () => {
      jest.useFakeTimers({ now: new Date(2026, 10, 5) });

      expect(dueDates({ startMonth: 3, startYear: 2024, dueDay: 10, installmentQty: 1 })).toEqual([
        "2024-03-10",
      ]);
    });

    it.each([1, 7, 10, 11, 12])("should always start in month %d", (startMonth) => {
      const [first] = dueDates({ startMonth, dueDay: 7, installmentQty: 1 });

      expect(first).toBe(`2026-${String(startMonth).padStart(2, "0")}-07`);
    });
  });
});
