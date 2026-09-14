import { Eyebrow, IsometricLines } from "@/components/ui";
import { COMPANY_ABOUT } from "@/data/company";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-brand-ink">
      <IsometricLines className="absolute inset-0 h-full w-full opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/75 via-45% to-brand-ink/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-brand-ink/30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Eyebrow tone="accent">About Harvin Industries</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.05]">
          Precision Engineering,{" "}
          <span className="text-brand-yellow">Built in Ahmedabad</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base sm:text-lg text-gray-300 leading-relaxed">
          {COMPANY_ABOUT}
        </p>

        <div className="mt-8 inline-flex items-center gap-3 border-l-2 border-brand-yellow bg-white/[0.04] px-4 py-2.5 backdrop-blur-sm">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-yellow">
            COMPLIANCE //
          </span>
          <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-white">
            ISO 9001:2015 Certified Manufacturing
          </span>
        </div>
      </div>
    </section>
  );
}
