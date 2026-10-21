import "server-only";
import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { RegistrationError, type RegistrationInput, type RegistrationDocument } from "./validation";
import { protectCpf, verifyPrivacyConfiguration } from "./privacy";

const bucket = "documentos-cadastro";
// Never log provider messages/details: they may contain personal data.
function reportFailure(stage: string, error: unknown) {
  const value = error && typeof error === "object" ? error as { code?: unknown; status?: unknown; statusCode?: unknown } : {};
  const code = typeof value.code === "string" && /^[A-Za-z0-9_]{1,64}$/.test(value.code) ? value.code : "unknown";
  const status = String(value.status ?? value.statusCode ?? "");
  console.error("[registration]", { stage, code, status: /^\d{3}$/.test(status) ? status : undefined });
}
export async function createRegistration(input: RegistrationInput, documents: RegistrationDocument[]) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anon || !secret) throw new RegistrationError("Cadastro ainda não configurado no servidor. Tente novamente mais tarde.", 503);
  const endpoint = new URL(url);
  if (endpoint.protocol !== "https:" && !(process.env.NODE_ENV === "development" && endpoint.protocol === "http:" && ["localhost", "127.0.0.1"].includes(endpoint.hostname))) throw new RegistrationError("Configuração de conexão do cadastro inválida.", 503);
  try { verifyPrivacyConfiguration(); } catch { throw new RegistrationError("Cadastro ainda não configurado no servidor. Tente novamente mais tarde.", 503); }
  const admin = createClient(url, secret, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (resource, options) => fetch(resource, { ...options, signal: options?.signal ?? AbortSignal.timeout(15000) }) } });
  // Verify the migration and private bucket before creating an Auth user.
  const preflight = await admin.rpc("registration_configuration");
  const storage = await admin.storage.getBucket(bucket);
  if (preflight.error || preflight.data !== true || storage.error || storage.data.public) throw new RegistrationError("Cadastro aguardando configuração do banco de dados.", 503);
  const person = input.profile === "adopter" ? input.values.name : input.values.responsibleName;
  const email = (input.profile === "adopter" ? input.values.email : input.values.accessEmail).trim().toLowerCase();
  const cpf = protectCpf(input.profile === "adopter" ? input.values.cpf : input.values.responsibleCpf);
  // createUser creates only a NEW identity; duplicate accounts are never modified/deleted.
  const newUserId = randomUUID();
  const { data, error } = await admin.auth.admin.createUser({
    id: newUserId, email, password: input.values.password, email_confirm: false,
    user_metadata: { nome: person, perfil: input.profile === "adopter" ? "adotante" : "ong" },
    app_metadata: { registration_flow: "pethub-v1" },
  });
  if (error || !data.user) {
    if (error?.code === "weak_password") throw new RegistrationError("Escolha uma senha mais forte.", 400, { password: "A senha não atende à política de segurança do serviço." });
    if (error?.code === "email_address_invalid") throw new RegistrationError("Confira o e-mail de acesso informado.", 400, { [input.profile === "adopter" ? "email" : "accessEmail"]: "O serviço não aceitou este endereço de e-mail." });
    if (error?.code === "email_exists" || error?.code === "user_already_exists") return { title: "Confira as orientações de cadastro", message: "Este envio não criou uma nova solicitação de análise. Se você já cadastrou esse e-mail, use Entrar ou recuperar senha. Se ainda não possui conta, confira os dados antes de tentar novamente.", emailSent: false };
    reportFailure("auth.createUser", error);
    throw new RegistrationError("Não foi possível criar a conta. Tente novamente.", 502);
  }
  if (data.user.id !== newUserId) throw new RegistrationError("Não foi possível confirmar a nova conta.", 503);
  const userId = newUserId;
  const uploaded: string[] = [];
  let committed = false;
  let stage: "upload" | "database" = "upload";
  try {
    const records = [];
    for (const { file, kind } of documents) {
      const ext = file.type === "application/pdf" ? "pdf" : file.type === "image/png" ? "png" : "jpg";
      const path = `${userId}/${randomUUID()}.${ext}`;
      uploaded.push(path);
      const result = await admin.storage.from(bucket).upload(path, file, { contentType: file.type, upsert: false });
      if (result.error) throw result.error;
      records.push({ kind, arquivo_chave: path, nome_original: file.name.replace(/[\x00-\x1f/\\]/g, "_").slice(0, 255), mime_type: file.type, tamanho_bytes: file.size });
    }
    const payload = {
      usuario_id: userId, profile: input.profile, nome: person, email,
      telefone: input.values.phone.replace(/\D/g, ""), cidade: input.values.city, uf: input.values.state,
      cpf_cifrado: cpf.encrypted, cpf_hash: cpf.hash,
      versao_politica: process.env.PRIVACY_POLICY_VERSION,
      ...(input.profile === "organization" ? { organizacao_nome: input.values.organizationName, cnpj: input.values.cnpj.toUpperCase().replace(/[^A-Z0-9]/g, ""), organizacao_email: input.values.institutionalEmail.toLowerCase(), responsavel_email: input.values.responsibleEmail.toLowerCase() } : {}),
      documentos: records,
    };
    stage = "database";
    const saved = await admin.rpc("register_account", { payload });
    if (saved.error) throw saved.error;
    committed = true;
  } catch (failure) {
    reportFailure(stage === "upload" ? "storage.upload" : "rpc.register_account", failure);
    // A lost RPC response is ambiguous: never delete an identity with a committed profile.
    const existing = await admin.rpc("registration_outcome", { account_id: userId });
    if (existing.data === true) committed = true;
    else if (!existing.error && existing.data === false) {
      const cleanup = uploaded.length ? await admin.storage.from(bucket).remove(uploaded) : { error: null };
      // Release only the incomplete profile created by the known Auth trigger.
      const profileCleanup = await admin.rpc("rollback_registration", { account_id: userId });
      const removed = !profileCleanup.error && profileCleanup.data === true
        ? await admin.auth.admin.deleteUser(userId) : { error: true };
      if (cleanup.error || removed.error) console.error("[registration] Compensação incompleta; revisar cadastro pendente.");
      throw new RegistrationError(stage === "upload"
        ? "Não foi possível enviar o documento de identificação. Tente novamente. (CAD-UPLOAD)"
        : "Não foi possível salvar os dados do cadastro no banco. Tente novamente. (CAD-BANCO)", 502);
    } else {
      console.error("[registration] Estado da transação indisponível; revisão administrativa necessária.");
      throw new RegistrationError("Não foi possível confirmar o cadastro. Aguarde antes de reenviar e contate o suporte.", 503);
    }
  }
  if (!committed) throw new RegistrationError("Não foi possível concluir o cadastro.", 502);
  const publicClient = createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } });
  let emailSent = false;
  try { const sent = await publicClient.auth.resend({ type: "signup", email }); emailSent = !sent.error; } catch { /* The committed account must not be deleted if mail is unavailable. */ }
  return { title: "Cadastro enviado para análise", message: emailSent ? "Cadastro enviado para análise. Confira seu e-mail para confirmar o endereço. O acesso será liberado após aprovação." : "Cadastro enviado para análise. O envio do e-mail de confirmação está indisponível; entre em contato com o suporte para solicitar o reenvio.", emailSent };
}
