"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { isRateLimited } from "@/lib/rate-limit";

export type LoginState = { error?: string } | undefined;

export async function login(_previous: LoginState, formData: FormData): Promise<LoginState> {
  if (await isRateLimited({ scope: "login", max: 8, windowSeconds: 900 })) {
    return { error: "Too many sign-in attempts. Please wait 15 minutes and try again." };
  }

  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin/products",
    });
  } catch (error) {
    if (error instanceof AuthError) return { error: "Incorrect email or password." };
    throw error;
  }
}
