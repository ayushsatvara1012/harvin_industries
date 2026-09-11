"use client";

import Link from "next/link";
import Image from "next/image";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Raw Material\n& Fabrication",
    image: "/images/mockup/mfg-fabrication-4k.webp",
    alt: "Raw Material and Steel Fabrication",
  },
  {
    step: "02",
    title: "Machining",
    image: "/images/mockup/mfg-machining-4k.webp",
    alt: "Precision CNC Machining",
  },
  {
    step: "03",
    title: "Assembly",
    image: "/images/mockup/mfg-assembly-4k.webp",
    alt: "Heavy Industrial Machine Assembly",
  },
  {
    step: "04",
    title: "Testing &\nQuality Check",
    image: "/images/mockup/mfg-testing-4k.webp",
    alt: "Control System Testing and Quality Check",
  },
  {
    step: "05",
    title: "Final Dispatch",
    image: "/images/mockup/mfg-dispatch-4k.webp",
    alt: "Machine Loading and Final Dispatch",
  },
];

export function ManufacturingSection() {
  return (
    <section id="manufacturing" className="scroll-mt-20 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:gap-12">
          {/* 1. Header & Description */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5">
              <span className="w-[3px] h-3.5 bg-brand-yellow inline-block" />
              <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] text-brand-text-secondary">
                Our Manufacturing
              </span>
            </div>

            <h2 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight text-brand-text leading-[1.05]">
              Precision in <span className="text-brand-yellow">Every Part</span>
            </h2>

            <p className="mt-4 text-base lg:text-[17px] text-brand-text-secondary leading-relaxed max-w-2xl">
              From design to dispatch, every machine is built in-house with strict quality control,
              advanced fabrication and skilled engineering teams.
            </p>
          </div>

          {/* 2. Process Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4.5">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl bg-brand-ink transition-all duration-300 hover:shadow-xl hover:-translate-y-1 aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]"
              >
                {/* Full-bleed Photo */}
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Scrim overlay: soft dark gradient from bottom for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 via-60% to-transparent pointer-events-none" />

                {/* Top Badge: Step Number */}
                <div className="relative z-10 p-3.5 sm:p-4">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/15 text-[11px] font-bold tracking-wider text-brand-yellow">
                    {step.step}
                  </span>
                </div>

                {/* Bottom Overlay: Title & Arrow on the image */}
                <div className="relative z-10 p-3.5 sm:p-4 flex flex-col justify-end">
                  <h3 className="text-xs sm:text-sm font-medium text-white tracking-tight leading-[1.3] drop-shadow-md">
                    {step.title}
                  </h3>

                  <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-white/20">
                    <span className="text-brand-yellow transition-transform duration-300 group-hover:translate-x-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 3. Actions & Video Reel Preview */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/about#manufacturing"
              className="inline-flex items-center gap-2 rounded-full bg-rusted-yellow px-7 py-3.5 font-display text-[17px] tracking-wider text-white transition-all font-semibold"
            >
              <span>See Our Manufacturing</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <a
              href="#manufacturing"
              onClick={(e) => {
                e.preventDefault();
                const v = document.getElementById("manufacturing-reel-video") as HTMLVideoElement | null;
                if (v) {
                  v.scrollIntoView({ behavior: "smooth", block: "center" });
                  if (v.paused) v.play();
                }
              }}
              className="inline-flex items-center gap-2.5 rounded-full border border-brand-border bg-brand-surface px-6 py-3.5 font-display text-[17px] tracking-wider text-brand-text font-semibold hover:border-brand-yellow hover:text-brand-accent transition-all shadow-sm"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-yellow/15 text-brand-accent">
                <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span>Watch Plant In Motion</span>
            </a>
          </div>

          {/* 4. Panoramic Manufacturing Animation Reel Banner */}
          <div
            id="manufacturing-reel-video"
            className="relative w-full aspect-[21/9] sm:aspect-[24/9] overflow-hidden rounded-2xl sm:rounded-3xl bg-brand-ink shadow-2xl border border-brand-border"
          >
            <video
              src="/harvin_animation.mp4"
              poster="/images/mockup/hero-plant-4k.webp"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

            {/* Live Plant Badge */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex items-center gap-2 rounded-full bg-black/70 backdrop-blur-md px-3.5 py-1.5 border border-white/15">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold tracking-wider uppercase text-white">
                Live Automation • Factory Plant View
              </span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
              <div>
                <p className="font-display text-lg sm:text-xl font-bold tracking-tight">
                  High-Speed Hydraulic Press & Automated Batching Operations
                </p>
                <p className="text-xs sm:text-sm text-gray-300">
                  Continuous robotic synchronization and strict ISO 9001:2015 quality standards.
                </p>
              </div>
              <span className="self-start sm:self-end px-3 py-1 rounded-md bg-brand-yellow/20 border border-brand-yellow/40 text-[11px] font-bold tracking-widest uppercase text-brand-yellow shrink-0">
                100% In-House Built
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
