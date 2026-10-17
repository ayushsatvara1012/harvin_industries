"use client";

import { useActionState } from "react";
import { changePassword } from "@/app/admin/(panel)/account/actions";
import { MIN_PASSWORD_LENGTH } from "@/lib/password-policy";
import { Field, primaryButtonClass } from "./fields";
import { PasswordInput } from "./PasswordInput";

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changePassword, undefined);

  return (
    <form action={action} className="grid max-w-md gap-5">
      <Field label="Current password" htmlFor="current">
        <PasswordInput id="current" name="current" autoComplete="current-password" required />
      </Field>
      <Field label="New password" htmlFor="password" hint={`At least ${MIN_PASSWORD_LENGTH} characters.`}>
        <PasswordInput id="password" name="password" autoComplete="new-password" minLength={MIN_PASSWORD_LENGTH} required />
      </Field>
      <Field label="Repeat new password" htmlFor="confirm">
        <PasswordInput id="confirm" name="confirm" autoComplete="new-password" minLength={MIN_PASSWORD_LENGTH} required />
      </Field>
      {state?.error && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {state.error}
        </p>
      )}
      <div>
        <button type="submit" disabled={pending} className={primaryButtonClass}>
          {pending ? "Saving..." : "Change password"}
        </button>
      </div>
    </form>
  );
}
