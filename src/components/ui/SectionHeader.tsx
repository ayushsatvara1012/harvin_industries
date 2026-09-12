import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

type EyebrowTone = "light" | "dark" | "accent";
type TitleTone = "light" | "dark" | "accent";

const TITLE_TONE = {
  light: "text-brand-text",
  dark: "text-white",
  accent: "text-brand-accent-text",
} as const;

const TITLE_SIZE = {
  md: "text-3xl",
  lg: "text-4xl sm:text-5xl",
} as const;

const SPACING = {
  sm: "mt-3",
  lg: "mt-4",
} as const;

interface SectionHeaderProps {
  eyebrow: ReactNode;
  eyebrowTone?: EyebrowTone;
  tone?: TitleTone;
  size?: keyof typeof TITLE_SIZE;
  spacing?: keyof typeof SPACING;
  tight?: boolean;
  className?: string;
  children: ReactNode;
}

/* Shared eyebrow + h2 pattern repeated across every homepage section and the
   product detail page's sub-sections. */
export function SectionHeader({
  eyebrow,
  eyebrowTone,
  tone = "light",
  size = "lg",
  spacing = "sm",
  tight = false,
  className = "",
  children,
}: SectionHeaderProps) {
  return (
    <>
      <Eyebrow tone={eyebrowTone ?? (tone === "dark" ? "dark" : "light")}>{eyebrow}</Eyebrow>
      <h2
        className={`${SPACING[spacing]} font-display tracking-tight ${TITLE_SIZE[size]} ${
          tight ? "leading-[1.05] " : ""
        }${TITLE_TONE[tone]} ${className}`}
      >
        {children}
      </h2>
    </>
  );
}
