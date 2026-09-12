import type { CSSProperties } from "react";

export function Icon({
  name,
  className = "",
  style,
}: {
  name: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={`icon-symbol ${className}`} style={style} aria-hidden="true">
      {name}
    </span>
  );
}
