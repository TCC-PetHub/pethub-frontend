import { z } from "zod";

import {
  isFileList,
  validateDocumentFiles,
} from "./registerFiles";
import {
  isValidDocumentNumber,
  isValidPhone,
  isValidStateCode,
} from "./registerValidation";

function emailSchema(requiredMessage: string) {
  return z
    .string()
    .trim()
    .min(1, requiredMessage)
    .pipe(z.email({ error: "E-mail inválido" }));
}

function validateFileList(
  files: FileList | undefined,
  fieldName: string,
  ctx: z.RefinementCtx,
  {
    required,
    multiple,
    requiredMessage,
  }: { required: boolean; multiple: boolean; requiredMessage: string },
) {
  if (files === undefined) {
    if (required) {
      ctx.addIssue({ code: "custom", message: requiredMessage });
    }
    return;
  }

  if (required && files.length === 0) {
    ctx.addIssue({ code: "custom", message: requiredMessage });
  }

  if (!multiple && files.length > 1) {
    ctx.addIssue({ code: "custom", message: "Envie apenas um arquivo" });
  }

  validateDocumentFiles(files, fieldName, ctx);
}

function requiredDocumentFilesSchema(
  fieldName: string,
  requiredMessage: string,
  multiple = false,
) {
  return z
    .custom<FileList>(isFileList, requiredMessage)
    .superRefine((files, ctx) => {
      validateFileList(files, fieldName, ctx, {
        required: true,
        multiple,
        requiredMessage,
      });
    });
}

function optionalDocumentFilesSchema(fieldName: string) {
  return z
    .custom<FileList | undefined>(
      (value) => value === undefined || isFileList(value),
      "Lista de arquivos inválida",
    )
    .superRefine((files, ctx) => {
      validateFileList(files, fieldName, ctx, {
        required: false,
        multiple: false,
        requiredMessage: "",
      });
    });
}

const acceptedTermsSchema = z
  .boolean()
  .refine((accepted) => accepted, "Aceite a Política de Privacidade para continuar");

export const userRegisterSchema = z.object({
  name: z.string().trim().min(1, "Informe seu nome completo"),
  cpf: z
    .string()
    .trim()
    .min(1, "Informe seu CPF")
    .refine((value) => isValidDocumentNumber(value, 11), "CPF inválido"),
  email: emailSchema("Informe seu e-mail"),
  phone: z
    .string()
    .trim()
    .min(1, "Informe seu telefone")
    .refine(isValidPhone, "Telefone inválido"),
  city: z.string().trim().min(1, "Informe sua cidade"),
  state: z
    .string()
    .trim()
    .toUpperCase()
    .min(1, "Informe sua UF")
    .refine(isValidStateCode, "Informe uma UF válida"),
  password: z
    .string()
    .min(1, "Informe sua senha")
    .refine((value) => value.trim().length >= 8, "Mínimo 8 caracteres"),
  identityDocuments: requiredDocumentFilesSchema(
    "identityDocuments",
    "Anexe seu documento de identificação",
    true,
  ),
  acceptedTerms: acceptedTermsSchema,
});

export const organizationRegisterSchema = z.object({
  organizationName: z
    .string()
    .trim()
    .min(1, "Informe o nome da organização"),
  cnpj: z
    .string()
    .trim()
    .min(1, "Informe o CNPJ")
    .refine((value) => isValidDocumentNumber(value, 14), "CNPJ inválido"),
  institutionalEmail: emailSchema("Informe o e-mail institucional"),
  phone: z
    .string()
    .trim()
    .min(1, "Informe o telefone")
    .refine(isValidPhone, "Telefone inválido"),
  city: z.string().trim().min(1, "Informe a cidade"),
  state: z
    .string()
    .trim()
    .toUpperCase()
    .min(1, "Informe a UF")
    .refine(isValidStateCode, "Informe uma UF válida"),
  responsibleName: z
    .string()
    .trim()
    .min(1, "Informe o nome do responsável"),
  responsibleCpf: z
    .string()
    .trim()
    .min(1, "Informe o CPF do responsável")
    .refine((value) => isValidDocumentNumber(value, 11), "CPF inválido"),
  responsibleEmail: emailSchema("Informe o e-mail do responsável"),
  accessEmail: emailSchema("Informe o e-mail de acesso"),
  password: z
    .string()
    .min(1, "Informe a senha")
    .refine((value) => value.trim().length >= 8, "Mínimo 8 caracteres"),
  cnpjDocument: requiredDocumentFilesSchema(
    "cnpjDocument",
    "Anexe o comprovante de CNPJ",
  ),
  statuteDocument: requiredDocumentFilesSchema(
    "statuteDocument",
    "Anexe o estatuto da organização",
  ),
  shelterDocument: optionalDocumentFilesSchema("shelterDocument"),
  acceptedTerms: acceptedTermsSchema,
});

export type UserRegisterData = z.infer<typeof userRegisterSchema>;
export type OrganizationRegisterData = z.infer<
  typeof organizationRegisterSchema
>;