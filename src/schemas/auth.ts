import { z } from "zod";
 
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
  // No login basta exigir o campo: regras de tamanho ficam no cadastro.
  password: z.string().min(1, "Informe sua senha."),
});
 
export type LoginField = keyof z.input<typeof loginSchema>;
export type LoginInput = z.output<typeof loginSchema>;