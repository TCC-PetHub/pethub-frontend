import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

export async function submitRegistration<T extends FieldValues>(profile: "adopter" | "organization", values: T, setError: UseFormSetError<T>): Promise<{ title: string; message: string } | null> {
  const form = new FormData();
  form.set("profile", profile);
  for (const [key, value] of Object.entries(values)) {
    if (typeof FileList !== "undefined" && value instanceof FileList) for (const file of Array.from(value)) form.append(key, file);
    else if (value !== undefined) form.set(key, String(value));
  }
  try {
    const response = await fetch("/api/auth/register", { method: "POST", body: form });
    const result = await response.json();
    if (!response.ok) {
      for (const [key, message] of Object.entries(result.fields ?? {})) if (key in values && typeof message === "string") setError(key as Path<T>, { type: "server", message });
      setError("root.server", { type: "server", message: result.error ?? "Não foi possível concluir o cadastro." });
      return null;
    }
    if (typeof result.message !== "string" || !result.message) throw new Error("Resposta inválida");
    return { title: typeof result.title === "string" ? result.title : "Confira as orientações de cadastro", message: result.message };
  } catch {
    setError("root.server", { type: "server", message: "Não foi possível confirmar o envio. Confira sua conexão antes de tentar novamente." });
    return null;
  }
}
