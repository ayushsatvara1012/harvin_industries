const INDUSTRIES = [
  {
    icon: "construction",
    title: "Construction",
  },
  {
    icon: "road",
    title: "Infrastructure",
  },
  {
    icon: "apartment",
    title: "Real Estate",
  },
  {
    icon: "view_in_ar",
    title: "Precast Industry",
  },
  {
    icon: "foundation",
    title: "Building Materials",
  },
  {
    icon: "factory",
    title: "Industrial Projects",
  },
];

export function IndustriesSection() {
  return (
    <section id="industries" className="scroll-mt-20 bg-[#f4f4f2] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <span className="w-[3px] h-3.5 bg-brand-yellow inline-block" />
          <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] text-brand-text-secondary">
            Industries We Serve
          </span>
        </div>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight text-brand-text">
          Powering Multiple <span className="text-brand-yellow">Industries</span>
        </h2>

        {/* Spec-sheet grid: indexed panels with blueprint corner marks */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-brand-border">
          {INDUSTRIES.map((ind, idx) => (
            <div
              key={ind.title}
              className="group relative flex flex-col justify-between gap-8 bg-white px-5 py-8 text-left transition-colors duration-300 hover:bg-brand-ink"
            >
              {/* Blueprint corner marks, revealed on hover */}
              <span className="pointer-events-none absolute left-2.5 top-2.5 h-3 w-3 border-l-2 border-t-2 border-brand-yellow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="pointer-events-none absolute bottom-2.5 right-2.5 h-3 w-3 border-b-2 border-r-2 border-brand-yellow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex items-start justify-between">
                <span className="font-stat text-xs tracking-[0.2em] text-brand-text-secondary/60 transition-colors duration-300 group-hover:text-brand-yellow">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="material-symbols-outlined text-[28px] text-brand-text-secondary/70 transition-colors duration-300 group-hover:text-white">
                  {ind.icon}
                </span>
              </div>

              <h3 className="text-sm sm:text-[15px] font-semibold text-brand-text leading-tight transition-colors duration-300 group-hover:text-white">
                {ind.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
