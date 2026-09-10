"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const SLIDES = [
  {
    id: "01",
    tagline: "INDIAN ENGINEERING | GLOBAL POSSIBILITIES",
    title1: "Built for",
    title2: "Performance",
    description:
      "Advanced machinery for fly ash bricks, concrete blocks and modern construction materials.",
  },
  {
    id: "02",
    tagline: "ADVANCED AUTOMATION | PRECISION CONTROL",
    title1: "Engineered for",
    title2: "Reliability",
    description:
      "Heavy-duty hydraulic press technology delivering unmatched cycle speeds and dimensional accuracy.",
  },
  {
    id: "03",
    tagline: "SUSTAINABLE MANUFACTURING | MAXIMUM OUTPUT",
    title1: "Powering",
    title2: "Productivity",
    description:
      "Complete automatic plant solutions tailored for high-volume commercial brick and block production.",
  },
];

const BADGES = [
  { icon: "bolt", line1: "HIGH", line2: "EFFICIENCY" },
  { icon: "verified_user", line1: "RELIABLE", line2: "PERFORMANCE" },
  { icon: "trending_up", line1: "BUILT", line2: "FOR LONG TERM" },
];

export function Hero() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slide = SLIDES[currentSlideIndex];

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <section className="relative min-h-[560px] lg:min-h-[640px] flex items-center overflow-hidden bg-brand-ink">
      {/* Full-bleed plant photograph */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/mockup/hero-plant-4k.webp"
          alt="Harvin Industries High-Performance Brick and Block Manufacturing Plant"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />
        {/* Left-weighted scrim so the headline holds contrast over the machine */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/85 via-40% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-transparent to-brand-ink/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-gray-300">
            {slide.tagline}
          </p>

          <h1 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[0.98]">
            {slide.title1} <br />
            <span className="text-brand-yellow-light">{slide.title2}</span>
          </h1>

          <p className="mt-5 max-w-lg text-sm sm:text-base text-gray-300 leading-relaxed">
            {slide.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-brand-accent px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-brand-ink transition-colors"
            >
              <span>Explore Our Machines</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/70 hover:border-brand-yellow px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-white hover:text-brand-yellow transition-colors"
            >
              <span>Request a Quote</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Trust badges, separated by hairline rules as in the design */}
          <div className="mt-14 flex flex-wrap items-center">
            {BADGES.map((badge, idx) => (
              <div
                key={badge.line1}
                className={`flex items-center gap-3 pr-6 sm:pr-10 ${
                  idx > 0 ? "border-l border-white/20 pl-6 sm:pl-10" : ""
                }`}
              >
                <span className="material-symbols-outlined text-brand-yellow text-[26px]">
                  {badge.icon}
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-white leading-tight">
                  {badge.line1}
                  <br />
                  {badge.line2}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide index rail, pinned to the right edge */}
      <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-end gap-3">
        <div className="flex flex-col items-end gap-2.5 border-l border-white/25 pl-4">
          {SLIDES.map((s, idx) => {
            const isActive = idx === currentSlideIndex;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentSlideIndex(idx)}
                className="flex items-center gap-2 cursor-pointer"
                aria-label={`Go to slide ${s.id}`}
              >
                <span
                  className={`h-[2px] transition-all ${
                    isActive ? "w-4 bg-brand-yellow" : "w-2 bg-white/30"
                  }`}
                />
                <span
                  className={`text-xs font-bold tracking-wider transition-colors ${
                    isActive ? "text-brand-yellow" : "text-gray-400"
                  }`}
                >
                  {s.id}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleNextSlide}
          className="mt-2 text-brand-yellow hover:text-white transition-colors cursor-pointer"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* Angled yellow strapline anchored to the bottom-right corner */}
      <div
        className="absolute bottom-0 right-0 z-20 hidden md:block bg-brand-yellow text-brand-ink py-4 pl-14 pr-8"
        style={{ clipPath: "polygon(44px 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      >
        <p className="text-[13px] font-extrabold uppercase tracking-tight leading-[1.15]">
          Engineering
          <br />
          A Stronger
          <br />
          Tomorrow
        </p>
      </div>
    </section>
  );
}
