import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getOwnerPasswordHash } from "@/lib/owner-credentials";
import { verifyPassword } from "@/lib/password";

const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(200),
});

export const SESSION_MAX_AGE = 60 * 60 * 8;

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt", maxAge: SESSION_MAX_AGE },
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        const ownerEmail = process.env.OWNER_EMAIL?.trim().toLowerCase();
        let ownerHash: string | undefined;
        try {
          ownerHash = await getOwnerPasswordHash();
        } catch (error) {
          console.error("[auth] could not read the owner password", error);
        }
        if (!parsed.success || !ownerEmail || !ownerHash) throw new CredentialsSignin();

        // Always run the hash check, even for a wrong email, so timing does not
        // reveal whether the email matched.
        const passwordOk = await verifyPassword(parsed.data.password, ownerHash);
        if (!passwordOk || parsed.data.email !== ownerEmail) throw new CredentialsSignin();

        return { id: "owner", email: ownerEmail, name: "Owner" };
      },
    }),
  ],
});
