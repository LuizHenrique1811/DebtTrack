# DebtTrack (Financial Tracker)

> **Status:** Work In Progress — fase de arquitetura core, modelagem de dados e fluxos principais de passivos.

Aplicação para gestão, rastreamento e conciliação de passivos financeiros. O foco arquitetônico é garantir a integridade dos dados transacionados e aplicar validações estritas de estado no frontend.

## Stack tecnológica

- **Frontend:** React 19 / Next.js 16 (App Router, TypeScript)
- **Dados:** PostgreSQL + Prisma 7 (`@prisma/adapter-pg`)
- **Autenticação:** Auth.js (NextAuth v5) — credenciais + JWT
- **Validação:** Zod + React Hook Form
- **Estilo:** Tailwind CSS 4
- **Qualidade:** ESLint (`pnpm lint`); Jest configurado localmente (pipeline CI ainda não implementado)

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou superior
- [pnpm](https://pnpm.io/)
- [PostgreSQL](https://www.postgresql.org/) acessível localmente ou em container

## Como rodar o projeto

### 1. Instalar dependências

```bash
pnpm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo de exemplo e preencha os valores:

```bash
cp .env.example .env
```

| Variável       | Obrigatória        | Descrição                                                                               |
| -------------- | ------------------ | --------------------------------------------------------------------------------------- |
| `DATABASE_URL` | Sim                | URL de conexão PostgreSQL (`postgresql://user:pass@localhost:5432/debttrack`)           |
| `AUTH_SECRET`  | Sim                | Segredo do Auth.js ([como gerar](https://authjs.dev/getting-started/deployment#auth_secret)) |
| `AUTH_URL`     | Recomendada em dev | URL base da aplicação (`http://localhost:3000`)                                         |

### 3. Preparar o banco de dados

```bash
pnpm exec prisma generate
pnpm exec prisma migrate deploy
```

- **Schema:** `src/prisma/schema.prisma`
- **Migrações:** `prisma/migrations/` (configurado em `prisma.config.ts`)

Durante o desenvolvimento, ao alterar o schema:

```bash
pnpm exec prisma migrate dev
```

### 4. Iniciar o servidor de desenvolvimento

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000). A landing oferece acesso a `/login` e `/register`. Após autenticação, use as rotas em `/dashboard` (devedores, débitos e parcelas).

### 5. Build de produção (opcional)

```bash
pnpm build
pnpm start
```

### 6. Executar testes

```bash
pnpm exec jest
```

## Deploy na Vercel

1. Crie um banco PostgreSQL de produção.
2. Em **Settings → Environment Variables**, defina `DATABASE_URL` e `AUTH_SECRET`.
3. Aplique as migrações nesse banco, a partir da sua máquina, antes de cada deploy que altere o schema:

   ```bash
   DATABASE_URL="<url-de-producao>" pnpm exec prisma migrate deploy
   ```

4. Faça o deploy. O comando `pnpm build` já executa `prisma generate`.

## Scripts disponíveis

| Comando      | Descrição                                 |
| ------------ | ----------------------------------------- |
| `pnpm dev`   | Servidor de desenvolvimento               |
| `pnpm build` | Gera o Prisma Client e faz o build        |
| `pnpm start` | Servidor após o build                     |
| `pnpm lint`  | Verificação com ESLint                    |

## Roadmap de engenharia

### Concluído

- [x] Estruturação do repositório e tipagem base com TypeScript
- [x] Modelagem de dados (Prisma/PostgreSQL) e validação Zod de débitos, devedores e autenticação
- [x] Autenticação com Auth.js (credenciais + JWT) — ver [ADR 0001](docs/adr/0001-authentication-strategy.md)
- [x] CRUD de devedores e débitos; geração automática de parcelas (`installment-calculator`)
- [x] Dashboard com páginas server-side (devedores, débitos, parcelas)
- [x] Testes iniciais com Jest (calculadora de parcelas e action de criação de débito)
- [x] Registro de pagamentos, parciais ou totais, com quitação automática da parcela e do débito
- [x] Histórico de pagamentos por parcela, com opção de desfazer
- [x] Status de atraso calculado na leitura, no fuso de São Paulo
- [x] Relatórios com resumo financeiro, lista de cobrança do mês, visão mensal e por devedor
- [x] Filtros em parcelas e débitos; edição e exclusão de débitos, protegendo os que têm pagamentos

### Em andamento / pendente

- [ ] Pipeline CI no GitHub Actions (lint + testes automatizados)
- [ ] Script `test` no `package.json` e documentação de contribuição

## Referências

- [Documentação Next.js](https://nextjs.org/docs)
- [Prisma](https://www.prisma.io/docs)
- [Auth.js](https://authjs.dev)
