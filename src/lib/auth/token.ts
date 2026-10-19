import "server-only";
import { randomUUID } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import type { SessionUser } from "./types";

export const SESSION_COOKIE = "pethub-session";
export const SESSION_DURATION_SECONDS = 15 * 60;
const issuer = `urn:pethub:auth:${process.env.NODE_ENV === "production" ? "production" : "development"}`;
const audience = "urn:pethub:web";
const tokenType = "pethub-session+jwt";

function signingKey() {
  const encoded = process.env.AUTH_JWS_SECRET;
  if (!encoded || !/^[A-Za-z0-9_-]{43,}$/.test(encoded)) {
    throw new Error("Configure AUTH_JWS_SECRET com pelo menos 32 bytes aleatórios em base64url.");
  }
  const key = Buffer.from(encoded, "base64url");
  if (key.length < 32) throw new Error("A chave JWS deve conter pelo menos 32 bytes.");
  return key;
}

export async function signSession(user: SessionUser) {
  return new SignJWT({ name: user.name, role: user.role })
    .setProtectedHeader({ alg: "HS256", typ: tokenType })
    .setSubject(user.id)
    .setIssuer(issuer)
    .setAudience(audience)
    .setIssuedAt()
    .setJti(randomUUID())
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(signingKey());
}

export async function verifySession(token: string | undefined): Promise<SessionUser | null> {
  if (!token || token.length > 4096) return null;
  try {
    const { payload } = await jwtVerify(token, signingKey(), {
      algorithms: ["HS256"],
      issuer,
      audience,
      typ: tokenType,
      requiredClaims: ["sub", "iat", "exp", "jti", "name", "role"],
      maxTokenAge: SESSION_DURATION_SECONDS,
      clockTolerance: 5,
    });
    if (
      typeof payload.sub !== "string" || !payload.sub || payload.sub.length > 256 ||
      typeof payload.name !== "string" || !payload.name || payload.name.length > 150 ||
      typeof payload.jti !== "string" || !payload.jti ||
      (payload.role !== "adopter" && payload.role !== "organization") ||
      typeof payload.iat !== "number" || typeof payload.exp !== "number" ||
      payload.exp - payload.iat > SESSION_DURATION_SECONDS || payload.exp <= payload.iat
    ) return null;
    return { id: payload.sub, name: payload.name, role: payload.role };
  } catch {
    // Invalid, expired or unconfigured sessions never authenticate a request.
    return null;
  }
}
