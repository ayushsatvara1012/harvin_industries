import "server-only";

import type { Product as ProductRow } from "@/generated/prisma/client";
import type {
  FeatureGroup,
  Product,
  ProductionRow,
  SpecRow,
} from "@/data/products";
import { db, withWakeRetry } from "@/lib/db";

function toProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    category: row.category,
    tagline: row.tagline,
    description: row.description,
    images: row.images,
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

export async function getAllProducts(): Promise<Product[]> {
  const rows = await withWakeRetry(() =>
    db.product.findMany({ where: PUBLISHED, orderBy: [...CATALOG_ORDER] }),
  );
  return rows.map(toProduct);
}

export async function getPressModels(): Promise<Product[]> {
  const rows = await withWakeRetry(() =>
    db.product.findMany({
      where: { ...PUBLISHED, category: "press" },
      orderBy: [...CATALOG_ORDER],
    }),
  );
  return rows.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const row = await withWakeRetry(() =>
    db.product.findFirst({ where: { ...PUBLISHED, slug } }),
  );
  return row ? toProduct(row) : undefined;
}

export async function getRelatedProducts(product: Product, limit = 3): Promise<Product[]> {
  const rows = await withWakeRetry(() =>
    db.product.findMany({
      where: { ...PUBLISHED, category: product.category, slug: { not: product.slug } },
      orderBy: [...CATALOG_ORDER],
      take: limit,
    }),
  );
  return rows.map(toProduct);
}

export async function getPublishedSlugs(): Promise<string[]> {
  const rows = await withWakeRetry(() =>
    db.product.findMany({ where: PUBLISHED, select: { slug: true } }),
  );
  return rows.map((row) => row.slug);
}
