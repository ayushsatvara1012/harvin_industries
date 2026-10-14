// Shapes come from the Zod schemas so the admin form, the repository and the
// public pages cannot drift. Types only here, so client bundles never pull in zod.
export type {
  Category,
  FeatureGroup,
  Product,
  ProductImage,
  ProductInput,
  ProductStatus,
  ProductionRow,
  SpecRow,
} from "@/lib/product-schema";
import type { Category } from "@/lib/product-schema";

export const CATEGORY_LABELS: Record<Category, string> = {
  press: "Press Machine",
  batching_plant: "Batching Plant",
  mixture: "Mixture Machine",
};
