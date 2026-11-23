import { buildWhatsAppUrl, toWhatsAppNumber } from "@/lib/whatsapp";

describe("toWhatsAppNumber", () => {
  it.each([
    ["(12) 3456-7890", "551234567890"],
    ["(12) 34567-8901", "5512345678901"],
    ["+55 12 34567-8901", "5512345678901"],
  ])("should recognise %s", (phone, number) => {
    expect(toWhatsAppNumber(phone)).toBe(number);
  });

  it.each(["", "3456-7890", "+1 555 123 4567 89"])("should reject %p", (phone) => {
    expect(toWhatsAppNumber(phone)).toBeNull();
  });
});

describe("buildWhatsAppUrl", () => {
  it("should use the edited text as it is", () => {
    expect(buildWhatsAppUrl("12345678901", "Oi, tudo bem?\nR$ 10 & 20")).toBe(
      "https://wa.me/5512345678901?text=Oi%2C%20tudo%20bem%3F%0AR%24%2010%20%26%2020",
    );
  });

  it("should return null without a phone", () => {
    expect(buildWhatsAppUrl(null, "oi")).toBeNull();
  });
});
