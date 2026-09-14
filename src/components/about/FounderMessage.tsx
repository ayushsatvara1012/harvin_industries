import { Logo } from "@/components/layout";
import { SectionHeader } from "@/components/ui";
import { FOUNDER } from "@/data/company";

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
                <p className="font-display text-lg tracking-tight text-brand-ink">
                  {FOUNDER.name}
                </p>
                <p className="text-sm text-brand-text-secondary">{FOUNDER.role}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-5">
              {FOUNDER.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base lg:text-[17px] leading-relaxed text-brand-text-secondary"
                >
                  {paragraph}
                </p>
              ))}

              <p className="border-l-4 border-brand-yellow pl-5 font-display text-lg sm:text-xl leading-[1.45] tracking-tight text-brand-ink">
                {FOUNDER.closing}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
