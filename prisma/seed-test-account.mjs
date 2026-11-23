// Cria (ou recria) uma conta de teste com devedores, débitos, parcelas e pagamentos
// para conferir as telas no navegador sem mexer nos dados de uma conta real.
//
// Uso: node prisma/seed-test-account.mjs
// O e-mail e a senha ficam em .env.test.local (ignorado pelo git). Se o arquivo
// não existir, a senha é gerada e o arquivo é criado.

import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import "dotenv/config";
import bcrypt from "bcryptjs";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const CREDENTIALS_FILE = ".env.test.local";

function loadCredentials() {
    if (existsSync(CREDENTIALS_FILE)) {
        const values = Object.fromEntries(
            readFileSync(CREDENTIALS_FILE, "utf8")
                .split(/\r?\n/)
                .filter((line) => line.includes("="))
                .map((line) => line.split(/=(.*)/s).slice(0, 2)),
        );
        if (values.TEST_ACCOUNT_EMAIL && values.TEST_ACCOUNT_PASSWORD) return values;
    }

    const credentials = {
        TEST_ACCOUNT_EMAIL: "teste.cobrancas@debttrack.test",
        TEST_ACCOUNT_PASSWORD: `Teste-${randomBytes(9).toString("base64url")}`,
    };
    writeFileSync(
        CREDENTIALS_FILE,
        Object.entries(credentials).map(([key, value]) => `${key}=${value}`).join("\n") + "\n",
    );

    return credentials;
}

const date = (year, month, day) => new Date(Date.UTC(year, month - 1, day));

// Parcelas iguais a partir de um mês; `paid` diz quanto já foi pago em cada uma.
function installments({ total, qty, year, month, day, paid = [] }) {
    const base = Math.floor((total / qty) * 100) / 100;
    const last = Number((total - base * (qty - 1)).toFixed(2));

    return Array.from({ length: qty }, (_, index) => {
        const amount = index === qty - 1 ? last : base;
        const due = date(year, month + index > 12 ? month + index - 12 : month + index, 1);
        if (month + index > 12) due.setUTCFullYear(year + Math.floor((month + index - 1) / 12));
        const lastDay = new Date(Date.UTC(due.getUTCFullYear(), due.getUTCMonth() + 1, 0)).getUTCDate();
        due.setUTCDate(Math.min(day, lastDay));

        const paidAmount = paid[index] === "all" ? amount : (paid[index] ?? 0);
        const status = paidAmount >= amount ? "PAID" : paidAmount > 0 ? "PARTIALLY_PAID" : "PENDING";

        return {
            amount,
            dueDate: due,
            installmentNumber: index + 1,
            status,
            paidDate: status === "PAID" ? due : null,
            payments: paidAmount > 0 ? { create: [{ amount: paidAmount, paymentDate: due }] } : undefined,
        };
    });
}

const DEBTORS = [
    {
        name: "Ana Souza",
        phone: "(11) 98765-4321",
        email: "ana@example.com",
        debits: [
            { description: "Empréstimo", total: 1200, qty: 6, year: 2026, month: 9, day: 10, paid: ["all", "all"] },
            { description: "Celular", total: 900, qty: 3, year: 2026, month: 11, day: 25 },
        ],
    },
    {
        name: "Bruno Lima",
        phone: null,
        email: null,
        debits: [
            { description: "Bicicleta", total: 600, qty: 4, year: 2026, month: 10, day: 5, paid: [0, 50] },
        ],
    },
    {
        name: "Carla Mendes",
        phone: "21 99876-5432",
        email: null,
        debits: [
            { description: "Ar condicionado", total: 2400, qty: 12, year: 2026, month: 12, day: 20 },
            { description: "Empréstimo emergencial", total: 500, qty: 1, year: 2026, month: 12, day: 2, paid: ["all"] },
        ],
    },
];

async function main() {
    const { TEST_ACCOUNT_EMAIL: email, TEST_ACCOUNT_PASSWORD: password } = loadCredentials();
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
    const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

    try {
        const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
        if (existing) {
            const debtorFilter = { debtor: { userId: existing.id } };
            await prisma.payment.deleteMany({ where: { installment: { debit: debtorFilter } } });
            await prisma.installment.deleteMany({ where: { debit: debtorFilter } });
            await prisma.debit.deleteMany({ where: debtorFilter });
            await prisma.debtor.deleteMany({ where: { userId: existing.id } });
            await prisma.user.delete({ where: { id: existing.id } });
        }

        const user = await prisma.user.create({
            data: { name: "Conta de teste", email, password: await bcrypt.hash(password, 10) },
        });

        for (const debtor of DEBTORS) {
            await prisma.debtor.create({
                data: {
                    name: debtor.name,
                    phone: debtor.phone,
                    email: debtor.email,
                    userId: user.id,
                    debts: {
                        create: debtor.debits.map((debit) => {
                            const items = installments(debit);
                            return {
                                description: debit.description,
                                totalAmount: debit.total,
                                installmentQty: debit.qty,
                                startMonth: debit.month,
                                dueDay: debit.day,
                                status: items.every((item) => item.status === "PAID") ? "PAID" : "ACTIVE",
                                installments: { create: items },
                            };
                        }),
                    },
                },
            });
        }

        console.log(`Conta de teste pronta: ${email} (senha em ${CREDENTIALS_FILE})`);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
