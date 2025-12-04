<div align="center">

# DebtTrack

Um painel unificado em Next.js para gerir cadastros de devedores, parcelas e relatórios de cobranças, sem a necessidade de separar front-end e back-end em repositórios distintos.

</div>

## 🚀 Visão Geral

O **DebtTrack** é uma aplicação web que centraliza o controle de dívidas. Em um único ambiente, a pessoa responsável registra-se, cadastra seus devedores, define itens, valores e parcelamentos, além de acompanhar o status de pagamento de cada parcela. Com isso, é possível gerar relatórios mensais e consolidar o total a receber por devedor.

## ✨ Funcionalidades Principais

- Cadastro e autenticação de usuários responsáveis pelo controle das dívidas.
- Registro de devedores com dados básicos e itens associados.
- Definição de quantidade de parcelas, valores e vencimentos.
- Atualização do status de pagamento de cada parcela.
- Relatórios:
  - Total a receber por mês.
  - Total consolidado por devedor.
- Operação full-stack baseada em **Next.js**, eliminando a necessidade de manter repositórios separados.

## 🧱 Stack Tecnológica

- **Next.js** (App Router) para front-end e back-end (API Routes / Server Actions).
- **React** para construção da interface.
- **TypeScript** para tipagem estática (opcional, mas recomendado).
- **Banco de dados** plugável (ex.: PostgreSQL, MySQL ou SQLite) via ORM (Prisma ou equivalente).
- **Tailwind CSS** (ou outro framework CSS) para estilização rápida.
- **Zod/React Hook Form** (opcional) para validação de formulários.

> Os componentes da stack podem ser ajustados conforme as necessidades do time. O importante é manter a lógica full-stack dentro da estrutura do Next.js.

## 📁 Estrutura de Pastas (proposta)

```
DebtTrack/
├─ app/                     # Rotas, páginas e APIs em Next.js
│  ├─ (auth)/               # Fluxos de autenticação
│  ├─ dashboard/            # Telas privadas de controle
│  └─ api/                  # Endpoints (cadastro devedores, parcelas, relatórios)
├─ components/              # Componentes reutilizáveis de UI
├─ lib/                     # Configurações (ORM, autenticação, utilitários)
├─ prisma/                  # Schema e migrations (caso use Prisma)
├─ public/                  # Assets estáticos
├─ styles/                  # Estilos globais
└─ tests/                   # Testes unitários e e2e
```

## ⚙️ Configuração do Ambiente

1. **Pré-requisitos**

   - Node.js LTS (>= 18.x)
   - Gerenciador de pacotes (`npm`, `yarn` ou `pnpm`)
   - Banco de dados configurado (local ou remoto)

2. **Instalação**

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Variáveis de ambiente**
   Crie o arquivo `.env.local` na raiz e configure:

   ```bash
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/debttrack"
   NEXTAUTH_SECRET="chave-secreta"
   NEXTAUTH_URL="http://localhost:3000"
   ```

   > Ajuste as chaves conforme sua estratégia de autenticação e infraestrutura.

4. **Executando em desenvolvimento**

   ```bash
   npm run dev
   ```

   O aplicativo estará disponível em `http://localhost:3000`.

5. **Build de produção**
   ```bash
   npm run build
   npm run start
   ```

## 🧪 Qualidade e Testes

- **Testes unitários** (Vitest/Jest) para regras de negócio.
- **Testes end-to-end** (Playwright/Cypress) para fluxos críticos, como cadastro de devedor e geração de relatórios.
- **Lint/Format**: `npm run lint` e `npm run format` para manter consistência do código.

## 📊 Relatórios

Os relatórios podem ser gerados a partir de consultas às parcelas:

- Agrupar parcelas abertas por mês para obter o total a receber.
- Consolidar valores por devedor, permitindo identificar inadimplências ou compromissos quitados.
- Exportação (CSV/PDF) é uma extensão futura interessante.

## 🗺️ Roadmap Sugerido

- [ ] Implementar autenticação (NextAuth ou alternativa).
- [ ] Modelar banco de dados: usuários, devedores, dívidas, parcelas.
- [ ] Criar dashboard com visão mensal e consolidada.
- [ ] Permitir atualização do status de parcelas (paga / pendente).
- [ ] Adicionar filtros e busca por devedor ou período.
- [ ] Implementar exportação de relatórios.
- [ ] Cobrir fluxos críticos com testes e2e.

## 🤝 Contribuição

1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b feature/minha-feature
   ```
3. Faça commits objetivos e descreva bem suas mudanças.
4. Abra um Pull Request descrevendo o que foi alterado e como testar.

## 📄 Licença

Defina a licença que melhor se encaixa ao seu caso (MIT, GPL, proprietária etc.) e adicione o arquivo correspondente.

---

Feito com ❤️ para simplificar o controle de dívidas e manter tudo sob o mesmo teto.
