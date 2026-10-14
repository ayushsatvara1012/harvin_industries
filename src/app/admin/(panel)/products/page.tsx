import type { Metadata } from "next";
import Link from "next/link";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { primaryButtonClass } from "@/components/admin/fields";
import { CloudinaryImage, Icon } from "@/components/ui";
import { listAdminProducts } from "@/lib/admin-products";
import { CATEGORY_LABELS } from "@/lib/product-types";

export const metadata: Metadata = { title: "Products" };

export default async function AdminProductsPage() {
  const products = await listAdminProducts();

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-brand-ink">Products</h1>
          <p className="mt-1 text-sm text-brand-text-secondary">
            {products.length} total, {products.filter((product) => product.status === "published").length} published.
          </p>
        </div>
        <Link href="/admin/products/new" prefetch={false} className={primaryButtonClass}>
          <Icon name="add" className="text-lg" />
          New product
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-brand-border bg-white">
        {products.length === 0 ? (
          <p className="p-8 text-center text-sm text-brand-text-secondary">No products yet. Create the first one.</p>
        ) : (
          <ul className="divide-y divide-brand-border">
            {products.map((product) => (
              <li key={product.id} className="flex flex-wrap items-center gap-x-4 gap-y-3 p-4">
                <div className="flex w-full items-center gap-4 sm:w-auto sm:flex-1">
                  <div className="relative aspect-4/3 w-20 shrink-0 overflow-hidden rounded-md bg-brand-surface-alt">
                    {product.thumbnail && (
                      <CloudinaryImage publicId={product.thumbnail} alt="" fill sizes="80px" className="object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-brand-ink">{product.name}</p>
                    <p className="break-words text-xs text-brand-text-secondary">
                      {CATEGORY_LABELS[product.category]} · /products/{product.slug} · order {product.sortOrder}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end sm:gap-6">
                  <div className="flex items-center gap-2">
                    {product.featured && (
                      <span className="rounded-full bg-brand-clay px-2.5 py-0.5 text-xs font-semibold text-brand-accent-text">Featured</span>
                    )}
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        product.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {product.status === "published" ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link href={`/admin/products/${product.id}`} prefetch={false} className="text-sm font-semibold text-brand-accent-text hover:underline">
                      Edit
                    </Link>
                    <DeleteProductButton id={product.id} name={product.name} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
