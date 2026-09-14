import React from "react";

interface IsometricFormSvgProps {
  name: string;
  className?: string;
}

export function IsometricFormSvg({ name, className = "w-10 h-10" }: IsometricFormSvgProps) {
  switch (name) {
    case "Fly Ash Brick":
      // Standard 3D isometric rectangular brick with surface bevel lines
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Top Face */}
          <polygon
            points="32,14 54,24 32,34 10,24"
            className="fill-brand-surface group-hover:fill-brand-yellow/10 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Left Face */}
          <polygon
            points="10,24 32,34 32,48 10,38"
            className="fill-brand-surface-alt group-hover:fill-brand-yellow/15 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Right Face */}
          <polygon
            points="32,34 54,24 54,38 32,48"
            className="fill-brand-surface-alt/70 group-hover:fill-brand-yellow/20 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Top Texture / Frog indent mark */}
          <polygon
            points="32,20 44,25.5 32,31 20,25.5"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 2"
            fill="none"
            className="opacity-60"
          />
        </svg>
      );

    case "Solid Brick":
      // Large monolithic structural concrete solid block
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Top Face */}
          <polygon
            points="32,10 56,22 32,34 8,22"
            className="fill-brand-surface group-hover:fill-brand-yellow/10 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Left Face */}
          <polygon
            points="8,22 32,34 32,52 8,40"
            className="fill-brand-surface-alt group-hover:fill-brand-yellow/15 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Right Face */}
          <polygon
            points="32,34 56,22 56,40 32,52"
            className="fill-brand-surface-alt/70 group-hover:fill-brand-yellow/20 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Precision Corner Mark */}
          <line x1="32" y1="34" x2="32" y2="52" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );

    case "Hollow Block":
      // Concrete hollow core masonry block showing two isometric cavities
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Top Face */}
          <polygon
            points="32,12 56,23 32,35 8,23"
            className="fill-brand-surface group-hover:fill-brand-yellow/10 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Left Cavity */}
          <polygon
            points="23,20 30,23.5 25,29 18,25.5"
            className="fill-brand-ink/15 group-hover:fill-brand-yellow/25 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Right Cavity */}
          <polygon
            points="34,25.5 41,22 46,24.5 39,28"
            className="fill-brand-ink/15 group-hover:fill-brand-yellow/25 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Left Face */}
          <polygon
            points="8,23 32,35 32,50 8,38"
            className="fill-brand-surface-alt group-hover:fill-brand-yellow/15 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Right Face */}
          <polygon
            points="32,35 56,23 56,38 32,50"
            className="fill-brand-surface-alt/70 group-hover:fill-brand-yellow/20 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Internal Cavity Depth Lines */}
          <line x1="25" y1="29" x2="25" y2="35" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
          <line x1="39" y1="28" x2="39" y2="34" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
        </svg>
      );

    case "I-Shape Paver":
      // Interlocking Dumbbell / I-section paver block in isometric projection
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Top Profile (I shape) */}
          <path
            d="M24,14 L40,21 L35,23.5 L39,25.5 L34,28 L38,30 L22,38 L18,36 L23,33.5 L19,31.5 L24,29 L20,27 Z"
            className="fill-brand-surface group-hover:fill-brand-yellow/15 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Extruded Front/Bottom Edges */}
          <path
            d="M22,38 L38,30 L38,40 L22,48 Z"
            className="fill-brand-surface-alt group-hover:fill-brand-yellow/20 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M18,36 L22,38 L22,48 L18,46 Z"
            className="fill-brand-surface-alt/80 group-hover:fill-brand-yellow/25 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M38,30 L40,21 L40,31 L38,40 Z"
            className="fill-brand-surface-alt/60 group-hover:fill-brand-yellow/15 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "Zig Zag Paver":
      // Unistone / Hexagonal zigzag interlocking paving block
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Top Zig Zag Polygon */}
          <path
            d="M22,14 L34,18 L31,21 L43,26 L40,29 L48,32 L36,38 L39,35 L27,30 L30,27 L22,24 Z"
            className="fill-brand-surface group-hover:fill-brand-yellow/15 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Front extrusion */}
          <path
            d="M22,24 L30,27 L27,30 L39,35 L36,38 L48,32 L48,42 L36,48 L39,45 L27,40 L30,37 L22,34 Z"
            className="fill-brand-surface-alt group-hover:fill-brand-yellow/20 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "Retention Block":
      // Step-back interlocking retaining wall unit with top locator lug
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Top Main Face */}
          <polygon
            points="32,15 54,25 32,35 10,25"
            className="fill-brand-surface group-hover:fill-brand-yellow/10 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Interlocking Lip / Step on top */}
          <polygon
            points="24,19 32,22.5 28,26 20,22.5"
            className="fill-brand-yellow/30"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Front Stepped Faces */}
          <polygon
            points="10,25 32,35 32,49 10,39"
            className="fill-brand-surface-alt group-hover:fill-brand-yellow/15 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <polygon
            points="32,35 54,25 54,39 32,49"
            className="fill-brand-surface-alt/70 group-hover:fill-brand-yellow/20 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Beveled face split */}
          <line x1="21" y1="30" x2="21" y2="44" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
        </svg>
      );

    case "Curb Block":
      // Heavy roadway curb unit with pronounced top chamfer
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Top Flat Tier */}
          <polygon
            points="28,14 48,22 42,25 22,17"
            className="fill-brand-surface group-hover:fill-brand-yellow/10 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Sloped Chamfer Face */}
          <polygon
            points="22,17 42,25 34,35 14,27"
            className="fill-brand-surface-alt/50 group-hover:fill-brand-yellow/20 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Front Vertical Face */}
          <polygon
            points="14,27 34,35 34,49 14,41"
            className="fill-brand-surface-alt group-hover:fill-brand-yellow/25 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Right Side Profile */}
          <polygon
            points="48,22 48,36 34,49 34,35 42,25"
            className="fill-brand-surface-alt/80 group-hover:fill-brand-yellow/15 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "Curb Stone":
      // Elongated road boundary stone with continuous top slope
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Top Sloped Face */}
          <polygon
            points="36,12 56,20 30,34 10,26"
            className="fill-brand-surface group-hover:fill-brand-yellow/10 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Front Long Edge */}
          <polygon
            points="10,26 30,34 30,48 10,40"
            className="fill-brand-surface-alt group-hover:fill-brand-yellow/20 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Side Elevation */}
          <polygon
            points="30,34 56,20 56,34 30,48"
            className="fill-brand-surface-alt/70 group-hover:fill-brand-yellow/25 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Straight line guide */}
          <line x1="20" y1="30" x2="20" y2="44" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      );

    case "Drain Block":
      // Rainwater drainage channel unit with center trough
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Left Top Lip */}
          <polygon
            points="24,14 36,19 32,21 20,16"
            className="fill-brand-surface"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* Right Top Lip */}
          <polygon
            points="42,22 54,27 50,29 38,24"
            className="fill-brand-surface"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* Recessed Drainage Trough */}
          <polygon
            points="20,16 32,21 38,24 50,29 44,38 14,25"
            className="fill-brand-ink/20 group-hover:fill-brand-yellow/20 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* Front Face */}
          <polygon
            points="14,25 44,38 44,50 14,37"
            className="fill-brand-surface-alt group-hover:fill-brand-yellow/25 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Drain Water Flow Arrow Micro-Detail */}
          <path
            d="M27,24 L33,27"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />
        </svg>
      );

    default:
      // Fallback isometric cube
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <polygon points="32,12 54,23 32,34 10,23" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="10,23 32,34 32,48 10,37" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="32,34 54,23 54,37 32,48" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}
