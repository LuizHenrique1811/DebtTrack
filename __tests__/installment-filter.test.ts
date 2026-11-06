import {
  DEFAULT_FILTERS,
  filterInstallments,
  getFilterOptions,
  InstallmentFilters,
  sumRemaining,
} from "@/core/installment/installment-filter";
import type { InstallmentView } from "@/core/installment/installment.service";

function installment(overrides: Partial<InstallmentView> = {}): InstallmentView {
  return {
    id: "1",
    debtorId: "ana",
    debtorName: "Ana",
    description: "Empréstimo",
    installmentNumber: 1,
    installmentQty: 3,
    amount: 100,
    paidAmount: 0,
    remainingAmount: 100,
    dueDate: new Date("2026-11-10T00:00:00.000Z"),
    paidDate: null,
    status: "PENDING",
    payments: [],
    ...overrides,
  };
}

const filtered = (items: InstallmentView[], filters: Partial<InstallmentFilters>) =>
  filterInstallments(items, { ...DEFAULT_FILTERS, ...filters }).map((item) => item.id);

describe("filterInstallments", () => {
  const items = [
    installment({ id: "pendente", status: "PENDING" }),
    installment({ id: "parcial", status: "PARTIALLY_PAID" }),
    installment({ id: "atrasada", status: "OVERDUE" }),
    installment({ id: "paga", status: "PAID" }),
    installment({ id: "cancelada", status: "CANCELLED" }),
  ];

  it("should start showing only what is still open", () => {
    expect(filtered(items, {})).toEqual(["pendente", "parcial", "atrasada"]);
  });

  it("should show only overdue installments", () => {
    expect(filtered(items, { status: "OVERDUE" })).toEqual(["atrasada"]);
  });

  it("should show only paid installments", () => {
    expect(filtered(items, { status: "PAID" })).toEqual(["paga"]);
  });

  it("should show everything", () => {
    expect(filtered(items, { status: "ALL" })).toHaveLength(5);
  });

  it("should filter by due month", () => {
    const list = [
      installment({ id: "nov", dueDate: new Date("2026-11-30T00:00:00.000Z") }),
      installment({ id: "dez", dueDate: new Date("2026-12-01T00:00:00.000Z") }),
    ];

    expect(filtered(list, { month: "2026-12" })).toEqual(["dez"]);
  });

  it("should filter by debtor", () => {
    const list = [installment({ id: "a" }), installment({ id: "b", debtorId: "bia" })];

    expect(filtered(list, { debtorId: "bia" })).toEqual(["b"]);
  });

  it("should search by debit name, ignoring case and accents", () => {
    const list = [
      installment({ id: "ar", description: "Ar condicionado" }),
      installment({ id: "emprestimo", description: "Empréstimo" }),
    ];

    expect(filtered(list, { search: "ar cond" })).toEqual(["ar"]);
    expect(filtered(list, { search: "  EMPRESTIMO " })).toEqual(["emprestimo"]);
    expect(filtered(list, { search: "geladeira" })).toEqual([]);
  });

  it("should combine the filters", () => {
    const list = [
      installment({ id: "certa", debtorId: "bia", status: "OVERDUE" }),
      installment({ id: "outro-devedor", status: "OVERDUE" }),
      installment({ id: "outra-situacao", debtorId: "bia", status: "PAID" }),
      installment({
        id: "outro-mes",
        debtorId: "bia",
        status: "OVERDUE",
        dueDate: new Date("2026-10-10T00:00:00.000Z"),
      }),
    ];

    expect(filtered(list, { status: "OVERDUE", debtorId: "bia", month: "2026-11" })).toEqual(["certa"]);
  });

  it("should accept dates serialized as text", () => {
    const list = [installment({ dueDate: "2026-11-10T00:00:00.000Z" as unknown as Date })];

    expect(filtered(list, { month: "2026-11" })).toHaveLength(1);
  });
});

describe("getFilterOptions", () => {
  it("should list each month once, in order", () => {
    const { months } = getFilterOptions([
      installment({ dueDate: new Date("2027-01-10T00:00:00.000Z") }),
      installment({ dueDate: new Date("2026-11-10T00:00:00.000Z") }),
      installment({ dueDate: new Date("2026-11-20T00:00:00.000Z") }),
    ]);

    expect(months).toEqual(["2026-11", "2027-01"]);
  });

  it("should list each debtor once, in alphabetical order", () => {
    const { debtors } = getFilterOptions([
      installment({ debtorId: "z", debtorName: "Zé" }),
      installment({ debtorId: "a", debtorName: "Álvaro" }),
      installment({ debtorId: "z", debtorName: "Zé" }),
    ]);

    expect(debtors).toEqual([
      { id: "a", name: "Álvaro" },
      { id: "z", name: "Zé" },
    ]);
  });
});

describe("sumRemaining", () => {
  it("should not lose cents", () => {
    const total = sumRemaining([
      installment({ remainingAmount: 0.1 }),
      installment({ remainingAmount: 0.2 }),
    ]);

    expect(total).toBe(0.3);
  });
});
