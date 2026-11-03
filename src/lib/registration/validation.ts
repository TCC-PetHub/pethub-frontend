import { z } from "zod";
import { userRegisterSchema, organizationRegisterSchema } from "@/utils/Register/registerSchemas";

export const individualRegistrationSchema = userRegisterSchema.omit({ identityDocuments: true })
  .refine(data => data.name.length <= 150 && data.email.length <= 254 && data.phone.length <= 30 && data.city.length <= 120 && data.password.length <= 128, "Um dos campos excedeu o tamanho permitido.");
export const institutionRegistrationSchema = organizationRegisterSchema.omit({ cnpjDocument: true, statuteDocument: true, shelterDocument: true })
  .refine(data => data.organizationName.length <= 150 && data.responsibleName.length <= 150 && [data.institutionalEmail, data.accessEmail, data.responsibleEmail].every(email => email.length <= 254) && data.phone.length <= 30 && data.city.length <= 120 && data.password.length <= 128, "Um dos campos excedeu o tamanho permitido.");

export type RegistrationInput =
  | { profile: "adopter"; values: z.infer<typeof individualRegistrationSchema> }
  | { profile: "organization"; values: z.infer<typeof institutionRegistrationSchema> };
export type DocumentKind = "identity" | "identity_front" | "identity_back" | "cnpj" | "statute" | "shelter";
export interface RegistrationDocument { kind: DocumentKind; file: File; }
export class RegistrationError extends Error {
  constructor(message: string, public status = 400, public fields?: Record<string, string>) { super(message); }
}

export function parseRegistration(form: FormData): RegistrationInput {
  const values = Object.fromEntries(Array.from(form.entries()).filter(([, value]) => typeof value === "string"));
  const input = { ...values, acceptedTerms: values.acceptedTerms === "true" };
  if (form.get("profile") !== "adopter" && form.get("profile") !== "organization") throw new RegistrationError("Selecione um perfil válido.");
  const profile = form.get("profile");
  const parsed = profile === "adopter" ? individualRegistrationSchema.safeParse(input) : institutionRegistrationSchema.safeParse(input);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) if (issue.path[0] && !fields[String(issue.path[0])]) fields[String(issue.path[0])] = issue.message;
    throw new RegistrationError("Confira os dados informados.", 400, fields);
  }
  return { profile, values: parsed.data } as RegistrationInput;
}

export async function parseDocuments(form: FormData, profile: RegistrationInput["profile"]): Promise<RegistrationDocument[]> {
  const specs: [string, DocumentKind, number, number][] = profile === "adopter"
    ? [["identityDocuments", "identity", 1, 2]]
    : [["cnpjDocument", "cnpj", 1, 1], ["statuteDocument", "statute", 1, 1], ["shelterDocument", "shelter", 0, 1]];
  const documents: RegistrationDocument[] = [];
  for (const [field, kind, min, max] of specs) {
    const files = form.getAll(field);
    if (files.length < min || files.length > max) throw new RegistrationError(`Confira os anexos: ${field}.`, 400, { [field]: `Envie ${min === max ? min : `de ${min} a ${max}`} arquivo(s).` });
    for (const [index, value] of files.entries()) {
      if (typeof value === "string" || value.size === 0 || value.size > 10 * 1024 * 1024) throw new RegistrationError("Cada documento deve conter de 1 byte a 10 MB.", 400, { [field]: "Selecione um arquivo válido de até 10 MB." });
      const signature = new Uint8Array(await value.slice(0, 8).arrayBuffer());
      const valid = (value.type === "application/pdf" && new TextDecoder().decode(signature.slice(0, 5)) === "%PDF-" && /\.pdf$/i.test(value.name)) ||
        (value.type === "image/jpeg" && signature[0] === 255 && signature[1] === 216 && signature[2] === 255 && /\.jpe?g$/i.test(value.name)) ||
        (value.type === "image/png" && [137,80,78,71,13,10,26,10].every((b,i) => signature[i] === b) && /\.png$/i.test(value.name));
      if (!valid) throw new RegistrationError("Documento inválido. Use PDF, JPG ou PNG.", 400, { [field]: "O conteúdo do arquivo não corresponde a um PDF, JPG ou PNG válido." });
      const documentKind = kind === "identity" && files.length === 2
        ? index === 0 ? "identity_front" : "identity_back"
        : kind;
      documents.push({ kind: documentKind, file: value });
    }
  }
  return documents;
}
