import Link from "next/link";
import { signOut } from "@/auth";
import { Logo } from "@/components/layout";
import { Icon } from "@/components/ui";
import { requireOwner } from "@/lib/dal";
import { countUnhandledLeads } from "@/lib/leads";

async function unhandledCount() {
  try {
    return await countUnhandledLeads();
  } catch (error) {
    console.error("[admin] could not count enquiries", error);
    return 0;
  }
}

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireOwner();
  const newLeads = await unhandledCount();

  return (
    <>
      <header className="border-b border-brand-border bg-brand-ink text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/admin/products" prefetch={false} className="flex items-center gap-3">
              <Logo className="h-8 text-white" />
              <span className="font-display text-xl tracking-wide">Harvin Admin</span>
            </Link>
            <nav aria-label="Admin" className="flex items-center gap-4 text-sm font-semibold">
              <Link href="/admin/products" prefetch={false} className="text-brand-yellow-light">
                Products
              </Link>
              <Link href="/admin/leads" prefetch={false} className="inline-flex items-center gap-2 text-brand-yellow-light">
                Enquiries
                {newLeads > 0 && (
                  <span className="rounded-full bg-brand-yellow px-2 py-0.5 text-xs font-bold text-brand-ink">
                    {newLeads}
                    <span className="sr-only"> new</span>
                  </span>
                )}
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" target="_blank" className="hidden items-center gap-1 text-white/80 hover:text-white sm:inline-flex">
              View site
              <Icon name="open_in_new" className="text-base" />
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/login" });
              }}
            >
              <button type="submit" className="rounded-full border border-white/30 px-4 py-1.5 font-semibold hover:border-brand-yellow-light">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        {children}
      </main>
    </>
  );
}
