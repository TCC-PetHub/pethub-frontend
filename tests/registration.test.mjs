import test from "node:test";
import assert from "node:assert/strict";
import { randomBytes, createDecipheriv } from "node:crypto";
import { importSource } from "./helpers/import-source.mjs";
const { parseRegistration, parseDocuments } = await importSource("lib/registration/validation.ts");
const { protectCpf } = await importSource("lib/registration/privacy.ts");
const { createRegistration } = await importSource("lib/registration/service.ts");

process.env.REGISTRATION_ENCRYPTION_KEY = randomBytes(32).toString("base64url");
process.env.REGISTRATION_HASH_KEY = randomBytes(32).toString("base64url");
process.env.PRIVACY_POLICY_VERSION = "test-v1";
const fixture = { profile: "adopter", name: "Pessoa de teste", cpf: "529.982.247-25", email: "cadastro@example.test", phone: "(41) 99999-1234", city: "Curitiba", state: "PR", password: "UmaSenhaDeTeste!123", acceptedTerms: "true" };
function form(values = fixture) {
  const f = new FormData(); for (const [k,v] of Object.entries(values)) f.set(k,v);
  f.append("identityDocuments", new File(["%PDF-1.7\nfixture"], "documento.pdf", { type: "application/pdf" }));
  return f;
}
test("servidor rejeita CPF, consentimento e perfil inválidos", () => {
  for (const change of [{ cpf: "11111111111" }, { acceptedTerms: "false" }, { profile: "admin" }]) assert.throws(() => parseRegistration(form({ ...fixture, ...change })));
  assert.equal(parseRegistration(form()).profile, "adopter");
});
test("arquivos exigem assinatura real, tamanho e campos obrigatórios", async () => {
  assert.equal((await parseDocuments(form(), "adopter")).length, 1);
  const empty = form(); empty.delete("identityDocuments"); await assert.rejects(parseDocuments(empty, "adopter"));
  const forged = form(); forged.set("identityDocuments", new File(["conteúdo falso"], "documento.pdf", {type:"application/pdf"})); await assert.rejects(parseDocuments(forged, "adopter"));
  const huge = form(); huge.set("identityDocuments", new File([new Uint8Array(10*1024*1024+1)], "grande.pdf", {type:"application/pdf"})); await assert.rejects(parseDocuments(huge, "adopter"));
  await assert.rejects(parseDocuments(form(), "organization"));
});
test("CPF tem cifragem autenticada e hash estável independente da máscara", () => {
  const first = protectCpf(fixture.cpf), second = protectCpf("52998224725");
  assert.equal(first.hash, second.hash); assert.notEqual(first.encrypted, second.encrypted);
  const bytes = Buffer.from(first.encrypted.slice(2), "hex");
  assert.equal(bytes[0],1);
  const decrypt = createDecipheriv("aes-256-gcm", Buffer.from(process.env.REGISTRATION_ENCRYPTION_KEY,"base64url"),bytes.subarray(1,13));
  decrypt.setAuthTag(bytes.subarray(13,29));
  assert.equal(Buffer.concat([decrypt.update(bytes.subarray(29)),decrypt.final()]).toString(),"52998224725");
});

test("identidade completa ou frente/verso mantém a classificação dos arquivos", async () => {
  const one = form();
  assert.deepEqual((await parseDocuments(one, "adopter")).map(d => d.kind), ["identity"]);
  one.append("identityDocuments", new File(["%PDF-1.7\nverso"], "verso.pdf", { type: "application/pdf" }));
  assert.deepEqual((await parseDocuments(one, "adopter")).map(d => d.kind), ["identity_front", "identity_back"]);
  one.append("identityDocuments", new File(["%PDF-1.7\nextra"], "extra.pdf", { type: "application/pdf" }));
  await assert.rejects(parseDocuments(one, "adopter"));
});

async function withProvider(mode, run) {
  const originalFetch = globalThis.fetch;
  const old = {url:process.env.NEXT_PUBLIC_SUPABASE_URL,anon:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,secret:process.env.SUPABASE_SERVICE_ROLE_KEY};
  process.env.NEXT_PUBLIC_SUPABASE_URL="https://provider.example.test";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY="test-anon";
  process.env.SUPABASE_SERVICE_ROLE_KEY="test-server-secret";
  const calls=[]; let createdId;
  globalThis.fetch = async (resource, options={}) => {
    const u=new URL(typeof resource === "string" ? resource : resource.url ?? String(resource));
    const path=u.pathname, method=options.method ?? "GET";
    let body;try {body=typeof options.body==='string'?JSON.parse(options.body):undefined;} catch{}
    calls.push({path,method,body});
    let data={},status=200;
    if(path.endsWith('/rpc/registration_configuration'))data=true;
    else if(path.endsWith('/rpc/consume_registration_attempt'))data=mode!=='limited';
    else if(path.endsWith('/bucket/documentos-cadastro'))data={id:'documentos-cadastro',public:false};
    else if(path.endsWith('/admin/users')&&method==='POST'){
      if(mode==='duplicate'){data={code:'email_exists',message:'already registered'};status=422;}
      else if(mode==='invalid-email'){data={code:'email_address_invalid',message:'invalid email'};status=422;}
      else if(mode==='unknown-422'){data={code:'validation_failed',message:'validation failed'};status=422;}
      else {createdId=body.id;data={id:createdId,email:body.email,identities:[]};}
    }
    else if(path.includes('/object/documentos-cadastro')&&method==='POST'){
      if(mode==='upload-fails'){data={message:'upload failure'};status=500;} else data={Key:'ok'};
    }
    else if(path.endsWith('/rpc/register_account')){
      if(mode==='rpc-fails'||mode==='ambiguous'){data={message:'RPC failed'};status=500;} else data='request-id';
    }
    else if(path.endsWith('/rpc/registration_outcome'))data=mode==='ambiguous';
    else if(path.endsWith('/rpc/rollback_registration'))data=mode!=='cleanup-denied';
    else if(path.endsWith('/object/documentos-cadastro')&&method==='DELETE')data=[];
    else if(path.includes('/admin/users/')&&method==='DELETE')data={id:createdId};
    else if(path.endsWith('/resend')){if(mode==='mail-fails'){data={message:'mail unavailable'};status=500;}}
    else throw Error('Unexpected provider request: '+path+' '+method);
    return new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','X-Supabase-Api-Version':'2024-01-01'}});
  };
  try {await run(calls);} finally {globalThis.fetch=originalFetch; for(const [name,key] of [['NEXT_PUBLIC_SUPABASE_URL','url'],['NEXT_PUBLIC_SUPABASE_ANON_KEY','anon'],['SUPABASE_SERVICE_ROLE_KEY','secret']]){if(old[key]===undefined)delete process.env[name];else process.env[name]=old[key];}}
}
async function register() {const f=form();return createRegistration(parseRegistration(f),await parseDocuments(f,'adopter'));}
test("cadastro grava perfil e documentos; RPC não recebe senha nem CPF em claro", async () => {
  await withProvider('ok',async calls=>{
    const result=await register();assert.equal(result.emailSent,true);
    const payload=calls.find(c=>c.path.endsWith('/rpc/register_account')).body.payload;
    const identity=calls.find(c=>c.path.endsWith('/admin/users')&&c.method==='POST').body;
    assert.deepEqual(identity.user_metadata,{nome:fixture.name,perfil:'adotante'});
    assert.equal(identity.app_metadata.registration_flow,'pethub-v1');
    assert.ok(payload.cpf_cifrado.startsWith('\\x'));assert.equal(payload.cpf_hash.length,64);assert.equal(payload.documentos.length,1);
    assert.equal(JSON.stringify(payload).includes(fixture.password),false);assert.equal(JSON.stringify(payload).includes('52998224725'),false);
    assert.equal(calls.some(c=>c.method==='DELETE'),false);
  });
});
test("falhas de upload/RPC limpam somente a nova conta e os anexos", async () => {
  for(const mode of ['upload-fails','rpc-fails'])await withProvider(mode,async calls=>{
    await assert.rejects(register(),error=>error.status===502&&error.message.includes(mode==='upload-fails'?'CAD-UPLOAD':'CAD-BANCO'));assert.ok(calls.some(c=>c.path.includes('/admin/users/')&&c.method==='DELETE'));assert.ok(calls.some(c=>c.path.endsWith('/object/documentos-cadastro')&&c.method==='DELETE'));assert.ok(calls.findIndex(c=>c.path.endsWith('/rpc/rollback_registration'))<calls.findIndex(c=>c.path.includes('/admin/users/')&&c.method==='DELETE'));assert.equal(calls.some(c=>c.path.endsWith('/resend')),false);
  });
});
test("resposta RPC perdida e falha de e-mail não apagam cadastro confirmado", async () => {
  for(const mode of ['ambiguous','mail-fails'])await withProvider(mode,async calls=>{const result=await register();assert.equal(calls.some(c=>c.method==='DELETE'),false);if(mode==='mail-fails')assert.equal(result.emailSent,false);});
});
test("duplicidade não modifica conta existente; cadastro não consulta limite antigo",async()=>{
  await withProvider('duplicate',async calls=>{const result=await register();assert.equal(result.title,'Confira as orientações de cadastro');assert.ok(result.message.includes('não criou uma nova solicitação'));assert.equal(calls.some(c=>c.method==='DELETE'||c.path.endsWith('/rpc/register_account')),false);});
  await withProvider('limited',async calls=>{const result=await register();assert.equal(result.title,'Cadastro enviado para análise');assert.equal(calls.some(c=>c.path.endsWith('/rpc/consume_registration_attempt')),false);});
});

test("erros 422 do provedor não são confundidos com cadastro recebido", async()=>{
  for(const mode of ['invalid-email','unknown-422'])await withProvider(mode,async()=>{await assert.rejects(register(),error=>error.status===(mode==='invalid-email'?400:502));});
});

test("organização registra responsável e comprovantes sem perfil administrativo", async()=>{
  const values={profile:"organization",organizationName:"ONG de teste",cnpj:"11.222.333/0001-81",institutionalEmail:"ong@example.test",phone:fixture.phone,city:fixture.city,state:fixture.state,responsibleName:fixture.name,responsibleCpf:fixture.cpf,responsibleEmail:"responsavel@example.test",accessEmail:"acesso@example.test",password:fixture.password,acceptedTerms:"true"};
  const f=form(values);
  for(const name of ['cnpjDocument','statuteDocument'])f.append(name,new File(['%PDF-1.7\nfixture'],name+'.pdf',{type:'application/pdf'}));
  await withProvider('ok',async calls=>{
    await createRegistration(parseRegistration(f),await parseDocuments(f,'organization'));
    const payload=calls.find(c=>c.path.endsWith('/rpc/register_account')).body.payload;
    assert.equal(payload.profile,'organization');assert.equal(payload.cnpj,'11222333000181');assert.equal(payload.email,'acesso@example.test');assert.equal(payload.organizacao_email,'ong@example.test');assert.equal(payload.documentos.length,2);assert.equal('status' in payload,false);assert.equal('role' in payload,false);
  });
});
