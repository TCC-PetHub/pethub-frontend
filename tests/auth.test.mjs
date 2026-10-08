import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { randomBytes } from "node:crypto";
import ts from "typescript";
import { SignJWT, decodeJwt } from "jose";

// Exercise the real token module with Node, without Next's build-time marker.
const source = await fs.readFile(new URL("../src/lib/auth/token.ts", import.meta.url), "utf8");
const js = ts.transpileModule(source.replace('import "server-only";', ""), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText.replace('from "jose"', `from ${JSON.stringify(import.meta.resolve("jose"))}`);
const { signSession, verifySession } = await import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
process.env.AUTH_JWS_SECRET = randomBytes(32).toString("base64url");
const user = { id: "test-user", name: "Usuário de teste", role: "adopter" };
const key = Buffer.from(process.env.AUTH_JWS_SECRET, "base64url");

async function token(overrides = {}, header = {}) {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({ sub: user.id, name: user.name, role: user.role, iss: "urn:pethub:auth:development", aud: "urn:pethub:web", iat: now, exp: now + 900, jti: "test-jti", ...overrides })
    .setProtectedHeader({ alg: "HS256", typ: "pethub-session+jwt", ...header }).sign(key);
}

test("sessão válida contém identidade mínima e expira em 15 minutos", async () => {
  const signed = await signSession(user);
  assert.deepEqual(await verifySession(signed), user);
  const payload = decodeJwt(signed);
  assert.equal(payload.exp - payload.iat, 900);
  assert.equal("password" in payload, false);
  assert.equal("email" in payload, false);
});
test("alterar o papel sem refazer a assinatura é rejeitado", async () => {
  const signed = await signSession(user);
  const parts = signed.split(".");
  parts[1] = Buffer.from(JSON.stringify({ ...decodeJwt(signed), role: "organization" })).toString("base64url");
  assert.equal(await verifySession(parts.join(".")), null);
});
test("expiração, emissor, destinatário e tipo são obrigatórios", async () => {
  const now = Math.floor(Date.now() / 1000);
  for (const claims of [{ iat: now - 1000, exp: now - 100 }, { iss: "outro" }, { iss: "urn:pethub:auth:production" }, { aud: "outra-api" }, { exp: undefined }, { sub: undefined }, { jti: undefined }, { iat: now + 3600, exp: now + 4500 }, { exp: now + 86400 }, { role: "admin" }]) {
    assert.equal(await verifySession(await token(claims)), null);
  }
  assert.equal(await verifySession(await token({}, { typ: "JWT" })), null);
});
test("nenhum algoritmo alternativo ou token sem assinatura é aceito", async () => {
  const signed = await signSession(user);
  const [, payload] = signed.split(".");
  const header = Buffer.from(JSON.stringify({ alg: "none", typ: "pethub-session+jwt" })).toString("base64url");
  assert.equal(await verifySession(`${header}.${payload}.`), null);
  assert.equal(await verifySession(await token({}, { alg: "HS384" })), null);
});
test("chave errada, ausente ou fraca não autentica", async () => {
  const signed = await signSession(user);
  const original = process.env.AUTH_JWS_SECRET;
  try {
    for (const keyValue of [randomBytes(32).toString("base64url"), "fraca", ""]) {
      process.env.AUTH_JWS_SECRET = keyValue;
      assert.equal(await verifySession(signed), null);
    }
    await assert.rejects(signSession(user));
  } finally { process.env.AUTH_JWS_SECRET = original; }
});
