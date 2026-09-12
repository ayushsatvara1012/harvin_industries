import Link from "next/link";
import Image from "next/image";
import { Icon, SectionHeader } from "@/components/ui";

const PRODUCT_CATEGORIES = [
  {
    title: "Fly Ash\nBrick Machines",
    href: "/products#fly-ash",
    image: "/images/mockup/product-fly-ash-4k.webp",
    alt: "Fly Ash Brick Making Machines",
  },
  {
    title: "Concrete\nBlock Machines",
    href: "/products#concrete-blocks",
    image: "/images/mockup/product-concrete-blocks-4k.webp",
    alt: "Concrete Block Making Machines",
  },
  {
    title: "Paver Block\nMachines",
    href: "/products#paver-blocks",
    image: "/images/mockup/product-paver-blocks-4k.webp",
    alt: "Interlocking Paver Block Machines",
  },
  {
    title: "Automatic\nPlant Solutions",
    href: "/products#automatic-plants",
    image: "/images/mockup/product-automatic-plant-4k.webp",
    alt: "Automatic Brick and Block Plant Solutions",
  },
  {
    title: "Material\nHandling Equipment",
    href: "/products#material-handling",
    image: "/images/mockup/product-material-handling-4k.webp",
    alt: "Heavy Duty Material Handling Equipment",
  },
];

const STATS = [
  {
    icon: "factory",
    value: "500+",
    label: "Machines Designed",
  },
  {
    icon: "language",
    value: "Global",
    label: "Market Reach",
  },
  {
    icon: "diversity_3",
    value: "100+",
    label: "Happy Customers",
  },
  {
    icon: "speed",
    value: "High",
    label: "Performance Machines",
  },
];

export function LatestProducts() {
  return (
    <section id="products" className="scroll-mt-20 pt-16 lg:pt-24 pb-0 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <SectionHeader eyebrow="Our Products">
              Machines That Build{" "}
              <span className="text-brand-accent-text">Possibilities</span>
            </SectionHeader>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-brand-accent-text hover:underline transition-colors group"
          >
            <span>View All Products</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* 5 Product Cards Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {PRODUCT_CATEGORIES.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group flex flex-col overflow-hidden rounded-sm border border-brand-border bg-white transition-colors duration-300 hover:border-brand-accent/40"
            >
              {/* Product Category Photo */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(min-width: 1280px) 20vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Title above, arrow tucked into the bottom-right corner */}
              <div className="flex flex-1 flex-col justify-between gap-3 px-5 py-5">
                <h3 className="text-sm sm:text-[15px] font-bold uppercase tracking-tight text-brand-text group-hover:text-brand-accent transition-colors leading-[1.3] whitespace-pre-line">
                  {category.title}
                </h3>
                <span className="self-end text-brand-yellow transition-transform group-hover:translate-x-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Full-width Dark Stats Bar with Outlined Stacked Brick SVG Background */}
      <div className="relative mt-14 bg-brand-ink text-white py-12 overflow-hidden">
        {/* Outlined Stacked Bricks SVG Pattern with boosted brightness & color accents */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 1200 160"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="outlinedBricks"
                width="120"
                height="48"
                patternUnits="userSpaceOnUse"
              >
                {/* Row 1 */}
                <rect x="2" y="2" width="56" height="20" rx="2" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" fill="none" />
                <rect x="62" y="2" width="56" height="20" rx="2" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" fill="none" />
                {/* Row 2 (staggered) */}
                <rect x="-28" y="26" width="56" height="20" rx="2" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" fill="none" />
                <rect x="32" y="26" width="56" height="20" rx="2" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" fill="none" />
                <rect x="92" y="26" width="56" height="20" rx="2" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" fill="none" />
              </pattern>
            </defs>

            {/* Base outlined grid */}
            <rect width="100%" height="100%" fill="url(#outlinedBricks)" />

            {/* Random stacked bricks highlighted with brighter warm fills and luminous outlines */}
            <rect x="62" y="2" width="56" height="20" rx="2" fill="rgba(251,191,36,0.18)" stroke="rgba(251,191,36,0.55)" strokeWidth="1.5" />
            <rect x="212" y="26" width="56" height="20" rx="2" fill="rgba(254,243,199,0.12)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
            <rect x="392" y="2" width="56" height="20" rx="2" fill="rgba(245,158,11,0.22)" stroke="rgba(245,158,11,0.6)" strokeWidth="1.5" />
            <rect x="572" y="74" width="56" height="20" rx="2" fill="rgba(254,243,199,0.14)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <rect x="692" y="26" width="56" height="20" rx="2" fill="rgba(251,191,36,0.2)" stroke="rgba(251,191,36,0.55)" strokeWidth="1.5" />
            <rect x="872" y="2" width="56" height="20" rx="2" fill="rgba(254,243,199,0.12)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <rect x="1052" y="50" width="56" height="20" rx="2" fill="rgba(245,158,11,0.18)" stroke="rgba(245,158,11,0.55)" strokeWidth="1.5" />
            <rect x="152" y="98" width="56" height="20" rx="2" fill="rgba(251,191,36,0.18)" stroke="rgba(251,191,36,0.5)" strokeWidth="1.5" />
            <rect x="452" y="122" width="56" height="20" rx="2" fill="rgba(254,243,199,0.14)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
            <rect x="812" y="122" width="56" height="20" rx="2" fill="rgba(245,158,11,0.2)" stroke="rgba(245,158,11,0.55)" strokeWidth="1.5" />
            <rect x="1112" y="98" width="56" height="20" rx="2" fill="rgba(251,191,36,0.18)" stroke="rgba(251,191,36,0.5)" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Ambient light gradient to retain text contrast while letting the pattern shine through */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/75 via-brand-ink/50 to-brand-ink/75 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
            {STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex items-center gap-5 py-2 lg:py-0 lg:px-8 ${
                  idx > 0 ? "lg:border-l lg:border-white/10" : ""
                }`}
              >
                {/* Enlarged white icon with no rounded border */}
                <Icon
                  name={stat.icon}
                  className="text-white shrink-0 transition-transform duration-300 hover:scale-110 drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]"
                  style={{
                    fontSize: "44px",
                    width: "44px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />

                <div>
                  {/* Distinct industrial font with tracking and high-impact numerals */}
                  <p className="font-stat text-4xl sm:text-[42px] font-bold text-brand-yellow-light leading-none tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs sm:text-[13px] font-medium tracking-wide text-gray-300/90 leading-tight">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
