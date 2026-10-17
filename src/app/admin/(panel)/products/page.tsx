import type { Metadata } from "next";
import Link from "next/link";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { primaryButtonClass } from "@/components/admin/fields";
import { CloudinaryImage, Icon } from "@/components/ui";
import { listAdminProducts } from "@/lib/admin-products";
import { CATEGORY_LABELS } from "@/lib/product-types";

export const metadata: Metadata = { title: "Products — Harvin Admin" };

export default async function AdminProductsPage() {
  const products = await listAdminProducts();
  const publishedCount = products.filter((p) => p.status === "published").length;
  const draftCount = products.length - publishedCount;
  const pressCount = products.filter((p) => p.category === "press").length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border/60 pb-6">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            Product Portfolio
          </h1>
          <p className="mt-1.5 text-sm text-brand-text-secondary font-sans max-w-2xl">
            Detailed catalogue management for all industrial press machines, batching plants, and mixers.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/products/new" prefetch={false} className={primaryButtonClass}>
            <Icon name="add_circle" className="text-lg" />
            <span>New Machine</span>
          </Link>
        </div>
      </div>

      {/* Overview Stat Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-brand-border/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-text-secondary font-sans">
            Total Machines
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-brand-ink">
            {products.length}
          </p>
        </div>
        <div className="rounded-xl border border-brand-border/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-text-secondary font-sans">
            Published Live
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-emerald-600">
            {publishedCount}
          </p>
        </div>
        <div className="rounded-xl border border-brand-border/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-text-secondary font-sans">
            Drafts
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-gray-500">
            {draftCount}
          </p>
        </div>
        <div className="rounded-xl border border-brand-border/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-text-secondary font-sans">
            Press Models
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-brand-ink">
            {pressCount}
          </p>
        </div>
      </div>

      {/* Products Showcase List */}
      <div className="space-y-6">
        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-brand-border bg-white p-12 text-center">
            <Icon name="inventory_2" className="mx-auto text-4xl text-brand-text-secondary/60" />
            <h3 className="mt-3 font-display text-xl text-brand-ink">No machines configured yet</h3>
            <p className="mt-1 text-sm text-brand-text-secondary font-sans">
              Get started by creating your first industrial product listing.
            </p>
            <div className="mt-6">
              <Link href="/admin/products/new" prefetch={false} className={primaryButtonClass}>
                <Icon name="add" className="text-lg" />
                <span>Create Machine</span>
              </Link>
            </div>
          </div>
        ) : (
          products.map((product) => (
            <article
              key={product.id}
              className="rounded-2xl border border-brand-border bg-white p-6 sm:p-7 shadow-xs transition-shadow duration-200 hover:shadow-md"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
                {/* Product Thumbnail */}
                <div className="relative aspect-4/3 w-full sm:w-72 lg:w-80 shrink-0 overflow-hidden rounded-xl border border-brand-border bg-brand-surface-alt">
                  {product.thumbnail ? (
                    <CloudinaryImage
                      publicId={product.thumbnail}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 320px, 100vw"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-brand-text-secondary/50">
                      <Icon name="deployed_code" className="text-4xl text-brand-clay" />
                      <span className="text-xs font-sans">No photo uploaded</span>
                    </div>
                  )}
                  {/* Category Pill Over Image */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-brand-ink/80 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-white shadow-xs font-sans">
                      <Icon name="precision_manufacturing" className="text-xs text-brand-yellow" />
                      {CATEGORY_LABELS[product.category]}
                    </span>
                  </div>
                  {/* Sort Order Tag */}
                  <div className="absolute bottom-3 right-3">
                    <span className="rounded-md bg-white/90 backdrop-blur-md px-2 py-0.5 text-[11px] font-bold text-brand-ink shadow-xs font-sans">
                      Pos #{product.sortOrder}
                    </span>
                  </div>
                </div>

                {/* Product Core Details */}
                <div className="flex flex-1 flex-col justify-between min-w-0">
                  {/* Title & Action Bar */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-brand-ink">
                          {product.name}
                        </h2>
                        {product.featured && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-brand-clay px-2.5 py-0.5 text-xs font-semibold text-brand-accent-text border border-brand-yellow/40 font-sans">
                            <Icon name="star" className="text-xs" />
                            Featured
                          </span>
                        )}
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold font-sans ${
                            product.status === "published"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-gray-100 text-gray-700 border border-gray-200"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              product.status === "published" ? "bg-emerald-600" : "bg-gray-400"
                            }`}
                          />
                          {product.status === "published" ? "Published" : "Draft"}
                        </span>
                      </div>

                      {/* Action Buttons with Icons */}
                      <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                        <Link
                          href={`/admin/products/${product.id}`}
                          prefetch={false}
                          title={`Edit ${product.name}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border bg-white px-3.5 py-2 text-xs font-semibold text-brand-ink shadow-xs transition-colors hover:border-brand-accent hover:bg-brand-surface-alt hover:text-brand-accent-text font-sans"
                        >
                          <Icon name="edit" className="text-base text-brand-text-secondary" />
                          <span>Edit</span>
                        </Link>

                        <DeleteProductButton id={product.id} name={product.name} />

                        <Link
                          href={`/products/${product.slug}`}
                          target="_blank"
                          title="View on live website"
                          className="inline-flex items-center justify-center rounded-lg border border-brand-border bg-white p-2 text-brand-text-secondary shadow-xs transition-colors hover:border-brand-accent hover:bg-brand-surface-alt hover:text-brand-ink"
                        >
                          <Icon name="open_in_new" className="text-base" />
                          <span className="sr-only">View on site</span>
                        </Link>
                      </div>
                    </div>

                    {/* Tagline */}
                    {product.tagline && (
                      <p className="mt-2 text-sm sm:text-base font-medium text-brand-accent-text leading-snug font-sans">
                        {product.tagline}
                      </p>
                    )}

                    {/* Description */}
                    {product.description && (
                      <p className="mt-3 text-sm text-brand-text-secondary leading-relaxed font-sans line-clamp-3">
                        {product.description}
                      </p>
                    )}
                  </div>

                  {/* Specifications Matrix with Clean Spacing */}
                  <div className="mt-6 pt-5 border-t border-brand-border/70">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="rounded-xl bg-brand-surface-alt p-3.5 border border-brand-border/40">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary font-sans">
                          Output Rate
                        </p>
                        <p className="mt-1 font-display text-base sm:text-lg font-bold text-brand-ink">
                          {product.outputCapacity
                            ? `${product.outputCapacity.toLocaleString()} pcs/hr`
                            : "Custom Capacity"}
                        </p>
                      </div>

                      <div className="rounded-xl bg-brand-surface-alt p-3.5 border border-brand-border/40">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary font-sans">
                          Power Load
                        </p>
                        <p className="mt-1 font-display text-base sm:text-lg font-bold text-brand-ink">
                          {product.power ?? "Variable HP"}
                        </p>
                      </div>

                      <div className="rounded-xl bg-brand-surface-alt p-3.5 border border-brand-border/40">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary font-sans">
                          Daily Throughput
                        </p>
                        <p className="mt-1 font-sans text-xs sm:text-sm font-semibold text-brand-ink truncate">
                          {product.dailyOutput ?? "Full-day shift"}
                        </p>
                      </div>

                      <div className="rounded-xl bg-brand-surface-alt p-3.5 border border-brand-border/40">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary font-sans">
                          Configuration
                        </p>
                        <p className="mt-1 font-sans text-xs sm:text-sm font-semibold text-brand-ink">
                          {product.specsCount} specs · {product.productionRowsCount} moulds
                        </p>
                      </div>
                    </div>

                    {/* Footer Info Strip */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-brand-text-secondary font-sans">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] bg-brand-surface-alt px-2 py-0.5 rounded border border-brand-border/60">
                          /products/{product.slug}
                        </span>
                      </div>
                      <time dateTime={product.updatedAt.toISOString()} className="text-[11px]">
                        Last updated {product.updatedAt.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
