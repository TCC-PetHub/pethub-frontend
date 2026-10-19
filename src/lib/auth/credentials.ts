// lib/auth/credentials.ts (arquivo completo)
import "server-only";
import { scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { LoginCredentials, SessionUser } from "./types";

const deriveKey = promisify(scrypt);
const userSchema = z.object({
  id: z.string().min(1).max(256),
  name: z.string().min(1).max(150),
  role: z.enum(["adopter", "organization"]),
});

export class AuthenticationUnavailable extends Error {}

const roleFromPerfil = { adotante: "adopter", ong: "organization" } as const;

async function authenticateSupabase(
  credentials: LoginCredentials,
): Promise<SessionUser | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new AuthenticationUnavailable("Supabase não configurado.");
  }

  // Cliente descartável: o cookie de sessão continua sendo o seu JWT
  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });
  if (error || !data.user) return null;

  const { data: perfil, error: perfilError } = await supabase
    .from("usuarios")
    .select("id, nome, perfil, status")
    .eq("id", data.user.id)
    .single();

  if (perfilError || !perfil) return null;
  // Cadastro ainda em análise não entra
  if (perfil.status !== "ativo") return null;

  const role = roleFromPerfil[perfil.perfil as keyof typeof roleFromPerfil];
  // O perfil escolhido na tela precisa bater com o da conta
  if (!role || role !== credentials.profile) return null;

  return { id: perfil.id, name: perfil.nome, role };
}

// Contas de teste locais: uma por perfil, cada uma com seu prefixo de variáveis.
const devAccounts: Record<
  SessionUser["role"],
  { prefix: string; name: string }
> = {
  adopter: { prefix: "AUTH_DEV", name: "Carlos Alberto" },
  organization: { prefix: "AUTH_DEV_ORG", name: "ONG Amigos de Patas" },
};

async function authenticateDev(
  credentials: LoginCredentials,
): Promise<SessionUser | null> {
  // One explicit development fixture. Never enabled by a production deployment.
  if (
    process.env.NODE_ENV !== "development" ||
    process.env.AUTH_DEV_LOGIN_ENABLED !== "true"
  ) {
    throw new AuthenticationUnavailable(
      "A API de login ainda não foi configurada.",
    );
  }

  const { prefix, name } = devAccounts[credentials.profile];
  const email = process.env[`${prefix}_EMAIL`];
  const hash = process.env[`${prefix}_PASSWORD_HASH`];
  const salt = process.env[`${prefix}_PASSWORD_SALT`];
  const id = process.env[`${prefix}_USER_ID`];

  if (!email || !salt || !hash || !id || !/^[a-f0-9]{128}$/.test(hash)) {
    throw new AuthenticationUnavailable(
      "Credencial local de teste não configurada.",
    );
  }

  const candidate = (await deriveKey(credentials.password, salt, 64)) as Buffer;
  const correctPassword = timingSafeEqual(candidate, Buffer.from(hash, "hex"));
  if (
    !correctPassword ||
    credentials.email.toLowerCase() !== email.toLowerCase()
  ) {
    return null;
  }

  // O papel vem do perfil cuja conta foi validada, nunca fixo.
  return { id, name, role: credentials.profile };
}

// The API must verify credentials and return the authoritative identity/role.
export async function authenticate(
  credentials: LoginCredentials,
): Promise<SessionUser | null> {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return authenticateSupabase(credentials);
  }

  const endpoint = process.env.AUTH_LOGIN_URL;
  if (endpoint) {
    const url = new URL(endpoint);
    if (
      url.protocol !== "https:" &&
      !(
        process.env.NODE_ENV === "development" &&
        url.protocol === "http:" &&
        ["localhost", "127.0.0.1"].includes(url.hostname)
      )
    ) {
      throw new AuthenticationUnavailable("A API de login deve usar HTTPS.");
    }
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        profile: credentials.profile,
      }),
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(8000),
    });
    if (response.status === 401 || response.status === 403) return null;
    if (!response.ok)
      throw new AuthenticationUnavailable("API de autenticação indisponível.");
    const parsed = userSchema.safeParse(await response.json());
    if (!parsed.success)
      throw new AuthenticationUnavailable("Resposta de autenticação inválida.");
    return parsed.data;
  }

  return authenticateDev(credentials);
}
