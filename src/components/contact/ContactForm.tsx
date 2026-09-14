"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { Icon } from "@/components/ui";
import { PRODUCTS, CATEGORY_LABELS } from "@/data/products";
import { OUTPUT_BANDS } from "@/data/contact";
import { submitQuoteRequest } from "@/app/contact/actions";
import { EMPTY_FORM_STATE } from "@/lib/quote-form";

const FIELD_CLASSES =
  "w-full rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-gray-500 transition-colors focus:border-brand-yellow focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-brand-yellow disabled:opacity-60";

const LABEL_CLASSES =
  "block text-xs font-semibold uppercase tracking-wider text-gray-200";

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: (props: { id: string; describedBy?: string }) => React.ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASSES}>
        {label}
        {required && <span className="ml-1 text-brand-yellow">*</span>}
      </label>
      <div className="mt-2">{children({ id, describedBy: error ? errorId : undefined })}</div>
      {error && (
        <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
          <Icon name="error" className="text-sm" />
          {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md border border-brand-yellow bg-brand-yellow px-8 py-3.5 font-display text-[16px] font-bold uppercase tracking-wider text-brand-ink transition-all hover:bg-brand-yellow-light disabled:cursor-not-allowed disabled:opacity-70"
    >
      <span>{pending ? "Sending…" : "Submit Enquiry"}</span>
      <Icon name={pending ? "progress_activity" : "arrow_forward"} className={`text-base ${pending ? "animate-spin" : ""}`} />
    </button>
  );
}

export function ContactForm({ selectedProduct }: { selectedProduct?: string }) {
  const [state, formAction] = useActionState(submitQuoteRequest, EMPTY_FORM_STATE);
  const { errors, values } = state;

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 py-8 text-white">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-yellow/15 text-brand-yellow">
          <Icon name="check_circle" className="text-[32px]" />
        </span>
        <h3 className="font-display text-2xl sm:text-3xl tracking-tight text-white">
          Enquiry Received
        </h3>
        <p className="max-w-md text-sm sm:text-base leading-relaxed text-gray-300">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your Name" required error={errors.name}>
          {({ id, describedBy }) => (
            <input
              id={id}
              name="name"
              type="text"
              required
              autoComplete="name"
              defaultValue={values.name}
              aria-describedby={describedBy}
              aria-invalid={Boolean(errors.name)}
              placeholder="Enter your name"
              className={FIELD_CLASSES}
            />
          )}
        </Field>

        <Field label="Company Name">
          {({ id }) => (
            <input
              id={id}
              name="company"
              type="text"
              autoComplete="organization"
              defaultValue={values.company}
              placeholder="Business name (optional)"
              className={FIELD_CLASSES}
            />
          )}
        </Field>

        <Field label="Phone Number" required error={errors.phone}>
          {({ id, describedBy }) => (
            <input
              id={id}
              name="phone"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              defaultValue={values.phone}
              aria-describedby={describedBy}
              aria-invalid={Boolean(errors.phone)}
              placeholder="+91 00000 00000"
              className={FIELD_CLASSES}
            />
          )}
        </Field>

        <Field label="Email Address" error={errors.email}>
          {({ id, describedBy }) => (
            <input
              id={id}
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={values.email}
              aria-describedby={describedBy}
              aria-invalid={Boolean(errors.email)}
              placeholder="you@company.com"
              className={FIELD_CLASSES}
            />
          )}
        </Field>

        <Field label="Machine of Interest" error={errors.product}>
          {({ id, describedBy }) => (
            <select
              id={id}
              name="product"
              defaultValue={values.product || selectedProduct || ""}
              aria-describedby={describedBy}
              className={`${FIELD_CLASSES} [&>option]:bg-brand-ink [&>option]:text-white`}
            >
              <option value="">Select a machine</option>
              {PRODUCTS.map((product) => (
                <option key={product.slug} value={product.slug}>
                  {product.name} — {CATEGORY_LABELS[product.category]}
                </option>
              ))}
              <option value="unsure">Not sure — please advise</option>
            </select>
          )}
        </Field>

        <Field label="Target Daily Output" error={errors.output}>
          {({ id, describedBy }) => (
            <select
              id={id}
              name="output"
              defaultValue={values.output}
              aria-describedby={describedBy}
              className={`${FIELD_CLASSES} [&>option]:bg-brand-ink [&>option]:text-white`}
            >
              <option value="">Select a volume</option>
              {OUTPUT_BANDS.map((band) => (
                <option key={band} value={band}>
                  {band}
                </option>
              ))}
            </select>
          )}
        </Field>

        <div className="sm:col-span-2">
          <Field label="Plant Location (City & State)">
            {({ id }) => (
              <input
                id={id}
                name="location"
                type="text"
                defaultValue={values.location}
                placeholder="Where will the plant be installed?"
                className={FIELD_CLASSES}
              />
            )}
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Your Message" error={errors.message}>
            {({ id, describedBy }) => (
              <textarea
                id={id}
                name="message"
                rows={4}
                maxLength={2000}
                defaultValue={values.message}
                aria-describedby={describedBy}
                placeholder="Please enter your message, shed size, or power details..."
                className={`${FIELD_CLASSES} resize-y`}
              />
            )}
          </Field>
        </div>
      </div>

      {/* Honeypot — hidden from people, filled by bots. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor="company_website">Do not fill this in</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-300"
        >
          <Icon name="error" className="mt-0.5 text-base shrink-0" />
          {state.message}
        </p>
      )}

      <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
        <SubmitButton />
        <p className="text-xs text-gray-400">
          We reply within one working day.
        </p>
      </div>
    </form>
  );
}
