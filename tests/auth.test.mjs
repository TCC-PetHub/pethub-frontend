import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { randomBytes } from "node:crypto";
import ts from "typescript";
import { SignJWT, decodeJwt } from "jose";

const registerFilesUrl = new URL("../src/utils/Register/registerFiles.ts", import.meta.url).href;
const registerFormattingUrl = new URL("../src/utils/Register/registerFormatting.ts", import.meta.url).href;
const registerValidationSource = await fs.readFile(new URL("../src/utils/Register/registerValidation.ts", import.meta.url), "utf8");
const registerValidationJs = ts.transpileModule(registerValidationSource, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText
  .replace(/from ["']\.\/registerFormatting["']/g, `from ${JSON.stringify(registerFormattingUrl)}`);
const registerValidationModule = `data:text/javascript;base64,${Buffer.from(registerValidationJs).toString("base64")}`;
const registerFormattingSource = await fs.readFile(new URL("../src/utils/Register/registerFormatting.ts", import.meta.url), "utf8");
const registerFormattingJs = ts.transpileModule(registerFormattingSource, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;
const { formatCpf, formatCnpj, formatPhone, formatState } = await import(`data:text/javascript;base64,${Buffer.from(registerFormattingJs).toString("base64")}`);
const registerSchemasSource = await fs.readFile(new URL("../src/utils/Register/registerSchemas.ts", import.meta.url), "utf8");
const registerSchemasJs = ts.transpileModule(registerSchemasSource, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText
  .replace(/from ["']zod["']/g, `from ${JSON.stringify(import.meta.resolve("zod"))}`)
  .replace(/from ["']\.\/registerFiles["']/g, `from ${JSON.stringify(registerFilesUrl)}`)
  .replace(/from ["']\.\/registerValidation["']/g, `from ${JSON.stringify(registerValidationModule)}`);
const { userRegisterSchema, organizationRegisterSchema } = await import(`data:text/javascript;base64,${Buffer.from(registerSchemasJs).toString("base64")}`);

class MockFileList extends Array {
  item(index) {
    return this[index] ?? null;
  }
}

globalThis.FileList = MockFileList;
const files = (...entries) => new MockFileList(...entries);
const pdf = new File(["documento"], "documento.pdf", { type: "application/pdf" });

test("formatadores aplicam máscaras aos campos durante a digitação", () => {
  assert.equal(formatCpf("52998224725"), "529.982.247-25");
  assert.equal(formatCnpj("12abc34501de35"), "12.ABC.345/01DE-35");
  assert.equal(formatPhone("11987654321"), "(11) 98765-4321");
  assert.equal(formatPhone("1132345678"), "(11) 3234-5678");
  assert.equal(formatState("m-g"), "MG");
});

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

const validUserRegistration = {
  name: "Ana da Silva",
  cpf: "529.982.247-25",
  email: "ana@example.com",
  phone: "(11) 98765-4321",
  city: "São Paulo",
  state: "sp",
  password: "senha-segura",
  identityDocuments: files(pdf),
  acceptedTerms: true,
};

const validOrganizationRegistration = {
  organizationName: "Instituto Patas",
  cnpj: "11.222.333/0001-81",
  institutionalEmail: "contato@example.org",
  phone: "(11) 3234-5678",
  city: "São Paulo",
  state: "SP",
  responsibleName: "Maria Silva",
  responsibleCpf: "529.982.247-25",
  responsibleEmail: "maria@example.org",
  accessEmail: "acesso@example.org",
  password: "senha-segura",
  cnpjDocument: files(pdf),
  statuteDocument: files(pdf),
  shelterDocument: undefined,
  acceptedTerms: true,
};

function assertFieldRejected(schema, registration, field, value) {
  const result = schema.safeParse({ ...registration, [field]: value });
  assert.equal(result.success, false, `${field} deveria ser rejeitado`);
  assert(
    result.error.issues.some((issue) => issue.path[0] === field),
    `a falha deveria apontar para ${field}`,
  );
}

test("schema do cadastro individual aceita dados válidos e rejeita cada campo inválido", () => {
  assert.equal(userRegisterSchema.safeParse(validUserRegistration).success, true);

  for (const [field, value] of [
    ["name", "   "],
    ["cpf", "111111111111111111"],
    ["email", "email-invalido"],
    ["phone", "0012345678"],
    ["city", "   "],
    ["state", "ZZ"],
    ["password", "        "],
    ["identityDocuments", files()],
    ["acceptedTerms", false],
  ]) {
    assertFieldRejected(userRegisterSchema, validUserRegistration, field, value);
  }

  assertFieldRejected(
    userRegisterSchema,
    validUserRegistration,
    "identityDocuments",
    files(new File(["conteúdo"], "documento.txt", { type: "text/plain" })),
  );
  assertFieldRejected(
    userRegisterSchema,
    validUserRegistration,
    "identityDocuments",
    files(new File([new Uint8Array(10 * 1024 * 1024 + 1)], "grande.pdf", { type: "application/pdf" })),
  );
});

test("schema do cadastro de organização aceita dados válidos e rejeita cada campo inválido", () => {
  assert.equal(organizationRegisterSchema.safeParse(validOrganizationRegistration).success, true);

  for (const [field, value] of [
    ["organizationName", "   "],
    ["cnpj", "1231312321312312312"],
    ["institutionalEmail", "email-invalido"],
    ["phone", "0012345678"],
    ["city", "   "],
    ["state", "ZZ"],
    ["responsibleName", "   "],
    ["responsibleCpf", "111111111111111111"],
    ["responsibleEmail", "email-invalido"],
    ["accessEmail", "email-invalido"],
    ["password", "        "],
    ["cnpjDocument", files()],
    ["statuteDocument", files()],
    ["acceptedTerms", false],
  ]) {
    assertFieldRejected(organizationRegisterSchema, validOrganizationRegistration, field, value);
  }

  assert.equal(
    organizationRegisterSchema.safeParse({
      ...validOrganizationRegistration,
      cnpj: "12.ABC.345/01DE-35",
    }).success,
    true,
  );
  assert.equal(
    organizationRegisterSchema.safeParse({
      ...validOrganizationRegistration,
      shelterDocument: undefined,
    }).success,
    true,
  );
  assertFieldRejected(
    organizationRegisterSchema,
    validOrganizationRegistration,
    "shelterDocument",
    files(pdf, pdf),
  );
  assertFieldRejected(
    organizationRegisterSchema,
    validOrganizationRegistration,
    "cnpjDocument",
    files(new File(["conteúdo"], "comprovante.txt", { type: "text/plain" })),
  );
});

test("documentos rejeitam caracteres não permitidos e aceitam CNPJ alfanumérico válido", () => {
  assertFieldRejected(
    userRegisterSchema,
    validUserRegistration,
    "cpf",
    "529.982.247-25abc",
  );
  assertFieldRejected(
    organizationRegisterSchema,
    validOrganizationRegistration,
    "cnpj",
    "11.222.333/0001-81abc",
  );
  assert.equal(
    organizationRegisterSchema.safeParse({
      ...validOrganizationRegistration,
      cnpj: "12.ABC.345/01DE-35",
    }).success,
    true,
  );
});

test("erros de CPF e CNPJ aparecem junto com erros de outros campos", () => {
  const userResult = userRegisterSchema.safeParse({
    ...validUserRegistration,
    name: "",
    cpf: "111111111111111111",
    email: "email-invalido",
    phone: "0012345678",
    city: "",
    state: "ZZ",
    password: "curta",
    identityDocuments: files(),
    acceptedTerms: false,
  });
  assert.equal(userResult.success, false);
  assert(userResult.error.issues.some((issue) => issue.path[0] === "name"));
  assert(userResult.error.issues.some((issue) => issue.path[0] === "cpf"));

  const organizationResult = organizationRegisterSchema.safeParse({
    ...validOrganizationRegistration,
    organizationName: "",
    cnpj: "1231312321312312312",
    institutionalEmail: "email-invalido",
    phone: "0012345678",
    city: "",
    state: "ZZ",
    responsibleName: "",
    responsibleCpf: "111111111111111111",
  });
  assert.equal(organizationResult.success, false);
  assert(organizationResult.error.issues.some((issue) => issue.path[0] === "cnpj"));
  assert(organizationResult.error.issues.some((issue) => issue.path[0] === "responsibleCpf"));
  assert(organizationResult.error.issues.some((issue) => issue.path[0] === "organizationName"));
});
