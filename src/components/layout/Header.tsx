"use client";

import Link from "next/link";
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
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200/80 shadow-xs transition-colors">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <BrandLogo variant="light" />

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
                    className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-gray-800 hover:text-amber-600 transition-colors"
                  >
                    {item.label}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        productsDropdownOpen ? "rotate-180 text-amber-600" : "text-gray-500"
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
                          className="flex items-center px-3 py-2 text-xs font-medium text-gray-700 rounded-lg hover:bg-amber-50 hover:text-amber-700 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className="text-[13.5px] font-semibold text-gray-800 hover:text-amber-600 transition-colors"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Request A Quote CTA */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all duration-200 shadow-sm hover:shadow-md"
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
          className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
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
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-6 shadow-xl">
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-amber-50 hover:text-amber-700"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-amber-500 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-600"
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
