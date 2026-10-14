"use client";

import { useEffect } from "react";
import Link from "next/link";
import { primaryButtonClass, secondaryButtonClass } from "@/components/admin/fields";

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="font-display text-4xl tracking-tight text-brand-ink">Something went wrong</h1>
      <p className="mt-3 max-w-md text-sm text-brand-text-secondary">
        The admin could not complete that. Nothing was lost. Please try again, and if it keeps happening, send the
        reference below to your developer.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={reset} className={primaryButtonClass}>
          Try again
        </button>
        <Link href="/admin/products" className={secondaryButtonClass}>
          Back to products
        </Link>
      </div>
      {error.digest && (
        <p className="mt-6 text-xs text-brand-text-secondary">
          Reference: <code className="font-mono">{error.digest}</code>
        </p>
      )}
    </main>
  );
}
