"use client";

import { useEffect } from "react";
import { Navbar, Footer } from "@/components/layout";
import { Button, Eyebrow } from "@/components/ui";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main id="main" className="flex flex-1 flex-col items-center justify-center bg-white px-4 py-24 text-center">
        <Eyebrow tone="accent">Something Went Wrong</Eyebrow>
        <h1 className="mt-4 font-display text-5xl tracking-tight text-brand-ink sm:text-6xl">
          Unexpected Error
        </h1>
        <p className="mt-4 max-w-md text-base text-brand-text-secondary">
          Something went wrong loading this page. Please try again.
        </p>
        <Button onClick={reset} icon={false} className="mt-8">
          Try Again
        </Button>
      </main>
      <Footer />
    </>
  );
}
