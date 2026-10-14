import { Eyebrow, Icon, IsometricLines } from "@/components/ui";
import { LEGAL_UPDATED, LEGAL_UPDATED_ISO } from "@/data/legal";

export type LegalSectionLink = { id: string; title: string };

function SectionLinks({ sections }: { sections: LegalSectionLink[] }) {
  return (
    <ol className="space-y-1.5 text-sm">
      {sections.map((section, index) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-brand-text-secondary transition-colors hover:border-brand-yellow hover:text-brand-ink"
          >
            <span className="tabular-nums text-brand-text-secondary/70">{index + 1}.</span> {section.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSectionLink[];
  children: React.ReactNode;
}) {
  return (
    <main id="main" className="min-h-screen bg-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-brand-ink">
        <IsometricLines className="absolute inset-0 h-full w-full opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/90 to-brand-ink/40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <Eyebrow tone="accent">{eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">{intro}</p>
          <p className="mt-5 text-sm text-gray-400">
            Last updated <time dateTime={LEGAL_UPDATED_ISO}>{LEGAL_UPDATED}</time>
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16 lg:px-8 lg:py-16">
        <details className="group rounded-lg border border-brand-border lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-ink [&::-webkit-details-marker]:hidden">
            On this page
            <Icon name="expand_more" className="text-xl transition-transform group-open:rotate-180" />
          </summary>
          <nav aria-label="On this page" className="border-t border-brand-border px-4 py-3">
            <SectionLinks sections={sections} />
          </nav>
        </details>
        <nav aria-label="On this page" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-text-secondary">On this page</p>
          <div className="mt-3 border-l border-brand-border">
            <SectionLinks sections={sections} />
          </div>
        </nav>

        <div className="max-w-3xl space-y-12">{children}</div>
      </div>
    </main>
  );
}

export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <h2 id={`${id}-title`} className="font-display text-2xl tracking-tight text-brand-ink sm:text-3xl">
        <span className="mr-2 text-brand-accent-text">{number}.</span>
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-brand-text">{children}</div>
    </section>
  );
}

export function LegalList({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc space-y-2 pl-6 marker:text-brand-yellow">{children}</ul>;
}
