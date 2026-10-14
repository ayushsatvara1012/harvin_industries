"use client";

import { useEffect } from "react";
import { Button, Eyebrow } from "@/components/ui";
import { EMAIL, PHONE, PHONE_HREF } from "@/data/contact";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="flex flex-1 flex-col items-center justify-center bg-white px-4 py-24 text-center">
      <Eyebrow tone="accent">Something Went Wrong</Eyebrow>
      <h1 className="mt-4 font-display text-5xl tracking-tight text-brand-ink sm:text-6xl">We hit a problem</h1>
      <p className="mt-4 max-w-md text-base text-brand-text-secondary">
        This page could not be loaded. It is usually temporary, so please try again.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset} icon={false}>
          Try Again
        </Button>
        <Button href="/" variant="outline-light" icon={false}>
          Back to Home
        </Button>
      </div>
      <p className="mt-10 max-w-md text-sm text-brand-text-secondary">
        Still not working? Call us on{" "}
        <a href={PHONE_HREF} className="font-semibold text-brand-accent-text underline underline-offset-2">
          {PHONE}
        </a>{" "}
        or email{" "}
        <a href={`mailto:${EMAIL}`} className="font-semibold text-brand-accent-text underline underline-offset-2">
          {EMAIL}
        </a>
        .
      </p>
      {error.digest && (
        <p className="mt-4 text-xs text-brand-text-secondary">
          Reference: <code className="font-mono">{error.digest}</code>
        </p>
      )}
    </main>
  );
}
