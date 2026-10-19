import type { RefinementCtx } from "zod";

export const ACCEPTED_DOCUMENT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
] as const;

export function isFileList(value: unknown): value is FileList {
  return typeof FileList !== "undefined" && value instanceof FileList;
}

export function validateDocumentFiles(
  files: unknown,
  fieldName: string,
  ctx: RefinementCtx,
) {
  if (!isFileList(files)) return;

  Array.from(files).forEach((file) => {
    if (file.size > 10 * 1024 * 1024) {
      ctx.addIssue({
        code: "custom",
        path: [fieldName],
        message: "Cada arquivo deve ter no máximo 10 MB",
      });
    }

    if (!ACCEPTED_DOCUMENT_TYPES.includes(file.type as (typeof ACCEPTED_DOCUMENT_TYPES)[number])) {
      ctx.addIssue({
        code: "custom",
        path: [fieldName],
        message: "Envie arquivos PDF, JPG ou PNG",
      });
    }
  });
}
