"use client";

import { useState } from "react";
import { Button, Icon, LazyVideo } from "@/components/ui";

const TABS = [
  {
    id: "fabrication",
    label: "Precision Fabrication",
    tag: "SPEC // 01",
    icon: "precision_manufacturing",
    headline: "Heavy-Duty Structural Integrity & CNC Machining",
    desc: "Every machine frame is fabricated from heavy-gauge prime steel plates, stress-relieved and CNC-machined to withstand extreme tonnage without deflection, ensuring 24/7 continuous operation.",
    metrics: [
      { value: "0.5mm", label: "Machining Tolerance" },
      { value: "24/7", label: "Continuous Duty Cycle" },
      { value: "100%", label: "In-House Plate Milling" },
    ],
  },
  {
    id: "hydraulics",
    label: "High-Compaction Hydraulics",
    tag: "SPEC // 02",
    icon: "bolt",
    headline: "Multi-Stage Pressure Power Packs",
    desc: "Multi-stage proportional hydraulic circuits generate ultra-high compaction forces, resulting in razor-sharp brick edges, maximum density, and near-zero breakage during curing and handling.",
    metrics: [
      { value: "150+ Ton", label: "Max Compaction Force" },
      { value: "< 1%", label: "Handling Breakage Rate" },
      { value: "High-Speed", label: "Hydraulic Cycle Time" },
    ],
  },
  {
    id: "commissioning",
    label: "Turnkey Commissioning",
    tag: "SPEC // 03",
    icon: "support_agent",
    headline: "Pan-India Installation & Operator Training",
    desc: "From initial foundation civil drawings to on-site mechanical erection, electrical cabling, PLC setup, and operator training, our factory engineers ensure seamless plant startup.",
    metrics: [
      { value: "Direct", label: "On-Site Plant Setup" },
      { value: "Full", label: "Operator Training" },
      { value: "Pan-India", label: "Parts & Service Network" },
    ],
  },
];

export function AboutSnippet() {
  const [activeTab, setActiveTab] = useState(0);
  const currentTab = TABS[activeTab];

  return (
    <section
      id="about"
      className="relative scroll-mt-20 border-b border-brand-border/60 bg-white py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. Header Narrative Row - Full max-w-7xl Container */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
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

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] tracking-tight text-brand-ink leading-[1.08]">
              The Evolution of Brickmaking: <br className="hidden sm:inline" />
              <span className="text-brand-accent-text">
                From Ancient Craft to Robotic Precision
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-[17px] text-brand-text-secondary leading-relaxed max-w-2xl">
              Based in Ahmedabad, Gujarat,{" "}
              <strong className="text-brand-ink font-semibold">Harvin Industries</strong> pioneers
              the transformation of construction manufacturing across India — replacing traditional
              manual kilns with high-compaction automated plants built for 24/7 industrial
              performance.
            </p>
          </div>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center gap-3.5 shrink-0 self-start lg:self-end">
            <Button href="/about">More About Us</Button>
            <Button href="/contact" variant="outline-light">
              Consult Our Engineers
            </Button>
          </div>
        </div>

        {/* 2. Video Stage: Stays inside view width with padding, native 16:9, zero text */}
        <div className="mt-10 sm:mt-12 relative w-full aspect-video overflow-hidden rounded-2xl sm:rounded-3xl border border-brand-border bg-black shadow-2xl">
          <LazyVideo
            src="/Harvin_animation_timeline.mp4"
            poster="/images/mockup/factory-hq-4k.webp"
            posterAlt="Harvin Industries manufacturing evolution timeline: Ancient hand mould to modern hydraulic automation"
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="absolute inset-0 h-full w-full"
          />
        </div>

        {/* 3. Interactive Tabbed Engineering Console - Full max-w-7xl Container */}
        <div className="mt-8 sm:mt-10 rounded-2xl border border-brand-border bg-brand-surface-alt/40 p-5 sm:p-7 lg:p-8 shadow-xs">
          {/* Tab Navigation Pill Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-brand-border/60 pb-5">
            {TABS.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`cursor-pointer group flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-brand-ink text-white shadow-md shadow-brand-ink/20"
                      : "bg-white border border-brand-border text-brand-text-secondary hover:border-brand-yellow hover:text-brand-ink"
                  }`}
                >
                  <Icon
                    name={tab.icon}
                    className={`text-[18px] transition-colors ${
                      isActive
                        ? "text-brand-yellow"
                        : "text-brand-text-secondary/70 group-hover:text-brand-yellow"
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Content Panel with Metrics */}
          <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-brand-accent-text">
                {`${currentTab.tag} // ENGINEERING SPEC`}
              </span>
              <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-brand-ink">
                {currentTab.headline}
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-brand-text-secondary leading-relaxed">
                {currentTab.desc}
              </p>
            </div>

            {/* 3 Metric Badges */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-2.5 sm:gap-3">
              {currentTab.metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col justify-center rounded-xl border border-brand-border bg-white p-3 sm:p-4 text-center shadow-xs"
                >
                  <span className="font-stat text-lg sm:text-xl font-bold text-brand-ink">
                    {m.value}
                  </span>
                  <span className="mt-1 text-[10.5px] sm:text-[11px] font-medium text-brand-text-secondary leading-tight">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
