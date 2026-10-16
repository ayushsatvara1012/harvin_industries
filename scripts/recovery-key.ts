import { randomBytes } from "node:crypto";

// 36 random bytes is 48 URL-safe characters: long enough that it cannot be guessed,
// and free of `$` so Next does not expand it in .env files.
console.info(`OWNER_RECOVERY_KEY=${randomBytes(36).toString("base64url")}`);
