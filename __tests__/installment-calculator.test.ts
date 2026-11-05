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

describe("generateInstallments due dates", () => {
  const NOV_5_2026 = new Date(2026, 10, 5);

  function dueDates({
    now = NOV_5_2026,
    ...params
  }: {
    startMonth: number;
    dueDay: number;
    installmentQty: number;
    now?: Date;
  }) {
    return generateInstallments({ totalAmount: 1000, debitId: "debit-1", now, ...params }).map(
      ({ dueDate }) => {
        const month = String(dueDate.getMonth() + 1).padStart(2, "0");
        const day = String(dueDate.getDate()).padStart(2, "0");
        return `${dueDate.getFullYear()}-${month}-${day}`;
      },
    );
  }

  describe("month length", () => {
    it("should clamp day 31 to February 28 in a common year", () => {
      expect(dueDates({ startMonth: 1, dueDay: 31, installmentQty: 3 })).toEqual([
        "2027-01-31",
        "2027-02-28",
        "2027-03-31",
      ]);
    });

    it("should clamp day 31 to February 29 in a leap year", () => {
      const now = new Date(2027, 11, 1);

      expect(dueDates({ startMonth: 1, dueDay: 31, installmentQty: 3, now })).toEqual([
        "2028-01-31",
        "2028-02-29",
        "2028-03-31",
      ]);
    });

    it("should keep day 29 in a leap year and clamp it the next year", () => {
      const now = new Date(2028, 0, 1);
      const dates = dueDates({ startMonth: 2, dueDay: 29, installmentQty: 13, now });

      expect(dates[0]).toBe("2028-02-29");
      expect(dates[12]).toBe("2029-02-28");
    });

    it("should clamp day 31 in 30-day months", () => {
      expect(dueDates({ startMonth: 4, dueDay: 31, installmentQty: 3 })).toEqual([
        "2027-04-30",
        "2027-05-31",
        "2027-06-30",
      ]);
    });

    it.each([29, 30, 31])("should generate one installment per month for day %d", (dueDay) => {
      const dates = dueDates({ startMonth: 1, dueDay, installmentQty: 360 });
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

  describe("start year", () => {
    it.each([1, 10])("should start next year when month %d has already passed", (startMonth) => {
      expect(dueDates({ startMonth, dueDay: 10, installmentQty: 1 })[0].slice(0, 4)).toBe("2027");
    });

    it("should stay in the current year when the start month is still ahead", () => {
      expect(dueDates({ startMonth: 12, dueDay: 10, installmentQty: 1 })).toEqual(["2026-12-10"]);
    });

    it("should stay in the current year for the current month, even if the day has passed", () => {
      expect(dueDates({ startMonth: 11, dueDay: 1, installmentQty: 1 })).toEqual(["2026-11-01"]);
    });

    it("should use the current date when none is given", () => {
      jest.useFakeTimers({ now: NOV_5_2026 });

      try {
        const [installment] = generateInstallments({
          totalAmount: 100,
          installmentQty: 1,
          startMonth: 1,
          dueDay: 10,
          debitId: "debit-1",
        });

        expect(installment.dueDate.getFullYear()).toBe(2027);
      } finally {
        jest.useRealTimers();
      }
    });
  });
});
