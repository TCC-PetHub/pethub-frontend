import "server-only";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

export const recoveryEmailSchema = z.object({ email: z.string().trim().max(254).pipe(z.email()) });
export const recoveryMessage = "Se houver uma conta com esse e-mail, você receberá um link para redefinir a senha. Confira também o spam.";

export async function requestPasswordRecovery(email: string, origin: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("recovery_unavailable");
  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: (resource, options) => fetch(resource, { ...options, signal: options?.signal ?? AbortSignal.timeout(15000) }) },
  });
  const { error } = await client.auth.resetPasswordForEmail(email, {
    redirectTo: new URL("/reset-password", origin).href,
  });
  if (error) throw new Error("recovery_unavailable");
}
