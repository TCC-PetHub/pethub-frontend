import {
  normalizeDocumentDigits,
  normalizePhoneDigits,
  normalizeState,
} from "./registerFormatting";

const brazilianStates = new Set([
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT",
  "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO",
  "RR", "SC", "SP", "SE", "TO",
]);

const brazilianAreaCodes = new Set([
  "11", "12", "13", "14", "15", "16", "17", "18", "19", "21", "22",
  "24", "27", "28", "31", "32", "33", "34", "35", "37", "38", "41",
  "42", "43", "44", "45", "46", "47", "48", "49", "51", "53", "54",
  "55", "61", "62", "63", "64", "65", "66", "67", "68", "69", "71",
  "73", "74", "75", "77", "79", "81", "82", "83", "84", "85", "86",
  "87", "88", "89", "91", "93", "94", "95", "96", "97", "98", "99",
]);

export function isValidStateCode(value: string) {
  return brazilianStates.has(normalizeState(value));
}

export function isValidPhone(value: string) {
  let digits = normalizePhoneDigits(value);

  if (digits.startsWith("55") && (digits.length === 12 || digits.length === 13)) {
    digits = digits.slice(2);
  }

  if (digits.length !== 10 && digits.length !== 11) return false;
  if (!brazilianAreaCodes.has(digits.slice(0, 2))) return false;

  const subscriberNumber = digits.slice(2);
  return digits.length === 10
    ? /^[2-5]\d{7}$/.test(subscriberNumber)
    : /^9\d{8}$/.test(subscriberNumber);
}

export function isValidDocumentNumber(value: string, expectedLength: number) {
  if (expectedLength === 11) {
    if (!/^[0-9.\-\s]+$/.test(value)) return false;

    const digits = normalizeDocumentDigits(value);
    if (digits.length !== expectedLength || /^([0-9])\1+$/.test(digits)) {
      return false;
    }

    const cpfDigits = digits.split("").map(Number);

    const firstVerifier = cpfDigits.slice(0, 9).reduce((sum, digit, index) => {
      return sum + digit * (10 - index);
    }, 0);

    let firstCheckDigit = 11 - (firstVerifier % 11);
    if (firstCheckDigit >= 10) firstCheckDigit = 0;

    if (cpfDigits[9] !== firstCheckDigit) return false;

    const secondVerifier = cpfDigits.slice(0, 10).reduce((sum, digit, index) => {
      return sum + digit * (11 - index);
    }, 0);

    let secondCheckDigit = 11 - (secondVerifier % 11);
    if (secondCheckDigit >= 10) secondCheckDigit = 0;

    return cpfDigits[10] === secondCheckDigit;
  }

  if (expectedLength !== 14 || !/^[A-Z0-9./\-\s]+$/i.test(value)) return false;

  const cnpj = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (cnpj.length !== 14 || !/^\d{2}$/.test(cnpj.slice(12))) return false;
  if (/^([A-Z0-9])\1+$/.test(cnpj)) return false;

  const cnpjValues = Array.from(cnpj.slice(0, 12), (character) => {
    return character.charCodeAt(0) - 48;
  });
  const checkDigits = cnpj.slice(12).split("").map(Number);
  const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const secondWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const firstVerifier = cnpjValues.reduce((sum, digit, index) => {
    return sum + digit * firstWeights[index];
  }, 0);

  let firstCheckDigit = 11 - (firstVerifier % 11);
  if (firstCheckDigit >= 10) firstCheckDigit = 0;

  if (checkDigits[0] !== firstCheckDigit) return false;

  const secondVerifier = [...cnpjValues, checkDigits[0]].reduce((sum, digit, index) => {
    return sum + digit * secondWeights[index];
  }, 0);

  let secondCheckDigit = 11 - (secondVerifier % 11);
  if (secondCheckDigit >= 10) secondCheckDigit = 0;

  return checkDigits[1] === secondCheckDigit;
}

