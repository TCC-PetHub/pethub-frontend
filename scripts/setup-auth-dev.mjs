import fs from "node:fs/promises";
import { randomBytes, randomUUID, scryptSync } from "node:crypto";

const file = new URL("../.env.local", import.meta.url);
let contents = "";
try { contents = await fs.readFile(file, "utf8"); } catch (error) { if (error.code !== "ENOENT") throw error; }
if (/^AUTH_JWS_SECRET=/m.test(contents) || /^AUTH_DEV_PASSWORD_HASH=/m.test(contents)) {
  console.log("Configuração existente preservada. Consulte .env.local.");
  process.exit(0);
}
const password = randomBytes(18).toString("base64url");
const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");
await fs.writeFile(file, `${contents}\n# Conta fictícia local; nunca habilitada em produção.\nAUTH_JWS_SECRET=${randomBytes(32).toString("base64url")}\nAUTH_DEV_LOGIN_ENABLED=true\nAUTH_DEV_EMAIL=carlos.alberto@email.com\nAUTH_DEV_USER_ID=${randomUUID()}\nAUTH_DEV_PASSWORD_SALT=${salt}\nAUTH_DEV_PASSWORD_HASH=${hash}\n# Senha gerada para você testar o login local. Não é enviada ao frontend.\nAUTH_DEV_PASSWORD_FOR_TESTING=${password}\n`);
console.log("Sessão JWS e conta local configuradas. E-mail e senha de teste estão em .env.local, ignorado pelo Git.");
