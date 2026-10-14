import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { getAdminProduct } from "@/lib/admin-products";
import { toFormValues } from "@/lib/product-form";

export const metadata: Metadata = { title: "Edit product" };

export default async function EditProductPage(props: PageProps<"/admin/products/[id]">) {
  const { id } = await props.params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) notFound();

  const product = await getAdminProduct(numericId);
  if (!product) notFound();

  return (
    <>
      <h1 className="mb-6 font-display text-4xl text-brand-ink">Edit {product.name}</h1>
      <ProductForm id={product.id} initial={toFormValues(product)} />
    </>
  );
}
