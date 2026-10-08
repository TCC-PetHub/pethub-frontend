# Cadastro

A estrutura do cadastro foi organizada em módulos por perfil e com validações compartilhadas em utilitários dedicados. Toda a documentação deste módulo fica centralizada nesta página.

## Estrutura principal

- `page.tsx`: define o fluxo principal e alterna entre os perfis com base no parâmetro `perfil` da URL.
- `User/UserRegister.tsx`: formulário do perfil individual.
- `User/user-styles.ts`: estilos específicos do cadastro individual.
- `Organization/OrganizationRegister.tsx`: formulário do perfil institucional.
- `Organization/organization-styles.ts`: estilos específicos do cadastro organizacional.
- `styles.ts`: estilos compartilhados entre as telas de cadastro e a confirmação de envio.
- `src/utils/Register/`: camada de utilitários compartilhados para validação, normalização, arquivos e payload.

## Fluxo de perfil

A página principal lê a query string `perfil` e alterna entre os forms:

- sem parâmetro ou `perfil=adopter`: formulário de usuário individual
- `perfil=organization`: formulário de organização

A seleção e a navegação preservam o estado na URL para manter o fluxo consistente.

## Cadastro individual

Campos principais:

- nome completo
- CPF
- e-mail
- telefone
- cidade
- UF
- senha
- documento de identidade
- aceite da Política de Privacidade

Validações centrais:

- nome obrigatório
- CPF com 11 dígitos e verificadores válidos
- e-mail em formato válido
- telefone brasileiro com DDD válido e número fixo ou celular
- UF pertencente à lista de estados brasileiros
- senha com no mínimo 8 caracteres não brancos
- arquivo obrigatório com tipo PDF/JPG/PNG e até 10 MB
- aceite da política obrigatório

## Cadastro de organização

Campos principais:

- nome da organização
- CNPJ
- e-mail institucional
- telefone
- cidade
- UF
- nome do responsável
- CPF do responsável
- e-mail de acesso
- senha
- comprovante de CNPJ
- estatuto da organização
- documento do abrigo (opcional)
- aceite da Política de Privacidade

Validações centrais:

- nome da organização obrigatório
- CNPJ com 14 caracteres numéricos ou alfanuméricos e verificadores válidos
- CPF do responsável com 11 dígitos e verificadores válidos
- e-mails em formato válido
- telefone brasileiro com DDD válido e número fixo ou celular
- UF pertencente à lista de estados brasileiros
- senha com no mínimo 8 caracteres não brancos
- comprovante de CNPJ e estatuto obrigatórios; documento do abrigo opcional
- arquivos PDF/JPG/PNG com até 10 MB cada
- aceite da política obrigatório

## Utilitários compartilhados

Os formulários usam os utilitários do diretório `src/utils/Register` para manter a lógica centralizada:

- `registerValidation.ts`: validações de regra de negócio
- `registerFormatting.ts`: máscaras visuais e normalização de entrada
- `registerFiles.ts`: validação de arquivos e tipos aceitos
- `registerSchemas.ts`: schemas Zod dos formulários individual e organizacional

### 1) `registerValidation.ts`

Responsável pelas regras puras reutilizadas pelos schemas Zod do cadastro.

Funções principais:

- `isValidDocumentNumber`: verifica tamanho, repetição e dígitos verificadores de CPF/CNPJ.
- `isValidPhone`: valida DDD e número fixo ou celular brasileiro.
- `isValidStateCode`: verifica se a sigla corresponde a um estado brasileiro.

Obrigatoriedade, e-mail, senha, consentimento e demais mensagens são declarados nos campos Zod de `registerSchemas.ts`.

### 2) `registerFormatting.ts`

Responsável pelas máscaras visuais aplicadas durante a digitação e pela padronização da entrada.

Funções principais:

- `formatCpf` e `formatCnpj`: aplicam as máscaras de CPF e CNPJ numérico/alfanumérico.
- `formatPhone`: aplica a máscara de telefone fixo ou celular.
- `formatState`: limita a UF a duas letras maiúsculas.
- `normalizeText`: remove espaços extras e trim do início/fim.
- `normalizeState`: normaliza UF para maiúscula e espaço limpo.
- `normalizePhoneDigits`: remove qualquer caractere não numérico.
- `normalizeDocumentDigits`: mantém apenas dígitos para CPF/CNPJ.

Essas funções evitam inconsistências como UF em minúsculo e documentos com máscara.

### 3) `registerFiles.ts`

Responsável por regras de arquivo anexados.

Funções principais:

- `ACCEPTED_DOCUMENT_TYPES`: tipos permitidos no upload.
- `isFileList`: valida se o valor é `FileList`.
- `validateDocumentFiles`: garante que cada arquivo tenha até 10 MB e tipo permitido: PDF, JPG ou PNG.

## Observação de implementação

A lógica de envio continua local, sem API integrada. O formulário valida os dados e mostra a etapa de confirmação após o submit.

Essa estrutura reduz risco de divergência entre regras, facilita manutenção e mantém o módulo do cadastro consistente em todos os perfis.