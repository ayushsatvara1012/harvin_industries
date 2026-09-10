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
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-text-secondary">
            Industries We Serve
          </span>
        </div>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight text-brand-text">
          Powering Multiple <span className="text-brand-yellow">Industries</span>
        </h2>

        {/* One flat white strip, the six sectors divided by hairlines */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 bg-white">
          {INDUSTRIES.map((ind, idx) => (
            <div
              key={ind.title}
              className={`group flex flex-col items-center justify-center gap-3.5 px-4 py-9 text-center transition-colors hover:bg-brand-yellow/5 ${
                idx > 0 ? "lg:border-l lg:border-brand-border" : ""
              }`}
            >
              <span className="material-symbols-outlined text-[38px] text-brand-text group-hover:text-brand-accent transition-colors">
                {ind.icon}
              </span>
              <h3 className="text-[12px] font-semibold text-brand-text leading-tight">
                {ind.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
