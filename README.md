# PetHub Frontend

Frontend da plataforma PetHub para adoção e proteção animal. O workspace contém uma experiência de portal público, autenticação por sessão JWT/JWS, recuperação de senha e dois fluxos independentes de cadastro.

## Requisitos e execução

- Node.js compatível com Next.js 16
- npm

Para testar autenticação local, execute `npm run auth:setup-dev`; a credencial fictícia fica em `.env.local` e não funciona em produção. Veja [a documentação de autenticação](src/lib/auth/README.md) para configurar a API futura.

Instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

O Next.js usa `http://localhost:3000` quando a porta está livre e escolhe outra porta se necessário.

Comandos disponíveis:

```bash
npm run dev       # servidor local com recarga automática
npm run lint      # ESLint em todo o projeto
npx tsc --noEmit  # verificação de tipos sem gerar arquivos
npm run build     # build de produção
npm start         # serve o build de produção
```

Execute `npm run test:auth` para rodar os testes automatizados da sessão JWS.

## Rotas

| Rota | Comportamento |
| --- | --- |
| `/` | Redireciona para `/public-portal`. |
| `/public-portal` | Portal com busca, filtros, campanhas, animais, parceiros e navegação. Os dados são mockados. |
| `/login` | Login demonstrativo. `perfil=adopter` seleciona Adotante / Cidadão; `perfil=organization` seleciona ONG / Protetor. |
| `/register` | Cadastro de pessoa física/protetor independente por padrão. |
| `/register?perfil=adopter` | Cadastro de pessoa física/protetor independente. |
| `/register?perfil=organization` | Cadastro de ONG/protetor. |
| `/forgot-password` | Valida um e-mail e simula o envio de um link de recuperação. |

O seletor de perfil e as abas de autenticação preservam o valor na URL ao alternar entre login e cadastro. O seletor de usuário na tela de organização retorna a `/register?perfil=adopter`.

O menu e o portal também apontam para destinos como `/animais`, `/doacoes`, `/mensagens`, `/mapa`, `/ongs` e `/perdidos`. Essas telas não estão implementadas entre as rotas deste workspace; os links servem como navegação prevista para o produto.

## Cadastro

`src/app/(auth)/register/page.tsx` lê `perfil` com `useSearchParams` e renderiza um componente isolado para cada fluxo:

- `UserRegister.tsx`: pessoa física ou protetor independente.
- `OrganizationRegister.tsx`: ONG/protetor vinculado a uma organização.
- `user-styles.ts` e `organization-styles.ts`: estilos próprios de cada cadastro.
- `styles.ts`: estilos compartilhados com a confirmação local do cadastro de organização.

### Pessoa física e protetor independente

Campos obrigatórios: nome completo, CPF, e-mail, telefone, cidade, UF, senha, documento de identidade e aceite da Política de Privacidade.

Verificações no formulário:

- Nome, cidade e e-mail são removidos de espaços externos; esses campos são obrigatórios.
- O e-mail precisa ter formato válido.
- CPF precisa conter 11 dígitos após remover a pontuação. Não há validação dos dígitos verificadores do CPF.
- Telefone precisa conter pelo menos 10 dígitos.
- UF precisa ter dois caracteres.
- Senha precisa ter pelo menos 8 caracteres.
- É obrigatório selecionar ao menos um arquivo de identidade.
- Cada arquivo deve ser PDF, JPG/JPEG ou PNG e ter até 10 MB.
- O aceite de privacidade é obrigatório.

RG/CNH aceita múltiplos arquivos para permitir o envio de frente e verso. A interface informa que os documentos precisam estar legíveis e que não devem ter dados ocultos.

### Organização e protetor

Campos obrigatórios: nome da organização, CNPJ, e-mail institucional, telefone, cidade, estado, nome/CPF/e-mail do responsável, e-mail de acesso, senha, comprovante de CNPJ, estatuto e aceite da Política de Privacidade. O documento do abrigo é opcional.

Verificações no formulário:

- Nome da organização, nome do responsável, cidade e e-mails são obrigatórios; os e-mails precisam ter formato válido.
- CNPJ precisa conter 14 dígitos após remover a pontuação.
- CPF do responsável precisa conter 11 dígitos após remover a pontuação. Não há validação dos dígitos verificadores.
- Telefone precisa conter pelo menos 10 dígitos.
- Estado precisa ter dois caracteres.
- Senha precisa ter pelo menos 8 caracteres.
- Comprovante de CNPJ e estatuto são obrigatórios; documento do abrigo é opcional.
- Documentos aceitam PDF, JPG/JPEG ou PNG, com limite de 10 MB por arquivo.
- O aceite de privacidade é obrigatório.

### Seleção e envio de documentos

Os controles usam inputs nativos de arquivo do navegador. A seleção abre o seletor do sistema e mostra o nome do arquivo escolhido. Formato e tamanho são verificados pelo formulário. Essas verificações no cliente melhoram o fluxo, mas não substituem validação no servidor.

Nenhum dos cadastros envia arquivos ou dados para uma API atualmente. Após a validação local, ambos registram os dados no console e substituem o formulário por uma confirmação local de cadastro em análise. O link de retorno encerra a sessão mock e abre o portal público (`/public-portal`). Os arquivos selecionados permanecem apenas no navegador.

Os campos de input têm classes semânticas estáveis via `containerClassName`, por exemplo `user-registration-cpf-input` e `organization-registration-cnpj-input`. O prefixo `jsx-*` presente no HTML é gerado automaticamente pelo `styled-jsx` para escopar estilos.

## Login, sessão e recuperação

### Login

`src/app/(auth)/login/page.tsx` usa `loginSchema` de `src/schemas/auth.ts`:

- Perfil precisa ser `adopter` ou `organization`.
- E-mail é obrigatório, removido de espaços externos e validado.
- Senha precisa estar preenchida; a regra de tamanho fica no cadastro.
- Ao passar pela validação, o login mock chama `login()` e direciona para `/public-portal`. Não há consulta de credenciais a um servidor.
- A opção “Lembrar-me” é exibida, mas ainda não altera a duração da sessão.
- Login com Google ainda não está integrado e apenas apresenta uma notificação.
- Campos de senha usam o botão de exibir/ocultar do componente compartilhado `Input`.

### Estado da sessão

`src/contexts/AuthContext.tsx` fornece `AuthProvider`, `useAuth` e `useHomeHref`:

- `login()` grava `pethub:authenticated=true` no `localStorage`.
- `logout()` remove a chave e atualiza o estado em memória.
- A sessão mock é restaurada depois da hidratação do React.
- `PUBLIC_HOME` e `AUTHENTICATED_HOME` apontam atualmente para `/public-portal`.
- Não há autenticação real, autorização por perfil ou proteção de rotas.

O portal exibe itens de navegação diferentes para visitante e usuário mock autenticado. O menu móvel fecha ao navegar; o menu da conta fecha ao clicar fora ou pressionar Escape.

### Recuperação de senha

`/forgot-password` exige um e-mail válido. O envio simula uma espera de 800 ms, mostra uma notificação de sucesso e limpa o formulário. A chamada de API está indicada como TODO e não envia e-mail real.

## Portal e dados de demonstração

`src/app/(auth)/public-portal/page.tsx` compõe a página inicial com:

- busca por texto e filtros selecionáveis; o envio encaminha `busca` e `filtros` para `/animais`;
- campanhas com valores em BRL, barra de progresso calculada pela relação entre arrecadado e meta;
- lista de animais e parceiros;
- TopBar adaptada ao estado mock de autenticação e links de navegação.

Os dados de campanha, animal, parceiro, usuário e menu vêm de `src/mocks/pethub.ts`. As fotos de animais ainda são placeholders visuais; os dados não vêm de uma API.

## Bibliotecas e responsabilidades

### Dependências de aplicação

- **Next.js 16** (`next`): App Router, rotas, navegação, renderização e servidor de desenvolvimento.
- **React 19** (`react`, `react-dom`): componentes e estado da interface.
- **TypeScript**: tipos estáticos; `tsconfig.json` ativa `strict` e o alias `@/*` para `src/*`.
- **React Hook Form** (`react-hook-form`): estado e submissão dos formulários.
- **Zod** (`zod`): schemas e regras de validação.
- **`@hookform/resolvers`**: integração de Zod com React Hook Form.
- **Stitches** (`@stitches/react`): componentes estilizados, tokens, temas e estilos globais em `src/styles`.
- **Lucide React** (`lucide-react`): ícones de ações e estados.
- **Sonner** (`sonner`): infraestrutura das notificações; `src/components/common/Toast/index.tsx` fornece a aparência e as funções `success`, `error`, `info` e `warning`.

### Desenvolvimento

- **ESLint 9** (`eslint`) com `eslint-config-next` para regras de Next.js e TypeScript.
- **Tipos de Node e React** (`@types/node`, `@types/react`, `@types/react-dom`).
- **TypeScript 5** para compilação e checagem de tipos.

## Componentes compartilhados

Os componentes estão organizados por responsabilidade em `src/components/layout`, `common`, `animais` e `navigation`. Cada componente mantém sua própria pasta e documentação junto da implementação. Consulte [src/components/README.md](src/components/README.md) para ver a estrutura completa.

## Verificações recomendadas

### Comandos automatizados

Execute antes de enviar alterações:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

O projeto não possui testes unitários ou de integração configurados neste momento.

### Roteiro manual por fluxo

1. **Rotas e perfil:** abrir `/register?perfil=adopter` e `/register?perfil=organization`; alternar o seletor entre os formulários e confirmar que a URL conserva o perfil correto. Abrir `/login?perfil=organization` e seguir para cadastro para verificar a preservação do perfil.
2. **Cadastro individual:** enviar vazio e verificar erros; testar CPF com quantidade de dígitos incorreta, e-mail inválido, telefone curto, UF diferente de dois caracteres e senha curta; selecionar um documento permitido e outro acima de 10 MB; confirmar que o nome do arquivo aparece; enviar com os campos válidos e conferir a notificação local.
3. **Cadastro de organização:** validar campos de entidade e responsável, CNPJ/CPF, e-mails, telefone, UF e senha; verificar que comprovante de CNPJ e estatuto são obrigatórios, que o documento do abrigo é opcional, e testar formato/tamanho dos arquivos; enviar dados válidos e conferir a tela local de análise. Ao retornar, confirmar que a sessão mock foi encerrada e o portal aparece como público.
4. **Login e sessão:** testar e-mail inválido e senha vazia; testar exibir/ocultar senha; confirmar o redirecionamento mock, recarregar para conferir a restauração via `localStorage` e sair pelo menu da conta.
5. **Recuperação:** testar e-mail inválido e válido; confirmar a notificação simulada, o estado de carregamento e a limpeza do formulário.
6. **Portal:** alternar filtros, buscar um termo e conferir os parâmetros de URL encaminhados; verificar o cálculo de progresso das campanhas e a apresentação dos dados mockados.
7. **Responsividade e acessibilidade:** testar viewport móvel e desktop, navegação por teclado, foco visível, associação entre rótulos/campos, estados de erro e abertura do seletor nativo de arquivos.

## Estrutura principal

```text
src/
	app/                 Rotas Next.js e estilos por página
	components/common/   Botões, inputs, marca, abas, cartões e notificações
	components/navigation/TopBar e navegação
	contexts/            Estado mock de autenticação
	mocks/               Dados locais de demonstração
	schemas/             Schemas compartilhados, como login
	styles/              Tokens, tema e estilos globais
```