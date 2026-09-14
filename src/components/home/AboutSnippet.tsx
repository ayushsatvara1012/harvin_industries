import Link from "next/link";
import { Button, Icon, LazyVideo } from "@/components/ui";
import { COMPANY_INTRO_PREDICATE } from "@/data/company";

const CAPABILITIES = [
  {
    tag: "SPEC // 01",
    icon: "workspace_premium",
    title: "ISO 9001:2015 Certified Manufacturing",
    desc: "Built under strict quality management systems with precision CNC plate fabrication and stress-relieved steel frames.",
  },
  {
    tag: "SPEC // 02",
    icon: "precision_manufacturing",
    title: "High-Compaction Hydraulic Systems",
    desc: "Multi-stage hydraulic power packs engineered for maximum density, sharp edges, and continuous 24/7 output.",
  },
  {
    tag: "SPEC // 03",
    icon: "support_agent",
    title: "Pan-India Commissioning & Support",
    desc: "Direct on-site plant setup, thorough operator training, and rapid spare-parts availability across India.",
  },
];

export function AboutSnippet() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 border-b border-brand-border/60 bg-white py-16 lg:py-24 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Narrative & Engineering Capabilities Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Technical Eyebrow & Spec Header */}
            <div className="flex items-center gap-3 mb-3">
              <span className="h-2 w-2 bg-brand-yellow shrink-0" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-brand-accent-text">
                01 // WHO WE ARE
              </span>
              <span className="h-px w-8 bg-brand-border" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-brand-text-secondary/60 hidden sm:inline">
                AHMEDABAD, GUJARAT
              </span>
            </div>

            {/* Display Headline */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] tracking-tight text-brand-ink leading-[1.08]">
              Engineering Machines <br className="hidden sm:inline" />
              for <span className="text-brand-accent-text">a Better Tomorrow</span>
            </h2>

            {/* Introductory Narrative */}
            <p className="mt-5 text-base sm:text-[17px] text-brand-text-secondary leading-relaxed max-w-xl">
              <strong className="text-brand-ink font-semibold">Harvin Industries</strong>
              {COMPANY_INTRO_PREDICATE}
            </p>

            {/* 3-Tier Engineering Capabilities Matrix */}
            <div className="mt-8 space-y-3">
              {CAPABILITIES.map((cap) => (
                <div
                  key={cap.tag}
                  className="group relative flex items-start gap-4 rounded-sm border border-brand-border bg-brand-surface-alt/50 p-4 transition-all duration-200 hover:border-brand-yellow/60 hover:bg-white hover:shadow-sm"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-brand-yellow/30 bg-brand-yellow/10 text-brand-accent-text transition-colors group-hover:bg-brand-yellow group-hover:text-brand-ink">
                    <Icon name={cap.icon} className="text-[22px]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-base font-bold tracking-tight text-brand-ink">
                        {cap.title}
                      </h3>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-accent-text/80 shrink-0">
                        {cap.tag}
                      </span>
                    </div>
                    <p className="mt-1 text-xs sm:text-[13px] leading-relaxed text-brand-text-secondary">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dual Action Row */}
            <div className="mt-9 flex flex-wrap items-center gap-4 sm:gap-6">
              <Button href="/about">More About Us</Button>

              <Link
                href="/#manufacturing"
                className="group inline-flex items-center gap-2 font-display text-base font-semibold tracking-wide text-brand-text transition-colors hover:text-brand-accent"
              >
                <span>Tour Manufacturing Plant</span>
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: Industrial Media Console & Engineering Ethos */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            {/* Industrial Media Console */}
            <div className="relative overflow-hidden rounded-xl border border-brand-border bg-brand-ink shadow-2xl">
              {/* Top telemetry control strip */}
              <div className="flex items-center justify-between border-b border-white/10 bg-brand-dark-surface px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-brand-yellow" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-white">
                    REEL FEED // 01
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
                  KILN ➔ HIGH-TECH AUTOMATION
                </span>
              </div>

              {/* Video viewport with CAD crosshair registration marks */}
              <div className="relative aspect-[16/10] sm:aspect-[16/10] w-full overflow-hidden bg-black">
                <LazyVideo
                  src="/Harvin_animation_timeline.mp4"
                  poster="/images/mockup/factory-hq-4k.webp"
                  posterAlt="Harvin Industries manufacturing facility timeline"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="absolute inset-0"
                />

                {/* CAD Corner Ticks */}
                <span className="pointer-events-none absolute top-2.5 left-2.5 font-mono text-[11px] text-white/30 select-none">
                  +
                </span>
                <span className="pointer-events-none absolute top-2.5 right-2.5 font-mono text-[11px] text-white/30 select-none">
                  +
                </span>
                <span className="pointer-events-none absolute bottom-2.5 left-2.5 font-mono text-[11px] text-white/30 select-none">
                  +
                </span>
                <span className="pointer-events-none absolute bottom-2.5 right-2.5 font-mono text-[11px] text-white/30 select-none">
                  +
                </span>

                {/* Scrim across the bottom */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              {/* Bottom Telemetry Ticker */}
              <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-brand-dark-card px-3 py-3 text-center sm:px-4 sm:py-3.5">
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-gray-400">
                    Process
                  </span>
                  <span className="mt-0.5 block font-display text-xs sm:text-sm font-bold tracking-tight text-brand-yellow">
                    Automated Press
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-gray-400">
                    Compliance
                  </span>
                  <span className="mt-0.5 block font-display text-xs sm:text-sm font-bold tracking-tight text-white">
                    ISO 9001:2015
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-gray-400">
                    Network
                  </span>
                  <span className="mt-0.5 block font-display text-xs sm:text-sm font-bold tracking-tight text-white">
                    Pan-India Direct
                  </span>
                </div>
              </div>
            </div>

            {/* Engineering Ethos Callout Plate */}
            <div className="relative rounded-sm border-l-2 border-brand-yellow bg-brand-surface-alt/70 p-4 sm:p-5 shadow-xs">
              <p className="font-display text-sm sm:text-base italic text-brand-ink leading-relaxed">
                &ldquo;Every brick laid with our machines carries our commitment to enduring quality and your vision for a better tomorrow.&rdquo;
              </p>
              <div className="mt-2.5 flex items-center justify-between text-xs text-brand-text-secondary">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-brand-accent-text">
                  — Harvin Engineering Philosophy
                </span>
                <span className="font-mono text-[10px] text-brand-text-secondary/60">
                  Ahmedabad, Gujarat
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
