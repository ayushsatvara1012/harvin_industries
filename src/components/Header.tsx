"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-brand-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="h-9 w-9 text-brand-charcoal" />
          <span className="font-display text-lg font-extrabold tracking-tight text-brand-charcoal">
            HARVIN
            <span className="ml-1 text-[0.6rem] font-semibold tracking-[0.25em] text-brand-text-secondary align-middle">
              INDUSTRIES
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-text hover:text-brand-charcoal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex md:items-center md:gap-4">
          <a
            href="tel:+919898575358"
            className="text-sm font-semibold text-brand-text-secondary hover:text-brand-charcoal"
          >
            +91 98985 75358
          </a>
          <Link
            href="/contact"
            className="rounded-md bg-brand-yellow px-4 py-2 text-sm font-bold text-brand-charcoal transition-colors hover:bg-brand-yellow-hover"
          >
            Request a Quote
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-brand-charcoal"
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

      {open && (
        <div className="border-t border-brand-border bg-brand-surface md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-brand-text hover:bg-brand-bg"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-brand-yellow px-4 py-2 text-center text-sm font-bold text-brand-charcoal"
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
