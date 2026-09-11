const TONE_CLASSES = {
  light: "text-brand-text-secondary",
  dark: "text-gray-400",
  accent: "text-brand-yellow",
} as const;

export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: keyof typeof TONE_CLASSES;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="w-[3px] h-3.5 bg-brand-yellow inline-block" />
      <span className={`text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] ${TONE_CLASSES[tone]}`}>
        {children}
      </span>
    </div>
  );
}
