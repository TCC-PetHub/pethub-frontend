# Cadastro (`/register`)

Formulário de criação de conta com opções para adotante/cidadão ou ONG/protetor.

## Fluxo

- A query `perfil=organization` seleciona ONG; outros valores, incluindo ausência de parâmetro, selecionam adotante.
- `signUpSchema` valida:
	- `userType`: `adopter` ou `ngo`;
	- `name`: obrigatório;
	- `email`: formato de email válido;
	- `password`: pelo menos 8 caracteres;
	- `acceptedTerms`: precisa ser `true`.
- CNPJ, telefone, cidade e estado são opcionais no objeto base e aparecem apenas para ONG; nesse perfil, o schema exige CNPJ com 14 dígitos, telefone com pelo menos 10 caracteres, cidade preenchida e estado com 2 caracteres.
- O envio ainda não chama uma API; registra os dados no console e mostra uma notificação de sucesso.
- A aba Entrar retorna ao login preservando o perfil escolhido.

O layout está em `styles.ts`; a navegação usa `AuthTabs`/`AuthTab`, e a marca usa `Brand`/`Logo`.