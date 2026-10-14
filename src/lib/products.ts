import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";
import type { Product as ProductRow } from "@/generated/prisma/client";
import type {
  Category,
  FeatureGroup,
  Product,
  ProductImage,
  ProductionRow,
  SpecRow,
} from "@/lib/product-types";
import { withWakeRetry } from "@/lib/db";

export const PRODUCTS_TAG = "products";
export const productTag = (slug: string) => `product:${slug}`;

// Safety net if a revalidateTag call is ever missed: the cache refreshes hourly.
const REVALIDATE_SECONDS = 3600;

export function toProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    category: row.category,
    tagline: row.tagline,
    description: row.description,
    images: row.images as ProductImage[],
    specs: (row.specs as SpecRow[] | null) ?? undefined,
    productionSummary: (row.productionSummary as SpecRow[] | null) ?? undefined,
    productionTable: (row.productionTable as ProductionRow[] | null) ?? undefined,
    featureGroups: (row.featureGroups as FeatureGroup[] | null) ?? undefined,
    additionalOutputs: row.additionalOutputs.length ? row.additionalOutputs : undefined,
    outputCapacity: row.outputCapacity ?? undefined,
    power: row.power ?? undefined,
    dailyOutput: row.dailyOutput ?? undefined,
    bestFor: row.bestFor ?? undefined,
    featured: row.featured || undefined,
  };
}

const PUBLISHED = { status: "published" } as const;
const CATALOG_ORDER = [{ sortOrder: "asc" }, { id: "asc" }] as const;

// `cache` shares one result (or one failure) across the header, the page and the
// sitemap within a request, so an outage runs the retry loop once, not per caller.
export const getAllProducts = cache(
  unstable_cache(
    async (): Promise<Product[]> => {
      const rows = await withWakeRetry((db) =>
        db.product.findMany({ where: PUBLISHED, orderBy: [...CATALOG_ORDER] }),
      );
      return rows.map(toProduct);
    },
    ["products:all"],
    { tags: [PRODUCTS_TAG], revalidate: REVALIDATE_SECONDS },
  ),
);

export async function getPressModels(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((product) => product.category === "press");
}

// The cache serialises to JSON, which has no `undefined`, so a missing product is
// cached as null and mapped back here.
export const getProductBySlug = cache(async (slug: string): Promise<Product | undefined> => {
  const product = await unstable_cache(
    async () => {
      const row = await withWakeRetry((db) =>
        db.product.findFirst({ where: { ...PUBLISHED, slug } }),
      );
      return row ? toProduct(row) : null;
    },
    ["products:by-slug", slug],
    { tags: [PRODUCTS_TAG, productTag(slug)], revalidate: REVALIDATE_SECONDS },
  )();
  return product ?? undefined;
});

export async function getRelatedProducts(
  product: { slug: string; category: Category },
  limit = 3,
): Promise<Product[]> {
  const all = await getAllProducts();
  return all
    .filter((candidate) => candidate.slug !== product.slug && candidate.category === product.category)
    .slice(0, limit);
}

export async function getPublishedSlugs(): Promise<string[]> {
  const all = await getAllProducts();
  return all.map((product) => product.slug);
}
