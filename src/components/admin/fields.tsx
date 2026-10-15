export const inputClass =
  "w-full rounded-lg border border-brand-border bg-white px-3 py-2.5 text-sm text-brand-text placeholder:text-brand-text-secondary/60 focus:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow/30 disabled:opacity-60";

export const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full bg-brand-yellow px-6 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-yellow-light disabled:opacity-60";

export const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-brand-border bg-white px-5 py-2.5 text-sm font-semibold text-brand-text transition-colors hover:border-brand-yellow disabled:opacity-60";

export function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  error?: string;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-brand-ink">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="mt-1.5 text-xs text-brand-text-secondary">{hint}</p>}
      {error && (
        <p role="alert" className="mt-1 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-brand-border bg-white p-6">
      <h2 className="font-display text-2xl text-brand-ink">{title}</h2>
      {description && <p className="mt-1 text-sm text-brand-text-secondary">{description}</p>}
      <div className="mt-5 grid gap-5">{children}</div>
    </section>
  );
}
