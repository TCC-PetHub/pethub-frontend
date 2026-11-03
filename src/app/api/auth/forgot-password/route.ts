import { NextRequest, NextResponse } from "next/server";
import { isSameOrigin, noStoreHeaders } from "@/lib/auth/http";
import { recoveryEmailSchema, recoveryMessage, requestPasswordRecovery } from "@/lib/auth/password-recovery";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const reply = (body: object, status: number) => NextResponse.json(body, { status, headers: noStoreHeaders });
  if (!isSameOrigin(request)) return reply({ error: "Origem não permitida." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply({ error: "Formato inválido." }, 415);
  let body: unknown;
  try { body = await request.json(); } catch { return reply({ error: "Dados inválidos." }, 400); }
  const parsed = recoveryEmailSchema.safeParse(body);
  if (!parsed.success) return reply({ error: "Informe um e-mail válido." }, 400);
  try {
    await requestPasswordRecovery(parsed.data.email, process.env.AUTH_APP_ORIGIN || request.nextUrl.origin);
    return reply({ message: recoveryMessage }, 200);
  } catch {
    return reply({ error: "Não foi possível enviar o link agora. Aguarde alguns minutos e tente novamente." }, 503);
  }
}
