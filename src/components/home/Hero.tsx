"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Button, CloudinaryImage, Icon } from "@/components/ui";
import { MEDIA } from "@/data/media";
import { cloudinaryUrl } from "@/lib/cloudinary";

const SLIDES = [
  {
    id: "01",
    tagline: "INDIAN ENGINEERING | GLOBAL POSSIBILITIES",
    title1: "Built for",
    title2: "Performance",
    description:
      "Advanced machinery for fly ash bricks, concrete blocks and modern construction materials.",
    type: "image" as const,
    src: MEDIA.heroBanner,
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
    src: MEDIA.automaticPlant,
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
    src: MEDIA.factoryHq,
    alt: "Harvin Industries Modern Manufacturing Facility",
  },
];

const BADGES = [
  { icon: "bolt", line1: "HIGH", line2: "EFFICIENCY" },
  { icon: "verified_user", line1: "RELIABLE", line2: "PERFORMANCE" },
  { icon: "trending_up", line1: "LONG-TERM", line2: "DURABILITY" },
];

const AUTOPLAY_INTERVAL_MS = 5500;
const SWIPE_THRESHOLD_PX = 50;

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function subscribeVisibility(callback: () => void) {
  if (typeof document === "undefined") return () => {};
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

function getVisibilitySnapshot() {
  return document.visibilityState === "visible";
}

function getVisibilityServerSnapshot() {
  return true;
}

export function Hero() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInView, setIsInView] = useState(true);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const isTabVisible = useSyncExternalStore(
    subscribeVisibility,
    getVisibilitySnapshot,
    getVisibilityServerSnapshot
  );

  const slide = SLIDES[currentSlideIndex];
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const handleSelectSlide = useCallback((index: number) => {
    setCurrentSlideIndex(index);
  }, []);

  // Pause autoplay and arrow keys when hero is scrolled out of view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(section);

    function handleKeyDown(event: KeyboardEvent) {
      if (!sectionRef.current) return;
      if (event.target instanceof HTMLElement && ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)) return;
      if (event.key === "ArrowRight") handleNextSlide();
      if (event.key === "ArrowLeft") handlePrevSlide();
      if (event.key === " " && event.target === sectionRef.current) {
        event.preventDefault();
        setIsPlaying((p) => !p);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNextSlide, handlePrevSlide]);

  // Autoplay timer effect
  const shouldAutoplay = isPlaying && isInView && isTabVisible && !prefersReducedMotion;

  useEffect(() => {
    if (!shouldAutoplay) return;

    const timer = setTimeout(() => {
      handleNextSlide();
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearTimeout(timer);
  }, [currentSlideIndex, shouldAutoplay, handleNextSlide]);

  // Preload secondary slides in idle time without blocking initial LCP
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Wait until critical rendering has stabilized (1.5s delay)
    const timer = setTimeout(() => {
      const nextSlide = SLIDES[(currentSlideIndex + 1) % SLIDES.length];
      const img = new window.Image();
      const screenWidth = Math.min(window.innerWidth || 1280, 1920);
      img.src = cloudinaryUrl(nextSlide.src, screenWidth);
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentSlideIndex]);

  function handleTouchStart(event: React.TouchEvent) {
    touchStartXRef.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (touchStartXRef.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
    if (deltaX < 0) handleNextSlide();
    else handlePrevSlide();
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100svh-5rem)] lg:min-h-[calc(100svh-5rem)] flex items-center overflow-hidden bg-brand-ink"
      aria-roledescription="carousel"
      aria-label="Hero Machine Showcase"
    >
      {/* Background Media Layers: Images with smooth, lightweight WebP/AVIF crossfade */}
      <div
        className="absolute inset-0 z-0 skeleton-media-dark"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {SLIDES.map((s, idx) => {
          const isCurrent = idx === currentSlideIndex;
          return (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isCurrent ? "opacity-100 z-1" : "opacity-0 pointer-events-none z-0"
              }`}
              aria-hidden={!isCurrent}
            >
              <CloudinaryImage
                publicId={s.src}
                alt={s.alt}
                fill
                priority={idx === 0}
                loading={idx === 0 ? "eager" : "lazy"}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          );
        })}

        {/* Cinematic gradient scrims so typography and controls remain sharp */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/80 via-45% to-transparent pointer-events-none z-2" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/85 via-transparent to-brand-ink/40 pointer-events-none z-2" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="max-w-2xl">
          {/* Synchronized Animated Headline & Copy */}
          <div key={slide.id} className="animate-hero-fade">
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
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/products" variant="outline-dark">
              Explore Our Machines
            </Button>

            <Button href="/contact">Request a Quote</Button>
          </div>

          {/* Mobile / Tablet Synchronized Slide Indicator & Controls */}
          <div className="mt-8 flex items-center gap-4 lg:hidden">
            <div className="flex items-center gap-3 rounded-full bg-brand-dark-card/90 px-4 py-2 border border-white/10 backdrop-blur-md shadow-lg">
              {/* Synchronized Slide Counter Number */}
              <div className="flex items-center gap-1 font-stat text-sm tracking-wider">
                <span className="font-bold text-brand-yellow">0{currentSlideIndex + 1}</span>
                <span className="text-white/40">/</span>
                <span className="text-white/60">0{SLIDES.length}</span>
              </div>

              <div className="h-4 w-px bg-white/20" />

              {/* Progress bars for each slide */}
              <div className="flex items-center gap-1.5">
                {SLIDES.map((s, idx) => {
                  const isActive = idx === currentSlideIndex;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSelectSlide(idx)}
                      className="group relative h-2 cursor-pointer py-0.5"
                      aria-label={`Go to slide ${s.id}`}
                    >
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 overflow-hidden ${
                          isActive ? "w-7 bg-white/20" : "w-2.5 bg-white/25 group-hover:bg-white/50"
                        }`}
                      >
                        {isActive && (
                          <div
                            key={`m-dash-${currentSlideIndex}-${shouldAutoplay}`}
                            className={`h-full bg-brand-yellow rounded-full ${
                              shouldAutoplay ? "origin-left animate-slide-progress" : "w-full"
                            }`}
                            style={{
                              animationDuration: `${AUTOPLAY_INTERVAL_MS}ms`,
                            }}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="h-4 w-px bg-white/20" />

              {/* Play / Pause Toggle Button */}
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                className="text-gray-300 hover:text-brand-yellow transition-colors p-1"
                aria-label={isPlaying ? "Pause carousel autoplay" : "Resume carousel autoplay"}
              >
                <Icon name={isPlaying ? "pause" : "play_arrow"} className="text-lg" />
              </button>

              {/* Prev & Next Chevrons */}
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  className="text-gray-300 hover:text-brand-yellow transition-colors p-1"
                  aria-label="Previous slide"
                >
                  <Icon name="chevron_left" className="text-lg" />
                </button>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  className="text-gray-300 hover:text-brand-yellow transition-colors p-1"
                  aria-label="Next slide"
                >
                  <Icon name="chevron_right" className="text-lg" />
                </button>
              </div>
            </div>
          </div>

          {/* Trust badges. Grid instead of a wrapping flex row so the divider,
              keyed to "not first", never lands on a row it didn't wrap into. */}
          <div className="mt-8 lg:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0">
            {BADGES.map((badge, idx) => (
              <div
                key={badge.line1}
                className={`flex items-center gap-3 sm:pr-6 lg:pr-10 ${
                  idx > 0
                    ? "border-t sm:border-t-0 sm:border-l border-white/20 pt-4 sm:pt-0 sm:pl-6 lg:pl-10"
                    : ""
                }`}
              >
                <Icon name={badge.icon} className="text-brand-yellow text-[28px] sm:text-[32px] shrink-0" />
                <span className="text-xs sm:text-[13px] font-bold tracking-wider uppercase text-white leading-tight whitespace-nowrap">
                  {badge.line1}
                  <br />
                  {badge.line2}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Slide index rail with clean plain semi-circle background */}
      <div className="absolute right-6 lg:right-0 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-end">
        {/* Plain Semicircle Container */}
        <div className="relative flex items-center justify-end pr-5 py-6 pl-10 rounded-l-full bg-brand-dark-card/85 backdrop-blur-md border-y border-l border-white/10 shadow-2xl shadow-black/70">
          <div className="flex flex-col items-end gap-3.5">
            {/* Play/Pause control for accessibility */}
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="text-gray-400 hover:text-brand-yellow transition-colors cursor-pointer p-0.5 mb-1"
              title={isPlaying ? "Pause autoplay (or spacebar)" : "Resume autoplay"}
              aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
            >
              <Icon name={isPlaying ? "pause" : "play_arrow"} className="text-base" />
            </button>

            {SLIDES.map((s, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectSlide(idx)}
                  className="group flex items-center gap-2.5 cursor-pointer py-0.5 transition-all duration-200"
                  aria-label={`Go to slide ${s.id}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {/* Dash before the number with animated progress synchronization */}
                  <div
                    className={`relative h-[2px] rounded-full overflow-hidden transition-all duration-300 ${
                      isActive
                        ? "w-7 bg-white/25 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                        : "w-2.5 bg-white/30 group-hover:w-3.5 group-hover:bg-white/60"
                    }`}
                  >
                    {isActive && (
                      <div
                        key={`dash-${currentSlideIndex}-${shouldAutoplay}`}
                        className={`absolute inset-0 bg-brand-yellow rounded-full ${
                          shouldAutoplay ? "origin-left animate-slide-progress" : "w-full"
                        }`}
                        style={{
                          animationDuration: `${AUTOPLAY_INTERVAL_MS}ms`,
                        }}
                      />
                    )}
                  </div>

                  {/* Synchronized Slide number */}
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
        className="absolute bottom-0 right-0 z-20 hidden lg:block bg-brand-yellow text-white py-4 pl-14 pr-8"
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
