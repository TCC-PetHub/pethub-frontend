-- Complemento para as tabelas EXISTENTES do PetHub. Não execute o esquema de referência.
-- Revisar e aplicar no SQL Editor do Supabase (papel postgres).
begin;
create schema if not exists pethub_private;
revoke all on schema pethub_private from public, anon, authenticated;

-- O esquema fornecido mostra character sem tamanho. SHA-256 precisa de 64 caracteres.
do $$ begin
  if exists(select 1 from public.usuarios where length(cpf_hash::text)>64)
    or exists(select 1 from public.organizacoes where length(responsavel_cpf_hash::text)>64) then
    raise exception 'Hashes existentes maiores que 64 caracteres: revisar migração sem truncar dados';
  end if;
end $$;
alter table public.usuarios alter column cpf_hash type varchar(64) using btrim(cpf_hash::text);
alter table public.organizacoes alter column responsavel_cpf_hash type varchar(64) using btrim(responsavel_cpf_hash::text);
-- UF contém duas letras; character sem tamanho permite apenas uma.
alter table public.enderecos alter column uf type varchar(2) using btrim(uf::text);

-- Converte categorias do formulário para valores que realmente existem nos enums.
create or replace function pethub_private.registration_enum(tbl regclass, col name, candidates text[])
returns text language plpgsql stable set search_path = '' as $$
declare label text;
begin
  select e.enumlabel into label
  from pg_catalog.pg_attribute a
  join pg_catalog.pg_type t on t.oid = a.atttypid
  join pg_catalog.pg_enum e on e.enumtypid = t.oid
  where a.attrelid = tbl and a.attname = col and e.enumlabel::text = any(candidates)
  order by pg_catalog.array_position(candidates, e.enumlabel::text) limit 1;
  if label is null then raise exception 'Enum incompatível: %.%. Valores esperados: %', tbl, col, candidates; end if;
  return label;
end $$;
revoke all on function pethub_private.registration_enum(regclass,name,text[]) from public,anon,authenticated;

-- Compatibiliza o gatilho já existente, sem criar um segundo gatilho.
-- Ambos os formulários exigem análise: nenhuma identidade nova nasce ativa.
create or replace function public.handle_new_auth_user()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  requested_profile text := new.raw_user_meta_data->>'perfil';
  initial_row public.usuarios%rowtype;
begin
  if requested_profile is null or requested_profile not in ('adotante','ong') then
    raise exception 'Perfil de cadastro inválido';
  end if;
  initial_row := jsonb_populate_record(null::public.usuarios,jsonb_build_object(
    'perfil',requested_profile,
    'status',pethub_private.registration_enum('public.usuarios','status',array['em_analise','pendente','pendente_aprovacao'])
  ));
  insert into public.usuarios(id,email,nome,perfil,status,created_at,updated_at)
  values(new.id,lower(new.email),coalesce(nullif(new.raw_user_meta_data->>'nome',''),nullif(new.raw_user_meta_data->>'organizationName',''),split_part(new.email,'@',1)),initial_row.perfil,initial_row.status,now(),now())
  on conflict(id) do nothing;
  return new;
end $$;
revoke all on function public.handle_new_auth_user() from public,anon,authenticated;

create or replace function public.registration_configuration()
returns boolean language plpgsql security definer set search_path = '' as $$
begin
  perform pethub_private.registration_enum('public.usuarios','perfil',array['adotante']);
  perform pethub_private.registration_enum('public.usuarios','perfil',array['ong']);
  perform pethub_private.registration_enum('public.usuarios','status',array['em_analise','pendente','pendente_aprovacao']);
  perform pethub_private.registration_enum('public.organizacoes','status',array['em_analise','pendente','pendente_aprovacao']);
  perform pethub_private.registration_enum('public.documentos_cadastro','tipo',array['identidade_unico']);
  perform pethub_private.registration_enum('public.documentos_cadastro','tipo',array['identidade_frente']);
  perform pethub_private.registration_enum('public.documentos_cadastro','tipo',array['identidade_verso']);
  perform pethub_private.registration_enum('public.documentos_cadastro','tipo',array['comprovante_cnpj','cnpj']);
  perform pethub_private.registration_enum('public.documentos_cadastro','tipo',array['estatuto','estatuto_social']);
  perform pethub_private.registration_enum('public.documentos_cadastro','tipo',array['documentacao_abrigo']);
  -- O gatilho fornecido foi compatibilizado acima. Outros continuam exigindo revisão.
  if exists(select 1 from pg_catalog.pg_trigger where tgrelid='auth.users'::regclass and not tgisinternal and tgenabled <> 'D' and (tgtype::integer & 4) <> 0
    and not (tgname='on_auth_user_created' and tgfoid='public.handle_new_auth_user()'::regprocedure and tgtype=5 and tgqual is null)) then
    raise exception 'Revisar outro gatilho INSERT existente em auth.users antes de habilitar este cadastro';
  end if;
  return true;
end $$;
revoke all on function public.registration_configuration() from public,anon,authenticated;
grant execute on function public.registration_configuration() to service_role;

create or replace function public.register_account(payload jsonb)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  uid uuid := (payload->>'usuario_id')::uuid;
  address_id uuid := gen_random_uuid();
  organization_id uuid;
  request_id uuid := gen_random_uuid();
  user_row public.usuarios%rowtype;
  organization_row public.organizacoes%rowtype;
  document_row public.documentos_cadastro%rowtype;
  existing_row public.usuarios%rowtype;
  d jsonb;
  kind text;
  pending text;
begin
  perform public.registration_configuration();
  if payload->>'profile' not in ('adopter','organization') then raise exception 'Perfil inválido'; end if;
  if not exists(select 1 from auth.users where id=uid and lower(email)=lower(payload->>'email')) then raise exception 'Identidade inválida'; end if;
  if exists(select 1 from public.solicitacoes_cadastro where usuario_id=uid) then raise exception 'Cadastro já recebido'; end if;
  if not exists(select 1 from auth.users where id=uid and raw_app_meta_data->>'registration_flow'='pethub-v1') then raise exception 'Origem de cadastro inválida'; end if;
  select * into existing_row from public.usuarios where id=uid for update;
  if found and (existing_row.cpf_hash is not null or existing_row.endereco_id is not null
    or lower(existing_row.email)<>lower(payload->>'email')
    or existing_row.perfil::text<>case when payload->>'profile'='organization' then 'ong' else 'adotante' end
    or existing_row.status::text<>pethub_private.registration_enum('public.usuarios','status',array['em_analise','pendente','pendente_aprovacao'])) then
    raise exception 'Perfil já possui dados ou situação incompatível';
  end if;
  if coalesce(payload->>'versao_politica','')='' or jsonb_array_length(payload->'documentos') < 1 then raise exception 'Cadastro incompleto'; end if;
  if (payload->>'cpf_hash') !~ '^[a-f0-9]{64}$' then raise exception 'Identificador inválido'; end if;

  insert into public.enderecos(id,cidade,uf,created_at)
  values(address_id,payload->>'cidade',payload->>'uf',now());
  pending := pethub_private.registration_enum('public.usuarios','status',array['em_analise','pendente','pendente_aprovacao']);
  user_row := jsonb_populate_record(null::public.usuarios, jsonb_build_object(
    'id',uid,'nome',payload->>'nome','email',lower(payload->>'email'),
    'perfil',case when payload->>'profile'='organization' then 'ong' else 'adotante' end,
    'status',pending,'telefone',payload->>'telefone','endereco_id',address_id,
    'cpf_cifrado',payload->>'cpf_cifrado','cpf_hash',payload->>'cpf_hash',
    'created_at',now(),'updated_at',now()
  ));
  -- senha_hash fica NULL: a credencial pertence exclusivamente a auth.users.
  insert into public.usuarios(id,nome,email,perfil,status,telefone,endereco_id,cpf_cifrado,cpf_hash,created_at,updated_at)
  values(user_row.id,user_row.nome,user_row.email,user_row.perfil,user_row.status,user_row.telefone,user_row.endereco_id,user_row.cpf_cifrado,user_row.cpf_hash,now(),now())
  on conflict(id) do update set
    nome=excluded.nome,telefone=excluded.telefone,endereco_id=excluded.endereco_id,
    cpf_cifrado=excluded.cpf_cifrado,cpf_hash=excluded.cpf_hash,updated_at=now();

  if payload->>'profile'='organization' then
    organization_id := gen_random_uuid();
    organization_row := jsonb_populate_record(null::public.organizacoes,jsonb_build_object(
      'id',organization_id,'nome',payload->>'organizacao_nome','cnpj',payload->>'cnpj',
      'email',payload->>'organizacao_email','telefone',payload->>'telefone','endereco_id',address_id,
      'responsavel_nome',payload->>'nome','responsavel_email',payload->>'responsavel_email',
      'responsavel_cpf_cifrado',payload->>'cpf_cifrado','responsavel_cpf_hash',payload->>'cpf_hash',
      'status',pethub_private.registration_enum('public.organizacoes','status',array['em_analise','pendente','pendente_aprovacao'])
    ));
    insert into public.organizacoes(id,nome,cnpj,email,telefone,endereco_id,responsavel_nome,responsavel_email,responsavel_cpf_cifrado,responsavel_cpf_hash,status,created_at,updated_at)
    values(organization_row.id,organization_row.nome,organization_row.cnpj,organization_row.email,organization_row.telefone,organization_row.endereco_id,organization_row.responsavel_nome,organization_row.responsavel_email,organization_row.responsavel_cpf_cifrado,organization_row.responsavel_cpf_hash,organization_row.status,now(),now());
    insert into public.membros_organizacao(organizacao_id,usuario_id,papel,created_at)
      values(organization_id,uid,'responsavel',now());
  end if;
  insert into public.solicitacoes_cadastro(id,usuario_id,organizacao_id,status,enviada_em)
    values(request_id,uid,organization_id,'em_analise',now());

  for d in select value from jsonb_array_elements(payload->'documentos') loop
    if d->>'arquivo_chave' not like uid::text||'/%' or (d->>'tamanho_bytes')::integer not between 1 and 10485760 then raise exception 'Documento inválido'; end if;
    kind := case d->>'kind'
      when 'identity' then 'identidade_unico'
      when 'identity_front' then 'identidade_frente'
      when 'identity_back' then 'identidade_verso'
      when 'cnpj' then pethub_private.registration_enum('public.documentos_cadastro','tipo',array['comprovante_cnpj','cnpj'])
      when 'statute' then pethub_private.registration_enum('public.documentos_cadastro','tipo',array['estatuto','estatuto_social'])
      when 'shelter' then 'documentacao_abrigo'
      else null end;
    if kind is null then raise exception 'Tipo de documento inválido'; end if;
    document_row := jsonb_populate_record(null::public.documentos_cadastro,jsonb_build_object('tipo',kind,'status','enviado'));
    insert into public.documentos_cadastro(id,solicitacao_id,tipo,arquivo_chave,nome_original,mime_type,tamanho_bytes,status,created_at)
      values(gen_random_uuid(),request_id,document_row.tipo,d->>'arquivo_chave',d->>'nome_original',d->>'mime_type',(d->>'tamanho_bytes')::integer,document_row.status,now());
  end loop;
  insert into public.consentimentos(id,usuario_id,finalidade,versao_politica,concedido_em,created_at)
    values(gen_random_uuid(),uid,'politica_privacidade',payload->>'versao_politica',now(),now());
  insert into public.logs_auditoria(usuario_id,acao,recurso_tipo,recurso_id,detalhes,ocorrido_em)
    values(uid,'cadastro_criado','solicitacoes_cadastro',request_id::text,jsonb_build_object('perfil',payload->>'profile'),now());
  return request_id;
end $$;
revoke all on function public.register_account(jsonb) from public,anon,authenticated;
grant execute on function public.register_account(jsonb) to service_role;

create or replace function public.registration_outcome(account_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.logs_auditoria where usuario_id=account_id and acao='cadastro_criado');
$$;
revoke all on function public.registration_outcome(uuid) from public,anon,authenticated;
grant execute on function public.registration_outcome(uuid) to service_role;

-- Antes de excluir a nova identidade Auth, remover somente seu perfil inicial.
-- O FK usuarios_id_auth_fkey não tem ON DELETE CASCADE no esquema fornecido.
create or replace function public.rollback_registration(account_id uuid)
returns boolean language plpgsql security definer set search_path = '' as $$
begin
  if not exists(select 1 from auth.users where id=account_id and raw_app_meta_data->>'registration_flow'='pethub-v1') then return false; end if;
  if exists(select 1 from public.solicitacoes_cadastro where usuario_id=account_id)
    or exists(select 1 from public.logs_auditoria where usuario_id=account_id and acao='cadastro_criado')
    or exists(select 1 from public.consentimentos where usuario_id=account_id)
    or exists(select 1 from public.membros_organizacao where usuario_id=account_id) then return false; end if;
  delete from public.usuarios where id=account_id and cpf_hash is null and endereco_id is null
    and status::text=pethub_private.registration_enum('public.usuarios','status',array['em_analise','pendente','pendente_aprovacao']);
  return not exists(select 1 from public.usuarios where id=account_id);
end $$;
revoke all on function public.rollback_registration(uuid) from public,anon,authenticated;
grant execute on function public.rollback_registration(uuid) to service_role;

-- Perfis são alterados pelo backend, não por user_metadata ou chamadas do navegador.
alter table public.usuarios enable row level security;
revoke all on public.usuarios from public,anon,authenticated;
grant select(id,nome,email,telefone,foto_url,perfil,status,endereco_id) on public.usuarios to authenticated;
drop policy if exists pethub_profile_self on public.usuarios;
create policy pethub_profile_self on public.usuarios for select to authenticated using(id=(select auth.uid()));
drop policy if exists pethub_profile_self_only on public.usuarios;
create policy pethub_profile_self_only on public.usuarios as restrictive for select to authenticated using(id=(select auth.uid()));

-- Nenhum documento de identidade é público. Upload e leitura autorizada só no servidor.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
  values('documentos-cadastro','documentos-cadastro',false,10485760,array['application/pdf','image/jpeg','image/png'])
  on conflict(id) do update set public=false,file_size_limit=10485760,allowed_mime_types=excluded.allowed_mime_types;
drop policy if exists pethub_registration_documents_private on storage.objects;
create policy pethub_registration_documents_private on storage.objects as restrictive for all to anon,authenticated
  using(bucket_id<>'documentos-cadastro') with check(bucket_id<>'documentos-cadastro');

-- Retira acesso direto aos dados sensíveis que este fluxo grava.
revoke all on public.documentos_cadastro,public.solicitacoes_cadastro,public.consentimentos from public,anon,authenticated;
alter table public.documentos_cadastro enable row level security;
alter table public.solicitacoes_cadastro enable row level security;
alter table public.consentimentos enable row level security;
-- Conferir após aplicar. Uma incompatibilidade de enum/gatilho gera erro legível.
select public.registration_configuration();
commit;
