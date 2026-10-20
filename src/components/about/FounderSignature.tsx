"use client";

import { useEffect, useRef, useState } from "react";

export function FounderSignature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Trigger when signature reaches 20% from the bottom of the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDrawn(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -20% 0px",
        threshold: 0,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleReplay = () => {
    setIsDrawn(false);
    setTimeout(() => setIsDrawn(true), 60);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleReplay}
      title="Click to replay signature animation"
      className="group/sig relative flex flex-col cursor-pointer sm:items-end select-none"
    >
      <div className="relative text-brand-ink transition-colors duration-300 group-hover/sig:text-brand-accent">
        {/* Exact cursive signature rendered in Qwigley */}
        <span
          className="block font-['Qwigley',cursive] text-5xl sm:text-6xl tracking-wide leading-none transition-all duration-1000 ease-out py-1"
          style={{
            clipPath: isDrawn ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
            transition: "clip-path 1.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          DSathawara
        </span>

        {/* Animated pen flourish underline */}
        <svg
          viewBox="0 0 220 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-48 sm:w-56 -mt-1 overflow-visible"
        >
          <path
            d="M 6 10 C 60 7, 130 5, 205 3 C 215 2.5, 222 2, 218 6 C 212 9, 200 6, 210 3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{
              strokeDasharray: 250,
              strokeDashoffset: isDrawn ? 0 : 250,
              transition: "stroke-dashoffset 0.6s ease-out 1.1s",
            }}
          />
        </svg>
      </div>

      <span className="font-display text-xl font-semibold tracking-tight text-brand-ink">
        Dhaval Sathwara
      </span>
    </div>
  );
}
