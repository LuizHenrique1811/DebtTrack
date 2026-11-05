-- Alinha o banco ao schema.prisma: até aqui as migrations criavam Debit.accountId
-- (obrigatória e nunca preenchida pelo código) e não criavam
-- Installment.installmentNumber, o que fazia a criação de débitos falhar.

-- Remove a conta financeira, que não existe mais no schema
ALTER TABLE "Debit" DROP CONSTRAINT "Debit_accountId_fkey";
ALTER TABLE "Debit" DROP COLUMN "accountId";
ALTER TABLE "FinancialAccount" DROP CONSTRAINT "FinancialAccount_userId_fkey";
DROP TABLE "FinancialAccount";

-- Numera as parcelas já existentes por vencimento antes de exigir o valor
ALTER TABLE "Installment" ADD COLUMN "installmentNumber" INTEGER;

UPDATE "Installment" AS installment
SET "installmentNumber" = numbered.position
FROM (
    SELECT
        "id",
        ROW_NUMBER() OVER (PARTITION BY "debitId" ORDER BY "dueDate", "id") AS position
    FROM "Installment"
) AS numbered
WHERE installment."id" = numbered."id";

ALTER TABLE "Installment" ALTER COLUMN "installmentNumber" SET NOT NULL;
