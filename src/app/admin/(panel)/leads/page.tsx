import type { Metadata } from "next";
import Link from "next/link";
import { LeadActions } from "@/components/admin/LeadActions";
import { Icon } from "@/components/ui";
import { listLeads, type AdminLead } from "@/lib/leads";

export const metadata: Metadata = { title: "Product Enquiries — Harvin Admin" };

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

function Detail({
  icon,
  label,
  children,
}: {
  icon?: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-brand-surface-alt p-3.5 border border-brand-border/40">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary font-sans">
        {icon && <Icon name={icon} className="text-sm text-brand-text-secondary" />}
        <span>{label}</span>
      </div>
      <div className="mt-1 break-words font-sans text-sm font-semibold text-brand-ink">
        {children}
      </div>
    </div>
  );
}

function LeadCard({ lead }: { lead: AdminLead }) {
  return (
    <li
      className={`rounded-2xl border bg-white p-6 sm:p-7 shadow-xs transition-shadow duration-200 hover:shadow-md ${
        lead.handled ? "border-brand-border/80" : "border-brand-yellow/60 ring-1 ring-brand-yellow/20"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-brand-border/60 pb-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-ink">
              {lead.name}
            </h3>
            {!lead.handled ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-clay px-3 py-0.5 text-xs font-bold text-brand-accent-text border border-brand-yellow/40 font-sans">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                New Enquiry
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200 font-sans">
                <Icon name="check" className="text-xs" />
                Handled
              </span>
            )}
          </div>
          {lead.company && (
            <p className="mt-1 text-sm font-medium text-brand-text-secondary font-sans">
              {lead.company}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-brand-text-secondary font-sans bg-brand-surface-alt px-3 py-1.5 rounded-lg border border-brand-border/60">
          <Icon name="schedule" className="text-sm" />
          <time dateTime={lead.createdAt.toISOString()}>
            {dateFormat.format(lead.createdAt)}
          </time>
        </div>
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Detail icon="call" label="Phone">
          <a
            href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}
            className="text-brand-accent-text hover:underline"
          >
            {lead.phone}
          </a>
        </Detail>
        {lead.email && (
          <Detail icon="mail" label="Email">
            <a href={`mailto:${lead.email}`} className="text-brand-accent-text hover:underline truncate block">
              {lead.email}
            </a>
          </Detail>
        )}
        {lead.location && (
          <Detail icon="location_on" label="Location">
            {lead.location}
          </Detail>
        )}
        {lead.product && (
          <Detail icon="precision_manufacturing" label="Machine Requested">
            {lead.productName ?? (lead.product === "unsure" ? "Not sure yet" : lead.product)}
          </Detail>
        )}
        {lead.output && (
          <Detail icon="bar_chart" label="Daily Target Volume">
            {lead.output}
          </Detail>
        )}
      </dl>

      {lead.message && (
        <div className="mt-5 rounded-xl bg-brand-surface-alt p-4 border border-brand-border/60">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary font-sans mb-1.5 flex items-center gap-1.5">
            <Icon name="chat" className="text-xs" />
            <span>Enquiry Notes / Specifications</span>
          </p>
          <p className="whitespace-pre-wrap break-words text-sm text-brand-ink leading-relaxed font-sans">
            {lead.message}
          </p>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-brand-border/60 flex items-center justify-between flex-wrap gap-4">
        <div className="text-xs text-brand-text-secondary font-sans">
          Enquiry ID #{lead.id}
        </div>
        <LeadActions id={lead.id} name={lead.name} handled={lead.handled} />
      </div>
    </li>
  );
}

export default async function AdminLeadsPage() {
  const leads = await listLeads();
  const unhandled = leads.filter((lead) => !lead.handled).length;
  const handled = leads.length - unhandled;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border/60 pb-6">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            Product Enquiries
          </h1>
          <p className="mt-1.5 text-sm text-brand-text-secondary font-sans max-w-2xl">
            Customer quotation requests submitted through the website contact and machine detail forms.
          </p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-brand-border/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-text-secondary font-sans">
            Total Enquiries
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-brand-ink">
            {leads.length}
          </p>
        </div>
        <div className="rounded-xl border border-brand-border/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-text-secondary font-sans">
            Pending / New
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-brand-accent-text">
            {unhandled}
          </p>
        </div>
        <div className="rounded-xl border border-brand-border/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-text-secondary font-sans">
            Handled / Closed
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-emerald-600">
            {handled}
          </p>
        </div>
      </div>

      {/* Leads List */}
      <div>
        {leads.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-brand-border bg-white p-12 text-center">
            <Icon name="mark_email_read" className="mx-auto text-4xl text-brand-text-secondary/60" />
            <h3 className="mt-3 font-display text-xl text-brand-ink">No enquiries yet</h3>
            <p className="mt-1 text-sm text-brand-text-secondary font-sans">
              Customer quote submissions from the{" "}
              <Link href="/contact" className="font-semibold text-brand-accent-text hover:underline">
                contact form
              </Link>{" "}
              will appear here.
            </p>
          </div>
        ) : (
          <ul className="space-y-6">
            {leads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
