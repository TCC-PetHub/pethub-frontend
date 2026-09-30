# Schema de Autenticação

Documenta `loginSchema` e os tipos auxiliares definidos em `auth.ts`.

## Perfis

`profiles` contém os valores `adopter` e `organization`. `profileLabels` associa esses valores aos rótulos exibidos na interface.

## Regras de login

- `profile`: obrigatório e limitado aos valores de `profiles`.
- `email`: remove espaços nas extremidades, exige valor e valida o formato do endereço.
- `password`: exige que o campo não esteja vazio. Regras de tamanho são aplicadas no cadastro, não no login.

## Tipos exportados

- `LoginField`: nomes dos campos aceitos pelo formulário e pelo mapa de erros.
- `LoginInput`: formato validado produzido pelo schema.

O schema usa Zod 4 e é consumido pela página `/login` para validar os dados antes da navegação.