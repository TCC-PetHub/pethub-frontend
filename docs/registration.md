# Criação de contas

Os dois formulários de `/register` enviam `multipart/form-data` para `POST /api/auth/register`. O cadastro individual e o organizacional entram em análise, conforme as telas atuais. A senha é armazenada somente pelo Supabase Auth. Não é gravada em `public.usuarios.senha_hash`, nem em logs, metadados ou respostas.

## Ativação no Supabase existente

1. Revisar e aplicar `supabase/migrations/202610210001_registration.sql` no SQL Editor. É um complemento às tabelas existentes, não uma execução do SQL de referência. A função final informa incompatibilidades de enums ou gatilhos. O arquivo não foi aplicado remotamente nesta tarefa.
2. Configurar no `.env.local` do servidor:

```dotenv
SUPABASE_SERVICE_ROLE_KEY=chave_secreta_do_servidor_supabase
REGISTRATION_ENCRYPTION_KEY=32_bytes_aleatorios_em_base64url
REGISTRATION_HASH_KEY=outros_32_bytes_aleatorios_em_base64url
PRIVACY_POLICY_VERSION=versao_da_politica_exibida_no_formulario
```

As variáveis existentes `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` e `AUTH_APP_ORIGIN` continuam em uso. Não coloque a chave de serviço nem as chaves do CPF em variáveis `NEXT_PUBLIC_`. Não envie segredos pelo chat nem pelo Git. Gere cada chave com `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"` no seu terminal. Guarde as chaves de forma durável; trocar a chave de cifragem sem migração impede ler os CPFs anteriores.

3. Habilitar confirmação de e-mail, configurar SMTP e conferir a Site URL no Supabase Auth. O fluxo cria uma identidade não confirmada com `admin.createUser` e solicita a confirmação com `auth.resend`. Se o e-mail falhar, a conta permanece pendente e a tela informa a falha. Não libera login automaticamente.
4. Reiniciar o servidor. Validar o fluxo completo num ambiente de teste e confirmar o e-mail. Depois da análise administrativa, atualizar o status para `ativo` para permitir login. Este trabalho não cria uma tela de aprovação administrativa.

Não foi configurada uma chave de serviço neste projeto durante a tarefa. Sem configuração e migração, o endpoint responde 503 e o formulário mostra a indisponibilidade, sem simular sucesso ou criar usuários.

A tentativa de consultar apenas os metadados com a configuração pública atual recebeu HTTP 401 do Supabase. Conferir URL e chave pública no painel antes do teste real; os enums não puderam ser lidos remotamente nesta tarefa.

## Persistência

- `auth.users`: identidade e senha, sem confirmação automática.
- `enderecos`: cidade e UF.
- `usuarios`: perfil (`adotante`/`ong`), contato e status pendente.
- `organizacoes` e `membros_organizacao`: somente no cadastro institucional.
- `solicitacoes_cadastro`: solicitação em análise.
- `documentos_cadastro`: chaves dos arquivos, nomes, tipos e tamanho.
- `consentimentos`: aceite, versão da política e horário.
- `logs_auditoria`: evento sem senha ou CPF em claro.

O gatilho existente `on_auth_user_created`/`handle_new_auth_user` cria um perfil inicial pendente. O servidor envia `nome` e `perfil` nos metadados esperados pelo gatilho. O RPC `register_account` completa esse perfil e grava os demais registros públicos numa transação; não insere um segundo usuário nem sobrescreve um cadastro concluído. A origem do fluxo também é identificada em `app_metadata`, que somente o backend pode definir.

Em falha conhecida, o servidor remove arquivos, solicita `rollback_registration` para remover somente o perfil inicial incompleto e então exclui a identidade que acabou de criar. Isso respeita o FK entre `usuarios` e `auth.users`, que não tem exclusão em cascata no esquema fornecido. Uma falha de resposta do RPC é conferida pelo recibo transacional `registration_outcome` antes de remover qualquer conta. Se o resultado não puder ser confirmado, a conta fica para revisão administrativa, em vez de arriscar apagar um cadastro concluído. Uma falha de rede durante a própria criação no Auth também pode exigir revisão pelo administrador.

## Documentos e privacidade

O bucket `documentos-cadastro` é privado, com acesso do backend. Não são geradas URLs públicas. Cada PDF/JPG/PNG deve ter até 10 MB; o servidor confere tipo, extensão e assinatura inicial do conteúdo. Essa verificação não substitui antivírus ou análise dos documentos. Há limite de dois anexos de identidade e de 32 MB por envio completo. Um arquivo representa o documento completo (`identidade_unico`); dois arquivos representam, na ordem exibida, `identidade_frente` e `identidade_verso`. A hospedagem também precisa permitir esse tamanho de requisição; plataformas com limite menor exigem upload direto por URL assinada antes de publicar.

CPF usa AES-256-GCM. O `bytea` armazena versão 1, IV de 12 bytes, tag de 16 bytes e conteúdo cifrado. Para unicidade é usado HMAC-SHA256 com chave separada, e não um hash simples de CPF. A migração amplia os campos de hash para `varchar(64)` e a UF para `varchar(2)`, preservando os valores existentes. Hashes antigos eventualmente truncados não são reconstruídos automaticamente e devem ser revisados antes de produção.

Os tipos de documento foram ajustados aos valores enviados do Supabase: `identidade_frente`, `identidade_verso`, `identidade_unico`, `comprovante_cnpj`, `estatuto` e `documentacao_abrigo`. Nenhum novo enum é criado. Os status de pendência continuam sendo conferidos no banco. Caso haja outro gatilho INSERT em `auth.users`, a configuração bloqueia o cadastro para revisão de compatibilidade; nenhum gatilho existente é removido automaticamente.

A migração atualiza o corpo de `handle_new_auth_user` mantendo o gatilho existente. Corrige a tipagem do status pelo tipo real da tabela e mantém os dois perfis pendentes, sem ativação antecipada do adotante. Essa alteração afeta novas contas; não rebaixa o status das contas já aprovadas. O gatilho conhecido é aceito pela verificação de configuração; outros gatilhos de INSERT continuam sujeitos a revisão.

Somente `service_role` pode invocar os RPCs de gravação. A migração restringe leitura de perfil à própria identidade e impede escrita de perfil pelo navegador. Também retira acesso direto às solicitações, documentos e consentimentos. Revisar políticas e privilégios de coluna já existentes antes de aplicar em produção.

O cadastro não aplica limite de tentativas por e-mail ou por hora. A função de limite de versões anteriores do banco não é mais chamada pela aplicação.

## Validação realizada

`npm run test:registration` verifica dados inválidos, arquivos falsos, CPF cifrado, fluxo de cadastro e compensações usando o SDK real do Supabase com HTTP simulado. Não cria usuários reais. O banco remoto, o envio real de e-mail e os enums específicos ainda precisam de teste após a configuração acima.

A migração também foi executada em PostgreSQL 18 local descartável, com uma reprodução das tabelas fornecidas, dos enums de documentos confirmados e do gatilho existente. `tests/sql/registration.integration.sql` verificou perfil inicial pendente, conclusão sem duplicação, recusa de recadastro, proteção de cadastro concluído, limpeza do perfil inicial antes de excluir Auth e cadastro de ONG com documentos. Não executar esse arquivo de teste na base real.
