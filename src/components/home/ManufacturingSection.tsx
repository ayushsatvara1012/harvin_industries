import Link from "next/link";
import Image from "next/image";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Raw Material & Fabrication",
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
    title: "Testing & Quality Check",
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
    <section id="manufacturing" className="py-20 lg:py-28 bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2">
              <span className="w-1 h-3.5 bg-amber-500 inline-block" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600">
                OUR MANUFACTURING
              </span>
            </div>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-gray-950 leading-[1.12]">
              Precision <br />
              <span className="text-amber-500">in Every Part</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base text-gray-600 leading-relaxed">
              From design to dispatch, every machine is built in-house with strict quality control,
              advanced fabrication and skilled engineering teams.
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/about#manufacturing"
              className="inline-flex items-center gap-2 rounded-sm bg-amber-500 hover:bg-amber-600 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-all shadow-xs hover:shadow-md"
            >
              <span>See Our Manufacturing</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* 5 Process Cards Horizontal Row */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.title}
              className="group flex flex-col overflow-hidden rounded-lg bg-gray-50 border border-gray-200/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Process Step Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-900">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(min-width: 1280px) 20vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Title & Arrow */}
              <div className="flex items-center justify-between p-4 bg-white border-t border-gray-100 flex-1 group-hover:bg-amber-500/5 transition-colors">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-amber-600 transition-colors leading-snug">
                  {step.title}
                </h3>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-gray-400 group-hover:text-amber-600 transition-colors">
                  <svg
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
