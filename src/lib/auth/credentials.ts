import "server-only";
import { scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { z } from "zod";
import type { LoginCredentials, SessionUser } from "./types";

const deriveKey = promisify(scrypt);
const userSchema = z.object({
  id: z.string().min(1).max(256),
  name: z.string().min(1).max(150),
  role: z.enum(["adopter", "organization"]),
});

export class AuthenticationUnavailable extends Error {}

// The API must verify credentials and return the authoritative identity/role.
export async function authenticate(credentials: LoginCredentials): Promise<SessionUser | null> {
  const endpoint = process.env.AUTH_LOGIN_URL;
  if (endpoint) {
    const url = new URL(endpoint);
    if (url.protocol !== "https:" && !(process.env.NODE_ENV === "development" && url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))) {
      throw new AuthenticationUnavailable("A API de login deve usar HTTPS.");
    }
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: credentials.email, password: credentials.password, profile: credentials.profile }),
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(8000),
    });
    if (response.status === 401 || response.status === 403) return null;
    if (!response.ok) throw new AuthenticationUnavailable("API de autenticação indisponível.");
    const parsed = userSchema.safeParse(await response.json());
    if (!parsed.success) throw new AuthenticationUnavailable("Resposta de autenticação inválida.");
    return parsed.data;
  }

  // One explicit development fixture. Never enabled by a production deployment.
  if (process.env.NODE_ENV !== "development" || process.env.AUTH_DEV_LOGIN_ENABLED !== "true") {
    throw new AuthenticationUnavailable("A API de login ainda não foi configurada.");
  }
  const { AUTH_DEV_EMAIL: email, AUTH_DEV_PASSWORD_HASH: hash, AUTH_DEV_PASSWORD_SALT: salt, AUTH_DEV_USER_ID: id } = process.env;
  if (!email || !salt || !hash || !id || !/^[a-f0-9]{128}$/.test(hash)) {
    throw new AuthenticationUnavailable("Credencial local de teste não configurada.");
  }
  const candidate = await deriveKey(credentials.password, salt, 64) as Buffer;
  const correctPassword = timingSafeEqual(candidate, Buffer.from(hash, "hex"));
  if (!correctPassword || credentials.email.toLowerCase() !== email.toLowerCase() || credentials.profile !== "adopter") return null;
  return { id, name: "Carlos Alberto", role: "adopter" };
}
