# Login (`/login`)

Formulário de autenticação com seleção de perfil, email, senha, opção de lembrar sessão e acesso ao cadastro/recuperação.

## Fluxo

- `perfil` na query string aceita `adopter` ou `organization`; sem esse valor, usa `adopter`.
- `loginSchema` de `@/schemas/auth` valida os campos com Zod e erros são associados aos inputs.
- Após a validação local, navega para `/public-portal`.
- O botão Google ainda mostra uma mensagem informativa; não há integração de autenticação real neste fluxo.

O layout está em `styles.ts`; a barra de abas usa `AuthTabs`/`AuthTab`, e a marca usa `Brand`/`Logo`.