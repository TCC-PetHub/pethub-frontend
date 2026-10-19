import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/schemas/auth";
import { authenticate } from "@/lib/auth/credentials";
import { signSession, SESSION_COOKIE, SESSION_DURATION_SECONDS } from "@/lib/auth/token";
import { isSameOrigin, noStoreHeaders, sessionCookieOptions } from "@/lib/auth/http";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Origem não permitida." }, { status: 403, headers: noStoreHeaders });
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return NextResponse.json({ error: "Formato inválido." }, { status: 415, headers: noStoreHeaders });
  }
  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400, headers: noStoreHeaders });
  }
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success || parsed.data.password.length > 1024) {
    return NextResponse.json({ error: "Confira o e-mail, a senha e o perfil." }, { status: 400, headers: noStoreHeaders });
  }
  try {
    const user = await authenticate(parsed.data);
    if (!user) return NextResponse.json({ error: "E-mail ou senha inválidos para este perfil." }, { status: 401, headers: noStoreHeaders });
    const token = await signSession(user);
    const response = NextResponse.json({ user }, { headers: noStoreHeaders });
    const remember = typeof body === "object" && body !== null && "remember" in body && body.remember === true;
    response.cookies.set(SESSION_COOKIE, token, { ...sessionCookieOptions, ...(remember ? { maxAge: SESSION_DURATION_SECONDS } : {}) });
    response.cookies.set("pethub-authenticated", "", { path: "/", maxAge: 0 });
    return response;
  } catch {
    return NextResponse.json({ error: "O acesso está indisponível. Verifique a configuração da autenticação." }, { status: 503, headers: noStoreHeaders });
  }
}
