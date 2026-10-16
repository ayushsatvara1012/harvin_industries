import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/layout";
import { Icon } from "@/components/ui";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage(props: PageProps<"/admin/login">) {
  if ((await auth())?.user) redirect("/admin/products");
  const passwordChanged = (await props.searchParams).reset === "1";

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-xl border border-brand-border bg-white p-8 shadow-sm">
        <Logo className="mx-auto h-12 text-brand-ink" />
        <h1 className="mt-4 text-center font-display text-3xl text-brand-ink">Owner sign in</h1>
        {passwordChanged && (
          <p role="status" className="mt-4 rounded-lg bg-emerald-50 p-3 text-center text-sm font-medium text-emerald-800">
            Password updated. Sign in with your new password.
          </p>
        )}
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-text-secondary hover:text-brand-ink"
      >
        <Icon name="arrow_back" className="text-lg" />
        Back to the website
      </Link>
    </main>
  );
}
