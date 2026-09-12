import Link from "next/link";
import { Icon } from "./Icon";

const SIZE_CLASSES = {
  sm: "px-5 py-3",
  md: "px-6 py-3",
  lg: "px-7 py-3.5",
} as const;

const VARIANT_CLASSES = {
  primary: "bg-rusted-yellow text-brand-ink",
  "outline-dark":
    "border border-brand-yellow-light/80 text-white hover:bg-rusted-yellow hover:text-brand-ink shadow-md shadow-black/40 hover:shadow-lg hover:shadow-brand-yellow/20 [text-shadow:0_1px_2px_rgba(0,0,0,0.7)] hover:[text-shadow:none]",
  "outline-light":
    "border border-brand-border bg-brand-surface text-brand-text shadow-sm hover:border-brand-yellow hover:text-brand-accent",
} as const;

type ButtonVariant = keyof typeof VARIANT_CLASSES;
type ButtonSize = keyof typeof SIZE_CLASSES;

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: boolean;
  className?: string;
  onClick?: () => void;
}

/* Shared pill CTA — the fill/outline treatment repeated across every
   section's "Request a Quote" and similar calls to action. Renders a Link
   when `href` is given, otherwise a plain button (e.g. an error retry). */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  icon = true,
  className = "",
  onClick,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-display text-[17px] tracking-wider font-semibold transition-all ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {icon && <Icon name="arrow_forward" className="text-base" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
