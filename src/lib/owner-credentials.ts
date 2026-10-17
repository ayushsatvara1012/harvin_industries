import "server-only";

import { withDb } from "@/lib/db";
import { hashPassword } from "@/lib/password";

const MIN_RECOVERY_KEY_LENGTH = 32;

// A password the owner set through the site wins over the Worker secret, so the
// secret only matters until the first change or reset. It fails closed: if the
// database is unreachable nobody can sign in, rather than the old secret
// quietly working again.
export async function getOwnerPasswordHash(): Promise<string | undefined> {
  try {
    const row = await withDb((db) => db.ownerCredential.findUnique({ where: { id: 1 } }));
    return row?.passwordHash ?? process.env.OWNER_PASSWORD_HASH;
  } catch (error) {
    // P2021: the table is not there yet (deployed before the migration). Nothing can
    // have been changed through the site, so the secret is still the right password.
    if ((error as { code?: string }).code === "P2021") return process.env.OWNER_PASSWORD_HASH;
    throw error;
  }
}

export async function setOwnerPassword(password: string) {
  const passwordHash = await hashPassword(password);
  await withDb((db) =>
    db.ownerCredential.upsert({
      where: { id: 1 },
      create: { id: 1, passwordHash },
      update: { passwordHash },
    }),
  );
}

export function isRecoveryConfigured(): boolean {
  return (process.env.OWNER_RECOVERY_KEY?.length ?? 0) >= MIN_RECOVERY_KEY_LENGTH;
}

async function digest(value: string) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
}

// Compares fixed-length digests so the time taken does not leak how much of the key matched.
export async function isRecoveryKeyValid(candidate: string): Promise<boolean> {
  const expected = process.env.OWNER_RECOVERY_KEY;
  if (!isRecoveryConfigured() || !expected) return false;
  const [a, b] = await Promise.all([digest(candidate.trim()), digest(expected)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}
