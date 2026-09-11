import Link from "next/link";
import Image from "next/image";

const PILLARS = [
  { icon: "precision_manufacturing", label: "Modern Manufacturing Facility" },
  { icon: "verified", label: "Quality Driven Processes" },
  { icon: "group", label: "Customer Focused Approach" },
];

function FacilityVisual() {
  return (
    <div className="relative h-full w-full">
      {/* Yellow wedge sitting behind the video, offset left to read as an edge */}
      <div className="absolute inset-0 -translate-x-3 lg:-translate-x-4 bg-brand-yellow clip-notch-left" />

      <div className="relative h-full w-full overflow-hidden bg-brand-ink clip-notch-left">
        {/* Timeline Evolution Video */}
        <video
          src="/Harvin_animation_timeline.mp4"
          poster="/images/mockup/factory-hq-4k.webp"
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />

        {/* Top Floating Badge */}
        <div className="absolute top-4 right-5 z-10 hidden sm:flex items-center gap-2 rounded-full bg-black/65 backdrop-blur-md px-3 py-1.5 border border-white/15">
          <span className="h-2 w-2 rounded-full bg-brand-yellow animate-pulse" />
          <span className="text-[11px] font-bold tracking-wider uppercase text-white/90">
            Timeline • Kiln to High-Tech Automation
          </span>
        </div>

        {/* Ambient Dark Gradient Scrim across foot */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-ink/95 via-brand-ink/60 to-transparent pointer-events-none" />

        {/* Pillars overlaid across the foot of the video */}
        <div className="absolute inset-x-0 bottom-0 bg-brand-ink/85 backdrop-blur-[2px] py-3.5 pr-6 pl-[calc(var(--notch)+1rem)]">
          <div className="flex items-center justify-start gap-5 lg:gap-8">
            {PILLARS.map((pillar) => (
              <div key={pillar.label} className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-brand-yellow shrink-0"
                  style={{ fontSize: "36px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {pillar.icon}
                </span>
                <span className="text-xs sm:text-[13px] font-semibold leading-tight text-gray-100 max-w-[120px]">
                  {pillar.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutSnippet() {
  return (
    <section id="about" className="relative scroll-mt-20 bg-white py-16 lg:py-24 overflow-hidden">
      {/* On large screens the photo bleeds to the right edge of the viewport */}
      <div className="hidden lg:block absolute inset-y-10 right-0 w-[54%] z-0">
        <FacilityVisual />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 lg:py-10 lg:pr-16 xl:pr-24">
            <div className="flex items-center gap-2.5">
              <span className="w-[3px] h-3.5 bg-brand-yellow inline-block" />
              <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] text-brand-text-secondary">
                Who We Are
              </span>
            </div>

            <h2 className="mt-4 font-display text-4xl sm:text-5xl tracking-tight text-brand-text leading-[1.05]">
              Engineering Machines <br />
              for <span className="text-brand-yellow">a Better Tomorrow</span>
            </h2>

            <p className="mt-6 max-w-lg text-base lg:text-[17px] text-brand-text-secondary leading-relaxed">
              <strong className="text-brand-text font-semibold">HARVIN INDUSTRIES</strong> is a
              modern engineering company manufacturing high-performance machinery for fly ash
              bricks, concrete blocks and material handling equipment. We combine technology,
              precision manufacturing and practical industry experience to deliver reliable and
              efficient solutions for the construction sector.
            </p>

            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-rusted-yellow px-6 py-3 font-display text-[17px] tracking-wider text-white transition-all font-semibold"
              >
                <span>More About Us</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Stacked photo below the copy on small screens */}
          <div className="lg:hidden aspect-[16/11] w-full">
            <FacilityVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
