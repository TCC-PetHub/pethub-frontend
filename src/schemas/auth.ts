import { z } from "zod";
import { passwordSchema } from "./password";
 
export const profiles = ["adopter", "organization"] as const;
 
export const profileLabels: Record<(typeof profiles)[number], string> = {
  adopter: "Adotante / Cidadão",
  organization: "ONG / Protetor",
};
 
export const loginSchema = z.object({
  profile: z.enum(profiles, { error: "Selecione o tipo de perfil." }),
  email: z
    .string()
    .trim()
    .min(1, "Informe seu e-mail.")
    .pipe(z.email("Informe um e-mail válido.")),
  password: passwordSchema,
});
 
export type LoginField = keyof z.input<typeof loginSchema>;
export type LoginInput = z.output<typeof loginSchema>;