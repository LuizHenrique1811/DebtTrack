ADR 0001 – Estratégia de Autenticação

Contexto:

- O sistema necessita de autenticação segura, compatível com SSR, múltiplas sessões e escalável.

Opções consideradas:

- Autenticação manual com JWT

- Sessão própria com cookies

- Auth.js (NextAuth)

Decisão

Utilizar Auth.js com Prisma Adapter e Credentials Provider.

Justificativa:

- Resolve sessão e cookies HTTP-only

- Compatível com App Router e SSR

- Reduz código sensível

- Padrão adotado pelo mercado

Consequências:

- Inclusão de tabelas Session, Account e VerificationToken

- Dependência da lib Auth.js

- Menor esforço de manutenção