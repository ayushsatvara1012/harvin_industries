import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

// Every admin page, action and route calls one of these. The proxy is only an
// early redirect; these are the real checks.
export const requireOwner = cache(async () => {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return session.user;
});

export async function assertOwner() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session.user;
}
