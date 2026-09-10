import Image from "next/image";

const ADVANTAGES = [
  { icon: "fitness_center", title: "Robust & Reliable Machines" },
  { icon: "eco", title: "Advanced Technology" },
  { icon: "energy_savings_leaf", title: "Energy Efficient Solutions" },
  { icon: "handyman", title: "Custom Engineering" },
  { icon: "support_agent", title: "Strong After-Sales Support" },
];

function HexIcon({ icon }: { icon: string }) {
  return (
    <span className="relative flex h-14 w-14 items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <polygon
          points="50,3 93,26.5 93,73.5 50,97 7,73.5 7,26.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          className="text-brand-yellow"
        />
      </svg>
      <span className="material-symbols-outlined relative text-2xl text-brand-yellow">{icon}</span>
    </span>
  );
}

export function AdvantageSection() {
  return (
    <section id="advantage" className="relative scroll-mt-20 bg-brand-ink text-white overflow-hidden">
      {/* Photograph filling the right of the band */}
      <div className="absolute inset-y-0 right-0 z-0 hidden lg:block w-[46%]">
        <Image
          src="/images/mockup/advantage-warehouse-4k.webp"
          alt="Industrial Block Inventory and Warehouse"
          fill
          sizes="46vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand-ink/30" />
        {/* Extra shade at the top so the strapline stays legible over the roof lights */}
        <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-brand-ink/85 to-transparent" />
      </div>

      {/* Yellow arrow edge, with the dark panel riding just in front of it */}
      <div className="absolute inset-y-0 left-0 z-10 hidden lg:block w-[66%] bg-brand-yellow clip-wedge-right" />
      <div className="absolute inset-y-0 left-0 z-10 hidden lg:block w-[66%] -translate-x-[9px] bg-brand-ink clip-wedge-right" />

      {/* Strapline sitting over the photo */}
      <p className="absolute right-8 xl:right-16 top-20 z-20 hidden lg:block text-right text-base font-extrabold drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] uppercase leading-[1.2] tracking-tight text-brand-yellow">
        Stronger
        <br />
        Buildings
        <br />
        Brighter
        <br />
        Communities
      </p>

      <div className="relative z-20 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="lg:max-w-[58%]">
          <div className="flex items-center gap-2.5">
            <span className="w-[3px] h-3.5 bg-brand-yellow inline-block" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-400">
              Our Advantage
            </span>
          </div>

          <h2 className="mt-4 font-display text-4xl sm:text-5xl tracking-tight text-white leading-[1.05]">
            Engineered <br />
            for <span className="text-brand-yellow">Your Advantage</span>
          </h2>

          {/* Five pillars across a single row on desktop */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
            {ADVANTAGES.map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center gap-3">
                <HexIcon icon={item.icon} />
                <p className="text-[11px] font-semibold leading-snug text-gray-200 max-w-[110px]">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Small screens get the photo stacked underneath */}
        <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden lg:hidden">
          <Image
            src="/images/mockup/advantage-warehouse-4k.webp"
            alt="Industrial Block Inventory and Warehouse"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-brand-ink/80 to-transparent" />
          <p className="absolute right-5 top-5 text-right text-sm font-extrabold uppercase leading-tight text-brand-yellow">
            Stronger Buildings
            <br />
            Brighter Communities
          </p>
        </div>
      </div>
    </section>
  );
}
