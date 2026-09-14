import { Icon } from "@/components/ui";
import { BUSINESS_HOURS, CONTACT_DETAILS } from "@/data/contact";

function MockChip() {
  return (
    <span className="ml-2 inline-flex shrink-0 items-center rounded-full border border-brand-yellow/40 px-2 py-0.5 align-middle text-[9px] font-bold uppercase tracking-[0.12em] text-brand-yellow-light">
      To confirm
    </span>
  );
}

export function ContactDetails() {
  const founder = CONTACT_DETAILS.find((d) => d.label === "Speak To");
  const factory = CONTACT_DETAILS.find((d) => d.label === "Factory & Office");
  const phone = CONTACT_DETAILS.find((d) => d.label === "Phone");
  const email = CONTACT_DETAILS.find((d) => d.label === "Email");
  const gstin = CONTACT_DETAILS.find((d) => d.label === "GSTIN");

  return (
    <div className="bg-brand-ink text-white border-b border-white/10">
      {/* Top Title Strip inside the unified card */}
      <div className="px-6 py-5 sm:px-8 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-brand-ink/90">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-yellow">
            Executive Command & Factory Contacts
          </span>
          <h2 className="text-xl sm:text-2xl font-display tracking-tight text-white mt-0.5">
            Harvin Industries <span className="text-brand-yellow">Corporate Desk</span>
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-mono text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Works Active / Live Trials</span>
        </div>
      </div>

      {/* 4 Horizontal Executive Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
        {/* 1. Factory & Works */}
        <div className="p-6 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-brand-yellow/30 text-brand-yellow">
                <Icon name="location_on" className="text-[17px]" />
              </span>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">
                Works & Factory
              </p>
            </div>
            <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-gray-200">
              {factory?.value}
            </p>
          </div>

          {factory?.href && (
            <a
              href={factory.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-yellow hover:underline"
            >
              <span>View On Google Maps</span>
              <Icon name="arrow_forward" className="text-xs" />
            </a>
          )}
        </div>

        {/* 2. Direct Communications */}
        <div className="p-6 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-brand-yellow/30 text-brand-yellow">
                <Icon name="call" className="text-[17px]" />
              </span>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">
                Direct Contact
              </p>
            </div>
            <div className="mt-3 space-y-1">
              <a
                href={phone?.href}
                className="block text-sm font-semibold tracking-wide text-white transition-colors hover:text-brand-yellow"
              >
                {phone?.value}
              </a>
              <a
                href={email?.href}
                className="block text-xs text-gray-400 transition-colors hover:text-brand-yellow"
              >
                {email?.value}
              </a>
            </div>
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-gray-400">GSTIN</span>
            <span className="font-mono text-gray-300">{gstin?.value}</span>
          </div>
        </div>

        {/* 3. Direct Leadership with Brand Emblem */}
        <div className="p-6 flex flex-col justify-between gap-4 bg-white/[0.02]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-brand-yellow/30 text-brand-yellow bg-brand-yellow/5">
                {/* Official Harvin Logo Mark */}
                <svg viewBox="0 0 258 298" fill="none" className="h-4 w-auto text-brand-yellow" aria-hidden="true">
                  <path d="M257.842 74.4327V223.298L128.921 297.731L0 223.298V74.4327L128.921 0L257.842 74.4327ZM3.66316 76.5476V221.183L128.921 293.501L254.179 221.183V76.5476L128.921 4.22986L3.66316 76.5476Z" fill="currentColor"/>
                  <path d="M16.4058 199.05L39.5119 212.351V103.357L16.4058 116.629V199.05Z" fill="currentColor"/>
                  <path d="M56.1934 222.156L79.2995 235.513V56.9193L56.1934 70.2758V222.156Z" fill="currentColor"/>
                  <path d="M242.282 199.05L219.176 212.351V103.357L242.282 116.629V199.05Z" fill="currentColor"/>
                  <path d="M200.578 221.931L177.472 235.287V56.6938L200.578 70.0502V221.931Z" fill="currentColor"/>
                  <path d="M96.0372 85.6336V46.9731L119.143 33.6448V98.3701L96.0372 85.6336Z" fill="#FFEE00"/>
                  <path d="M119.143 144.977V258.394L96.0372 245.065V105.351L137.339 129.197V33.6445L160.424 46.9728V168.81L119.143 144.977Z" fill="currentColor"/>
                  <path d="M160.847 244.953L137.741 258.394V175.099L149.294 181.794L160.847 188.489V244.953Z" fill="currentColor"/>
                </svg>
              </span>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">
                Direct Leadership
              </p>
            </div>
            <div className="mt-3">
              <p className="text-sm font-semibold tracking-wide text-white">
                {founder?.value}
              </p>
              <p className="mt-0.5 text-xs text-brand-yellow font-medium">
                {founder?.secondary}
              </p>
            </div>
          </div>

          <p className="text-[11px] text-gray-400 leading-snug">
            Machinery consultations & plant commissioning guidance.
          </p>
        </div>

        {/* 4. Operating Hours */}
        <div className="p-6 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-brand-yellow/30 text-brand-yellow">
                <Icon name="schedule" className="text-[17px]" />
              </span>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">
                Operating Hours
              </p>
            </div>

            <div className="mt-3 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Mon & Wed–Sun:</span>
                <span className="text-gray-100 font-semibold">9:30 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tuesday:</span>
                <span className="text-red-400 font-semibold">Closed</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-gray-400 leading-snug">
            Visit our Bakrol plant for raw material trials & live test pressing.
          </p>
        </div>
      </div>
    </div>
  );
}
