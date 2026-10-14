import { z } from "zod";

export const CATEGORIES = ["press", "batching_plant", "mixture"] as const;
export const STATUSES = ["draft", "published"] as const;

const text = (max: number) => z.string().trim().min(1, "Required").max(max);
const optionalText = (max: number) => z.string().trim().min(1).max(max).optional();

export const productImageSchema = z.object({
  publicId: text(200),
  alt: text(200),
});

// `note` is the plain-language explanation of what the number means for a buyer.
export const specRowSchema = z.object({
  label: text(120),
  value: text(200),
  note: optionalText(400),
});

export const productionRowSchema = z.object({
  product: text(120),
  sizeMm: text(60),
  pcsPerMould: z.number().int().positive(),
  pcsPerHour: z.number().int().positive(),
});

export const featureGroupSchema = z.object({
  title: text(120),
  items: z.array(text(300)).min(1, "Add at least one item"),
});

export const productSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .max(60)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Lowercase letters, numbers and single dashes only"),
  name: text(80),
  category: z.enum(CATEGORIES),
  tagline: text(200),
  description: text(2000),
  images: z.array(productImageSchema).max(12),
  specs: z.array(specRowSchema).optional(),
  productionSummary: z.array(specRowSchema).optional(),
  productionTable: z.array(productionRowSchema).optional(),
  featureGroups: z.array(featureGroupSchema).optional(),
  additionalOutputs: z.array(text(120)).optional(),
  outputCapacity: z.number().int().positive().optional(),
  power: optionalText(80),
  dailyOutput: optionalText(120),
  bestFor: optionalText(200),
  featured: z.boolean().optional(),
});

// What the admin form submits: the public shape plus publishing controls.
export const productInputSchema = productSchema
  .extend({
    status: z.enum(STATUSES),
    sortOrder: z.number().int().min(0).max(9999),
  })
  .refine((product) => product.status !== "published" || product.images.length > 0, {
    path: ["images"],
    message: "Add at least one image before publishing",
  });

export type Category = (typeof CATEGORIES)[number];
export type ProductStatus = (typeof STATUSES)[number];
export type ProductImage = z.infer<typeof productImageSchema>;
export type SpecRow = z.infer<typeof specRowSchema>;
export type ProductionRow = z.infer<typeof productionRowSchema>;
export type FeatureGroup = z.infer<typeof featureGroupSchema>;
export type Product = z.infer<typeof productSchema>;
export type ProductInput = z.infer<typeof productInputSchema>;
