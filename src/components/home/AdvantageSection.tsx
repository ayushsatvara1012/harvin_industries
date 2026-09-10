import Image from "next/image";

const ADVANTAGES = [
  {
    icon: "verified",
    title: "Robust & Reliable Machines",
  },
  {
    icon: "memory",
    title: "Advanced Technology",
  },
  {
    icon: "eco",
    title: "Energy Efficient Solutions",
  },
  {
    icon: "build",
    title: "Custom Engineering",
  },
  {
    icon: "support_agent",
    title: "Strong After-Sales Support",
  },
];

export function AdvantageSection() {
  return (
    <section id="advantage" className="relative bg-[#121417] text-white py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Tag, Headline, 5 Feature Icons */}
          <div className="lg:col-span-6 z-10">
            {/* Tag */}
            <div className="flex items-center gap-2">
              <span className="w-1 h-3.5 bg-amber-400 inline-block" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                OUR ADVANTAGE
              </span>
            </div>

            {/* Headline */}
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.12]">
              Engineered <br />
              for <span className="text-amber-400">Your Advantage</span>
            </h2>

            {/* 5 Circular Gold Icon Feature Items */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
              {ADVANTAGES.map((item, idx) => (
                <div
                  key={item.title}
                  className={`flex flex-col items-start gap-3 group ${
                    idx === 4 ? "col-span-2 sm:col-span-1" : ""
                  }`}
                >
                  {/* Hexagonal / Circular Yellow Outline Icon Container */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-amber-400/60 bg-amber-400/10 text-amber-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-black shadow-lg shadow-amber-400/10">
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-gray-200 leading-snug group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Angled Photographic Warehouse Visual + Accent Box */}
          <div className="lg:col-span-6 relative">
            <div className="relative group">
              {/* Warehouse Stored Cured Blocks Photo with Chevron/Angled Cut */}
              <div
                className="relative aspect-[16/11] w-full overflow-hidden bg-gray-900 shadow-2xl border border-white/10"
                style={{
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 8% 100%, 0% 50%)",
                }}
              >
                <Image
                  src="/images/mockup/advantage-warehouse-4k.webp"
                  alt="Industrial Block Inventory and Warehouse"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Yellow Angle Accent Box: STRONGER BUILDINGS BRIGHTER COMMUNITIES */}
              <div
                className="absolute top-6 right-0 sm:-right-4 z-20 bg-amber-400 text-black py-5 px-6 font-black uppercase tracking-tight shadow-xl"
                style={{
                  clipPath: "polygon(18px 0%, 100% 0%, 100% 100%, 0% 100%)",
                }}
              >
                <div className="text-left text-xs sm:text-sm leading-tight font-black pl-3 text-gray-950">
                  <p className="font-extrabold text-gray-900">STRONGER</p>
                  <p className="font-black text-black">BUILDINGS</p>
                  <p className="font-extrabold text-gray-900 mt-1">BRIGHTER</p>
                  <p className="font-black text-black">COMMUNITIES</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
