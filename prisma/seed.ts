import { config } from "dotenv";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient, Prisma } from "../src/generated/prisma/client";
import { PRODUCTS } from "./seed-data";

config({ path: ".env.local" });

const connectionString = process.env.DIRECT_URL;
if (!connectionString) throw new Error("DIRECT_URL is not set");

const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });

const json = (value: unknown) => (value === undefined ? Prisma.DbNull : (value as Prisma.InputJsonValue));

async function main() {
  for (const [index, product] of PRODUCTS.entries()) {
    const data = {
      name: product.name,
      category: product.category,
      tagline: product.tagline,
      description: product.description,
      images: product.images,
      specs: json(product.specs),
      productionSummary: json(product.productionSummary),
      productionTable: json(product.productionTable),
      featureGroups: json(product.featureGroups),
      additionalOutputs: product.additionalOutputs ?? [],
      outputCapacity: product.outputCapacity ?? null,
      power: product.power ?? null,
      dailyOutput: product.dailyOutput ?? null,
      bestFor: product.bestFor ?? null,
      featured: product.featured ?? false,
      status: "published" as const,
      sortOrder: index,
    };
    await prisma.product.upsert({
      where: { slug: product.slug },
      create: { slug: product.slug, ...data },
      update: data,
    });
  }
  console.info(`Seeded ${PRODUCTS.length} products`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
