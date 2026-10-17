"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/ui";
import { adminSignOut } from "@/app/admin/actions";

export function AdminSidebar({ newLeads = 0 }: { newLeads?: number }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_ITEMS = [
    {
      label: "Products",
      href: "/admin/products",
      icon: "inventory_2",
      active: pathname.startsWith("/admin/products"),
    },
    {
      label: "Product Enquiries",
      href: "/admin/leads",
      icon: "contact_mail",
      active: pathname.startsWith("/admin/leads"),
      badge: newLeads > 0 ? newLeads : undefined,
    },
    {
      label: "Account",
      href: "/admin/account",
      icon: "manage_accounts",
      active: pathname.startsWith("/admin/account"),
    },
  ];

  const sidebarContent = (
    <div className="flex h-full flex-col font-sans">
      {/* Brand Header */}
      <div className="flex h-20 shrink-0 items-center gap-3 border-b border-white/10 px-6">
        <Link href="/admin/products" prefetch={false} className="flex items-center gap-3 group">
          <Logo className="h-8 w-auto text-white transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-sans text-base font-bold tracking-tight text-white">
              Harvin Admin
            </span>
            <span className="font-sans text-[11px] font-medium tracking-wide uppercase text-gray-400">
              Machine Control
            </span>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Management
        </div>
        <nav aria-label="Admin Navigation" className="space-y-1.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              onClick={() => setMobileOpen(false)}
              className={`group flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium transition-all ${
                item.active
                  ? "bg-white/10 text-brand-yellow font-semibold shadow-xs"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  name={item.icon}
                  className={`text-xl transition-colors ${
                    item.active ? "text-brand-yellow" : "text-gray-400 group-hover:text-white"
                  }`}
                />
                <span className="font-sans">{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="inline-flex items-center justify-center rounded-full bg-brand-yellow px-2 py-0.5 text-xs font-bold text-brand-ink">
                  {item.badge}
                  <span className="sr-only"> unhandled enquiries</span>
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-8 mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Quick Actions
        </div>
        <nav aria-label="Quick Actions" className="space-y-1.5">
          <Link
            href="/admin/products/new"
            prefetch={false}
            onClick={() => setMobileOpen(false)}
            className="group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Icon name="add_circle" className="text-xl text-brand-accent-text group-hover:text-brand-yellow" />
            <span className="font-sans">New Machine</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Icon name="open_in_new" className="text-xl text-gray-400 group-hover:text-white" />
            <span className="font-sans">View Live Website</span>
          </Link>
        </nav>
      </div>

      {/* User Footer Profile & Sign Out */}
      <div className="shrink-0 border-t border-white/10 p-4">
        <div className="flex items-center justify-between rounded-xl bg-white/[0.04] p-3">
          <Link
            href="/admin/account"
            prefetch={false}
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 min-w-0 group hover:opacity-90 transition-opacity"
            title="Manage Account"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-yellow/20 text-brand-yellow font-bold text-sm">
              H
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-sans text-xs font-semibold text-white group-hover:text-brand-yellow transition-colors">
                Harvin Industries
              </p>
              <p className="truncate font-sans text-[11px] text-gray-400">
                Administrator
              </p>
            </div>
          </Link>
          <form action={adminSignOut}>
            <button
              type="submit"
              title="Sign Out"
              aria-label="Sign Out"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white/10 hover:text-red-400"
            >
              <Icon name="logout" className="text-lg" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-white/10 bg-brand-ink px-4 md:hidden">
        <Link href="/admin/products" prefetch={false} className="flex items-center gap-2.5">
          <Logo className="h-7 text-white" />
          <span className="font-sans text-base font-bold text-white">Harvin Admin</span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-lg p-2 text-gray-300 hover:bg-white/10 hover:text-white"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <Icon name={mobileOpen ? "close" : "menu"} className="text-2xl" />
        </button>
      </header>

      {/* Mobile Backdrop & Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-brand-ink transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Vertical Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 md:shrink-0 md:flex-col md:fixed md:inset-y-0 border-r border-white/10 bg-brand-ink z-30">
        {sidebarContent}
      </aside>
    </>
  );
}
