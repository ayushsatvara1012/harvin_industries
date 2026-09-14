import { Icon, SectionHeader } from "@/components/ui";

const INDUSTRIES = [
  {
    icon: "handyman",
    title: "Construction",
    borderRadius: "28px 8px 32px 14px",
  },
  {
    icon: "road",
    title: "Infrastructure",
    borderRadius: "10px 32px 12px 36px",
  },
  {
    icon: "apartment",
    title: "Real Estate",
    borderRadius: "36px 14px 26px 8px",
  },
  {
    icon: "view_in_ar",
    title: "Precast Industry",
    borderRadius: "12px 34px 8px 28px",
  },
  {
    icon: "foundation",
    title: "Building Materials",
    borderRadius: "30px 10px 38px 16px",
  },
  {
    icon: "factory",
    title: "Industrial Projects",
    borderRadius: "8px 28px 16px 34px",
  },
];

export function IndustriesSection() {
  return (
    <section id="industries" className="scroll-mt-20 bg-brand-surface-alt py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Industries We Serve">
          Powering Multiple <span className="text-brand-accent-text">Industries</span>
        </SectionHeader>

        {/* Asymmetric spec-sheet grid */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-3.5">
          {INDUSTRIES.map((ind, idx) => (
            <div
              key={ind.title}
              style={{ borderRadius: ind.borderRadius }}
              className="relative flex h-56 flex-col overflow-hidden bg-white border border-brand-border/80 px-5 py-5 text-left shadow-sm"
            >
              <div className="relative z-10 flex items-start justify-between">
                <span className="font-stat text-xs tracking-[0.2em] text-brand-text-secondary/60">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-medium font-stat text-brand-text leading-tight">
                  {ind.title}
                </h3>
              </div>

              <Icon
                name={ind.icon}
                style={{
                  fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48",
                }}
                className="pointer-events-none m-auto text-[128px] text-brand-text-secondary/20"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
