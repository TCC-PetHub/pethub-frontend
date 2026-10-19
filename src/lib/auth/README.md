# Sessão JWS do PetHub

O servidor emite um JWT em formato JWS compacto usando `jose` e HS256. O token contém apenas ID, nome, perfil, emissor, destinatário, identificador da sessão e datas. Não contém senha. O conteúdo é legível: assinatura não é criptografia.

A verificação aceita somente HS256 e o tipo `pethub-session+jwt`, exige `sub`, `iat`, `exp`, `jti`, `name` e `role`, valida emissor e destinatário e limita a sessão a 15 minutos. Os emissores de desenvolvimento e produção são distintos, para impedir o uso da conta de teste em produção. A chave fica em `AUTH_JWS_SECRET`, nunca em uma variável `NEXT_PUBLIC_`. Usar uma chave aleatória com pelo menos 32 bytes, em base64url, distinta para cada ambiente. A ausência de configuração bloqueia a emissão.

O cookie `pethub-session` é HttpOnly, SameSite=Lax e Secure em produção. As mutações de login/logout verificam a origem. O token não é retornado no JSON nem salvo no localStorage. A opção “lembrar” mantém o cookie por no máximo 15 minutos, sem aumentar a duração do token.

`proxy.ts` verifica sessões nas páginas privadas a cada requisição; os layouts também verificam no servidor. `getSession` deve ser usado em futuras APIs de dados, com checagem de permissão e vínculo de organização em cada operação. O contexto React serve apenas para apresentar a sessão já validada.

## Teste local

Execute `npm run auth:setup-dev` e depois `npm run dev`. A configuração e a senha aleatória de teste estão em `.env.local`, ignorado pelo Git. A conta fictícia é de adotante. A senha é conferida com scrypt; seu hash fica no servidor. Essa conta só funciona com `NODE_ENV=development` e `AUTH_DEV_LOGIN_ENABLED=true`.

Execute `npm run test:auth` para testar assinatura, adulteração, validade, emissor, destinatário, tipo, algoritmo e chave.

## API futura

Em produção, configurar `AUTH_LOGIN_URL` com uma API HTTPS que valide as credenciais. O servidor envia POST JSON `{email, password, profile}`. A API deve retornar `{id, name, role}` em caso de sucesso, com perfil decidido no servidor, e 401/403 quando o login for inválido. Dados inválidos e indisponibilidade não emitem sessão. Definir `AUTH_APP_ORIGIN` com a origem pública exata.

O projeto ainda não possui banco de usuários. Cadastro, recuperação de senha, Google e dados do portal continuam demonstrações e não criam uma identidade autenticável. A API de usuários deverá oferecer controle de tentativas, aprovação de organizações e gestão de contas.

O logout apaga o cookie deste navegador. Um token já copiado permanece válido até expirar; revogação imediata e logout em todos os dispositivos dependem de armazenamento de sessões no backend. Não há refresh token automático.

Referências: [RFC 7515](https://www.rfc-editor.org/rfc/rfc7515.html), [RFC 8725](https://www.rfc-editor.org/rfc/rfc8725.html) e [jose](https://github.com/panva/jose).

## Dependências

Foram adicionados `jose` e `server-only`. A auditoria executada em 07/10/2026 apontou sete alertas de severidade alta em outras dependências: next, eslint-config-next, @next/eslint-plugin-next, braces, fast-glob, micromatch e source-map-js. As atualizações dessa cadeia precisam de revisão própria antes de publicar; não foram aplicados upgrades ou downgrades automáticos nesta alteração.
