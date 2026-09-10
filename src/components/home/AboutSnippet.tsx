import Link from "next/link";
import Image from "next/image";

export function AboutSnippet() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-6">
            {/* Tag */}
            <div className="flex items-center gap-2">
              <span className="w-1 h-3.5 bg-amber-500 inline-block" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600">
                WHO WE ARE
              </span>
            </div>

            {/* Headline */}
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-gray-950 leading-[1.15]">
              Engineering Machines <br />
              for <span className="text-amber-500">a Better Tomorrow</span>
            </h2>

            {/* Description */}
            <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              <strong className="text-gray-900 font-semibold">HARVIN INDUSTRIES</strong> is a
              modern engineering company manufacturing high-performance machinery for fly ash
              bricks, concrete blocks and material handling equipment. We combine technology,
              precision manufacturing and practical industry experience to deliver reliable and
              efficient solutions for the construction sector.
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-sm bg-amber-500 hover:bg-amber-600 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-all shadow-xs hover:shadow-md"
              >
                <span>More About Us</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: Factory Image with Angled Cutouts & 3 Feature Pillars */}
          <div className="lg:col-span-6">
            <div className="relative group">
              {/* Outer decorative yellow accent border behind image */}
              <div
                className="absolute -top-3 -left-3 w-full h-full bg-amber-400 -z-10 rounded-sm"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)",
                }}
              />

              {/* Main HQ Image */}
              <div
                className="relative aspect-[16/10] min-h-[260px] sm:min-h-[340px] w-full overflow-hidden bg-gray-900 shadow-xl"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)",
                }}
              >
                <Image
                  src="/images/mockup/factory-hq-4k.webp"
                  alt="Harvin Industries Modern Manufacturing Facility"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Dark Feature Strip Directly Below */}
              <div className="mt-2 bg-[#121417] text-white p-4 sm:p-5 rounded-b-sm grid grid-cols-3 gap-2 sm:gap-4 border-t-2 border-amber-500">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2">
                  <span className="material-symbols-outlined text-amber-400 text-xl shrink-0">
                    precision_manufacturing
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold leading-tight text-gray-200">
                    Modern Manufacturing Facility
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 border-x border-white/10 px-2 sm:px-4">
                  <span className="material-symbols-outlined text-amber-400 text-xl shrink-0">
                    verified
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold leading-tight text-gray-200">
                    Quality Driven Processes
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2">
                  <span className="material-symbols-outlined text-amber-400 text-xl shrink-0">
                    group
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold leading-tight text-gray-200">
                    Customer Focused Approach
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
