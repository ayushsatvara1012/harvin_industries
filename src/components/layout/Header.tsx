"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { BrandLogo } from "./BrandLogo";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  {
    label: "Products",
    href: "/products",
    hasDropdown: true,
    children: [
      { label: "Fly Ash Brick Machines", href: "/products#fly-ash" },
      { label: "Concrete Block Machines", href: "/products#concrete-blocks" },
      { label: "Paver Block Machines", href: "/products#paver-blocks" },
      { label: "Automatic Plant Solutions", href: "/products#automatic-plants" },
      { label: "Material Handling Equipment", href: "/products#material-handling" },
    ],
  },
  { label: "Manufacturing", href: "/#manufacturing" },
  { label: "Technology", href: "/#advantage" },
  { label: "Projects", href: "/#industries" },
  { label: "Resources", href: "/#resources" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-ink border-b border-white/10">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <BrandLogo variant="dark" />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            if (item.hasDropdown) {
              return (
                <div
                  key={item.label}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setProductsDropdownOpen(true)}
                  onMouseLeave={() => setProductsDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setProductsDropdownOpen((v) => !v)}
                    className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-white hover:text-brand-yellow transition-colors"
                  >
                    {item.label}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        productsDropdownOpen ? "rotate-180 text-brand-yellow" : "text-gray-400"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {productsDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 rounded-xl bg-white border border-gray-100 p-2 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      {item.children?.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          onClick={() => setProductsDropdownOpen(false)}
                          className="flex items-center px-3 py-2 text-xs font-medium text-gray-700 rounded-lg hover:bg-brand-yellow/10 hover:text-brand-accent transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.split("#")[0]) && item.href !== "/";

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative py-1 text-[13.5px] font-semibold transition-colors ${
                  isActive ? "text-white" : "text-gray-200 hover:text-brand-yellow"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-brand-yellow" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Request A Quote CTA */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-yellow hover:bg-brand-accent px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider text-brand-ink transition-colors"
          >
            <span>Request A Quote</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-brand-ink px-4 pt-2 pb-6 shadow-xl">
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-200 hover:bg-white/5 hover:text-brand-yellow"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-brand-yellow py-3 text-xs font-bold uppercase tracking-wider text-brand-ink hover:bg-brand-accent"
              >
                <span>Request A Quote</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
