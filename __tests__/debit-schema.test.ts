import { debitSchema, MAX_INSTALLMENTS } from "@/core/debit/debit.schema";

const validDebit = {
  description: "Credit card bill",
  debtorId: "debtor-1",
  totalAmount: 300,
  installmentQty: 3,
  startMonth: 1,
  dueDay: 15,
};

function fieldErrors(overrides: Record<string, unknown>) {
  const result = debitSchema.safeParse({ ...validDebit, ...overrides });
  return result.success ? {} : result.error.flatten().fieldErrors;
}

describe("debitSchema", () => {
  it("should accept a valid debit", () => {
    expect(debitSchema.safeParse(validDebit).success).toBe(true);
  });

  describe("startMonth", () => {
    it.each([1, 12])("should accept month %d", (startMonth) => {
      expect(fieldErrors({ startMonth })).toEqual({});
    });

    it.each([0, -1, 13, 1.5])("should reject month %d", (startMonth) => {
      expect(fieldErrors({ startMonth })).toHaveProperty("startMonth");
    });
  });

  describe("dueDay", () => {
    it.each([1, 31])("should accept day %d", (dueDay) => {
      expect(fieldErrors({ dueDay })).toEqual({});
    });

    it.each([0, -1, 32, 99, 1.5])("should reject day %d", (dueDay) => {
      expect(fieldErrors({ dueDay })).toHaveProperty("dueDay");
    });
  });

  describe("installmentQty", () => {
    it.each([1, MAX_INSTALLMENTS])("should accept %d installments", (installmentQty) => {
      expect(fieldErrors({ installmentQty })).toEqual({});
    });

    it.each([0, -1, 1.5, MAX_INSTALLMENTS + 1, 5_000_000])(
      "should reject %d installments",
      (installmentQty) => {
        expect(fieldErrors({ installmentQty })).toHaveProperty("installmentQty");
      },
    );
  });

  describe("values coming from the form", () => {
    it("should coerce the strings sent by inputs and selects", () => {
      const result = debitSchema.parse({
        ...validDebit,
        installmentQty: "360",
        startMonth: "12",
        dueDay: "31",
      });

      expect(result).toMatchObject({ installmentQty: 360, startMonth: 12, dueDay: 31 });
    });

    it("should reject out-of-range strings", () => {
      const errors = fieldErrors({ installmentQty: "361", startMonth: "13", dueDay: "32" });

      expect(Object.keys(errors).sort()).toEqual(["dueDay", "installmentQty", "startMonth"]);
    });

    it("should keep the required messages for empty selects", () => {
      const errors = fieldErrors({ startMonth: "", dueDay: "" });

      expect(errors.startMonth).toEqual(["Data de início é obrigatória"]);
      expect(errors.dueDay).toEqual(["Dia de vencimento é obrigatório"]);
    });
  });
});
