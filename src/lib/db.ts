import "server-only";

import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma/client";

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not set");
  return new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Workers forbid reusing an I/O object (the Neon websocket) across requests, so a
// shared client fails on every second request. Production opens a client per
// operation and closes it; dev keeps one so hot reloads do not leak connections.
export async function withDb<T>(run: (db: PrismaClient) => Promise<T>): Promise<T> {
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma ??= createClient();
    return run(globalForPrisma.prisma);
  }
  const client = createClient();
  try {
    return await run(client);
  } finally {
    await client.$disconnect().catch(() => {});
  }
}

// Neon's free tier suspends after idle, so the first query can fail while the
// compute wakes. Retry briefly instead of surfacing that as an error.
export async function withWakeRetry<T>(run: (db: PrismaClient) => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      return await withDb(run);
    } catch (error) {
      lastError = error;
      console.error(`[db] query failed (attempt ${attempt + 1}/${attempts})`, error);
      if (attempt < attempts - 1) await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** attempt));
    }
  }
  throw lastError;
}
