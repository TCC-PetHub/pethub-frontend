import { createClient } from "@supabase/supabase-js";

// Recovery credentials live only in memory, separate from the PetHub session.
export function createRecoveryClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Recuperação indisponível no momento.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
}

export function recoveryTokens(hash: string) {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const access_token = params.get("access_token");
  const refresh_token = params.get("refresh_token");
  if (params.get("type") !== "recovery" || !access_token || !refresh_token || params.has("error")) return null;
  return { access_token, refresh_token };
}
