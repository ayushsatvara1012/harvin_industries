import { Icon, SectionHeader } from "@/components/ui";
import { MISSION, VISION } from "@/data/company";

export function VisionMission() {
  return (
    <section id="vision" className="scroll-mt-20 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Vision — borderless pull quote with interactive 3D letter lift on hover */}
        <div className="group relative border-l-4 border-brand-yellow pl-6 sm:pl-10 transition-colors duration-300 hover:border-brand-accent-text">
          <SectionHeader eyebrow="Our Vision" size="md" tight>
            Where We&apos;re <span className="text-brand-accent-text">Headed</span>
          </SectionHeader>
          <blockquote className="mt-5 max-w-4xl font-display text-2xl sm:text-3xl lg:text-[34px] leading-[1.3] tracking-tight text-brand-ink transition-transform duration-300 ease-out origin-left group-hover:scale-[1.01] group-hover:[text-shadow:0_1px_2px_rgba(0,0,0,0.08)]">
            <span className="sr-only">&ldquo;{VISION}&rdquo;</span>
            <span aria-hidden="true">
              <span className="inline-block transform-gpu transition-all duration-200 ease-out cursor-default hover:-translate-y-2 hover:scale-125 hover:text-brand-accent-text hover:[text-shadow:0_4px_12px_rgba(209,140,24,0.45),0_2px_4px_rgba(0,0,0,0.25)]">
                &ldquo;
              </span>
              {VISION.split(" ").map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.26em]">
                  {word.split("").map((char, cIdx) => (
                    <span
                      key={cIdx}
                      className="inline-block transform-gpu transition-all duration-200 ease-out cursor-default hover:-translate-y-2 hover:scale-125 hover:text-brand-accent-text hover:[text-shadow:0_4px_12px_rgba(209,140,24,0.45),0_2px_4px_rgba(0,0,0,0.25)]"
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
              <span className="inline-block transform-gpu transition-all duration-200 ease-out cursor-default hover:-translate-y-2 hover:scale-125 hover:text-brand-accent-text hover:[text-shadow:0_4px_12px_rgba(209,140,24,0.45),0_2px_4px_rgba(0,0,0,0.25)]">
                &rdquo;
              </span>
            </span>
          </blockquote>
        </div>

        {/* Mission — four pillars */}
        <div className="mt-16 lg:mt-20">
          <SectionHeader eyebrow="Our Mission">
            Four Commitments We{" "}
            <span className="text-brand-accent-text">Build Around</span>
          </SectionHeader>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {MISSION.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="group relative flex flex-col gap-4 rounded-xl border border-brand-border bg-white p-6 sm:p-8 shadow-xs transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-ink/10 hover:border-brand-accent/40 cursor-default transform-gpu"
              >
                <span
                  aria-hidden="true"
                  data-num={String(idx + 1).padStart(2, "0")}
                  className="font-stat pointer-events-none absolute right-5 top-4 text-[64px] leading-none text-brand-border/60 before:content-[attr(data-num)] transition-colors duration-300 group-hover:text-brand-yellow/35"
                />

                <span className="relative flex h-12 w-12 items-center justify-center rounded-sm border border-brand-yellow/40 bg-brand-yellow/10 text-brand-accent-text transition-all duration-300 group-hover:bg-brand-yellow group-hover:border-brand-yellow group-hover:text-brand-ink group-hover:shadow-md group-hover:shadow-brand-yellow/30">
                  <Icon name={pillar.icon} className="text-[24px] transition-transform duration-300 group-hover:-translate-y-0.5" />
                </span>

                <h3 className="relative font-display text-xl tracking-tight text-brand-ink transition-colors duration-300 group-hover:text-brand-accent-text">
                  {pillar.title}
                </h3>
                <p className="relative max-w-md text-sm sm:text-[15px] leading-relaxed text-brand-text-secondary">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
