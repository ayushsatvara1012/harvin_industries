import Link from "next/link";
import Image from "next/image";

const PRODUCT_CATEGORIES = [
  {
    title: "Fly Ash Brick Machines",
    href: "/products#fly-ash",
    image: "/images/mockup/product-fly-ash-4k.webp",
    alt: "Fly Ash Brick Making Machines",
  },
  {
    title: "Concrete Block Machines",
    href: "/products#concrete-blocks",
    image: "/images/mockup/product-concrete-blocks-4k.webp",
    alt: "Concrete Block Making Machines",
  },
  {
    title: "Paver Block Machines",
    href: "/products#paver-blocks",
    image: "/images/mockup/product-paver-blocks-4k.webp",
    alt: "Interlocking Paver Block Machines",
  },
  {
    title: "Automatic Plant Solutions",
    href: "/products#automatic-plants",
    image: "/images/mockup/product-automatic-plant-4k.webp",
    alt: "Automatic Brick and Block Plant Solutions",
  },
  {
    title: "Material Handling Equipment",
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
    <section id="products" className="pt-20 lg:pt-28 pb-0 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-3.5 bg-amber-500 inline-block" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600">
                OUR PRODUCTS
              </span>
            </div>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-gray-950">
              Machines That Build{" "}
              <span className="text-amber-500">Possibilities</span>
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700 transition-colors group"
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
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {PRODUCT_CATEGORIES.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group flex flex-col overflow-hidden rounded-lg bg-gray-50 border border-gray-200/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Product Category Photo */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(min-width: 1280px) 20vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Bottom Label with Arrow */}
              <div className="flex items-center justify-between p-4 bg-white border-t border-gray-100 group-hover:bg-amber-500/5 transition-colors">
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-amber-600 transition-colors leading-tight">
                  {category.title}
                </h3>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <svg
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Full-width Dark Stats Bar */}
      <div className="mt-20 bg-[#121417] text-white py-12 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4 group">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                  <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-amber-400 leading-tight">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs sm:text-sm font-medium text-gray-300">
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
