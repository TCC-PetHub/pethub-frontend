# Cadastro (`/register`)

A página lê `perfil` pela query string e exibe um formulário independente por perfil:

- `perfil=adopter` ou sem parâmetro: `UserRegister.tsx`, cadastro individual/protetor independente.
- `perfil=organization`: `OrganizationRegister.tsx`, cadastro de ONG/protetor vinculado a uma organização.

Os links do seletor preservam o perfil na URL. A rota de usuário usa `/register?perfil=adopter`; a rota de organização usa `/register?perfil=organization`.

## Cadastro individual

Campos obrigatórios: nome, CPF, e-mail, telefone, cidade, UF, senha, documento de identidade e aceite da Política de Privacidade.

Validações: e-mail válido; CPF com 11 dígitos; telefone com pelo menos 10 dígitos; UF com dois caracteres; senha com pelo menos 8 caracteres; ao menos um arquivo PDF/JPG/PNG de até 10 MB; aceite da política.

O envio ainda é local: após a validação, os dados e nomes dos arquivos são registrados no console e o formulário é substituído pela confirmação de cadastro em análise. O link de retorno encerra a sessão mock e abre o portal público (`/public-portal`). Não há upload de arquivo nem chamada de API.

## Cadastro de organização

Campos obrigatórios: organização, CNPJ, e-mail institucional, telefone, cidade/estado, identificação do responsável legal, e-mail de acesso, senha, comprovante de CNPJ, estatuto e aceite da Política de Privacidade. Documento do abrigo é opcional.

Validações: CNPJ com 14 dígitos; CPF do responsável com 11; e-mails válidos; telefone com pelo menos 10 dígitos; estado com dois caracteres; senha com pelo menos 8 caracteres; arquivos PDF/JPG/PNG de até 10 MB.

O envio não chama uma API. O formulário registra os dados no console e mostra o estado local de solicitação enviada para análise.

## Implementação

- `page.tsx`: seleciona o componente pelo parâmetro `perfil`.
- `UserRegister.tsx` e `user-styles.ts`: formulário e estilos do perfil individual.
- `OrganizationRegister.tsx` e `organization-styles.ts`: formulário e estilos do perfil organização.
- `styles.ts`: estilos compartilhados com a confirmação do cadastro de organização.
- `AuthTabs`/`AuthTab`, `Brand`/`Logo`, `Input` e `Button`: componentes comuns de autenticação.