import test from "node:test";
import assert from "node:assert/strict";
import { importSource } from "./helpers/import-source.mjs";
const { recoveryTokens } = await importSource("lib/auth/recovery-client.ts");
const { requestPasswordRecovery, recoveryEmailSchema } = await importSource("lib/auth/password-recovery.ts");

test("recuperação rejeita links incompletos, erros e tokens de outro fluxo", () => {
  for (const hash of ["", "#access_token=a&refresh_token=b", "#type=signup&access_token=a&refresh_token=b", "#type=recovery&access_token=a", "#type=recovery&access_token=a&refresh_token=b&error=expired"]) assert.equal(recoveryTokens(hash), null);
  assert.deepEqual(recoveryTokens("#type=recovery&access_token=a&refresh_token=b"), { access_token: "a", refresh_token: "b" });
  assert.equal(recoveryEmailSchema.safeParse({ email: "inválido" }).success, false);
});

test("envio usa chave pública e redirecionamento fixo; falha do provedor não vira sucesso", async () => {
  const saved = { fetch: globalThis.fetch, url: process.env.NEXT_PUBLIC_SUPABASE_URL, key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY };
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://provider.example.test";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "public-test-key";
  let failure = false;
  globalThis.fetch = async (resource, options) => {
    const url = new URL(String(resource));
    assert.equal(url.pathname, "/auth/v1/recover");
    assert.equal(url.searchParams.get("redirect_to"), "http://localhost:3000/reset-password");
    assert.equal(JSON.parse(options.body).email, "user@example.test");
    return new Response(JSON.stringify(failure ? { code: "over_email_send_rate_limit", message: "limited" } : {}), { status: failure ? 429 : 200, headers: { "Content-Type": "application/json", "X-Supabase-Api-Version": "2024-01-01" } });
  };
  try {
    await requestPasswordRecovery("user@example.test", "http://localhost:3000");
    failure = true;
    await assert.rejects(requestPasswordRecovery("user@example.test", "http://localhost:3000"));
  } finally {
    globalThis.fetch = saved.fetch;
    for (const [key, value] of [["NEXT_PUBLIC_SUPABASE_URL", saved.url], ["NEXT_PUBLIC_SUPABASE_ANON_KEY", saved.key]]) { if (value === undefined) delete process.env[key]; else process.env[key] = value; }
  }
});
