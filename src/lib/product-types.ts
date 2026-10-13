// The catalog lists machines only — bricks, pavers, and blocks are what the
// machines produce, so they live in each machine's production table rather than
// as products of their own.
export type Category = "press" | "batching_plant" | "mixture";

// `note` is the plain-language explanation of what the number means for a
// buyer. Only rows that differ between models carry one — values shared across
// the whole press range are explained once in `PRESS_COMMON_STANDARDS`.
export type SpecRow = { label: string; value: string; note?: string };

export type ProductionRow = {
  product: string;
  sizeMm: string;
  pcsPerMould: number;
  pcsPerHour: number;
};

export type FeatureGroup = { title: string; items: string[] };

export type Product = {
  slug: string;
  name: string;
  category: Category;
  tagline: string;
  description: string;
  images: string[];
  specs?: SpecRow[];
  productionSummary?: SpecRow[];
  productionTable?: ProductionRow[];
  featureGroups?: FeatureGroup[];
  additionalOutputs?: string[];
  outputCapacity?: number;
  power?: string;
  dailyOutput?: string;
  bestFor?: string;
  featured?: boolean;
};

export const CATEGORY_LABELS: Record<Category, string> = {
  press: "Press Machine",
  batching_plant: "Batching Plant",
  mixture: "Mixture Machine",
};
