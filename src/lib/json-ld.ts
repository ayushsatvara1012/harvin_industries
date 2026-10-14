// JSON.stringify leaves "<" alone, so text containing "</script>" would end the
// structured-data block early and let the rest run as markup. Escaping the
// characters HTML treats specially keeps any owner-entered text inert.
const ESCAPES: Record<string, string> = {
  "<": "\\u003c",
  ">": "\\u003e",
  "&": "\\u0026",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
};

export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/[<>&\u2028\u2029]/g, (char) => ESCAPES[char]);
}
