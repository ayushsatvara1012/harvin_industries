import { Icon, SectionHeader } from "@/components/ui";
import { MISSION, VISION } from "@/data/company";

export function VisionMission() {
  return (
    <section id="vision" className="scroll-mt-20 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Vision — statement in an interactive statement card */}
        <div className="group relative rounded-2xl border border-brand-border bg-gradient-to-br from-white via-white to-brand-surface-alt/60 p-6 sm:p-10 shadow-xs transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-ink/10 hover:border-brand-yellow/60 cursor-default transform-gpu">
          <div className="border-l-4 border-brand-yellow pl-6 sm:pl-8">
            <SectionHeader eyebrow="Our Vision" size="md" tight>
              Where We&apos;re <span className="text-brand-accent-text">Headed</span>
            </SectionHeader>
            <blockquote className="mt-5 max-w-4xl font-display text-2xl sm:text-3xl lg:text-[34px] leading-[1.25] tracking-tight text-brand-ink">
              &ldquo;{VISION}&rdquo;
            </blockquote>
          </div>
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
