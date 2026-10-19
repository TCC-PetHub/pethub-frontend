export function normalizeText(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeState(value: string): string {
  return normalizeText(value).toUpperCase();
}

export function normalizePhoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function normalizeDocumentDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatCpf(value: string): string {
  const digits = normalizeDocumentDigits(value).slice(0, 11);
  let formatted = digits.slice(0, 3);

  if (digits.length > 3) formatted += `.${digits.slice(3, 6)}`;
  if (digits.length > 6) formatted += `.${digits.slice(6, 9)}`;
  if (digits.length > 9) formatted += `-${digits.slice(9, 11)}`;

  return formatted;
}

export function formatCnpj(value: string): string {
  const characters = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 14);
  let formatted = characters.slice(0, 2);

  if (characters.length > 2) formatted += `.${characters.slice(2, 5)}`;
  if (characters.length > 5) formatted += `.${characters.slice(5, 8)}`;
  if (characters.length > 8) formatted += `/${characters.slice(8, 12)}`;
  if (characters.length > 12) formatted += `-${characters.slice(12, 14)}`;

  return formatted;
}

export function formatPhone(value: string): string {
  let digits = normalizePhoneDigits(value);

  if (digits.startsWith("55") && (digits.length === 12 || digits.length === 13)) {
    digits = digits.slice(2);
  }

  digits = digits.slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length === 1) return `(${digits}`;

  const areaCode = digits.slice(0, 2);
  const subscriber = digits.slice(2);
  if (subscriber.length === 0) return `(${areaCode})`;

  const subscriberPrefix = subscriber.length > 4
    ? subscriber.slice(0, -4)
    : subscriber;
  const subscriberSuffix = subscriber.length > 4
    ? `-${subscriber.slice(-4)}`
    : "";

  return `(${areaCode}) ${subscriberPrefix}${subscriberSuffix}`;
}

export function formatState(value: string): string {
  return value.replace(/[^a-z]/gi, "").slice(0, 2).toUpperCase();
}
