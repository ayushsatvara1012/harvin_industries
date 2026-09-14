import { Icon, SectionHeader } from "@/components/ui";
import { ADDRESS_LINES, MAP_EMBED_SRC, MAP_IS_MOCK } from "@/data/contact";

const DIRECTIONS_HREF =
  "https://www.google.com/maps/dir/?api=1&destination=NK+Industrial+Park+Bakrol+Bujrang+Ahmedabad+382430";

export function ContactMap() {
  return (
    <section id="map" className="scroll-mt-20 bg-brand-surface-alt py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <SectionHeader eyebrow="Find Us" size="md" tight>
              Visit the <span className="text-brand-accent-text">Works</span>
            </SectionHeader>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-brand-text-secondary">
              {ADDRESS_LINES.join(", ")}. Machines are assembled and tested here before
              dispatch — you are welcome to see one running before you commit.
            </p>
            {MAP_IS_MOCK && (
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-brand-border bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-text-secondary">
                <Icon name="info" className="text-sm text-brand-accent-text" />
                Pin approximate — exact location to be confirmed
              </p>
            )}
          </div>

          <a
            href={DIRECTIONS_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-brand-border bg-white px-6 py-3.5 font-display text-[17px] font-semibold tracking-wider text-brand-text shadow-sm transition-all hover:border-brand-yellow hover:text-brand-accent"
          >
            <Icon name="directions" className="text-base" />
            <span>Get Directions</span>
          </a>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-brand-border bg-white shadow-sm">
          <iframe
            src={MAP_EMBED_SRC}
            title="Harvin Industries location on Google Maps"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-[320px] w-full border-0 sm:h-[420px] lg:h-[480px]"
          />
        </div>
      </div>
    </section>
  );
}
