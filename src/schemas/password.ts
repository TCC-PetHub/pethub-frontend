import { z } from "zod";

export const passwordHelp = "Use de 8 a 128 caracteres, com letras maiúsculas, minúsculas, números e símbolos.";

// Shared by registration (browser/server), login (browser/server) and recovery.
// Passwords are never trimmed or included in session tokens.
export const passwordSchema = z.string()
  .min(8, "Use pelo menos 8 caracteres.")
  .max(128, "Use até 128 caracteres.")
  .regex(/[a-z]/, "Inclua uma letra minúscula.")
  .regex(/[A-Z]/, "Inclua uma letra maiúscula.")
  .regex(/[0-9]/, "Inclua um número.")
  .regex(/[^A-Za-z0-9]/, "Inclua um símbolo.");

export function validatePassword(value: string): true | string {
  const result = passwordSchema.safeParse(value);
  return result.success ? true : result.error.issues[0].message;
}
