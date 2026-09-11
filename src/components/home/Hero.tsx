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
    type: "image" as const,
    src: "/hero_Image.webp",
    alt: "Harvin Industries Heavy-Duty Brick & Block Machine Plant",
  },
  {
    id: "02",
    tagline: "ADVANCED AUTOMATION | PRECISION CONTROL",
    title1: "Engineered for",
    title2: "Reliability",
    description:
      "Heavy-duty hydraulic press technology delivering unmatched cycle speeds and dimensional accuracy.",
    type: "image" as const,
    src: "/images/mockup/product-automatic-plant-4k.webp",
    alt: "Automatic Hydraulic Brick Press Plant in Operation",
  },
  {
    id: "03",
    tagline: "SUSTAINABLE MANUFACTURING | MAXIMUM OUTPUT",
    title1: "Powering",
    title2: "Productivity",
    description:
      "Complete automatic plant solutions tailored for high-volume commercial brick and block production.",
    type: "image" as const,
    src: "/images/mockup/factory-hq-4k.webp",
    alt: "Harvin Industries Modern Manufacturing Facility",
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
    <section className="relative min-h-[calc(100svh-5rem)] lg:min-h-[calc(100svh-5rem)] flex items-center overflow-hidden bg-brand-ink">
      {/* Background Media Layers: Video for Slide 01, Images for Slide 02 & 03 with smooth transitions */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((s, idx) => {
          const isCurrent = idx === currentSlideIndex;
          return (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                isCurrent ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          );
        })}

        {/* Cinematic gradient scrims so typography and controls remain sharp */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/80 via-45% to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/85 via-transparent to-brand-ink/40 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs sm:text-[13px] font-semibold tracking-[0.28em] uppercase text-gray-300">
            {slide.tagline}
          </p>

          <h1 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[0.98]">
            {slide.title1} <br />
            <span className="text-brand-yellow-light">{slide.title2}</span>
          </h1>

          <p className="mt-5 max-w-xl text-base sm:text-lg text-gray-300 leading-relaxed">
            {slide.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-brand-yellow-light/80 hover:bg-rusted-yellow px-6 py-3 font-display text-base tracking-wider text-white hover:text-brand-ink font-semibold transition-all shadow-md shadow-black/40 hover:shadow-lg hover:shadow-brand-yellow/20 [text-shadow:0_1px_2px_rgba(0,0,0,0.7)] hover:[text-shadow:none]"
            >
              <span>Explore Our Machines</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-rusted-yellow px-6 py-3 font-display text-[17px] tracking-wider text-brand-ink transition-all font-semibold"
            >
              <span>Request a Quote</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Trust badges, separated by hairline rules as in the design */}
          <div className="mt-10 lg:mt-14 flex flex-wrap items-center">
            {BADGES.map((badge, idx) => (
              <div
                key={badge.line1}
                className={`flex items-center gap-3 pr-6 sm:pr-10 ${idx > 0 ? "border-l border-white/20 pl-6 sm:pl-10" : ""
                  }`}
              >
                <span className="material-symbols-outlined text-brand-yellow text-[28px] sm:text-[32px]">
                  {badge.icon}
                </span>
                <span className="text-xs sm:text-[13px] font-bold tracking-wider uppercase text-white leading-tight">
                  {badge.line1}
                  <br />
                  {badge.line2}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide index rail with clean plain semi-circle background */}
      <div className="absolute right-6 lg:right-0 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-end">
        {/* Plain Semicircle Container */}
        <div className="relative flex items-center justify-end pr-5 py-6 pl-10 rounded-l-full bg-brand-dark-card/85 backdrop-blur-md border-y border-l border-white/10 shadow-2xl shadow-black/70">
          <div className="flex flex-col items-end gap-3.5">
            {SLIDES.map((s, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentSlideIndex(idx)}
                  className="group flex items-center gap-2.5 cursor-pointer py-0.5 transition-all duration-200"
                  aria-label={`Go to slide ${s.id}`}
                >
                  {/* Dash before the number */}
                  <span
                    className={`h-[2px] rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-5 bg-brand-yellow shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                        : "w-2.5 bg-white/30 group-hover:w-3.5 group-hover:bg-white/60"
                    }`}
                  />
                  {/* Slide number */}
                  <span
                    className={`font-display text-base tracking-wider transition-all duration-300 ${
                      isActive
                        ? "font-bold text-brand-yellow scale-110 drop-shadow-[0_0_10px_rgba(245,158,11,0.7)]"
                        : "font-medium text-gray-400 group-hover:text-white"
                    }`}
                  >
                    {s.id}
                  </span>
                </button>
              );
            })}

            {/* Divider line before arrow */}
            <div className="w-7 h-px bg-white/15 my-0.5" />

            {/* Next Slide Arrow Button inside the semi circle */}
            <button
              type="button"
              onClick={handleNextSlide}
              className="group flex items-center justify-center text-brand-yellow hover:text-white active:text-brand-yellow transition-all cursor-pointer p-1"
              aria-label="Next slide"
            >
              <svg
                className="w-5 h-5 transition-transform duration-150 ease-out active:translate-x-1.5 group-active:translate-x-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Angled yellow strapline anchored to the bottom-right corner */}
      <div
        className="absolute bottom-0 right-0 z-20 hidden lg:block bg-brand-yellow text-brand-ink py-4 pl-14 pr-8"
        style={{ clipPath: "polygon(44px 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      >
        <p className="text-sm sm:text-[15px] font-extrabold uppercase tracking-tight leading-[1.15]">
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
