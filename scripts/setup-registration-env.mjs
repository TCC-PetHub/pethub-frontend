import fs from "node:fs/promises";
import { randomBytes } from "node:crypto";

const path = new URL("../.env.local", import.meta.url);
let contents = await fs.readFile(path, "utf8");
function value(name) {
  const line = contents.split(/\r?\n/).find(line => line.startsWith(`${name}=`));
  return line?.slice(name.length + 1).trim().replace(/^(["'])(.*)\1$/, "$2") ?? "";
}
function fill(name, create) {
  if (value(name)) return;
  const next = `${name}=${create()}`;
  const pattern = new RegExp(`^${name}=.*$`, "m");
  contents = pattern.test(contents) ? contents.replace(pattern, () => next) : `${contents.trimEnd()}\n${next}\n`;
}

// Never rotate existing keys: previous encrypted records depend on them.
fill("REGISTRATION_ENCRYPTION_KEY", () => randomBytes(32).toString("base64url"));
fill("REGISTRATION_HASH_KEY", () => randomBytes(32).toString("base64url"));
// Identifies the consent text currently displayed by the registration forms.
fill("PRIVACY_POLICY_VERSION", () => "consentimento-cadastro-2026-10-21");
fill("SUPABASE_SERVICE_ROLE_KEY", () => process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || "");
await fs.writeFile(path, contents, { mode: 0o600 });
for (const name of ["REGISTRATION_ENCRYPTION_KEY", "REGISTRATION_HASH_KEY", "PRIVACY_POLICY_VERSION", "SUPABASE_SERVICE_ROLE_KEY"]) {
  console.log(`${name}: ${value(name) ? "configurada" : "aguardando chave do painel Supabase"}`);
}
