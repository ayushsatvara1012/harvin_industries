import Link from "next/link";

interface BrandLogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function BrandLogo({ variant = "light", className = "" }: BrandLogoProps) {
  const isDark = variant === "dark";
  const textColor = isDark ? "#ffffff" : "#111827";
  const subtextColor = isDark ? "#9ca3af" : "#4b5563";

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group ${className}`}>
      {/* Hexagon Emblem */}
      <svg
        width="44"
        height="44"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        {/* Hexagon Outer Frame */}
        <polygon
          points="50,4 92,27 92,73 50,96 8,73 8,27"
          fill={isDark ? "#1f242d" : "#f3f4f6"}
          stroke="#f59e0b"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        {/* Inner Vertical Industrial Slits & H-I Monogram */}
        <rect x="25" y="28" width="8" height="44" rx="2" fill={isDark ? "#ffffff" : "#1f2937"} />
        <rect x="41" y="24" width="8" height="52" rx="2" fill="#f59e0b" />
        <rect x="57" y="28" width="8" height="22" rx="2" fill="#f59e0b" />
        <rect x="57" y="54" width="8" height="22" rx="2" fill={isDark ? "#ffffff" : "#1f2937"} />
        <rect x="71" y="32" width="8" height="36" rx="2" fill={isDark ? "#ffffff" : "#1f2937"} />
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <span
          className="text-lg font-black tracking-wider uppercase font-sans"
          style={{ color: textColor }}
        >
          HARVIN
        </span>
        <span
          className="text-[10px] font-bold tracking-[0.25em] uppercase mt-0.5"
          style={{ color: "#f59e0b" }}
        >
          INDUSTRIES
        </span>
      </div>
    </Link>
  );
}
