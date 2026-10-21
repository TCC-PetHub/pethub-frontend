import "server-only";
import { createCipheriv, createHmac, randomBytes } from "node:crypto";

function key(name: string) {
  const encoded = process.env[name];
  if (!encoded || !/^[A-Za-z0-9_-]{43}$/.test(encoded)) throw new Error(`Configure ${name} com 32 bytes aleatórios em base64url.`);
  const decoded = Buffer.from(encoded, "base64url");
  if (decoded.length !== 32) throw new Error(`Chave ${name} inválida.`);
  return decoded;
}
export function verifyPrivacyConfiguration() {
  key("REGISTRATION_ENCRYPTION_KEY");
  key("REGISTRATION_HASH_KEY");
  if (!process.env.PRIVACY_POLICY_VERSION) throw new Error("Configure PRIVACY_POLICY_VERSION.");
}
export function protectCpf(value: string) {
  const cpf = value.replace(/\D/g, "");
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key("REGISTRATION_ENCRYPTION_KEY"), iv);
  const encrypted = Buffer.concat([cipher.update(cpf, "utf8"), cipher.final()]);
  // bytea envelope: version (1), IV (12), authentication tag (16), ciphertext.
  const envelope = Buffer.concat([Buffer.from([1]), iv, cipher.getAuthTag(), encrypted]);
  return { encrypted: `\\x${envelope.toString("hex")}`, hash: createHmac("sha256", key("REGISTRATION_HASH_KEY")).update(cpf).digest("hex") };
}
