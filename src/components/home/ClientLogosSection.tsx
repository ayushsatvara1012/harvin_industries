"use client";

import { useRef } from "react";
import { Eyebrow } from "@/components/ui";

const CLIENTS = [
  {
    name: "L&T",
    fullName: "Larsen & Toubro",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        {/* L&T distinctive circular monogram logo */}
        <div className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-[#003B71] text-[#003B71] font-black text-base tracking-tighter">
          L&T
        </div>
      </div>
    ),
  },
  {
    name: "adani",
    fullName: "Adani Group",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="text-2xl font-bold tracking-tight text-[#1A488E] lowercase">
          adani
        </span>
      </div>
    ),
  },
  {
    name: "TATA",
    fullName: "Tata Group",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="text-2xl font-black tracking-[0.2em] text-[#005A9C] uppercase font-sans">
          TATA
        </span>
      </div>
    ),
  },
  {
    name: "UltraTech Cement",
    fullName: "UltraTech Cement",
    renderLogo: () => (
      <div className="flex flex-col items-center justify-center leading-none">
        <span className="text-lg font-black tracking-tighter text-[#E41E26] uppercase">
          UltraTech
        </span>
        <span className="text-[9px] font-extrabold tracking-[0.25em] text-[#1A1A1A] uppercase mt-0.5">
          CEMENT
        </span>
      </div>
    ),
  },
  {
    name: "Shree Cement",
    fullName: "Shree Cement",
    renderLogo: () => (
      <div className="flex items-center justify-center gap-1.5">
        <div className="w-5 h-7 bg-[#E31B23] flex items-center justify-center text-white font-bold text-xs rounded-[2px]">
          S
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-black text-[#1E3A8A]">Shree</span>
          <span className="text-[8px] font-bold text-gray-500 uppercase tracking-wider">Cement</span>
        </div>
      </div>
    ),
  },
  {
    name: "Dalmia Bharat",
    fullName: "Dalmia Bharat Cement",
    renderLogo: () => (
      <div className="flex flex-col items-center justify-center leading-none">
        <span className="text-base font-black tracking-tight text-[#003366]">
          Dalmia
        </span>
        <span className="text-[8px] font-bold tracking-[0.15em] text-[#C41230] uppercase">
          Bharat Cement
        </span>
      </div>
    ),
  },
  {
    name: "Ambuja Cement",
    fullName: "Ambuja Cement",
    renderLogo: () => (
      <div className="flex flex-col items-center justify-center leading-none">
        <span className="text-lg font-black tracking-tight text-[#0072CE]">
          Ambuja
        </span>
        <span className="text-[8px] font-extrabold tracking-[0.2em] text-gray-800 uppercase mt-0.5">
          Cement
        </span>
      </div>
    ),
  },
];

export function ClientLogosSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : track.clientWidth / 2;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Eyebrow>Our Valued Customers</Eyebrow>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight text-brand-text">
          Trusted Across <span className="text-brand-accent-text">Borders</span>
        </h2>

        <div className="relative mt-10">
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar md:px-8"
          >
            {CLIENTS.map((client) => (
              <div
                key={client.name}
                className="flex h-24 w-[46%] sm:w-[30%] lg:w-[calc((100%-4rem)/5)] shrink-0 items-center justify-center border border-brand-border bg-white p-4 transition-colors hover:border-brand-yellow"
                title={client.fullName}
              >
                <div className="opacity-90 transition-opacity group-hover:opacity-100">
                  {client.renderLogo()}
                </div>
              </div>
            ))}
          </div>

          {/* Arrows straddle the ends of the rail, as in the design */}
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            className="absolute -left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-border bg-white text-brand-text transition-colors hover:border-brand-yellow hover:text-brand-accent md:flex cursor-pointer"
            aria-label="Previous client logos"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollByCard(1)}
            className="absolute -right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-border bg-white text-brand-text transition-colors hover:border-brand-yellow hover:text-brand-accent md:flex cursor-pointer"
            aria-label="Next client logos"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
