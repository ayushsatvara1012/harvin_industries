import { Logo } from "@/components/layout";
import { Icon, SectionHeader } from "@/components/ui";
import { FOUNDER } from "@/data/company";
import { FounderSignature } from "./FounderSignature";

export function FounderMessage() {
  return (
    <section id="founder" className="scroll-mt-20 bg-brand-surface-alt py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="From the Founder" tight>
              A Word <br />
              <span className="text-brand-accent-text">Before You Begin</span>
            </SectionHeader>

            <div className="mt-8 flex items-center gap-4 border-t border-brand-border pt-6">
              <Logo className="h-10 w-auto shrink-0 text-brand-ink" />
              <div>
                <p className="font-display text-lg font-bold tracking-tight text-brand-ink">
                  {FOUNDER.name}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-brand-accent">Harvin Industries</span>
                  <span className="text-brand-text-secondary">, Ahmedabad</span>
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            {/* Reading Spotlight Container */}
            <div className="group/reading space-y-6">
              {FOUNDER.paragraphs.map((paragraph, pIdx) => (
                <div
                  key={pIdx}
                  className="relative pl-4 sm:pl-5 border-l-2 border-transparent transition-all duration-300 ease-out hover:border-brand-yellow/80 group-hover/reading:opacity-60 hover:!opacity-100"
                >
                  <p className="text-base lg:text-[17px] leading-relaxed text-brand-text-secondary">
                    {paragraph}
                  </p>
                </div>
              ))}

              <div className="group border-l-4 border-brand-yellow pl-5 transition-all duration-300 hover:border-brand-accent-text group-hover/reading:opacity-60 hover:!opacity-100">
                <p className="font-display text-lg sm:text-xl leading-[1.45] tracking-tight text-brand-ink">
                  {FOUNDER.closing}
                </p>
              </div>

              {/* Founder Sign-off: Digital Signature & Industrial Seal (Positions Interchanged) */}
              <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-brand-border/80 pt-6">
                {/* Industrial Quality Guarantee Seal (Now Left) */}
                <div className="group/seal relative flex items-center gap-3.5 cursor-default rounded-xl p-2 transition-all duration-300 hover:-translate-y-1">
                  <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2 border-dashed border-brand-yellow/80 bg-brand-yellow/10 text-brand-accent-text transition-all duration-500 group-hover/seal:rotate-45 group-hover/seal:border-brand-accent group-hover/seal:bg-brand-yellow group-hover/seal:text-brand-ink group-hover/seal:shadow-lg group-hover/seal:shadow-brand-yellow/30">
                    <Icon name="verified" className="text-2xl sm:text-3xl transition-transform duration-500 group-hover/seal:-rotate-45" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-accent-text">
                      VERIFIED GUARANTEE
                    </span>
                    <span className="font-display text-sm font-bold tracking-tight text-brand-ink">
                      100% Quality &amp; Precision
                    </span>
                    <span className="text-xs text-brand-text-secondary">
                      Direct Founder Accountability
                    </span>
                  </div>
                </div>

                {/* Handwritten Signature (Now Right) with 20% scroll-triggered drawing animation */}
                <FounderSignature />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
