export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M50 3 93 26.5v47L50 97 7 73.5v-47Z"
        stroke="currentColor"
        strokeWidth="4"
      />
      <rect x="24" y="30" width="9" height="40" fill="currentColor" />
      <rect x="39" y="30" width="9" height="40" fill="currentColor" />
      <rect x="54" y="30" width="9" height="18" fill="var(--color-brand-brick)" />
      <rect x="54" y="52" width="9" height="18" fill="currentColor" />
      <rect x="69" y="30" width="9" height="40" fill="currentColor" />
    </svg>
  );
}
