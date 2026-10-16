// Every image and video the site shows lives in Cloudinary, never in the repo.
// These are the public IDs; swap a picture by uploading over the same ID (or
// change the ID here). Product photos are managed from /admin instead.

export const MEDIA = {
  heroBanner: "harvin/site/hero-banner",
  heroPlant: "harvin/site/hero-plant",
  automaticPlant: "harvin/site/product-automatic-plant",
  factoryHq: "harvin/site/factory-hq",
  advantageWarehouse: "harvin/site/advantage-warehouse",
  ctaBlocks: "harvin/site/cta-blocks",
  mfgFabrication: "harvin/site/mfg-fabrication",
  mfgMachining: "harvin/site/mfg-machining",
  mfgAssembly: "harvin/site/mfg-assembly",
  mfgTesting: "harvin/site/mfg-testing",
  mfgDispatch: "harvin/site/mfg-dispatch",
} as const;

export const VIDEOS = {
  manufacturingReel: "harvin/site/video/manufacturing-reel",
  companyTimeline: "harvin/site/video/company-timeline",
} as const;

export const BRAND = {
  logo: "harvin/site/brand/logo",
  lockup: "harvin/site/brand/lockup",
} as const;

export const formImage = (slug: string) => `harvin/site/forms/${slug}`;
