import Link from "next/link";
import Image from "next/image";

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
    icon: "precision_manufacturing",
    value: "500+",
    label: "Machines Designed",
  },
  {
    icon: "public",
    value: "Global",
    label: "Market Reach",
  },
  {
    icon: "groups",
    value: "100+",
    label: "Happy Customers",
  },
  {
    icon: "settings_suggest",
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
            <div className="flex items-center gap-2.5">
              <span className="w-[3px] h-3.5 bg-brand-yellow inline-block" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-text-secondary">
                Our Products
              </span>
            </div>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight text-brand-text">
              Machines That Build{" "}
              <span className="text-brand-yellow">Possibilities</span>
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-accent hover:text-brand-yellow transition-colors group"
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
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-8">
          {PRODUCT_CATEGORIES.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group flex flex-col overflow-hidden bg-white transition-shadow duration-300 hover:shadow-lg"
            >
              {/* Product Category Photo */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(min-width: 1280px) 20vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Title above, arrow tucked into the bottom-right corner */}
              <div className="flex flex-1 flex-col justify-between gap-2 pt-3.5 pb-3">
                <h3 className="text-[13px] font-bold uppercase tracking-tight text-brand-text group-hover:text-brand-accent transition-colors leading-[1.3] whitespace-pre-line">
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

      {/* Full-width Dark Stats Bar */}
      <div className="mt-14 bg-brand-ink text-white py-9">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex items-center gap-4 py-3 lg:py-0 lg:px-8 ${
                  idx > 0 ? "lg:border-l lg:border-white/15" : ""
                }`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-brand-yellow text-brand-yellow">
                  <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                </span>
                <div>
                  <p className="text-2xl font-extrabold text-brand-yellow leading-none">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[11px] font-medium text-gray-300">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
