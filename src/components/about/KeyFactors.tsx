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

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {KEY_FACTORS.map((factor) => (
            <div
              key={factor.title}
              className="group relative flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-white/[0.07] hover:border-brand-yellow/50 hover:shadow-2xl hover:shadow-black/70 cursor-default transform-gpu"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-sm border border-brand-yellow/30 text-brand-yellow transition-all duration-300 group-hover:bg-brand-yellow group-hover:border-brand-yellow group-hover:text-brand-ink group-hover:shadow-lg group-hover:shadow-brand-yellow/25">
                <Icon name={factor.icon} className="text-[22px] transition-transform duration-300 group-hover:-translate-y-0.5" />
              </span>

              <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-brand-yellow">
                {factor.title}
              </h3>
              <p className="text-sm sm:text-[15px] leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-200">
                {factor.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
