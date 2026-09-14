import { SectionHeader } from "@/components/ui";
import { PRESS_COMMON_STANDARDS } from "@/data/products";

/* The three figures that are identical on every Harvin press. Stated once,
   here, so the HI-1500 / HI-2000 / HI-3000 pages don't repeat each other —
   their own spec tables only explain the rows that actually differ. */
export function PressStandards({ modelName }: { modelName: string }) {
  return (
    <section className="relative bg-brand-ink text-white overflow-hidden py-16 lg:py-20">
      {/* 1. Topographic & Hydraulic Pressure Contour Curves */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Soft atmospheric pressure glow in the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[340px] bg-brand-yellow/[0.04] blur-[120px] rounded-full pointer-events-none" />

        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Luminous amber gradient for the main compression contour wave */}
            <linearGradient id="pressureGoldWave" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
              <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="55%" stopColor="#fbbf24" stopOpacity="0.75" />
              <stop offset="85%" stopColor="#f59e0b" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>

            {/* Subtle white/silver gradient for background strata lines */}
            <linearGradient id="pressureStrataLight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.14" />
              <stop offset="70%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Faint tertiary strata */}
            <linearGradient id="pressureStrataFaint" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Flowing Organic Hydraulic Compression Wave Strata */}
          {/* Contour 1 - Top subtle curve */}
          <path
            d="M -100,90 C 240,40 520,160 880,100 C 1180,50 1380,110 1550,80"
            stroke="url(#pressureStrataFaint)"
            strokeWidth="1.2"
          />

          {/* Contour 2 - Upper wave */}
          <path
            d="M -80,170 C 260,110 560,240 920,180 C 1220,130 1400,210 1560,170"
            stroke="url(#pressureStrataLight)"
            strokeWidth="1.2"
          />

          {/* Contour 3 - Dynamic dashed pressure wave */}
          <path
            d="M -60,240 C 280,180 600,310 960,250 C 1240,200 1420,280 1580,240"
            stroke="url(#pressureStrataFaint)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />

          {/* Contour 4 - Focal Hydraulic Pressure Peak Wave (Luminous Amber) */}
          <path
            d="M -50,320 C 300,240 640,390 1000,310 C 1260,250 1440,340 1600,300"
            stroke="url(#pressureGoldWave)"
            strokeWidth="1.6"
          />

          {/* Contour 5 - Lower harmonic wave */}
          <path
            d="M -40,390 C 320,320 680,450 1040,380 C 1280,320 1460,410 1620,370"
            stroke="url(#pressureStrataLight)"
            strokeWidth="1.2"
          />

          {/* Contour 6 - Deep bottom wave */}
          <path
            d="M -20,470 C 340,410 720,530 1080,460 C 1320,400 1480,480 1640,440"
            stroke="url(#pressureStrataFaint)"
            strokeWidth="1.2"
          />

          {/* Technical pressure isobar markers (discrete altitude/tonnage callouts) */}
          <g className="font-mono text-[9px] fill-white/20 select-none">
            <text x="140" y="155">ISO-COMPACTION // 50 MT</text>
            <text x="1160" y="325">FORCE EQUALIZATION // 60 KN</text>
          </g>
        </svg>

        {/* Top and bottom subtle gradient fades for seamless blending */}
        <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-brand-ink to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-brand-ink to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionHeader eyebrow="Common To Every Harvin Press" tone="dark" size="md" tight>
            Same Quality, <span className="text-brand-yellow">Whichever Model</span>
          </SectionHeader>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-400">
            Pressing force, compaction and cycle speed do not change across the range. A
            smaller machine gives you fewer bricks per stroke — never a weaker brick and
            never a slower one. These figures are as true of the {modelName} as of the
            flagship.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {PRESS_COMMON_STANDARDS.map((standard, idx) => (
            <div
              key={standard.label}
              className="relative flex flex-col justify-between rounded-xl border border-white/10 bg-brand-dark-card/70 backdrop-blur-sm p-6 sm:p-7"
            >
              {/* Subtle technical crosshair ticks inside card */}
              <div className="absolute top-2.5 right-3 font-mono text-[9px] text-white/20 pointer-events-none select-none">
                +
              </div>
              <div className="absolute bottom-2.5 left-3 font-mono text-[9px] text-white/20 pointer-events-none select-none">
                +
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                    {standard.label}
                  </p>
                  <span className="font-mono text-[11px] font-bold text-white/20">
                    0{idx + 1}
                  </span>
                </div>

                <p className="mt-3 font-stat text-3xl sm:text-4xl font-bold leading-none tracking-tight text-brand-yellow-light drop-shadow-sm">
                  {standard.value}
                </p>
              </div>

              <p className="mt-4 pt-3 border-t border-white/10 text-xs sm:text-sm leading-relaxed text-gray-400">
                {standard.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
