import {
  DEFAULT_CHARGE_FILTERS,
  getPeriodLabel,
  parseChargeFilters,
  resolvePeriod,
  toChargeSearchParams,
  type ChargeFilters,
} from "@/core/charge/charge-filter";

// 12h de 15/11/2026 no Brasil
const NOW = new Date("2026-11-15T15:00:00.000Z");

const filters = (patch: Partial<ChargeFilters> = {}): ChargeFilters => ({
  ...DEFAULT_CHARGE_FILTERS,
  ...patch,
});

describe("resolvePeriod", () => {
  it("should cover the whole current month", () => {
    expect(resolvePeriod(filters(), NOW)).toEqual({
      today: "2026-11-15",
      range: { from: "2026-11-01", to: "2026-11-30" },
    });
  });

  it("should cover the next month", () => {
    expect(resolvePeriod(filters({ preset: "next-month" }), NOW).range).toEqual({
      from: "2026-12-01",
      to: "2026-12-31",
    });
  });

  it("should turn the year in December", () => {
    const december = new Date("2026-12-20T15:00:00.000Z");

    expect(resolvePeriod(filters({ preset: "next-month" }), december).range).toEqual({
      from: "2027-01-01",
      to: "2027-01-31",
    });
  });

  it("should follow the Brazilian day at the turn of the month", () => {
    // 22h de 30/11/2026 no Brasil, já 1º de dezembro em UTC
    const lateNight = new Date("2026-12-01T01:00:00.000Z");

    expect(resolvePeriod(filters({ preset: "next-month" }), lateNight).range?.from).toBe("2026-12-01");
    expect(resolvePeriod(filters(), lateNight).range?.from).toBe("2026-11-01");
  });

  it("should count 30 days from today", () => {
    expect(resolvePeriod(filters({ preset: "next-30" }), NOW).range).toEqual({
      from: "2026-11-15",
      to: "2026-12-14",
    });
  });

  it("should have no range when showing only overdue installments", () => {
    expect(resolvePeriod(filters({ preset: "overdue" }), NOW).range).toBeNull();
  });

  it("should put a custom range in order", () => {
    const range = resolvePeriod(
      filters({ preset: "custom", from: "2026-12-31", to: "2026-12-01" }),
      NOW,
    ).range;

    expect(range).toEqual({ from: "2026-12-01", to: "2026-12-31" });
  });
});

describe("getPeriodLabel", () => {
  it("should name a whole month", () => {
    expect(getPeriodLabel(filters({ preset: "next-month" }), NOW)).toBe("de dezembro de 2026");
    expect(
      getPeriodLabel(filters({ preset: "custom", from: "2027-02-01", to: "2027-02-28" }), NOW),
    ).toBe("de fevereiro de 2027");
  });

  it("should show the dates of a custom range", () => {
    expect(
      getPeriodLabel(filters({ preset: "custom", from: "2026-12-01", to: "2026-12-15" }), NOW),
    ).toBe("de 01/12/2026 a 15/12/2026");
  });

  it("should describe the next 30 days and overdue", () => {
    expect(getPeriodLabel(filters({ preset: "next-30" }), NOW)).toBe(
      "dos próximos 30 dias (até 14/12/2026)",
    );
    expect(getPeriodLabel(filters({ preset: "overdue" }), NOW)).toBe("em atraso");
  });
});

describe("parseChargeFilters", () => {
  it("should use the defaults without parameters", () => {
    expect(parseChargeFilters({})).toEqual(DEFAULT_CHARGE_FILTERS);
  });

  it("should read every parameter", () => {
    expect(
      parseChargeFilters({
        periodo: "custom",
        de: "2026-12-01",
        ate: "2026-12-31",
        atrasados: "0",
        devedor: ["ana", "bia"],
        status: "ALL",
        busca: "empréstimo",
      }),
    ).toEqual({
      preset: "custom",
      from: "2026-12-01",
      to: "2026-12-31",
      includeOverdue: false,
      debtorIds: ["ana", "bia"],
      status: "ALL",
      search: "empréstimo",
    });
  });

  it("should fall back to the default for an invalid value only", () => {
    const parsed = parseChargeFilters({ periodo: "next-month", status: "WHATEVER", devedor: "ana" });

    expect(parsed.preset).toBe("next-month");
    expect(parsed.status).toBe("OPEN");
    expect(parsed.debtorIds).toEqual(["ana"]);
  });

  it("should not keep a custom period without dates", () => {
    expect(parseChargeFilters({ periodo: "custom", de: "2026-12-01" }).preset).toBe("this-month");
    expect(parseChargeFilters({ periodo: "custom", de: "2026-13-45", ate: "2026-12-01" }).preset).toBe(
      "this-month",
    );
  });

  it("should round trip through the URL", () => {
    const original = filters({
      preset: "custom",
      from: "2026-12-01",
      to: "2026-12-10",
      includeOverdue: false,
      debtorIds: ["ana", "bia"],
      status: "PAID",
      search: "Carro",
    });

    const params = Object.fromEntries(
      [...new Set(toChargeSearchParams(original).keys())].map((key) => {
        const values = toChargeSearchParams(original).getAll(key);
        return [key, values.length > 1 ? values : values[0]];
      }),
    );

    expect(parseChargeFilters(params)).toEqual(original);
  });

  it("should leave the defaults out of the URL", () => {
    expect(toChargeSearchParams(DEFAULT_CHARGE_FILTERS).toString()).toBe("");
  });
});
