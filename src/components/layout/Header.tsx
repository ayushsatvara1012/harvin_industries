"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border/60 bg-brand-cream/50 backdrop-blur-lg backdrop-saturate-150">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/Harvin_brand_logo.svg"
            alt="Harvin Industries"
            width={904}
            height={298}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xl font-display font-semibold text-brand-text transition-colors hover:text-brand-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex md:items-center md:gap-5">
          <Link
            href="/contact"
            className="rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-wide text-brand-ink transition-colors border border-brand-brick hover:bg-brand-brick/10 hover:text-brand-ink"
          >
            Request a Quote
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-brand-ink"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="sr-only">Toggle menu</span>
          {open ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Overlays the page instead of sitting in flow, so opening the menu never
          pushes the hero down. Same surface as the bar, so they read as one
          container; grid rows animate the height without a hardcoded max. */}
      <div
        className={`absolute inset-x-0 top-full grid overflow-hidden rounded-b-2xl border-b border-brand-border/60 bg-brand-surface transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          open ? "grid-rows-[1fr]" : "pointer-events-none grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                tabIndex={open ? undefined : -1}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-brand-text hover:bg-brand-clay/30"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              tabIndex={open ? undefined : -1}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full border border-brand-brick px-4 py-2 text-center text-sm font-medium text-brand-ink transition-colors hover:bg-brand-brick"
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      </div>

    </header>
  );
}
