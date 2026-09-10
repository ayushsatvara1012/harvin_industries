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

export function Hero() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slide = SLIDES[currentSlideIndex];

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden bg-[#121417]">
      {/* Background 4K Ultra HD Industrial Machine Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/mockup/hero-plant-4k.webp"
          alt="Harvin Industries High-Performance Brick and Block Manufacturing Plant"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] lg:object-center brightness-90"
        />
        {/* Dark readability overlays tailored to contrast text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#121417] via-[#121417]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121417] via-transparent to-[#121417]/40" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline, Description & CTAs */}
          <div className="lg:col-span-8 max-w-2xl">
            {/* Top Eyebrow Tag */}
            <p className="text-xs sm:text-[13px] font-bold tracking-[0.25em] uppercase text-gray-300">
              {slide.tagline}
            </p>

            {/* Main Headline */}
            <h1 className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08]">
              {slide.title1} <br />
              <span className="text-amber-400 drop-shadow-[0_2px_12px_rgba(245,158,11,0.35)]">
                {slide.title2}
              </span>
            </h1>

            {/* Subhead Description */}
            <p className="mt-5 max-w-xl text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
              {slide.description}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-600 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-all duration-200 shadow-lg hover:shadow-amber-500/20"
              >
                <span>Explore Our Machines</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/60 hover:border-amber-400 bg-black/30 backdrop-blur-sm px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:text-amber-400 transition-all duration-200"
              >
                Request A Quote
              </Link>
            </div>

            {/* Bottom 3 Feature Badges */}
            <div className="mt-14 pt-8 border-t border-white/15 flex flex-wrap items-center gap-8 sm:gap-12">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-500/10 text-amber-400">
                  <span className="material-symbols-outlined text-xl">bolt</span>
                </div>
                <span className="text-xs font-bold tracking-wider uppercase text-white">
                  High Efficiency
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-500/10 text-amber-400">
                  <span className="material-symbols-outlined text-xl">verified</span>
                </div>
                <span className="text-xs font-bold tracking-wider uppercase text-white">
                  Reliable Performance
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-500/10 text-amber-400">
                  <span className="material-symbols-outlined text-xl">trending_up</span>
                </div>
                <span className="text-xs font-bold tracking-wider uppercase text-white">
                  Built For Long Term
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Carousel Slide Numbers */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-end justify-center pr-4">
            <div className="flex flex-col items-center gap-3 text-right">
              {SLIDES.map((s, idx) => {
                const isActive = idx === currentSlideIndex;
                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className="flex items-center gap-2 group cursor-pointer transition-all"
                  >
                    {isActive && <div className="w-5 h-[2px] bg-amber-400" />}
                    <span
                      className={`text-sm font-bold tracking-wider transition-colors ${
                        isActive
                          ? "text-amber-400 font-extrabold"
                          : "text-gray-500 group-hover:text-gray-300"
                      }`}
                    >
                      {s.id}
                    </span>
                  </button>
                );
              })}

              {/* Next Slide Arrow Button */}
              <button
                type="button"
                onClick={handleNextSlide}
                className="mt-3 flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/50 bg-black/40 text-amber-400 hover:bg-amber-400 hover:text-black transition-colors"
                aria-label="Next slide"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Right Angled Banner: "ENGINEERING A STRONGER TOMORROW" */}
      <div
        className="absolute bottom-0 right-0 z-20 hidden md:block bg-amber-400 text-black py-4 px-10 font-black tracking-tight uppercase shadow-2xl"
        style={{
          clipPath: "polygon(36px 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      >
        <div className="text-right leading-tight pl-6">
          <p className="text-xs sm:text-sm font-extrabold tracking-wider">ENGINEERING</p>
          <p className="text-sm sm:text-base font-black tracking-tight">A STRONGER</p>
          <p className="text-base sm:text-lg font-black tracking-tight text-gray-950">TOMORROW</p>
        </div>
      </div>
    </section>
  );
}
