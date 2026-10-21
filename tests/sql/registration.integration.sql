-- Executar apenas numa base local descartável com o esquema de teste e a migração.
do $$
declare
  uid uuid := gen_random_uuid();
  oid uuid := gen_random_uuid();
  abandoned uuid := gen_random_uuid();
  req uuid;
  payload jsonb;
  denied boolean := false;
begin
  insert into auth.users(id,email,raw_user_meta_data,raw_app_meta_data)
    values(uid,'pessoa@example.test','{"nome":"Pessoa teste","perfil":"adotante"}','{"registration_flow":"pethub-v1"}');
  if (select count(*) from public.usuarios where id=uid)<>1 then raise exception 'Gatilho não criou perfil único'; end if;
  if (select status::text from public.usuarios where id=uid)='ativo' then raise exception 'Perfil não pode nascer ativo'; end if;
  payload := jsonb_build_object(
    'usuario_id',uid,'profile','adopter','nome','Pessoa teste','email','pessoa@example.test',
    'telefone','41999991234','cidade','Curitiba','uf','PR','cpf_cifrado',chr(92)||'x010203',
    'cpf_hash',repeat('a',64),'versao_politica','teste-v1',
    'documentos',jsonb_build_array(jsonb_build_object('kind','identity','arquivo_chave',uid::text||'/identidade.pdf','nome_original','identidade.pdf','mime_type','application/pdf','tamanho_bytes',30))
  );
  req := public.register_account(payload);
  if (select count(*) from public.usuarios where id=uid)<>1 then raise exception 'Duplicação de perfil'; end if;
  if not exists(select 1 from public.usuarios where id=uid and endereco_id is not null and cpf_hash=repeat('a',64)) then raise exception 'Perfil não foi completado'; end if;
  if not exists(select 1 from public.documentos_cadastro where solicitacao_id=req and tipo::text='identidade_unico') then raise exception 'Tipo de documento inválido'; end if;
  if not public.registration_outcome(uid) then raise exception 'Falta recibo transacional'; end if;
  if public.rollback_registration(uid) then raise exception 'Cadastro concluído foi removido'; end if;
  begin perform public.register_account(payload); exception when others then denied := true; end;
  if not denied then raise exception 'Recadastro sobrescreveu perfil'; end if;

  insert into auth.users(id,email,raw_user_meta_data,raw_app_meta_data)
    values(abandoned,'incompleto@example.test','{"nome":"Incompleto","perfil":"adotante"}','{"registration_flow":"pethub-v1"}');
  if not public.rollback_registration(abandoned) then raise exception 'Limpeza de perfil inicial falhou'; end if;
  delete from auth.users where id=abandoned;

  insert into auth.users(id,email,raw_user_meta_data,raw_app_meta_data)
    values(oid,'ong@example.test','{"nome":"Responsável","perfil":"ong"}','{"registration_flow":"pethub-v1"}');
  payload := payload || jsonb_build_object(
    'usuario_id',oid,'profile','organization','email','ong@example.test','cpf_hash',repeat('b',64),
    'organizacao_nome','ONG teste','cnpj','11222333000181','organizacao_email','contato@example.test','responsavel_email','responsavel@example.test',
    'documentos',jsonb_build_array(
      jsonb_build_object('kind','cnpj','arquivo_chave',oid::text||'/cnpj.pdf','nome_original','cnpj.pdf','mime_type','application/pdf','tamanho_bytes',30),
      jsonb_build_object('kind','statute','arquivo_chave',oid::text||'/estatuto.pdf','nome_original','estatuto.pdf','mime_type','application/pdf','tamanho_bytes',30),
      jsonb_build_object('kind','shelter','arquivo_chave',oid::text||'/abrigo.pdf','nome_original','abrigo.pdf','mime_type','application/pdf','tamanho_bytes',30)
    )
  );
  req := public.register_account(payload);
  if not exists(select 1 from public.membros_organizacao where usuario_id=oid) then raise exception 'Vínculo da ONG ausente'; end if;
  if (select count(*) from public.documentos_cadastro where solicitacao_id=req)<>3 then raise exception 'Documentos institucionais ausentes'; end if;
  if not exists(select 1 from public.documentos_cadastro where solicitacao_id=req and tipo::text='documentacao_abrigo') then raise exception 'Enum do abrigo incompatível'; end if;
  raise notice 'OK: gatilho, perfil único, conclusão transacional, enums, ONG e limpeza segura.';
end $$;
