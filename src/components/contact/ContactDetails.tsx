import { Logo } from "@/components/layout";
import { Icon } from "@/components/ui";
import { CONTACT_DETAILS } from "@/data/contact";

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
                <Logo className="h-4 w-auto text-brand-yellow" />
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
