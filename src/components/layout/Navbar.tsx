"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { BrandLogo } from "./BrandLogo";
import { Button } from "@/components/ui";
import { PRODUCTS, CATEGORY_LABELS } from "@/data/products";

// Built from the catalog itself so the dropdown can never drift out of sync
// with the machines that actually have pages.
const PRODUCT_LINKS = PRODUCTS.map((product) => ({
  label: `${product.name} — ${CATEGORY_LABELS[product.category]}`,
  href: `/products/${product.slug}`,
}));

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Products",
    href: "/products",
    hasDropdown: true,
    children: PRODUCT_LINKS,
  },
  { label: "Manufacturing", href: "/#manufacturing" },
  { label: "Technology", href: "/#advantage" },
  { label: "Industries", href: "/#industries" },
  { label: "Contact", href: "/contact" },
];

const SPY_SECTION_IDS = ["about", "manufacturing", "advantage", "industries"];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);

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

  const suppressTriggerFocusOpenRef = useRef(false);

  const closeDropdown = () => {
    suppressTriggerFocusOpenRef.current = true;
    setProductsDropdownOpen(false);
    dropdownTriggerRef.current?.focus();
  };

  const handleTriggerFocus = () => {
    if (suppressTriggerFocusOpenRef.current) {
      suppressTriggerFocusOpenRef.current = false;
      return;
    }
    handleMouseEnter();
  };

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductsDropdownOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (productsDropdownOpen) {
        closeDropdown();
      }
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        setMobileProductsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [productsDropdownOpen, mobileMenuOpen]);

  useEffect(() => {
    if (pathname !== "/") return;

    const elements = SPY_SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActiveSection(topmost.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
    <header className="sticky top-0 z-50 w-full bg-brand-ink/70 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto flex h-20 max-w-7xl items-stretch justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <BrandLogo variant="dark" />
        </div>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main" className="hidden lg:flex h-full items-stretch gap-0.5 xl:gap-1">
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
                    ref={dropdownTriggerRef}
                    type="button"
                    onClick={() => setProductsDropdownOpen((v) => !v)}
                    onFocus={handleTriggerFocus}
                    className={`group relative flex h-full items-center gap-1.5 px-3 xl:px-4 font-display text-base xl:text-lg font-semibold transition-colors whitespace-nowrap ${
                      productsDropdownOpen || isProductsActive
                        ? "text-brand-yellow"
                        : "text-gray-200 hover:text-brand-yellow"
                    }`}
                    aria-expanded={productsDropdownOpen}
                    aria-haspopup="menu"
                    aria-controls="products-dropdown-menu"
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
                    id="products-dropdown-menu"
                    role="menu"
                    inert={!productsDropdownOpen}
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
                            role="menuitem"
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
                ? pathname === "/" && !activeSection
                : isAnchorLink
                ? pathname === "/" && activeSection === item.href.split("#")[1]
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
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
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
    </header>

      {/* Mobile drawer — fixed full-height panel below the header so it overlays
          instead of pushing page content, with its own internal scroll. Kept
          outside <header> because its backdrop-blur creates a containing
          block that would trap a fixed-position child inside its own box. */}
      <div
        id="mobile-nav"
        inert={!mobileMenuOpen}
        className={`lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto bg-brand-ink/95 backdrop-blur-md transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex min-h-full flex-col px-6 pt-4 pb-10">
          <div className="flex flex-col divide-y divide-white/10">
            {NAV_ITEMS.map((item) =>
              item.hasDropdown ? (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => setMobileProductsOpen((v) => !v)}
                    aria-expanded={mobileProductsOpen}
                    aria-controls="mobile-products-submenu"
                    className="flex w-full items-center justify-between py-4 font-display text-lg font-semibold text-gray-200 hover:text-brand-yellow"
                  >
                    <span>{item.label}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileProductsOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    id="mobile-products-submenu"
                    className={`grid transition-[grid-template-rows,opacity] duration-200 ease-in-out ${
                      mobileProductsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col divide-y divide-white/5 pb-3 pl-4">
                        {item.children?.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileProductsOpen(false);
                            }}
                            className="py-3 font-display text-base text-gray-300 hover:text-brand-yellow"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-4 font-display text-lg font-semibold text-gray-200 hover:text-brand-yellow"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
          <div className="mt-auto pt-8">
            <Button
              href="/contact"
              size="lg"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              Request a Quote
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
