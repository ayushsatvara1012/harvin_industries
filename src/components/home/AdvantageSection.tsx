import Image from "next/image";
import { Icon, SectionHeader } from "@/components/ui";

const ADVANTAGES = [
  { icon: "shield", title: "Robust & Reliable Machines" },
  { icon: "memory", title: "Advanced Technology" },
  { icon: "bolt", title: "Energy Efficient Solutions" },
  { icon: "tune", title: "Custom Engineering" },
  { icon: "headset_mic", title: "Strong After-Sales Support" },
];

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
      <div className="absolute inset-y-0 left-0 z-10 hidden lg:block w-[66%] -translate-x-[9px] bg-gradient-to-br from-brand-ink via-brand-ink to-brand-dark-surface clip-wedge-right" />

      {/* Strapline sitting over the photo */}
      <p
        className="absolute right-8 xl:right-16 top-20 z-20 hidden lg:block text-right text-3xl xl:text-4xl font-black font-stat uppercase leading-[1.15] tracking-wider text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
        style={{ WebkitTextStroke: "1px var(--color-brand-yellow-light)" }}
      >
        Stronger Buildings
        <br />
        Brighter Communities
      </p>

      <div className="relative z-20 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="lg:max-w-[58%]">
          <SectionHeader eyebrow="Our Advantage" tone="dark" spacing="lg" tight>
            Engineered <br />
            for <span className="text-brand-yellow">Your Advantage</span>
          </SectionHeader>

          {/* Five pillars as glass panels on the dark ground */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {ADVANTAGES.map((item, idx) => (
              <div
                key={item.title}
                className="relative flex flex-col gap-6 overflow-hidden rounded-sm border border-white/10 bg-white/[0.03] p-5 cursor-default"
              >
                {/* Giant outlined watermark number, bleeding off the card edge */}
                <span
                  className="font-stat pointer-events-none absolute -right-2 -top-6 text-[88px] leading-none text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.08)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <span className="relative flex h-11 w-11 items-center justify-center rounded-sm border border-brand-yellow/30 text-brand-yellow">
                  <Icon name={item.icon} className="text-[22px]" />
                </span>

                <p className="relative text-sm sm:text-[15px] font-semibold leading-snug text-gray-200">
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
          <p
            className="absolute right-5 top-5 text-right text-lg font-black font-stat uppercase leading-tight text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
            style={{ WebkitTextStroke: "1.25px var(--color-brand-yellow)" }}
          >
            Stronger Buildings
            <br />
            Brighter Communities
          </p>
        </div>
      </div>
    </section>
  );
}
