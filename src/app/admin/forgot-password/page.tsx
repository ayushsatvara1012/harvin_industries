import type { Metadata } from "next";
import Link from "next/link";
import { RecoverPasswordForm } from "@/components/admin/RecoverPasswordForm";
import { Logo } from "@/components/layout";
import { Icon } from "@/components/ui";
import { isRecoveryConfigured } from "@/lib/owner-credentials";

export const metadata: Metadata = { title: "Reset password" };

export default function ForgotPasswordPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-xl border border-brand-border bg-white p-8 shadow-sm">
        <Logo className="mx-auto h-12 text-brand-ink" />
        <h1 className="mt-4 text-center font-display text-3xl text-brand-ink">Reset password</h1>
        {isRecoveryConfigured() ? (
          <>
            <p className="mt-2 text-center text-sm text-brand-text-secondary">
              Enter the owner email and your recovery key to choose a new password.
            </p>
            <div className="mt-6">
              <RecoverPasswordForm />
            </div>
          </>
        ) : (
          <p role="status" className="mt-4 rounded-lg bg-brand-surface-alt p-4 text-sm text-brand-text">
            Password recovery is not set up yet. Please contact your website developer to reset the password.
          </p>
        )}
      </div>
      <Link
        href="/admin/login"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-text-secondary hover:text-brand-ink"
      >
        <Icon name="arrow_back" className="text-lg" />
        Back to sign in
      </Link>
    </main>
  );
}
