import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-brand-border bg-brand-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8 text-brand-charcoal" />
            <span className="font-display text-base font-extrabold text-brand-charcoal">
              HARVIN INDUSTRIES
            </span>
          </div>
          <p className="mt-4 text-sm text-brand-text-secondary">
            ISO 9001:2015 certified manufacturer of brick, block, and paver making
            machines.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-brand-charcoal">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-brand-text-secondary">
            <li><Link href="/products" className="hover:text-brand-charcoal">Products</Link></li>
            <li><Link href="/about" className="hover:text-brand-charcoal">About</Link></li>
            <li><Link href="/contact" className="hover:text-brand-charcoal">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-brand-charcoal">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-brand-text-secondary">
            <li>Shed No 28, NK Industrial Park,</li>
            <li>Gatrad Bakrol Bujrang Kuha Road,</li>
            <li>Bakrol Bujrang, Ahmedabad, Gujarat 382430</li>
            <li className="pt-2">
              <a href="tel:+919898575358" className="hover:text-brand-charcoal">
                +91 98985 75358
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-brand-charcoal">
            Legal
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-brand-text-secondary">
            <li>GSTIN: 24FNRPS3414P1Z7</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-border px-4 py-6 text-center text-xs text-brand-text-secondary sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Harvin Industries. All rights reserved.
      </div>
    </footer>
  );
}
