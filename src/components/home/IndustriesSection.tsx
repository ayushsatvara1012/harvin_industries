import { Icon, SectionHeader } from "@/components/ui";

const INDUSTRIES = [
  {
    icon: "handyman",
    title: "Construction",
    borderRadius: "28px 8px 32px 14px",
    // Corners with smaller radius: Top-Right (8px) & Bottom-Left (14px)
    corner1: { pos: "right-2 top-2", border: "border-r-2 border-t-2", rounded: "rounded-tr-[4px]" },
    corner2: { pos: "left-2.5 bottom-2.5", border: "border-l-2 border-b-2", rounded: "rounded-bl-[6px]" },
  },
  {
    icon: "road",
    title: "Infrastructure",
    borderRadius: "10px 32px 12px 36px",
    // Corners with smaller radius: Top-Left (10px) & Bottom-Right (12px)
    corner1: { pos: "left-2.5 top-2.5", border: "border-l-2 border-t-2", rounded: "rounded-tl-[5px]" },
    corner2: { pos: "right-2.5 bottom-2.5", border: "border-b-2 border-r-2", rounded: "rounded-br-[6px]" },
  },
  {
    icon: "apartment",
    title: "Real Estate",
    borderRadius: "36px 14px 26px 8px",
    // Corners with smaller radius: Top-Right (14px) & Bottom-Left (8px)
    corner1: { pos: "right-2.5 top-2.5", border: "border-r-2 border-t-2", rounded: "rounded-tr-[6px]" },
    corner2: { pos: "left-2 bottom-2", border: "border-l-2 border-b-2", rounded: "rounded-bl-[4px]" },
  },
  {
    icon: "view_in_ar",
    title: "Precast Industry",
    borderRadius: "12px 34px 8px 28px",
    // Corners with smaller radius: Top-Left (12px) & Bottom-Right (8px)
    corner1: { pos: "left-2.5 top-2.5", border: "border-l-2 border-t-2", rounded: "rounded-tl-[6px]" },
    corner2: { pos: "right-2 bottom-2", border: "border-b-2 border-r-2", rounded: "rounded-br-[4px]" },
  },
  {
    icon: "foundation",
    title: "Building Materials",
    borderRadius: "30px 10px 38px 16px",
    // Corners with smaller radius: Top-Right (10px) & Bottom-Left (16px)
    corner1: { pos: "right-2.5 top-2.5", border: "border-r-2 border-t-2", rounded: "rounded-tr-[5px]" },
    corner2: { pos: "left-2.5 bottom-2.5", border: "border-l-2 border-b-2", rounded: "rounded-bl-[7px]" },
  },
  {
    icon: "factory",
    title: "Industrial Projects",
    borderRadius: "8px 28px 16px 34px",
    // Corners with smaller radius: Top-Left (8px) & Bottom-Right (16px)
    corner1: { pos: "left-2 top-2", border: "border-l-2 border-t-2", rounded: "rounded-tl-[4px]" },
    corner2: { pos: "right-2.5 bottom-2.5", border: "border-b-2 border-r-2", rounded: "rounded-br-[7px]" },
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
              className="group relative flex h-56 flex-col overflow-hidden bg-white border border-brand-border/80 px-5 py-5 text-left transition-all duration-300 hover:bg-brand-ink hover:border-brand-ink hover:shadow-xl"
            >
              {/* Hover corner arrows placed at the corners with less border-radius and curved to match */}
              <span
                className={`pointer-events-none absolute ${ind.corner1.pos} ${ind.corner1.border} ${ind.corner1.rounded} h-3.5 w-3.5 border-brand-yellow opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <span
                className={`pointer-events-none absolute ${ind.corner2.pos} ${ind.corner2.border} ${ind.corner2.rounded} h-3.5 w-3.5 border-brand-yellow opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />

              <div className="relative z-10 flex items-start justify-between">
                <span className="font-stat text-xs tracking-[0.2em] text-brand-text-secondary/60 transition-colors duration-300 group-hover:text-brand-yellow">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-medium font-stat text-brand-yellow leading-tight transition-colors duration-300 group-hover:text-white">
                  {ind.title}
                </h3>
              </div>

              <Icon
                name={ind.icon}
                style={{
                  fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48",
                }}
                className="pointer-events-none m-auto text-[128px] text-brand-text-secondary/20 transition-colors duration-300 group-hover:text-white/15"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
