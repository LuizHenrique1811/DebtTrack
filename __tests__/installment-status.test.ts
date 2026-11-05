import { InstallmentStatus } from "@prisma/client";
import { getEffectiveStatus } from "@/core/installment/installment-status";
import { formatDatePt, getTodayDateKey } from "@/lib/utils";

const DUE_DATE = new Date("2026-11-15T00:00:00.000Z");

// 12h no Brasil
const NOON_ON = (day: string) => new Date(`${day}T15:00:00.000Z`);

describe("getEffectiveStatus", () => {
  it("should keep a pending installment on its due date", () => {
    const status = getEffectiveStatus(
      { status: InstallmentStatus.PENDING, dueDate: DUE_DATE },
      NOON_ON("2026-11-15"),
    );

    expect(status).toBe(InstallmentStatus.PENDING);
  });

  it("should mark a pending installment as overdue after its due date", () => {
    const status = getEffectiveStatus(
      { status: InstallmentStatus.PENDING, dueDate: DUE_DATE },
      NOON_ON("2026-11-16"),
    );

    expect(status).toBe(InstallmentStatus.OVERDUE);
  });

  it("should mark a partially paid installment as overdue", () => {
    const status = getEffectiveStatus(
      { status: InstallmentStatus.PARTIALLY_PAID, dueDate: DUE_DATE },
      NOON_ON("2026-11-16"),
    );

    expect(status).toBe(InstallmentStatus.OVERDUE);
  });

  it("should keep a partially paid installment before its due date", () => {
    const status = getEffectiveStatus(
      { status: InstallmentStatus.PARTIALLY_PAID, dueDate: DUE_DATE },
      NOON_ON("2026-11-10"),
    );

    expect(status).toBe(InstallmentStatus.PARTIALLY_PAID);
  });

  it.each([InstallmentStatus.PAID, InstallmentStatus.CANCELLED])(
    "should never mark a %s installment as overdue",
    (status) => {
      const result = getEffectiveStatus({ status, dueDate: DUE_DATE }, NOON_ON("2027-01-01"));

      expect(result).toBe(status);
    },
  );

  it("should use the Brazilian day when UTC has already moved on", () => {
    // 22h de 15/11 no Brasil, mas já 16/11 em UTC
    const lateEvening = new Date("2026-11-16T01:00:00.000Z");

    const status = getEffectiveStatus(
      { status: InstallmentStatus.PENDING, dueDate: DUE_DATE },
      lateEvening,
    );

    expect(status).toBe(InstallmentStatus.PENDING);
  });

  it("should accept dates saved by a server in the Brazilian time zone", () => {
    const savedAtBrazilianMidnight = new Date("2026-11-15T03:00:00.000Z");

    const status = getEffectiveStatus(
      { status: InstallmentStatus.PENDING, dueDate: savedAtBrazilianMidnight },
      NOON_ON("2026-11-15"),
    );

    expect(status).toBe(InstallmentStatus.PENDING);
  });
});

describe("date helpers", () => {
  it("should show the stored calendar day regardless of the browser time zone", () => {
    expect(formatDatePt(DUE_DATE)).toBe("15 de novembro de 2026");
  });

  it("should return today in the Brazilian time zone", () => {
    expect(getTodayDateKey(new Date("2026-11-16T01:00:00.000Z"))).toBe("2026-11-15");
  });
});
