import type { Metadata } from "next";
import Link from "next/link";
import { LeadActions } from "@/components/admin/LeadActions";
import { listLeads, type AdminLead } from "@/lib/leads";

export const metadata: Metadata = { title: "Enquiries" };

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-brand-text-secondary">{label}</dt>
      <dd className="mt-0.5 break-words text-sm text-brand-text">{children}</dd>
    </div>
  );
}

function LeadCard({ lead }: { lead: AdminLead }) {
  return (
    <li className={`rounded-xl border bg-white p-5 ${lead.handled ? "border-brand-border" : "border-brand-yellow"}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-2 font-semibold text-brand-ink">
            {lead.name}
            {!lead.handled && (
              <span className="rounded-full bg-brand-clay px-2.5 py-0.5 text-xs font-semibold text-brand-accent-text">New</span>
            )}
          </p>
          {lead.company && <p className="text-sm text-brand-text-secondary">{lead.company}</p>}
        </div>
        <time dateTime={lead.createdAt.toISOString()} className="text-xs text-brand-text-secondary">
          {dateFormat.format(lead.createdAt)}
        </time>
      </div>

      <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        <Detail label="Phone">
          <a href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`} className="font-semibold text-brand-accent-text hover:underline">
            {lead.phone}
          </a>
        </Detail>
        {lead.email && (
          <Detail label="Email">
            <a href={`mailto:${lead.email}`} className="text-brand-accent-text hover:underline">
              {lead.email}
            </a>
          </Detail>
        )}
        {lead.location && <Detail label="Location">{lead.location}</Detail>}
        {lead.product && (
          <Detail label="Machine">
            {lead.productName ?? (lead.product === "unsure" ? "Not sure yet" : lead.product)}
          </Detail>
        )}
        {lead.output && <Detail label="Daily output">{lead.output}</Detail>}
      </dl>

      {lead.message && <p className="mt-4 whitespace-pre-wrap break-words rounded-lg bg-brand-surface-alt p-3 text-sm text-brand-text">{lead.message}</p>}

      <div className="mt-4">
        <LeadActions id={lead.id} name={lead.name} handled={lead.handled} />
      </div>
    </li>
  );
}

export default async function AdminLeadsPage() {
  const leads = await listLeads();
  const unhandled = leads.filter((lead) => !lead.handled).length;

  return (
    <>
      <div>
        <h1 className="font-display text-4xl text-brand-ink">Enquiries</h1>
        <p className="mt-1 text-sm text-brand-text-secondary">
          {leads.length} total, {unhandled} new. Call back within one working day.
        </p>
      </div>
      {leads.length === 0 ? (
        <p className="mt-6 rounded-xl border border-brand-border bg-white p-8 text-center text-sm text-brand-text-secondary">
          No enquiries yet. Submissions from the <Link href="/contact" className="font-semibold text-brand-accent-text hover:underline">contact form</Link> appear here.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </ul>
      )}
    </>
  );
}
