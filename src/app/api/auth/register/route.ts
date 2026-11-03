import { NextRequest, NextResponse } from "next/server";
import { isSameOrigin, noStoreHeaders } from "@/lib/auth/http";
import { parseRegistration, parseDocuments, RegistrationError } from "@/lib/registration/validation";
import { createRegistration } from "@/lib/registration/service";

export const runtime = "nodejs";
const maxBody = 32 * 1024 * 1024;
export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Origem não permitida." }, { status: 403, headers: noStoreHeaders });
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data")) return NextResponse.json({ error: "Envie os dados e os documentos pelo formulário." }, { status: 415, headers: noStoreHeaders });
  try {
    if (Number(request.headers.get("content-length")) > maxBody) throw new RegistrationError("O envio completo deve ter no máximo 32 MB.", 413);
    const reader = request.body?.getReader();
    if (!reader) throw new RegistrationError("Formulário vazio.");
    const chunks: Uint8Array[] = []; let length = 0;
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        length += value.byteLength;
        if (length > maxBody) { await reader.cancel(); throw new RegistrationError("O envio completo deve ter no máximo 32 MB.", 413); }
        chunks.push(value);
      }
    } finally { reader.releaseLock(); }
    let form: FormData;
    try { form = await new Response(new Uint8Array(Buffer.concat(chunks)), { headers: { "Content-Type": request.headers.get("content-type")! } }).formData(); }
    catch { throw new RegistrationError("Formulário inválido."); }
    const input = parseRegistration(form);
    const documents = await parseDocuments(form, input.profile);
    return NextResponse.json(await createRegistration(input, documents), { status: 202, headers: noStoreHeaders });
  } catch (error) {
    if (error instanceof RegistrationError) return NextResponse.json({ error: error.message, fields: error.fields }, { status: error.status, headers: noStoreHeaders });
    // Never log submitted passwords, personal identifiers or provider error bodies.
    return NextResponse.json({ error: "O cadastro está indisponível. Tente novamente mais tarde." }, { status: 503, headers: noStoreHeaders });
  }
}
