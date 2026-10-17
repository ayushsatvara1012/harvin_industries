import type { Metadata } from "next";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <>
      <div>
        <h1 className="font-display text-4xl text-brand-ink">Account</h1>
        <p className="mt-1 text-sm text-brand-text-secondary">
          Change the owner password. You will be signed out and asked to sign in again with the new one.
        </p>
      </div>
      <section className="mt-6 rounded-xl border border-brand-border bg-white p-6">
        <h2 className="font-display text-2xl text-brand-ink">Change password</h2>
        <div className="mt-5">
          <ChangePasswordForm />
        </div>
      </section>
    </>
  );
}
