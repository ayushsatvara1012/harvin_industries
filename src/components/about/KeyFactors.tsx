import { Icon, SectionHeader } from "@/components/ui";
import { KEY_FACTORS } from "@/data/company";

export function KeyFactors() {
  return (
    <section id="key-factors" className="scroll-mt-20 bg-brand-ink py-16 text-white lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionHeader eyebrow="Key Factors" tone="dark" tight>
            Why Harvin Industries{" "}
            <span className="text-brand-yellow">Stands Out</span>
          </SectionHeader>
        </div>

        <div className="mt-12 grid gap-3.5 sm:grid-cols-2">
          {KEY_FACTORS.map((factor) => (
            <div
              key={factor.title}
              className="flex flex-col gap-4 rounded-sm border border-white/10 bg-white/[0.03] p-6 sm:p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-sm border border-brand-yellow/30 text-brand-yellow">
                <Icon name={factor.icon} className="text-[22px]" />
              </span>

              <h3 className="font-display text-lg sm:text-xl tracking-tight text-white">
                {factor.title}
              </h3>
              <p className="text-sm sm:text-[15px] leading-relaxed text-gray-400">
                {factor.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
