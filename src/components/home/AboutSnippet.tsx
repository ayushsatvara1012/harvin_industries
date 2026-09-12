import { Button, Icon, LazyVideo, SectionHeader } from "@/components/ui";

const PILLARS = [
  { icon: "precision_manufacturing", label: "Modern Manufacturing Facility" },
  { icon: "verified", label: "Quality Driven Processes" },
  { icon: "group", label: "Customer Focused Approach" },
];

function FacilityVisual({ variant }: { variant: "desktop" | "mobile" }) {
  const isMobile = variant === "mobile";

  return (
    <div className="relative h-full w-full">
      {/* Yellow wedge sitting behind the video, offset left to read as an edge —
          desktop-only; mobile spans full-bleed with no notch cut. */}
      {!isMobile && (
        <div className="absolute inset-0 -translate-x-3 lg:-translate-x-4 bg-brand-yellow clip-notch-left" />
      )}

      <div
        className={`relative h-full w-full overflow-hidden bg-brand-ink ${isMobile ? "" : "clip-notch-left"}`}
      >
        {/* Timeline Evolution Video — lazy-mounted once it nears the viewport */}
        <LazyVideo
          src="/Harvin_animation_timeline.mp4"
          poster="/images/mockup/factory-hq-4k.webp"
          posterAlt="Harvin Industries manufacturing facility timeline"
          sizes="(min-width: 1024px) 54vw, 100vw"
          className="absolute inset-0"
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
        <div
          className={`absolute inset-x-0 bottom-0 bg-brand-ink/85 backdrop-blur-[2px] py-3.5 pr-6 ${
            isMobile ? "pl-4" : "pl-[calc(var(--notch)+1rem)]"
          }`}
        >
          <div className="flex items-center justify-start gap-5 lg:gap-8">
            {PILLARS.map((pillar) => (
              <div key={pillar.label} className="flex items-center gap-3">
                <Icon
                  name={pillar.icon}
                  className="text-brand-yellow shrink-0"
                  style={{ fontSize: "36px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}
                />
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
        <FacilityVisual variant="desktop" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 lg:py-10 lg:pr-16 xl:pr-24">
            <SectionHeader eyebrow="Who We Are" spacing="lg" tight>
              Engineering Machines <br />
              for <span className="text-brand-accent-text">a Better Tomorrow</span>
            </SectionHeader>

            <p className="mt-6 max-w-lg text-base lg:text-[17px] text-brand-text-secondary leading-relaxed">
              <strong className="text-brand-text font-semibold">HARVIN INDUSTRIES</strong> is a
              modern engineering company manufacturing high-performance machinery for fly ash
              bricks, concrete blocks and material handling equipment. We combine technology,
              precision manufacturing and practical industry experience to deliver reliable and
              efficient solutions for the construction sector.
            </p>

            <div className="mt-8">
              <Button href="/about">More About Us</Button>
            </div>
          </div>

          {/* Stacked video below the copy on small screens — full-bleed edge
              to edge, breaking out of the section's side padding for an
              immersive look instead of sitting inset in a padded column. */}
          <div className="lg:hidden -mx-4 sm:-mx-6 aspect-[16/11]">
            <FacilityVisual variant="mobile" />
          </div>
        </div>
      </div>
    </section>
  );
}
