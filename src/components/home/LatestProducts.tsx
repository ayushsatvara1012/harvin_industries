import Link from "next/link";
import Image from "next/image";
import { Icon, SectionHeader } from "@/components/ui";
import { PRODUCTS, CATEGORY_LABELS, OUTPUT_FORMS } from "@/data/products";
import { COMPANY_STATS } from "@/data/company";

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

        {/* The five machines we actually build, each linking to its detail page */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {PRODUCTS.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group flex flex-col overflow-hidden rounded-sm border border-brand-border bg-white transition-colors duration-300 hover:border-brand-accent/40"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
                <Image
                  src={product.images[0]}
                  alt={`${product.name} — ${CATEGORY_LABELS[product.category]}`}
                  fill
                  sizes="(min-width: 1280px) 20vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between gap-3 px-5 py-5">
                <div>
                  <h3 className="text-sm sm:text-[15px] font-bold uppercase tracking-tight text-brand-text group-hover:text-brand-accent transition-colors leading-[1.3]">
                    {product.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-brand-text-secondary leading-snug">
                    {CATEGORY_LABELS[product.category]}
                  </p>
                </div>
                <span className="self-end text-brand-yellow transition-transform group-hover:translate-x-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Nine forms, one standard — what those machines actually produce.
            Answers "can it make what I sell?" without a second page. */}
        <div className="mt-14 border-t border-brand-border/80 pt-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-accent-text">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                Mould Interchangeability: 100%
              </span>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl tracking-tight text-brand-ink leading-tight">
                Nine forms. <span className="text-brand-accent-text">One standard.</span>
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-brand-text-secondary leading-relaxed">
                Uncompromising dimensional precision in every unit pressed — change the mould, not the machine.
              </p>
            </div>

            {/* Technical legend tag */}
            <div className="hidden sm:flex items-center gap-2 self-start md:self-end px-3 py-1.5 rounded-full border border-brand-border bg-brand-surface-alt/60 text-[11px] font-mono text-brand-text-secondary">
              <span className="inline-block w-2 h-2 rounded-full border border-brand-yellow bg-brand-yellow/30" />
              <span>ISOMETRIC PROJECTION [1:1 CAD SPEC]</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4">
            {OUTPUT_FORMS.map((form, idx) => {
              const isOptional = form.detail.toLowerCase().includes("optional");
              return (
                <div
                  key={form.name}
                  className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-brand-border bg-gradient-to-b from-brand-surface-alt/60 to-brand-surface p-4 shadow-sm"
                >
                  {/* Subtle technical crosshair registration ticks in corners */}
                  <div className="absolute top-2 right-2 font-mono text-[9px] text-brand-border pointer-events-none select-none">
                    +
                  </div>
                  <div className="absolute bottom-2 left-2 font-mono text-[9px] text-brand-border pointer-events-none select-none">
                    +
                  </div>

                  {/* Header row inside card: index number + status pill */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold text-brand-text-secondary/60">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[9.5px] font-semibold tracking-wider uppercase ${
                        isOptional
                          ? "bg-stone-100 text-stone-600 border border-stone-200/80"
                          : "bg-brand-yellow/15 text-brand-accent-text border border-brand-yellow/30"
                      }`}
                    >
                      {isOptional ? "Custom" : "Standard"}
                    </span>
                  </div>

                  {/* 3D Photorealistic Render Showcase */}
                  <div className="my-2.5 flex items-center justify-center py-1">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 drop-shadow-md">
                      <Image
                        src={form.image}
                        alt={`${form.name} 3D realistic masonry model`}
                        fill
                        sizes="(min-width: 1280px) 15vw, (min-width: 640px) 25vw, 40vw"
                        className="object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Typography & Dimensions footer */}
                  <div className="pt-2 border-t border-brand-border/60">
                    <p className="text-[13px] font-bold uppercase tracking-tight text-brand-ink leading-tight">
                      {form.name}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-brand-text-secondary leading-tight truncate">
                      {form.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
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
            {COMPANY_STATS.map((stat, idx) => (
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
