"use client";

import { useState } from "react";

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
  const [scrollIndex, setScrollIndex] = useState(0);

  const handlePrev = () => {
    setScrollIndex((prev) => (prev > 0 ? prev - 1 : CLIENTS.length - 1));
  };

  const handleNext = () => {
    setScrollIndex((prev) => (prev < CLIENTS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-gray-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-3.5 bg-amber-500 inline-block" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600">
                OUR VALUED CUSTOMERS
              </span>
            </div>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-gray-950">
              Trusted Across <span className="text-amber-500">Borders</span>
            </h2>
          </div>
        </div>

        {/* Carousel Container with Left/Right Arrows */}
        <div className="relative mt-12 flex items-center gap-3">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            className="hidden md:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:border-amber-500 hover:text-amber-600 shadow-xs transition-colors cursor-pointer"
            aria-label="Previous client logos"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Logos Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 w-full">
            {CLIENTS.map((client) => (
              <div
                key={client.name}
                className="group flex h-24 items-center justify-center rounded-xl bg-white border border-gray-200/90 p-4 shadow-xs hover:border-amber-400 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                title={client.fullName}
              >
                <div className="transition-transform duration-300 group-hover:scale-105 filter grayscale group-hover:grayscale-0 opacity-85 group-hover:opacity-100">
                  {client.renderLogo()}
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={handleNext}
            className="hidden md:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:border-amber-500 hover:text-amber-600 shadow-xs transition-colors cursor-pointer"
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
