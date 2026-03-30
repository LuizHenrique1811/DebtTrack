---
name: commit
description: Analisa alterações do Git (status e diff) e propõe nome de branch e mensagem de commit alinhados ao escopo real. Use quando o usuário invocar /commit, pedir sugestão de branch/commit ou revisar mudanças antes de versionar.
---

# Commit — branch e mensagem a partir das alterações

## Objetivo

Com base **apenas** no que mudou no repositório, produzir:

1. Um **nome de branch** curto e descritivo.
2. Uma **mensagem de commit** clara e alinhada ao diff.

## Fluxo obrigatório

1. Executar no repositório: `git status`, depois `git diff` (alterações não staged) e `git diff --staged` (staged). Se não houver staged, considere o working tree; deixe explícito qual base você usou.
2. Sintetizar: tipo de mudança (feature, correção, refator, docs, chore, test, ci), áreas tocadas (módulos/pastas) e intenção em uma frase.
3. **Não** inventar arquivos ou comportamentos que não apareçam no diff.

## Nome de branch

- Formato: `tipo/descricao-curta-em-kebab-case`
- Prefixos: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `ci`
- Minúsculas, sem espaços; evite tickets genéricos (`fix-bug`); seja específico (ex.: `feat/installment-dashboard`).

## Mensagem de commit

- Preferir **Conventional Commits**: `tipo(escopo opcional): resumo`
- Primeira linha: imperativa, ~72 caracteres, sem ponto final no resumo.
- Corpo: opcional; use para o porquê ou detalhes que o diff não deixa óbvio (lista curta).
- Idioma: **inglês** se o histórico do projeto for majoritariamente em inglês; **português** se o padrão local for PT. Se híbrido ou vazio, default **inglês** para a primeira linha (padrão amplo em código).

## Formato da resposta ao usuário

Responder em **português**, assim:

```markdown
**Branch sugerida:** `tipo/descricao`

**Mensagem de commit:**

```
linha 1

corpo opcional
```

**Resumo:** uma frase sobre o que o diff fez.
```

## Exemplos (referência)

**Diff:** nova página de parcelamentos e actions.

- Branch: `feat/installments-page`
- Mensagem:
  ```
  feat(installments): add dashboard page and server actions

  Wire list/card UI to installment service and nav entry.
  ```

**Diff:** correção de validação em action de débito.

- Branch: `fix/debit-action-validation`
- Mensagem:
  ```
  fix(debit): correct validation in debit action
  ```

## Anti-padrões

- Sugerir branch/commit sem ter lido o `git diff`.
- Mensagem vaga: `update`, `fix stuff`, `changes`.
- Branch com mais de quatro palavras no slug sem necessidade.
