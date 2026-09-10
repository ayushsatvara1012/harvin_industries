import Link from "next/link";
import Image from "next/image";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Raw Material\n& Fabrication",
    image: "/images/mockup/mfg-fabrication-4k.webp",
    alt: "Raw Material and Steel Fabrication",
  },
  {
    step: "02",
    title: "Machining",
    image: "/images/mockup/mfg-machining-4k.webp",
    alt: "Precision CNC Machining",
  },
  {
    step: "03",
    title: "Assembly",
    image: "/images/mockup/mfg-assembly-4k.webp",
    alt: "Heavy Industrial Machine Assembly",
  },
  {
    step: "04",
    title: "Testing &\nQuality Check",
    image: "/images/mockup/mfg-testing-4k.webp",
    alt: "Control System Testing and Quality Check",
  },
  {
    step: "05",
    title: "Final Dispatch",
    image: "/images/mockup/mfg-dispatch-4k.webp",
    alt: "Machine Loading and Final Dispatch",
  },
];

export function ManufacturingSection() {
  return (
    <section id="manufacturing" className="scroll-mt-20 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left rail: eyebrow, headline, copy, CTA */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="w-[3px] h-3.5 bg-brand-yellow inline-block" />
              <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] text-brand-text-secondary">
                Our Manufacturing
              </span>
            </div>

            <h2 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight text-brand-text leading-[1.05]">
              Precision <br />
              in <span className="text-brand-yellow">Every Part</span>
            </h2>

            <p className="mt-5 text-base lg:text-[17px] text-brand-text-secondary leading-relaxed">
              From design to dispatch, every machine is built in-house with strict quality control,
              advanced fabrication and skilled engineering teams.
            </p>

            <div className="mt-7">
              <Link
                href="/about#manufacturing"
                className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-brand-accent px-6 py-3 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-brand-ink transition-colors"
              >
                <span>See Our Manufacturing</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: the five process stages in a single row */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
            {PROCESS_STEPS.map((step) => (
              <div key={step.title} className="group flex flex-col">
                <div className="relative aspect-square w-full overflow-hidden bg-brand-ink">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(min-width: 1024px) 14vw, (min-width: 640px) 30vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between gap-2 pt-3 pb-1">
                  <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-tight text-brand-text leading-[1.35] whitespace-pre-line">
                    {step.title}
                  </h3>
                  <span className="self-end text-brand-yellow transition-transform group-hover:translate-x-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
