// Static catalog data, shaped to match the `Product` Prisma model in
// docs/harvin-industries-plan.md so this swaps to a DB query later with no
// component changes. Sourced from `Harvin_brochures/HARVIN BROUCHER.pdf`, with
// specs and buyer-facing explanations corrected against the owner-supplied
// machine-model and mixture-machine documents in `public/`.

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

export const PRODUCTS: Product[] = [
  {
    slug: "hi-1500",
    name: "HI-1500",
    category: "press",
    tagline: "8 bricks per stroke — the entry point into Harvin's press range.",
    description:
      "Fully automatic fly ash brick and paver block making machine. Built for high-volume production with a hydraulic press, universal vibration, and a PLC-based control system.",
    images: ["/images/machines/hi-1500.jpg", "/images/brochure/machines/hi-1500.png"],
    outputCapacity: 1800,
    power: "45 HP",
    dailyOutput: "10,000 – 12,000 bricks",
    bestFor: "Small contractors and first-time brick units",
    featured: true,
    specs: [
      {
        label: "Machine Dimension",
        value: "10 × 8 × 2.5 Meter",
        note: "The same frame as the flagship HI-3000 — the entry model is built on the same robust structure, not a lighter one.",
      },
      {
        label: "Required Area",
        value: "200 × 200 Square Foot",
        note: "Fits a standard industrial shed, with room for the machine, raw material storage, pallet movement and operators working around it.",
      },
      {
        label: "Brick Per Stroke",
        value: "8 Bricks",
        note: "The entry-level output in the range — around 10,000 to 12,000 bricks over an 8-hour shift, at the lowest starting investment.",
      },
      { label: "Cycle Time", value: "15 to 20 Seconds" },
      {
        label: "Pallet Size",
        value: "565 × 560 × 18 mm",
        note: "The smallest pallet Harvin makes, sized for 8 bricks a stroke. Lighter to handle and cheaper to replace over the machine's life.",
      },
      { label: "Hydraulic Pressure", value: "50 to 60 MT" },
      { label: "Vibration Force", value: "60 KN" },
      {
        label: "Electrical Load",
        value: "22.5 KW (45 HP)",
        note: "The lowest power draw in the range. A 3-phase connection this size is straightforward to arrange in small towns and rural areas, and keeps the daily running cost down.",
      },
      {
        label: "Hydraulic Tank Capacity",
        value: "400 Liter",
        note: "Enough oil to hold pressure and temperature steady through a full working day without overheating.",
      },
    ],
    productionSummary: [
      { label: "Max Pcs/Mould", value: "8" },
      { label: "Pcs/Hour", value: "1,800" },
      { label: "Power", value: "45 HP" },
      { label: "Electrical Load", value: "22.5 KW" },
    ],
    additionalOutputs: [
      "Retention Block",
      "Curb Block",
      "Curb Stone",
      "Saucer Drain Block",
    ],
    productionTable: [
      { product: "Fly Ash Brick", sizeMm: "230 × 110 × 75", pcsPerMould: 8, pcsPerHour: 1500 },
      { product: "Fly Ash Brick", sizeMm: "250 × 125 × 75", pcsPerMould: 8, pcsPerHour: 1500 },
      { product: "Fly Ash Brick", sizeMm: "190 × 90 × 90", pcsPerMould: 10, pcsPerHour: 1800 },
      { product: "I Shape Paver Block", sizeMm: "200 × 165 × 60", pcsPerMould: 4, pcsPerHour: 750 },
      { product: "Zig Zag Paver Block", sizeMm: "225 × 112.5 × 80", pcsPerMould: 6, pcsPerHour: 1100 },
      { product: "Hollow Block", sizeMm: "390 × 190 × 190", pcsPerMould: 2, pcsPerHour: 360 },
      { product: "Hollow Block", sizeMm: "390 × 100 × 100", pcsPerMould: 3, pcsPerHour: 540 },
      { product: "Solid Block", sizeMm: "300 × 200 × 200", pcsPerMould: 2, pcsPerHour: 360 },
    ],
  },
  {
    slug: "hi-2000",
    name: "HI-2000",
    category: "press",
    tagline: "10 bricks per stroke — the balanced mid-range performer.",
    description:
      "Fully automatic fly ash brick and paver block making machine, stepped up from the HI-1500 with a larger pallet and higher hourly output for growing production units.",
    images: ["/images/machines/hi-2000.jpg", "/images/brochure/machines/hi-2000.png"],
    outputCapacity: 2200,
    power: "50 HP",
    dailyOutput: "14,000 – 17,000 bricks",
    bestFor: "Contractors supplying local builders and housing projects",
    featured: true,
    specs: [
      {
        label: "Machine Dimension",
        value: "8 × 8 × 2.5 Meter",
        note: "The most compact footprint in the range — high output without the floor space the HI-3000 needs.",
      },
      {
        label: "Required Area",
        value: "200 × 200 Square Foot",
        note: "The same plot as the HI-1500, which makes it workable in semi-urban and industrial areas where large plots are scarce or expensive.",
      },
      {
        label: "Brick Per Stroke",
        value: "10 Bricks",
        note: "Mid-range output — around 14,000 to 17,000 bricks over an 8-hour shift, depending on cycle speed and mix quality.",
      },
      { label: "Cycle Time", value: "15 to 20 Seconds" },
      {
        label: "Pallet Size",
        value: "665 × 560 × 18 mm",
        note: "Carries 10 bricks a stroke, and moves from the machine to the curing area on the auto-staker rather than by hand.",
      },
      { label: "Hydraulic Pressure", value: "50 to 60 MT" },
      { label: "Vibration Force", value: "60 KN" },
      {
        label: "Electrical Load",
        value: "25 KW (50 HP)",
        note: "Well under the flagship's draw, so the power connection is easier to arrange and the electricity bill stays lower day to day.",
      },
      {
        label: "Hydraulic Tank Capacity",
        value: "400 Liter",
        note: "The same reservoir as the HI-1500 — keeps hydraulic pressure stable through long continuous runs.",
      },
    ],
    productionSummary: [
      { label: "Pcs/Mould", value: "10" },
      { label: "Pcs/Hour", value: "2,200" },
      { label: "Power", value: "50 HP" },
      { label: "Electrical Load", value: "25 KW" },
    ],
    additionalOutputs: [
      "Retention Block",
      "Curb Block",
      "Curb Stone",
      "Saucer Drain Block",
    ],
    productionTable: [
      { product: "Fly Ash Brick", sizeMm: "230 × 110 × 75", pcsPerMould: 10, pcsPerHour: 1900 },
      { product: "Fly Ash Brick", sizeMm: "250 × 125 × 75", pcsPerMould: 10, pcsPerHour: 1900 },
      { product: "Fly Ash Brick", sizeMm: "190 × 90 × 90", pcsPerMould: 12, pcsPerHour: 2200 },
      { product: "I Shape Paver Block", sizeMm: "200 × 165 × 60", pcsPerMould: 6, pcsPerHour: 1100 },
      { product: "Zig Zag Paver Block", sizeMm: "225 × 112.5 × 80", pcsPerMould: 8, pcsPerHour: 1500 },
      { product: "Hollow Block", sizeMm: "390 × 190 × 190", pcsPerMould: 3, pcsPerHour: 540 },
      { product: "Hollow Block", sizeMm: "390 × 100 × 100", pcsPerMould: 4, pcsPerHour: 720 },
      { product: "Solid Block", sizeMm: "300 × 200 × 200", pcsPerMould: 3, pcsPerHour: 540 },
    ],
  },
  {
    slug: "hi-3000",
    name: "HI-3000",
    category: "press",
    tagline: "14 bricks per stroke — the flagship for large-scale production.",
    description:
      "Harvin's highest-output press machine. Built for large construction and government contracts that need consistent, high-volume brick and block production.",
    images: ["/images/machines/hi-3000.jpg", "/images/brochure/machines/hi-3000.png"],
    outputCapacity: 2900,
    power: "75 HP",
    dailyOutput: "20,000+ bricks",
    bestFor: "Large construction and government contracts",
    featured: true,
    specs: [
      {
        label: "Machine Dimension",
        value: "10 × 8 × 2.5 Meter",
        note: "A large, heavy-duty machine. Check that your shed has the height and clearance to operate it comfortably before ordering.",
      },
      {
        label: "Required Area",
        value: "250 × 250 Square Foot",
        note: "The largest plot in the range, giving room for more raw material storage and pallet movement alongside the machine.",
      },
      {
        label: "Brick Per Stroke",
        value: "14 Bricks",
        note: "The highest output per stroke Harvin makes — roughly 2,520 to 3,360 bricks an hour, or 20,000+ across a shift.",
      },
      { label: "Cycle Time", value: "15 to 20 Seconds" },
      {
        label: "Pallet Size",
        value: "950 × 560 × 25 mm",
        note: "The widest and thickest pallet in the range — 25 mm stock carries all 14 bricks to curing without flexing or breaking.",
      },
      { label: "Hydraulic Pressure", value: "50 to 60 MT" },
      { label: "Vibration Force", value: "60 KN" },
      {
        label: "Electrical Load",
        value: "55 KW (75 HP)",
        note: "Arrange a 3-phase connection of this capacity with your electricity board before installation. It runs the vibration, hydraulics, conveyor, mixer and control panel together.",
      },
      {
        label: "Hydraulic Tank Capacity",
        value: "500 Liter",
        note: "The largest oil reservoir in the range, sized to keep the hydraulics cool through all-day continuous production.",
      },
    ],
    productionSummary: [
      { label: "Max Pcs/Mould", value: "14" },
      { label: "Pcs/Hour", value: "2,900" },
      { label: "Power", value: "75 HP" },
      { label: "Electrical Load", value: "55 KW" },
    ],
    additionalOutputs: [
      "Retention Block",
      "Curb Block",
      "Curb Stone",
      "Saucer Drain Block",
    ],
    productionTable: [
      { product: "Fly Ash Brick", sizeMm: "230 × 110 × 75", pcsPerMould: 14, pcsPerHour: 2600 },
      { product: "Fly Ash Brick", sizeMm: "250 × 125 × 75", pcsPerMould: 14, pcsPerHour: 2600 },
      { product: "Fly Ash Brick", sizeMm: "190 × 90 × 90", pcsPerMould: 16, pcsPerHour: 2900 },
      { product: "I Shape Paver Block", sizeMm: "200 × 165 × 60", pcsPerMould: 8, pcsPerHour: 1500 },
      { product: "Zig Zag Paver Block", sizeMm: "225 × 112.5 × 80", pcsPerMould: 12, pcsPerHour: 2200 },
      { product: "Hollow Block", sizeMm: "390 × 190 × 190", pcsPerMould: 4, pcsPerHour: 720 },
      { product: "Hollow Block", sizeMm: "390 × 100 × 100", pcsPerMould: 6, pcsPerHour: 1100 },
      { product: "Solid Block", sizeMm: "300 × 200 × 200", pcsPerMould: 4, pcsPerHour: 750 },
    ],
  },
  {
    slug: "batching-plant",
    name: "Batching Plant",
    category: "batching_plant",
    tagline: "Automatic aggregate, cement, and water batching for concrete output.",
    description:
      "A fully automated batching and mixing line — PLC-controlled dosing of up to five raw materials, automatic cement feeding, and automatic water metering — designed to feed a Harvin press machine at a steady 30 m³/hr.",
    images: [
      "/images/machines/batching-plant.jpg",
      "/images/brochure/machines/batching-plant.png",
    ],
    power: "15 KW (22.5 HP)",
    featureGroups: [
      {
        title: "Batching Plant",
        items: [
          "3 Bin Storage",
          "Concrete Output 30 m³/Hr",
          "Heavy & sturdy fabricated structure",
          "Horizontal belt conveyor, 750 mm wide × 11 m long, for weigh batching with 3 outlet conveyors fitted at the bottom of each bin, Crompton motor & gearbox",
          "Electric load: 15 KW (22.5 HP)",
        ],
      },
      {
        title: "Automatic Batching & Mixing Control",
        items: [
          "Control panel with PLC for up to five raw materials: aggregate, fly ash, sand/stone dust, cement, water",
          "Advanced PLC & HMI system with a user-friendly interface",
        ],
      },
      {
        title: "Automatic Cement Feeding (Plate Form Based) / Cement Weighing Hopper",
        items: [
          "Heavy-duty screw conveyor up to 7.0 m long, 168 mm dia., for cement feeding",
          "0.5 Cu.M storage platform-type cement weighing hopper",
          "3 load cells & discharge butterfly valve at the hopper outlet, with sturdy fabricated support structure",
          "Motor-operated vibrator mounted at the bottom of the hopper",
          "1 HP compressor",
        ],
      },
      {
        title: "Inclined Dry Mix Belt Conveyor",
        items: [
          "600 mm × 10 m long, designed to convey aggregate, fly ash & sand",
          "Supporting structure, inlet chute, and adequate drive unit",
        ],
      },
      {
        title: "Automatic Water Feeding System",
        items: ["Automatic water feeding into the mixer using an automatic timer"],
      },
    ],
  },
  {
    slug: "mixture-machine",
    name: "Mixture Machine",
    category: "mixture",
    tagline: "Turbo and Planetary mixers for uniform, lump-free material mixing.",
    description:
      "Two mixing formats to match the output — a Turbo mixer for fly ash brick lines, and a heavy-duty Planetary mixer for high-strength concrete bricks, hollow blocks, and paver blocks.",
    images: [
      "/images/machines/mixture-machine.jpg",
      "/images/brochure/machines/mixture-machine.png",
    ],
    power: "10 to 20 HP",
    featureGroups: [
      {
        title: "Turbo Mixture",
        items: [
          "Most commonly used with fly ash brick machines",
          "Circular rotating arms mix material from the bottom up",
          "Ensures uniform, lump-free mixing of fly ash, sand, cement, lime & gypsum",
          "Capacity: 600–900–1300 kg per batch",
          "Best for: fly ash brick plants, small-to-medium scale production",
          "Motor: 10-15-20 HP",
          "Known for uniform mixing",
        ],
      },
      {
        title: "Planetary Mixture",
        items: [
          "Heavy-duty mixing with multiple rotating arms that move in a planetary motion",
          "Multi-layer bottom plate",
          "Produces an extremely consistent mix — no dry pockets",
          "Used for high-quality concrete bricks, hollow blocks, paver blocks, curb stone, etc.",
          "Capacity: 600–900–1300 kg per batch",
          "Best for: high-strength concrete bricks, paver block plants, hollow block plants",
          "Motor: 10-15-20 HP",
        ],
      },
    ],
  },
];

// The three press models share identical pressing, compaction and cycle figures.
// Stating them once here keeps the three detail pages from reading as copies of
// each other — only the rows that actually differ carry a per-model note.
export const PRESS_COMMON_STANDARDS: SpecRow[] = [
  {
    label: "Hydraulic Pressure",
    value: "50 to 60 MT",
    note: "Every Harvin press applies the same 50 to 60 metric tonnes of force inside the mould. That pressure is what gives a brick its compressive strength and uniform density to IS standards — so a brick off the HI-1500 is as strong as one off the HI-3000.",
  },
  {
    label: "Vibration Force",
    value: "60 KN",
    note: "The vibro-compaction system is identical across the range. While the hydraulics compress from above, 60 kilonewtons of vibration fills every corner of the mould, drives out air pockets and leaves the brick solid and smooth throughout.",
  },
  {
    label: "Cycle Time",
    value: "15 to 20 Seconds",
    note: "One full cycle — fill, press, release — takes 15 to 20 seconds on all three models. Choosing a smaller machine costs you bricks per stroke, never speed.",
  },
];

// The nine forms every Harvin press can produce. Sizes come from the machine
// production tables above; the four optional-mould forms have no fixed size.
export type OutputForm = { name: string; icon: string; detail: string; image: string };

export const OUTPUT_FORMS: OutputForm[] = [
  { name: "Fly Ash Brick", icon: "view_module", detail: "230 × 110 × 75 mm", image: "/images/forms/fly-ash-brick.png" },
  { name: "Solid Brick", icon: "rectangle", detail: "300 × 200 × 200 mm", image: "/images/forms/solid-brick.png" },
  { name: "Hollow Block", icon: "grid_view", detail: "390 × 190 × 190 mm", image: "/images/forms/hollow-block.png" },
  { name: "I-Shape Paver", icon: "extension", detail: "200 × 165 × 60 mm", image: "/images/forms/i-shape-paver.png" },
  { name: "Zig Zag Paver", icon: "stairs", detail: "225 × 112.5 × 80 mm", image: "/images/forms/zig-zag-paver.png" },
  { name: "Retention Block", icon: "fence", detail: "Optional mould", image: "/images/forms/retention-block.png" },
  { name: "Curb Block", icon: "road", detail: "Optional mould", image: "/images/forms/curb-block.png" },
  { name: "Curb Stone", icon: "straighten", detail: "Optional mould", image: "/images/forms/curb-stone.png" },
  { name: "Drain Block", icon: "water_drop", detail: "Optional mould", image: "/images/forms/drain-block.png" },
];

export function getPressModels(): Product[] {
  return PRODUCTS.filter((product) => product.category === "press");
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return PRODUCTS.filter(
    (candidate) =>
      candidate.slug !== product.slug && candidate.category === product.category,
  ).slice(0, limit);
}
