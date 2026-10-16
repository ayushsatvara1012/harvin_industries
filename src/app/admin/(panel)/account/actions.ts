"use server";

import { signOut } from "@/auth";
import { assertOwner } from "@/lib/dal";
import { getOwnerPasswordHash, setOwnerPassword } from "@/lib/owner-credentials";
import { verifyPassword } from "@/lib/password";
import { validateNewPassword } from "@/lib/password-policy";
import { isRateLimited } from "@/lib/rate-limit";

export type ChangePasswordState = { error?: string } | undefined;

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

export async function changePassword(
  _previous: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  await assertOwner();
  if (await isRateLimited({ scope: "password", max: 5, windowSeconds: 900 })) {
    return { error: "Too many attempts. Please wait 15 minutes and try again." };
  }

  const current = field(formData, "current");
  const next = field(formData, "password");

  let storedHash: string | undefined;
  try {
    storedHash = await getOwnerPasswordHash();
  } catch (error) {
    console.error("[auth] could not read the owner password", error);
    return { error: "We could not check your password. Please try again." };
  }
  if (!storedHash || !(await verifyPassword(current, storedHash))) {
    return { error: "Your current password is not correct." };
  }

  const problem = validateNewPassword(next, field(formData, "confirm"));
  if (problem) return { error: problem };
  if (next === current) return { error: "Choose a password that is different from the current one." };

  try {
    await setOwnerPassword(next);
  } catch (error) {
    console.error("[auth] could not save the new owner password", error);
    return { error: "We could not save the new password. Please try again." };
  }

  await signOut({ redirectTo: "/admin/login?reset=1" });
}
