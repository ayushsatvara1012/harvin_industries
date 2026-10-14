"use client";

import { useEffect } from "react";
import "./globals.css";
import { EMAIL, PHONE, PHONE_HREF } from "@/data/contact";

// Replaces the root layout, so it must render its own <html> and <body>. It only
// shows if the layout itself fails, which is why it avoids anything that layout
// provides (fonts, header, footer, the catalog).
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-brand-ink px-4 text-center text-white [font-family:system-ui,sans-serif]">
        <main id="main">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-yellow">Harvin Industries</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">We hit a problem</h1>
          <p className="mx-auto mt-4 max-w-md text-base text-gray-300">
            The website could not be loaded. It is usually temporary, so please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 rounded-full bg-brand-yellow px-7 py-3 text-base font-semibold text-brand-ink hover:bg-brand-yellow-light"
          >
            Try Again
          </button>
          <p className="mx-auto mt-10 max-w-md text-sm text-gray-400">
            Still not working? Call us on{" "}
            <a href={PHONE_HREF} className="font-semibold text-brand-yellow-light underline underline-offset-2">
              {PHONE}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${EMAIL}`} className="font-semibold text-brand-yellow-light underline underline-offset-2">
              {EMAIL}
            </a>
            .
          </p>
          {error.digest && (
            <p className="mt-4 text-xs text-gray-500">
              Reference: <code className="font-mono">{error.digest}</code>
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
