"use client";

import Image from "next/image";
import { useRef } from "react";
import { Button, LazyVideo, SectionHeader, type LazyVideoHandle } from "@/components/ui";

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
  const reelRef = useRef<LazyVideoHandle>(null);
  const reelContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="manufacturing" className="scroll-mt-20 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:gap-12">
          {/* 1. Header & Description */}
          <div className="max-w-3xl">
            <SectionHeader eyebrow="Our Manufacturing" tight>
              Precision in <span className="text-brand-accent-text">Every Part</span>
            </SectionHeader>

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
                className="relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl bg-brand-ink aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] shadow-md"
              >
                {/* Full-bleed Photo */}
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
                  className="object-cover"
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
                    <span className="text-brand-yellow">
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
            <Button href="/about" size="lg">
              About Harvin Industries
            </Button>

            <a
              href="#manufacturing"
              onClick={(e) => {
                e.preventDefault();
                reelContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                reelRef.current?.play();
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

          {/* 4. Panoramic Manufacturing Animation Reel Banner — full width with
              minor side padding on mobile, caption kept out of the player;
              caption moves onto the video as an overlay from `sm` up. */}
          <div
            ref={reelContainerRef}
            id="manufacturing-reel-video"
            className="relative w-full aspect-[16/10] sm:aspect-[24/9] overflow-hidden rounded-2xl sm:rounded-3xl bg-brand-ink shadow-2xl border border-brand-border"
          >
            <LazyVideo
              ref={reelRef}
              src="/harvin_animation.mp4"
              poster="/images/mockup/hero-plant-4k.webp"
              posterAlt="Harvin Industries automated manufacturing plant in operation"
              sizes="100vw"
              className="absolute inset-0"
              showControls
            />

            {/* Gradient Scrim — desktop caption legibility only */}
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

            {/* Bottom Caption Overlay — sm and up only */}
            <div className="hidden sm:flex absolute bottom-6 left-6 right-6 z-10 items-end justify-between gap-3 text-white">
              <div>
                <p className="font-display text-xl font-bold tracking-tight">
                  High-Speed Hydraulic Press & Automated Batching Operations
                </p>
                <p className="text-sm text-gray-300">
                  Continuous robotic synchronization and strict ISO 9001:2015 quality standards.
                </p>
              </div>
            </div>
          </div>

          {/* Caption — below the player on mobile, kept off the video itself */}
          <div className="sm:hidden">
            <p className="font-display text-lg font-bold tracking-tight text-brand-text">
              High-Speed Hydraulic Press & Automated Batching Operations
            </p>
            <p className="text-xs text-brand-text-secondary">
              Continuous robotic synchronization and strict ISO 9001:2015 quality standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
