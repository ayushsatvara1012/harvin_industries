import type { SpecRow } from "@/lib/product-types";

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
