import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { getAdminProduct } from "@/lib/admin-products";
import { toFormValues } from "@/lib/product-form";

export const metadata: Metadata = { title: "Edit product" };

export default async function EditProductPage(props: PageProps<"/admin/products/[id]">) {
  const { id } = await props.params;
  // Digits only and small enough for a Postgres integer, or the query itself throws.
  if (!/^\d{1,9}$/.test(id)) notFound();
  const numericId = Number(id);

  const product = await getAdminProduct(numericId);
  if (!product) notFound();

  return (
    <>
      <h1 className="mb-6 font-display text-4xl text-brand-ink">Edit {product.name}</h1>
      <ProductForm id={product.id} initial={toFormValues(product)} />
    </>
  );
}
