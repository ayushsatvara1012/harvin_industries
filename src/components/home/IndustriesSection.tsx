const INDUSTRIES = [
  {
    icon: "construction",
    title: "Construction",
  },
  {
    icon: "bridge",
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
    <section id="industries" className="py-20 lg:py-28 bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Tag & Headline */}
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-3.5 bg-amber-500 inline-block" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600">
              INDUSTRIES WE SERVE
            </span>
          </div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-gray-950">
            Powering Multiple <span className="text-amber-500">Industries</span>
          </h2>
        </div>

        {/* 6 Industry Cards Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.title}
              className="group flex flex-col items-center justify-center p-6 sm:p-8 rounded-xl bg-white border border-gray-200/80 shadow-xs hover:border-amber-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
            >
              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-gray-800 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">{ind.icon}</span>
              </div>

              {/* Title */}
              <h3 className="mt-4 text-sm font-bold text-gray-900 group-hover:text-amber-600 transition-colors leading-tight">
                {ind.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
