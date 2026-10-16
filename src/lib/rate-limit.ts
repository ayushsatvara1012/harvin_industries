import "server-only";

import { headers } from "next/headers";
import { withDb } from "@/lib/db";

type Limit = { scope: string; max: number; windowSeconds: number };

async function clientKey() {
  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("cf-connecting-ip") ??
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "local";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
  return Array.from(new Uint8Array(digest).slice(0, 12), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

// Counts this call and reports whether the caller is over the limit. It fails
// open: a database hiccup must not lock out the owner or lose a real enquiry.
export async function isRateLimited({ scope, max, windowSeconds }: Limit): Promise<boolean> {
  try {
    const key = `${scope}:${await clientKey()}`;
    const rows = await withDb((db) =>
      db.$transaction([
        db.$queryRaw<{ count: number }[]>`
          INSERT INTO "RateLimit" ("key", "count", "windowStart")
          VALUES (${key}, 1, now())
          ON CONFLICT ("key") DO UPDATE SET
            "count" = CASE
              WHEN "RateLimit"."windowStart" < now() - make_interval(secs => ${windowSeconds}::int) THEN 1
              ELSE "RateLimit"."count" + 1
            END,
            "windowStart" = CASE
              WHEN "RateLimit"."windowStart" < now() - make_interval(secs => ${windowSeconds}::int) THEN now()
              ELSE "RateLimit"."windowStart"
            END
          RETURNING "count"`,
        db.$executeRaw`DELETE FROM "RateLimit" WHERE "windowStart" < now() - interval '1 day'`,
      ]),
    );
    return rows[0][0].count > max;
  } catch (error) {
    console.error("[rate-limit] could not check the limit", error);
    return false;
  }
}
