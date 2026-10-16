"use server";

import { redirect } from "next/navigation";
import { isRecoveryConfigured, isRecoveryKeyValid, setOwnerPassword } from "@/lib/owner-credentials";
import { validateNewPassword } from "@/lib/password-policy";
import { isRateLimited } from "@/lib/rate-limit";

export type RecoverState = { error?: string } | undefined;

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

export async function recoverPassword(_previous: RecoverState, formData: FormData): Promise<RecoverState> {
  if (!isRecoveryConfigured()) {
    return { error: "Password recovery is not set up yet. Please contact your website developer." };
  }
  if (await isRateLimited({ scope: "recover", max: 5, windowSeconds: 3600 })) {
    return { error: "Too many attempts. Please wait an hour and try again." };
  }

  const email = field(formData, "email").trim().toLowerCase();
  const ownerEmail = process.env.OWNER_EMAIL?.trim().toLowerCase();
  const keyOk = await isRecoveryKeyValid(field(formData, "recoveryKey"));
  // One message for both, so a wrong key and a wrong email look the same.
  if (!keyOk || !ownerEmail || email !== ownerEmail) {
    return { error: "The email or recovery key is not correct." };
  }

  const problem = validateNewPassword(field(formData, "password"), field(formData, "confirm"));
  if (problem) return { error: problem };

  try {
    await setOwnerPassword(field(formData, "password"));
  } catch (error) {
    console.error("[auth] could not save the new owner password", error);
    return { error: "We could not save the new password. Please try again." };
  }

  redirect("/admin/login?reset=1");
}
