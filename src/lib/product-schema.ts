import { z } from "zod";

export const CATEGORIES = ["press", "batching_plant", "mixture"] as const;
export const STATUSES = ["draft", "published"] as const;

export const SLUG_MAX = 60;
export const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const isValidSlug = (slug: string) => slug.length <= SLUG_MAX && SLUG_PATTERN.test(slug);

const text = (max: number) =>
  z.string().trim().min(1, "This field is required").max(max, `Keep this under ${max} characters`);
const wholeNumber = z.number({ error: "Enter a number" }).int("Enter a whole number");
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
  pcsPerMould: wholeNumber.positive("Must be greater than zero"),
  pcsPerHour: wholeNumber.positive("Must be greater than zero"),
});

export const featureGroupSchema = z.object({
  title: text(120),
  items: z.array(text(300)).min(1, "Add at least one item"),
});

export const productSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2, "Enter a URL slug of at least 2 characters")
    .max(SLUG_MAX, `Keep the URL slug under ${SLUG_MAX} characters`)
    .regex(SLUG_PATTERN, "Use lowercase letters, numbers and single dashes, for example hi-1500"),
  name: text(80),
  category: z.enum(CATEGORIES),
  tagline: text(200),
  description: text(2000),
  images: z.array(productImageSchema).max(12, "You can add up to 12 images"),
  specs: z.array(specRowSchema).optional(),
  productionSummary: z.array(specRowSchema).optional(),
  productionTable: z.array(productionRowSchema).optional(),
  featureGroups: z.array(featureGroupSchema).optional(),
  additionalOutputs: z.array(text(120)).optional(),
  outputCapacity: wholeNumber.positive("Must be greater than zero").optional(),
  power: optionalText(80),
  dailyOutput: optionalText(120),
  bestFor: optionalText(200),
  featured: z.boolean().optional(),
});

// What the admin form submits: the public shape plus publishing controls.
export const productInputSchema = productSchema
  .extend({
    status: z.enum(STATUSES),
    sortOrder: wholeNumber.min(0, "Cannot be negative").max(9999, "Keep this at 9999 or less"),
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
