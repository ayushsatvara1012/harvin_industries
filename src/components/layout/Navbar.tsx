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

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setProductsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setProductsDropdownOpen(false);
    }, 150);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-ink/70 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto flex h-20 max-w-7xl items-stretch justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <BrandLogo variant="dark" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex h-full items-stretch gap-0.5 xl:gap-1">
          {NAV_ITEMS.map((item) => {
            if (item.hasDropdown) {
              const isProductsActive = pathname.startsWith("/products");

              return (
                <div
                  key={item.label}
                  ref={dropdownRef}
                  className="relative flex h-full items-stretch"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => setProductsDropdownOpen((v) => !v)}
                    className={`group relative flex h-full items-center gap-1.5 px-3 xl:px-4 font-display text-base xl:text-lg font-semibold transition-colors whitespace-nowrap ${
                      productsDropdownOpen || isProductsActive
                        ? "text-brand-yellow"
                        : "text-gray-200 hover:text-brand-yellow"
                    }`}
                    aria-expanded={productsDropdownOpen}
                  >
                    <span>{item.label}</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        productsDropdownOpen ? "rotate-180 text-brand-yellow" : "text-gray-400 group-hover:text-brand-yellow"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                    {/* Bottom active/hover indicator aligned at navbar bottom seam */}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] bg-brand-yellow transition-all duration-200 ${
                        productsDropdownOpen || isProductsActive
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu — starts exactly from the bottom of the navbar seam */}
                  <div
                    className={`absolute top-full left-0 z-50 grid w-72 transition-[grid-template-rows,opacity] duration-200 ease-out ${
                      productsDropdownOpen
                        ? "grid-rows-[1fr] opacity-100 pointer-events-auto"
                        : "grid-rows-[0fr] opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-x border-b border-white/10 bg-brand-ink/95 backdrop-blur-xl p-2 shadow-2xl shadow-black/70 rounded-b-xl">
                        {item.children?.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            onClick={() => setProductsDropdownOpen(false)}
                            className="group/sub flex items-center justify-between px-3.5 py-2.5 text-sm font-medium text-gray-200 rounded-lg hover:bg-white/10 hover:text-brand-yellow transition-colors"
                          >
                            <span>{subItem.label}</span>
                            <svg
                              className="w-3.5 h-3.5 text-brand-yellow opacity-0 -translate-x-1 transition-all duration-150 group-hover/sub:opacity-100 group-hover/sub:translate-x-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            const isAnchorLink = item.href.includes("#");
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : isAnchorLink
                ? false
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative flex h-full items-center px-3 xl:px-4 font-display text-base xl:text-lg font-semibold whitespace-nowrap transition-colors ${
                  isActive ? "text-white" : "text-gray-200 hover:text-brand-yellow"
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[2px] bg-brand-yellow transition-all duration-200 ${
                    isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="p-2 rounded-lg text-white hover:bg-white/10"
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
                href="/#quote"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-rusted-yellow py-3.5 px-6 font-display text-[17px] tracking-wider text-white transition-all font-semibold"
              >
                <span>Request a Quote</span>
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
