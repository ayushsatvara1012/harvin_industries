import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-brand-clay/20 bg-brand-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8 text-brand-cream" />
            <span className="font-display text-lg text-brand-cream">
              HARVIN INDUSTRIES
            </span>
          </div>
          <p className="mt-4 text-sm text-brand-clay/60">
            ISO 9001:2015 certified manufacturer of brick, block, and paver making
            machines.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-cream">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-brand-clay/60">
            <li><Link href="/products" className="hover:text-brand-cream">Products</Link></li>
            <li><Link href="/about" className="hover:text-brand-cream">About</Link></li>
            <li><Link href="/contact" className="hover:text-brand-cream">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-cream">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-brand-clay/60">
            <li className="flex gap-2.5">
              <Icon name="location_on" className="mt-0.5 shrink-0 text-brand-brick" />
              <span>
                Shed No 28, NK Industrial Park, Gatrad Bakrol Bujrang Kuha Road,
                Bakrol Bujrang, Ahmedabad, Gujarat 382430
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Icon name="call" className="shrink-0 text-brand-brick" />
              <a href="tel:+919898575358" className="hover:text-brand-cream">
                +91 98985 75358
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-cream">
            Legal
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-brand-clay/60">
            <li>GSTIN: 24FNRPS3414P1Z7</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-clay/10 px-4 py-6 text-center text-xs text-brand-clay/50 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Harvin Industries. All rights reserved.
      </div>
    </footer>
  );
}
