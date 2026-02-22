export function sanitizeText(value: string): string {
  return value
    .replace(/\u0000/g, "")
    .replace(/[<>]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

