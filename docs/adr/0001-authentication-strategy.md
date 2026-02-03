# ADR 0001 – Estratégia de Autenticação

---

## Contexto

- O sistema necessita de autenticação segura baseada em credenciais (E-mail/Senha), compatível com Next.js App Router (SSR) e TypeScript.
- Necessidade de alta performance e economia de recursos de infraestrutura (minimizar leituras excessivas no banco de dados para validação de sessão).
- Garantia de tipagem estrita no front-end e back-end.

---

## Opções consideradas

- Autenticação via Sessão de Banco de Dados (strategy: "database")
- Autenticação via Token JWT (strategy: "jwt")
- Implementação manual de cookies criptografados

---

## Decisão

Utilizar Auth.js com Prisma Adapter e Credentials Provider, adotando explicitamente a estratégia de sessão JWT.

---

## Justificativa

- **Compatibilidade Técnica:** O Credentials Provider do Auth.js exige o uso de JWT por design de segurança; forçar a estratégia de banco geraria conflitos e código instável.
- **Performance (Economia de Recursos):** A validação da sessão ocorre via descritografia do token (CPU) em vez de consulta ao banco (I/O), reduzindo drasticamente a latência e a carga no PostgreSQL.
- **Type Safety:** Permite a extensão de tipos (Module Augmentation) para trafegar o id do usuário de forma segura entre o token e a aplicação.
- **Padrão de Mercado:** Alinha-se à arquitetura stateless moderna para autenticações via credenciais.

---

## Consequências

- **Gestão de Tabelas:** Utilização das tabelas User e Account para dados cadastrais; a tabela Session torna-se desnecessária para este fluxo (redução de armazenamento).
- **Fluxo de Dados:** Necessidade de implementar callbacks (jwt e session) para persistir manualmente o ID do usuário no token.
- **Revogação:** O controle de "derrubar" sessões passa a ser baseado no tempo de expiração do token (MaxAge), e não na deleção de uma linha no banco.
- **Manutenção:** Necessidade de arquivo de definição de tipos (d.ts) para evitar erros de TypeScript no objeto session.user.
