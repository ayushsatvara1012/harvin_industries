import type { Category, ProductImage, ProductInput, ProductStatus } from "@/lib/product-schema";

// The form edits everything as strings; these convert to and from the schema shape.
export type SpecRowValues = { label: string; value: string; note: string };
export type ProductionRowValues = { product: string; sizeMm: string; pcsPerMould: string; pcsPerHour: string };
export type FeatureGroupValues = { title: string; itemsText: string };

export type ProductFormValues = {
  slug: string;
  name: string;
  category: Category;
  tagline: string;
  description: string;
  images: ProductImage[];
  specs: SpecRowValues[];
  productionSummary: SpecRowValues[];
  productionTable: ProductionRowValues[];
  featureGroups: FeatureGroupValues[];
  additionalOutputsText: string;
  outputCapacity: string;
  power: string;
  dailyOutput: string;
  bestFor: string;
  featured: boolean;
  status: ProductStatus;
  sortOrder: string;
};

export const EMPTY_SPEC_ROW: SpecRowValues = { label: "", value: "", note: "" };
export const EMPTY_PRODUCTION_ROW: ProductionRowValues = { product: "", sizeMm: "", pcsPerMould: "", pcsPerHour: "" };
export const EMPTY_FEATURE_GROUP: FeatureGroupValues = { title: "", itemsText: "" };

const lines = (text: string) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const orUndefined = (value: string) => value.trim() || undefined;

const toNumber = (value: string) => {
  const trimmed = value.trim();
  return trimmed === "" ? undefined : Number(trimmed);
};

export function emptyValues(sortOrder: number): ProductFormValues {
  return {
    slug: "",
    name: "",
    category: "press",
    tagline: "",
    description: "",
    images: [],
    specs: [],
    productionSummary: [],
    productionTable: [],
    featureGroups: [],
    additionalOutputsText: "",
    outputCapacity: "",
    power: "",
    dailyOutput: "",
    bestFor: "",
    featured: false,
    status: "draft",
    sortOrder: String(sortOrder),
  };
}

export function toFormValues(input: ProductInput): ProductFormValues {
  const spec = (row: { label: string; value: string; note?: string }): SpecRowValues => ({
    label: row.label,
    value: row.value,
    note: row.note ?? "",
  });
  return {
    slug: input.slug,
    name: input.name,
    category: input.category,
    tagline: input.tagline,
    description: input.description,
    images: input.images,
    specs: (input.specs ?? []).map(spec),
    productionSummary: (input.productionSummary ?? []).map(spec),
    productionTable: (input.productionTable ?? []).map((row) => ({
      product: row.product,
      sizeMm: row.sizeMm,
      pcsPerMould: String(row.pcsPerMould),
      pcsPerHour: String(row.pcsPerHour),
    })),
    featureGroups: (input.featureGroups ?? []).map((group) => ({
      title: group.title,
      itemsText: group.items.join("\n"),
    })),
    additionalOutputsText: (input.additionalOutputs ?? []).join("\n"),
    outputCapacity: input.outputCapacity === undefined ? "" : String(input.outputCapacity),
    power: input.power ?? "",
    dailyOutput: input.dailyOutput ?? "",
    bestFor: input.bestFor ?? "",
    featured: input.featured ?? false,
    status: input.status,
    sortOrder: String(input.sortOrder),
  };
}

// Blank optional fields are omitted rather than sent as empty strings.
export function toPayload(values: ProductFormValues) {
  const spec = (row: SpecRowValues) => ({
    label: row.label.trim(),
    value: row.value.trim(),
    note: orUndefined(row.note),
  });
  return {
    slug: values.slug.trim(),
    name: values.name.trim(),
    category: values.category,
    tagline: values.tagline.trim(),
    description: values.description.trim(),
    images: values.images.map((image) => ({ publicId: image.publicId, alt: image.alt.trim() })),
    specs: values.specs.map(spec),
    productionSummary: values.productionSummary.map(spec),
    productionTable: values.productionTable.map((row) => ({
      product: row.product.trim(),
      sizeMm: row.sizeMm.trim(),
      pcsPerMould: Number(row.pcsPerMould),
      pcsPerHour: Number(row.pcsPerHour),
    })),
    featureGroups: values.featureGroups.map((group) => ({
      title: group.title.trim(),
      items: lines(group.itemsText),
    })),
    additionalOutputs: lines(values.additionalOutputsText),
    outputCapacity: toNumber(values.outputCapacity),
    power: orUndefined(values.power),
    dailyOutput: orUndefined(values.dailyOutput),
    bestFor: orUndefined(values.bestFor),
    featured: values.featured,
    status: values.status,
    sortOrder: Number(values.sortOrder),
  };
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

const FIELD_LABELS: Record<string, string> = {
  slug: "URL slug",
  name: "Name",
  category: "Category",
  tagline: "Tagline",
  description: "Description",
  images: "Images",
  outputCapacity: "Output capacity",
  power: "Power",
  dailyOutput: "Daily output",
  bestFor: "Best for",
  additionalOutputs: "Additional outputs",
  sortOrder: "Display order",
  status: "Status",
  specs: "Specifications",
  productionSummary: "Production summary",
  productionTable: "Production table",
  featureGroups: "Features",
};

const SUBFIELD_LABELS: Record<string, string> = {
  label: "Label",
  value: "Value",
  note: "Note",
  product: "Product",
  sizeMm: "Size",
  pcsPerMould: "Pieces per mould",
  pcsPerHour: "Pieces per hour",
  title: "Title",
  items: "Items",
  alt: "Alt text",
  publicId: "Image",
};

// "specs.0.value" -> "Specifications, row 1, Value", so errors read like the form does.
export function describeIssuePath(path: string): string {
  const [head, index, sub] = path.split(".");
  const label = FIELD_LABELS[head] ?? head;
  if (index === undefined) return label;
  const row = `${label}, row ${Number(index) + 1}`;
  return sub ? `${row}, ${SUBFIELD_LABELS[sub] ?? sub}` : row;
}
