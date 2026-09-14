import { Icon, SectionHeader } from "@/components/ui";
import { MISSION, VISION } from "@/data/company";

export function VisionMission() {
  return (
    <section id="vision" className="scroll-mt-20 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Vision — one statement, given the weight of a pull quote */}
        <div className="relative border-l-4 border-brand-yellow pl-6 sm:pl-10">
          <SectionHeader eyebrow="Our Vision" size="md" tight>
            Where We&apos;re <span className="text-brand-accent-text">Headed</span>
          </SectionHeader>
          <blockquote className="mt-5 max-w-4xl font-display text-2xl sm:text-3xl lg:text-[34px] leading-[1.25] tracking-tight text-brand-ink">
            &ldquo;{VISION}&rdquo;
          </blockquote>
        </div>

        {/* Mission — four pillars */}
        <div className="mt-16 lg:mt-20">
          <SectionHeader eyebrow="Our Mission">
            Four Commitments We{" "}
            <span className="text-brand-accent-text">Build Around</span>
          </SectionHeader>

          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-brand-border bg-brand-border sm:grid-cols-2">
            {MISSION.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="relative flex flex-col gap-4 bg-white p-6 sm:p-8"
              >
                <span className="font-stat pointer-events-none absolute right-5 top-4 text-[64px] leading-none text-brand-border/70">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <span className="relative flex h-12 w-12 items-center justify-center rounded-sm border border-brand-yellow/40 bg-brand-yellow/10 text-brand-accent-text">
                  <Icon name={pillar.icon} className="text-[24px]" />
                </span>

                <h3 className="relative font-display text-xl tracking-tight text-brand-ink">
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
