# Recuperação de senha

O formulário /forgot-password chama POST /api/auth/forgot-password. O servidor envia o e-mail usando Supabase Auth e a chave pública; não usa a service role e não revela se o e-mail existe.

No Supabase, Authentication > URL Configuration, adicione às Redirect URLs:

- http://localhost:3000/reset-password
- O endereço HTTPS de produção seguido de /reset-password quando publicar.

Mantenha o template Reset Password com o link padrão {{ .ConfirmationURL }}. O fluxo usa o redirecionamento padrão com fragmento e type=recovery. Templates personalizados com token_hash exigem adaptação.

A tela /reset-password remove o fragmento da URL, valida a sessão com Supabase, pede confirmação da senha e atualiza a credencial com updateUser. Tokens ficam somente em memória, sem localStorage; atualizar a página exige solicitar novo link. O usuário volta ao login após salvar. Nenhuma sessão PetHub é criada pela recuperação. Sessões JWS PetHub já emitidas continuam até o vencimento atual.

Verificação: node --test tests/password-recovery.test.mjs. Testes usam provedor simulado e não enviam e-mails reais.
