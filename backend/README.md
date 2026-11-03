# Backend PetHub

Backend em Python com FastAPI. Ele concentra regras de autenticação, cadastro e comunicação com o Supabase, mantendo as telas no Next.js.

## Estrutura

- `app/api/routes`: rotas HTTP.
- `app/services`: regras de autenticação e Supabase.
- `app/schemas`: validação dos dados recebidos.
- `app/core`: configurações e sessão JWS.

## Cadastro completo

A rota `POST /api/auth/register` recebe o formulário multipart do cadastro. Ela valida dados, senha, CPF e documentos; cria o usuário no Supabase Auth; envia os arquivos ao bucket privado; e chama a RPC `register_account` para gravar a solicitação no banco. Em caso de falha, tenta remover os dados parciais criados.

O formulário web envia o cadastro a `http://127.0.0.1:8000/api/auth/register` por padrão. Para outro endereço, defina `NEXT_PUBLIC_API_URL` no frontend.
