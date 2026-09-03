// Static catalog data, shaped to match the `Product` Prisma model in
// docs/harvin-industries-plan.md so this swaps to a DB query later with no
// component changes. Sourced from `Harvin_brochures/HARVIN BROUCHER.pdf`.

export type ProductType = "machine" | "output_item";

export type MachineCategory = "press" | "batching_plant" | "mixture";
export type OutputCategory = "brick" | "paver" | "block" | "curb" | "drain";
export type Category = MachineCategory | OutputCategory;

export type Material = "fly_ash" | "concrete";

export type SpecRow = { label: string; value: string };

export type ProductionRow = {
  product: string;
  sizeMm: string;
  pcsPerMould: number;
  pcsPerHour: number;
};

export type FeatureGroup = { title: string; items: string[] };

export type MachineVariant = {
  machineSlug: string;
  machineName: string;
  sizeMm: string;
  pcsPerMould: number;
  pcsPerHour: number;
};

export type Product = {
  slug: string;
  name: string;
  type: ProductType;
  category: Category;
  material?: Material;
  tagline: string;
  description: string;
  images: string[];
  specs?: SpecRow[];
  productionSummary?: SpecRow[];
  productionTable?: ProductionRow[];
  featureGroups?: FeatureGroup[];
  variants?: MachineVariant[];
  outputCapacity?: number;
  power?: string;
  featured?: boolean;
};

export const CATEGORY_LABELS: Record<Category, string> = {
  press: "Press Machine",
  batching_plant: "Batching Plant",
  mixture: "Mixture Machine",
  brick: "Brick",
  paver: "Paver",
  block: "Block",
  curb: "Curb",
  drain: "Drain",
};

export const MATERIAL_LABELS: Record<Material, string> = {
  fly_ash: "Fly Ash",
  concrete: "Concrete",
};

const MACHINES: Product[] = [
  {
    slug: "hi-1500",
    name: "HI-1500",
    type: "machine",
    category: "press",
    tagline: "8 bricks per stroke — the entry point into Harvin's press range.",
    description:
      "Fully automatic fly ash brick and paver block making machine. Built for high-volume production with a hydraulic press, universal vibration, and a PLC-based control system.",
    images: ["/images/machines/hi-1500.jpg", "/images/brochure/machines/hi-1500.png"],
    outputCapacity: 1800,
    power: "45 HP",
    featured: true,
    specs: [
      { label: "Machine Dimension", value: "10 × 8 × 2.5 Meter" },
      { label: "Required Area", value: "200 × 200 Square Foot" },
      { label: "Brick Per Stroke", value: "8 Bricks" },
      { label: "Cycle Time", value: "15 to 20 Seconds" },
      { label: "Pallet Size", value: "590 × 560 × 18 mm" },
      { label: "Hydraulic Pressure", value: "50 to 60 MT" },
      { label: "Vibration Force", value: "60 KN" },
      { label: "Electrical Load", value: "30 KW (45 HP)" },
      { label: "Hydraulic Tank Capacity", value: "400 Liter" },
    ],
    productionSummary: [
      { label: "Max Pcs/Mould", value: "8" },
      { label: "Pcs/Hour", value: "1,800" },
      { label: "Power", value: "45 HP" },
      { label: "Electrical Load", value: "30 KW" },
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
    type: "machine",
    category: "press",
    tagline: "10 bricks per stroke — the balanced mid-range performer.",
    description:
      "Fully automatic fly ash brick and paver block making machine, stepped up from the HI-1500 with a larger pallet and higher hourly output for growing production units.",
    images: ["/images/machines/hi-2000.jpg", "/images/brochure/machines/hi-2000.png"],
    outputCapacity: 2200,
    power: "50 HP",
    featured: true,
    specs: [
      { label: "Machine Dimension", value: "10 × 8 × 2.5 Meter" },
      { label: "Required Area", value: "200 × 200 Square Foot" },
      { label: "Brick Per Stroke", value: "10 Bricks" },
      { label: "Cycle Time", value: "15 to 20 Seconds" },
      { label: "Pallet Size", value: "690 × 560 × 18 mm" },
      { label: "Hydraulic Pressure", value: "50 to 60 MT" },
      { label: "Vibration Force", value: "60 KN" },
      { label: "Electrical Load", value: "34 KW (50 HP)" },
      { label: "Hydraulic Tank Capacity", value: "450 Liter" },
    ],
    productionSummary: [
      { label: "Pcs/Mould", value: "10" },
      { label: "Pcs/Hour", value: "2,200" },
      { label: "Power", value: "50 HP" },
      { label: "Electrical Load", value: "34 KW" },
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
    type: "machine",
    category: "press",
    tagline: "14 bricks per stroke — the flagship for large-scale production.",
    description:
      "Harvin's highest-output press machine. Built for large construction and government contracts that need consistent, high-volume brick and block production.",
    images: ["/images/machines/hi-3000.jpg", "/images/brochure/machines/hi-3000.png"],
    outputCapacity: 2900,
    power: "60 HP",
    featured: true,
    specs: [
      { label: "Machine Dimension", value: "10 × 8 × 2.5 Meter" },
      { label: "Required Area", value: "250 × 250 Square Foot" },
      { label: "Brick Per Stroke", value: "14 Bricks" },
      { label: "Cycle Time", value: "15 to 20 Seconds" },
      { label: "Pallet Size", value: "950 × 560 × 25 mm" },
      { label: "Hydraulic Pressure", value: "50 to 60 MT" },
      { label: "Vibration Force", value: "60 KN" },
      { label: "Electrical Load", value: "40 KW (60 HP)" },
      { label: "Hydraulic Tank Capacity", value: "500 Liter" },
    ],
    productionSummary: [
      { label: "Max Pcs/Mould", value: "14" },
      { label: "Pcs/Hour", value: "2,900" },
      { label: "Power", value: "60 HP" },
      { label: "Electrical Load", value: "40 KW" },
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
    type: "machine",
    category: "batching_plant",
    tagline: "Automatic aggregate, cement, and water batching for concrete output.",
    description:
      "A fully automated batching and mixing line — PLC-controlled dosing of up to five raw materials, automatic cement feeding, and automatic water metering — designed to feed a Harvin press machine at a steady 30 m³/hr.",
    images: ["/images/brochure/machines/batching-plant.png"],
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
    type: "machine",
    category: "mixture",
    tagline: "Turbo and Planetary mixers for uniform, lump-free material mixing.",
    description:
      "Two mixing formats to match the output — a Turbo mixer for fly ash brick lines, and a heavy-duty Planetary mixer for high-strength concrete bricks, hollow blocks, and paver blocks.",
    images: ["/images/brochure/machines/mixture-machine.png"],
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

const OUTPUT_ITEMS: Product[] = [
  {
    slug: "fly-ash-brick",
    name: "Fly Ash Brick",
    type: "output_item",
    category: "brick",
    material: "fly_ash",
    tagline: "IS-standard fly ash brick, available in 3 mould sizes.",
    description:
      "Made from fly ash, sand, lime, and gypsum, pressed and vibrated on any HI press machine to IS-standard strength and thermal insulation for mass housing, government projects, and commercial construction.",
    images: ["/images/brochure/products/fly-ash-brick.png"],
    variants: [
      { machineSlug: "hi-1500", machineName: "HI-1500", sizeMm: "230 × 110 × 75", pcsPerMould: 8, pcsPerHour: 1500 },
      { machineSlug: "hi-1500", machineName: "HI-1500", sizeMm: "250 × 125 × 75", pcsPerMould: 8, pcsPerHour: 1500 },
      { machineSlug: "hi-1500", machineName: "HI-1500", sizeMm: "190 × 90 × 90", pcsPerMould: 10, pcsPerHour: 1800 },
      { machineSlug: "hi-2000", machineName: "HI-2000", sizeMm: "230 × 110 × 75", pcsPerMould: 10, pcsPerHour: 1900 },
      { machineSlug: "hi-2000", machineName: "HI-2000", sizeMm: "250 × 125 × 75", pcsPerMould: 10, pcsPerHour: 1900 },
      { machineSlug: "hi-2000", machineName: "HI-2000", sizeMm: "190 × 90 × 90", pcsPerMould: 12, pcsPerHour: 2200 },
      { machineSlug: "hi-3000", machineName: "HI-3000", sizeMm: "230 × 110 × 75", pcsPerMould: 14, pcsPerHour: 2600 },
      { machineSlug: "hi-3000", machineName: "HI-3000", sizeMm: "250 × 125 × 75", pcsPerMould: 14, pcsPerHour: 2600 },
      { machineSlug: "hi-3000", machineName: "HI-3000", sizeMm: "190 × 90 × 90", pcsPerMould: 16, pcsPerHour: 2900 },
    ],
  },
  {
    slug: "i-shape-paver-block",
    name: "I-Shape Paver Block",
    type: "output_item",
    category: "paver",
    material: "concrete",
    tagline: "Interlocking I-profile paver for driveways and walkways.",
    description:
      "A concrete interlocking paver block in an I-shaped profile, produced on any HI press machine for driveways, walkways, and municipal paving projects.",
    images: ["/images/brochure/products/i-shape-paver.png"],
    variants: [
      { machineSlug: "hi-1500", machineName: "HI-1500", sizeMm: "200 × 165 × 60", pcsPerMould: 4, pcsPerHour: 750 },
      { machineSlug: "hi-2000", machineName: "HI-2000", sizeMm: "200 × 165 × 60", pcsPerMould: 6, pcsPerHour: 1100 },
      { machineSlug: "hi-3000", machineName: "HI-3000", sizeMm: "200 × 165 × 60", pcsPerMould: 8, pcsPerHour: 1500 },
    ],
  },
  {
    slug: "zigzag-paver-block",
    name: "Zig Zag Paver Block",
    type: "output_item",
    category: "paver",
    material: "concrete",
    tagline: "Interlocking zig-zag paver for high-traffic surfaces.",
    description:
      "A concrete interlocking paver block in a zig-zag profile for strong mechanical interlock — suited to roads, township paving, and high-traffic surfaces.",
    images: ["/images/brochure/products/zigzag-paver.png"],
    variants: [
      { machineSlug: "hi-1500", machineName: "HI-1500", sizeMm: "225 × 112.5 × 80", pcsPerMould: 6, pcsPerHour: 1100 },
      { machineSlug: "hi-2000", machineName: "HI-2000", sizeMm: "225 × 112.5 × 80", pcsPerMould: 8, pcsPerHour: 1500 },
      { machineSlug: "hi-3000", machineName: "HI-3000", sizeMm: "225 × 112.5 × 80", pcsPerMould: 12, pcsPerHour: 2200 },
    ],
  },
  {
    slug: "hollow-block",
    name: "Hollow Block",
    type: "output_item",
    category: "block",
    material: "concrete",
    tagline: "Load-bearing hollow concrete block in two mould sizes.",
    description:
      "A hollow-core concrete block for compound walls, industrial sheds, and commercial building construction — available in two mould sizes on every HI press machine.",
    images: ["/images/brochure/products/hollow-block.png"],
    variants: [
      { machineSlug: "hi-1500", machineName: "HI-1500", sizeMm: "390 × 190 × 190", pcsPerMould: 2, pcsPerHour: 360 },
      { machineSlug: "hi-1500", machineName: "HI-1500", sizeMm: "390 × 100 × 100", pcsPerMould: 3, pcsPerHour: 540 },
      { machineSlug: "hi-2000", machineName: "HI-2000", sizeMm: "390 × 190 × 190", pcsPerMould: 3, pcsPerHour: 540 },
      { machineSlug: "hi-2000", machineName: "HI-2000", sizeMm: "390 × 100 × 100", pcsPerMould: 4, pcsPerHour: 720 },
      { machineSlug: "hi-3000", machineName: "HI-3000", sizeMm: "390 × 190 × 190", pcsPerMould: 4, pcsPerHour: 720 },
      { machineSlug: "hi-3000", machineName: "HI-3000", sizeMm: "390 × 100 × 100", pcsPerMould: 6, pcsPerHour: 1100 },
    ],
  },
  {
    slug: "solid-block",
    name: "Solid Block",
    type: "output_item",
    category: "block",
    material: "concrete",
    tagline: "Dense solid concrete block for load-bearing construction.",
    description:
      "A solid-core concrete block for load-bearing walls and heavy-duty construction, produced on any HI press machine.",
    images: [],
    variants: [
      { machineSlug: "hi-1500", machineName: "HI-1500", sizeMm: "300 × 200 × 200", pcsPerMould: 2, pcsPerHour: 360 },
      { machineSlug: "hi-2000", machineName: "HI-2000", sizeMm: "300 × 200 × 200", pcsPerMould: 3, pcsPerHour: 540 },
      { machineSlug: "hi-3000", machineName: "HI-3000", sizeMm: "300 × 200 × 200", pcsPerMould: 4, pcsPerHour: 750 },
    ],
  },
  {
    slug: "retention-block",
    name: "Retention Block",
    type: "output_item",
    category: "block",
    material: "concrete",
    tagline: "Interlocking retaining block for slopes and embankments.",
    description:
      "A concrete retaining block for highway and expressway contractors, river bank and canal projects, railway embankments, and hill road construction — a rapidly growing segment driven by highway expansion.",
    images: ["/images/brochure/products/retention-block.png"],
  },
  {
    slug: "curb-block",
    name: "Curb Block",
    type: "output_item",
    category: "curb",
    material: "concrete",
    tagline: "Precast curb block for road edges and municipal projects.",
    description:
      "A precast concrete curb block for municipal road contractors, Smart City projects, and PWD tenders — available in multiple profiles.",
    images: [
      "/images/brochure/products/curb-block-1.png",
      "/images/brochure/products/curb-block-2.png",
    ],
  },
  {
    slug: "curb-stone",
    name: "Curb Stone",
    type: "output_item",
    category: "curb",
    material: "concrete",
    tagline: "Precast curb stone for road edging and city projects.",
    description:
      "A precast concrete curb stone for road edging on municipal and Smart City projects — available in multiple profiles.",
    images: [
      "/images/brochure/products/curb-stone-1.png",
      "/images/brochure/products/curb-stone-2.png",
    ],
  },
  {
    slug: "saucer-drain-block",
    name: "Saucer Drain Block",
    type: "output_item",
    category: "drain",
    material: "concrete",
    tagline: "Precast drainage channel block for road and airport drainage.",
    description:
      "A precast concrete drainage block for road drainage contractors, municipal corporations, industrial estate developers, and airport runway drainage.",
    images: ["/images/brochure/products/saucer-drain-block.png"],
  },
];

export const PRODUCTS: Product[] = [...MACHINES, ...OUTPUT_ITEMS];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return PRODUCTS.filter(
    (candidate) =>
      candidate.slug !== product.slug &&
      candidate.type === product.type &&
      candidate.category === product.category,
  ).slice(0, limit);
}
