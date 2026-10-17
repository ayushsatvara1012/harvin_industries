"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login } from "@/app/admin/login/actions";
import { Field, inputClass, primaryButtonClass } from "./fields";
import { PasswordInput } from "./PasswordInput";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="grid gap-5">
      <Field label="Email" htmlFor="email">
        <input id="email" name="email" type="email" autoComplete="username" required className={inputClass} />
      </Field>
      <Field label="Password" htmlFor="password">
        <PasswordInput id="password" name="password" autoComplete="current-password" required />
      </Field>
      <Link href="/admin/forgot-password" prefetch={false} className="-mt-2 justify-self-end text-sm font-semibold text-brand-accent-text hover:underline">
        Forgot password?
      </Link>
      {state?.error && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className={primaryButtonClass}>
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
