import Link from "next/link";
import { Icon } from "@/components/ui";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  return (
    <footer className="bg-brand-ink text-white border-t border-white/10 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand & Social */}
          <div className="lg:col-span-4">
            <BrandLogo variant="dark" />
            <p className="mt-4 max-w-sm text-sm sm:text-base text-gray-400 leading-relaxed">
              Manufacturing high-performance machinery for a stronger, more sustainable construction
              industry.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-sm bg-white/10 text-gray-300 hover:bg-brand-yellow hover:text-brand-ink transition-colors"
                aria-label="LinkedIn"
              >
                <span className="text-sm font-bold">in</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-sm bg-white/10 text-gray-300 hover:bg-brand-yellow hover:text-brand-ink transition-colors"
                aria-label="YouTube"
              >
                <Icon name="smart_display" className="text-base" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-sm bg-white/10 text-gray-300 hover:bg-brand-yellow hover:text-brand-ink transition-colors"
                aria-label="Instagram"
              >
                <Icon name="photo_camera" className="text-base" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 sm:pl-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2.5 text-sm font-medium text-gray-400">
              <li>
                <Link href="/" className="inline-block py-1.5 hover:text-brand-yellow transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="inline-block py-1.5 hover:text-brand-yellow transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="inline-block py-1.5 hover:text-brand-yellow transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/#manufacturing" className="inline-block py-1.5 hover:text-brand-yellow transition-colors">
                  Manufacturing
                </Link>
              </li>
              <li>
                <Link href="/#advantage" className="inline-block py-1.5 hover:text-brand-yellow transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/#industries" className="inline-block py-1.5 hover:text-brand-yellow transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#resources" className="inline-block py-1.5 hover:text-brand-yellow transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="inline-block py-1.5 hover:text-brand-yellow transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Products */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Our Products</h3>
            <ul className="mt-4 space-y-2.5 text-sm font-medium text-gray-400">
              <li>
                <Link href="/products#fly-ash" className="inline-block py-1.5 hover:text-brand-yellow transition-colors">
                  Fly Ash Brick Machines
                </Link>
              </li>
              <li>
                <Link
                  href="/products#concrete-blocks"
                  className="inline-block py-1.5 hover:text-brand-yellow transition-colors"
                >
                  Concrete Block Machines
                </Link>
              </li>
              <li>
                <Link
                  href="/products#paver-blocks"
                  className="inline-block py-1.5 hover:text-brand-yellow transition-colors"
                >
                  Paver Block Machines
                </Link>
              </li>
              <li>
                <Link
                  href="/products#automatic-plants"
                  className="inline-block py-1.5 hover:text-brand-yellow transition-colors"
                >
                  Automatic Plant Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/products#material-handling"
                  className="inline-block py-1.5 hover:text-brand-yellow transition-colors"
                >
                  Material Handling Equipment
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Contact Us</h3>
            <ul className="mt-4 space-y-3.5 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <Icon name="location_on" className="text-brand-yellow text-lg shrink-0 mt-0.5" />
                <span>Ahmedabad, Gujarat, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="call" className="text-brand-yellow text-lg shrink-0" />
                <a href="tel:+919898575358" className="inline-block py-1.5 hover:text-brand-yellow transition-colors">
                  +91 98985 75358
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="mail" className="text-brand-yellow text-lg shrink-0" />
                <a
                  href="mailto:info@harvinindustries.com"
                  className="inline-block py-1.5 hover:text-brand-yellow transition-colors"
                >
                  info@harvinindustries.com
                </a>
              </li>
            </ul>

            <div className="mt-5">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-rusted-yellow px-5 py-3 font-display text-[17px] tracking-wider text-brand-ink transition-all font-semibold"
              >
                <span>Request a Quote</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 HARVIN INDUSTRIES. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/sitemap" className="hover:text-gray-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
