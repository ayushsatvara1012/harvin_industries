type SkeletonProps = {
  className?: string;
  /** Use on dark (ink) sections. */
  dark?: boolean;
};

export function Skeleton({ className = "", dark = false }: SkeletonProps) {
  return <div aria-hidden="true" className={`${dark ? "skeleton-dark" : "skeleton"} ${className}`} />;
}
