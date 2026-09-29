# Recuperação de Senha (`/forgot-password`)

Solicita o email cadastrado para iniciar a recuperação de senha.

## Fluxo

- `forgotPasswordSchema` valida o email com Zod via `zodResolver`:
	- exige que o campo não esteja vazio;
	- valida o formato do endereço.
- React Hook Form controla erros, envio e limpeza do campo.
- O envio atualmente simula uma espera de 800 ms e mostra uma notificação; a chamada real à API permanece como TODO.
- O link inferior retorna para `/login`.

Os componentes de layout estão em `style.ts`.