"use client";

import { useActionState } from "react";
import { recoverPassword } from "@/app/admin/forgot-password/actions";
import { MIN_PASSWORD_LENGTH } from "@/lib/password-policy";
import { Field, inputClass, primaryButtonClass } from "./fields";
import { PasswordInput } from "./PasswordInput";

export function RecoverPasswordForm() {
  const [state, action, pending] = useActionState(recoverPassword, undefined);

  return (
    <form action={action} className="grid gap-5">
      <Field label="Owner email" htmlFor="email">
        <input id="email" name="email" type="email" autoComplete="username" required className={inputClass} />
      </Field>
      <Field label="Recovery key" htmlFor="recoveryKey" hint="The long key you were given when the website was handed over.">
        <PasswordInput id="recoveryKey" name="recoveryKey" autoComplete="off" spellCheck={false} required />
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
      <button type="submit" disabled={pending} className={primaryButtonClass}>
        {pending ? "Saving..." : "Set new password"}
      </button>
    </form>
  );
}
