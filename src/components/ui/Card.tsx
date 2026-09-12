import type { ElementType, ReactNode } from "react";

interface CardProps {
  as?: ElementType;
  variant?: "solid" | "dashed";
  className?: string;
  children: ReactNode;
}

/* Shared surface-card shell: bordered, rounded, on `brand-surface`. Repeated
   across FeatureGroups, SpecTable, and the products empty state. */
export function Card({ as: Component = "div", variant = "solid", className = "", children }: CardProps) {
  return (
    <Component
      className={`rounded-xl border ${
        variant === "dashed" ? "border-dashed" : ""
      } border-brand-border bg-brand-surface ${className}`}
    >
      {children}
    </Component>
  );
}
