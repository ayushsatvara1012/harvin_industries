"use server";

import { updateTag } from "next/cache";
import { assertOwner } from "@/lib/dal";
import {
  SlugTakenError,
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/lib/admin-products";
import { productInputSchema } from "@/lib/product-schema";
import { PRODUCTS_TAG, productTag } from "@/lib/products";

export type SaveResult =
  | { ok: true; id: number }
  | { ok: false; message: string; issues?: { path: string; message: string }[] };

function expire(...slugs: string[]) {
  updateTag(PRODUCTS_TAG);
  for (const slug of new Set(slugs)) updateTag(productTag(slug));
}

export async function saveProduct(id: number | null, raw: unknown): Promise<SaveResult> {
  await assertOwner();

  const parsed = productInputSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Some fields need attention.",
      issues: parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    };
  }

  try {
    if (id === null) {
      const created = await createProduct(parsed.data);
      expire(created.slug);
      return { ok: true, id: created.id };
    }
    const previousSlug = await updateProduct(id, parsed.data);
    expire(previousSlug, parsed.data.slug);
    return { ok: true, id };
  } catch (error) {
    if (error instanceof SlugTakenError) {
      return { ok: false, message: "Another product already uses that URL slug." };
    }
    console.error("[admin] saveProduct failed", error);
    return { ok: false, message: "Could not save. Please try again." };
  }
}

export async function removeProduct(id: number): Promise<{ ok: boolean; message?: string }> {
  await assertOwner();
  try {
    expire(await deleteProduct(id));
    return { ok: true };
  } catch (error) {
    console.error("[admin] removeProduct failed", error);
    return { ok: false, message: "Could not delete. It may already be gone." };
  }
}
