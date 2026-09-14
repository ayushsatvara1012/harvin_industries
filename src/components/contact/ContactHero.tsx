import { Icon, IsometricLines } from "@/components/ui";
import { PHONE, PHONE_HREF, EMAIL, ADDRESS_LINES } from "@/data/contact";
import { ContactForm } from "./ContactForm";

export function ContactHero({
  productName,
  productSlug,
}: {
  productName?: string;
  productSlug?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-ink text-white py-14 lg:py-20 border-b border-white/10">
      <IsometricLines className="absolute inset-0 h-full w-full opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/90 to-brand-ink/40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left Column: Direct Contact Info (like reference) */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white capitalize">
                contact us
              </h1>
              <p className="mt-4 text-base sm:text-lg text-gray-100 leading-relaxed max-w-md">
                {productName
                  ? `Requesting technical quotation for ${productName}.`
                  : "Request a quotation or discuss machinery specifications directly with our team."}
              </p>
            </div>

            <div className="space-y-7">
              {/* CALL */}
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300">
                  Call
                </span>
                <a
                  href={PHONE_HREF}
                  className="mt-1 block font-display text-2xl sm:text-3xl tracking-tight text-white transition-colors hover:text-brand-yellow"
                >
                  {PHONE}
                </a>
              </div>

              {/* EMAIL */}
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300">
                  Email
                </span>
                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-1 block text-base sm:text-lg text-gray-100 transition-colors hover:text-brand-yellow font-medium"
                >
                  {EMAIL}
                </a>
              </div>

              {/* SPEAK TO: Founder with official Harvin Brand Emblem logo */}
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300">
                  Speak To
                </span>
                <div className="mt-2 flex items-center gap-3">
                  
                  <div>
                    <p className="text-base sm:text-lg font-semibold text-white tracking-wide">
                      Mr. Dhaval Sathwara
                    </p>
                    <p className="text-xs text-brand-yellow">
                      Founder, Harvin Industries
                    </p>
                  </div>
                </div>
              </div>

              {/* FACTORY & WORKS */}
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300">
                  Factory & Works
                </span>
                <p className="mt-1 text-sm text-gray-100 leading-relaxed max-w-sm">
                  {ADDRESS_LINES.join(", ")}
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=NK+Industrial+Park+Bakrol+Bujrang+Ahmedabad+382430"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-yellow hover:underline"
                >
                  <span>View on Google Maps</span>
                  <Icon name="arrow_forward" className="text-xs" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Contact Form (no card effect, directly on the dark section) */}
          <div className="lg:col-span-7">
            <ContactForm selectedProduct={productSlug} />
          </div>
        </div>
      </div>
    </section>
  );
}
