const BRAZIL_COUNTRY_CODE = "55";

// O telefone é texto livre no cadastro, então só vira link quando dá para
// reconhecer o número completo: DDD + número, com ou sem o código do país.
export function toWhatsAppNumber(phone: string) {
    const digits = phone.replace(/\D/g, "");

    if (digits.length === 10 || digits.length === 11) {
        return `${BRAZIL_COUNTRY_CODE}${digits}`;
    }

    const hasCountryCode =
        (digits.length === 12 || digits.length === 13) &&
        digits.startsWith(BRAZIL_COUNTRY_CODE);

    return hasCountryCode ? digits : null;
}

export function buildWhatsAppUrl(phone: string | null, message: string) {
    const number = toWhatsAppNumber(phone ?? "");

    return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : null;
}
