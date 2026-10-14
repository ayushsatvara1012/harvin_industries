import type { Metadata } from "next";
import { ProductForm } from "@/components/admin/ProductForm";
import { getNextSortOrder } from "@/lib/admin-products";
import { emptyValues } from "@/lib/product-form";

export const metadata: Metadata = { title: "New product" };

export default async function NewProductPage() {
  return (
    <>
      <h1 className="mb-6 font-display text-4xl text-brand-ink">New product</h1>
      <ProductForm id={null} initial={emptyValues(await getNextSortOrder())} />
    </>
  );
}
