// PBKDF2 through Web Crypto: native on Workers (bcrypt in JS would blow the CPU
// limit) and 100k is the iteration ceiling Workers allow. The stored form uses
// dots, not `$`, because Next expands `$` in .env files.
const ITERATIONS = 100_000;
const KEY_BITS = 256;

const toBase64Url = (bytes: Uint8Array) =>
  Buffer.from(bytes).toString("base64url");
const fromBase64Url = (value: string) => new Uint8Array(Buffer.from(value, "base64url"));

async function derive(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: salt as BufferSource, iterations },
    key,
    KEY_BITS,
  );
  return new Uint8Array(bits);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derive(password, salt, ITERATIONS);
  return `pbkdf2.${ITERATIONS}.${toBase64Url(salt)}.${toBase64Url(hash)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, iterations, salt, hash] = stored.split(".");
  if (scheme !== "pbkdf2" || !iterations || !salt || !hash) return false;
  const expected = fromBase64Url(hash);
  const actual = await derive(password, fromBase64Url(salt), Number(iterations));
  if (actual.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < actual.length; i++) diff |= actual[i] ^ expected[i];
  return diff === 0;
}
