import "server-only";

import { Prisma } from "@/generated/prisma/client";
import { withDb, withWakeRetry } from "@/lib/db";
import type { ProductInput } from "@/lib/product-schema";
import { toProduct } from "@/lib/products";

export type AdminProductSummary = {
  id: number;
  slug: string;
  name: string;
  category: ProductInput["category"];
  status: ProductInput["status"];
  featured: boolean;
  sortOrder: number;
  thumbnail?: string;
  tagline?: string;
  description?: string;
  outputCapacity?: number;
  power?: string;
  dailyOutput?: string;
  specsCount: number;
  productionRowsCount: number;
  updatedAt: Date;
};

const json = (value: unknown) =>
  value === undefined ? Prisma.DbNull : (value as Prisma.InputJsonValue);

function toData(input: ProductInput) {
  return {
    slug: input.slug,
    name: input.name,
    category: input.category,
    tagline: input.tagline,
    description: input.description,
    images: input.images as Prisma.InputJsonValue,
    specs: json(input.specs?.length ? input.specs : undefined),
    productionSummary: json(input.productionSummary?.length ? input.productionSummary : undefined),
    productionTable: json(input.productionTable?.length ? input.productionTable : undefined),
    featureGroups: json(input.featureGroups?.length ? input.featureGroups : undefined),
    additionalOutputs: input.additionalOutputs ?? [],
    outputCapacity: input.outputCapacity ?? null,
    power: input.power ?? null,
    dailyOutput: input.dailyOutput ?? null,
    bestFor: input.bestFor ?? null,
    featured: input.featured ?? false,
    status: input.status,
    sortOrder: input.sortOrder,
  };
}

// Admin reads are never cached: the owner must always see what is stored.
export async function listAdminProducts(): Promise<AdminProductSummary[]> {
  const rows = await withWakeRetry((db) =>
    db.product.findMany({ orderBy: [{ sortOrder: "asc" }, { id: "asc" }] }),
  );
  return rows.map((row) => {
    const p = toProduct(row);
    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      category: row.category,
      status: row.status,
      featured: row.featured,
      sortOrder: row.sortOrder,
      thumbnail: p.images[0]?.publicId,
      tagline: p.tagline,
      description: p.description,
      outputCapacity: p.outputCapacity,
      power: p.power,
      dailyOutput: p.dailyOutput,
      specsCount: p.specs?.length ?? 0,
      productionRowsCount: p.productionTable?.length ?? 0,
      updatedAt: row.updatedAt,
    };
  });
}

export async function getAdminProduct(id: number): Promise<(ProductInput & { id: number }) | null> {
  const row = await withWakeRetry((db) => db.product.findUnique({ where: { id } }));
  if (!row) return null;
  return { id: row.id, ...toProduct(row), status: row.status, sortOrder: row.sortOrder };
}

export async function getNextSortOrder(): Promise<number> {
  const last = await withWakeRetry((db) =>
    db.product.aggregate({ _max: { sortOrder: true } }),
  );
  return (last._max.sortOrder ?? -1) + 1;
}

export class SlugTakenError extends Error {}

async function mapUniqueError<T>(run: () => Promise<T>): Promise<T> {
  try {
    return await run();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new SlugTakenError();
    }
    throw error;
  }
}

export function createProduct(input: ProductInput) {
  return mapUniqueError(() => withDb((db) => db.product.create({ data: toData(input) })));
}

// Returns the previous slug so the caller can expire its cache tag after a rename.
export async function updateProduct(id: number, input: ProductInput) {
  return mapUniqueError(() =>
    withDb(async (db) => {
      const before = await db.product.findUniqueOrThrow({ where: { id }, select: { slug: true } });
      await db.product.update({ where: { id }, data: toData(input) });
      return before.slug;
    }),
  );
}

export async function deleteProduct(id: number): Promise<string> {
  const row = await withDb((db) => db.product.delete({ where: { id }, select: { slug: true } }));
  return row.slug;
}
