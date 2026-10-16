import type { Metadata } from "next";
import Link from "next/link";
import { LegalList, LegalPage, LegalSection, type LegalSectionLink } from "@/components/legal";
import { ADDRESS_LINES, EMAIL, GSTIN } from "@/data/contact";
import { OG_IMAGE, OG_IMAGES, SITE_NAME } from "@/lib/site";

const title = "Terms & Conditions — Harvin Industries";
const description =
  "The terms for using the Harvin Industries website: how product information and quotations work, acceptable use, intellectual property, liability and governing law.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
  openGraph: { title, description, url: "/terms", siteName: SITE_NAME, type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
};

const SECTIONS: LegalSectionLink[] = [
  { id: "acceptance", title: "Accepting these terms" },
  { id: "information", title: "Product information" },
  { id: "quotations", title: "Quotations and orders" },
  { id: "enquiries", title: "Enquiries you send us" },
  { id: "acceptable-use", title: "Acceptable use" },
  { id: "intellectual-property", title: "Intellectual property" },
  { id: "third-parties", title: "Third-party content" },
  { id: "disclaimer", title: "Disclaimer" },
  { id: "liability", title: "Limit of liability" },
  { id: "changes", title: "Changes" },
  { id: "law", title: "Governing law" },
  { id: "contact", title: "Contact" },
];

const linkClass = "font-semibold text-brand-accent-text underline underline-offset-2 hover:text-brand-ink";

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="These terms apply when you use this website. Buying a machine is covered separately, by a written quotation or agreement."
      sections={SECTIONS}
    >
      <LegalSection id="acceptance" number={1} title="Accepting these terms">
        <p>
          This website, harvinindustries.com, is operated by Harvin Industries (GSTIN {GSTIN}), {ADDRESS_LINES.join(", ")}.
          By using it you agree to these terms and to our{" "}
          <Link className={linkClass} href="/privacy">Privacy Policy</Link>. If you do not agree, please do not use the
          website.
        </p>
      </LegalSection>

      <LegalSection id="information" number={2} title="Product information">
        <p>
          The machines, specifications, output figures and images on this website are there to help you understand and
          compare our range. They are general information and not an offer or a promise of a particular result.
        </p>
        <LegalList>
          <li>
            Output figures, such as bricks per hour or per day, depend on the raw material, mix, moulds, operator
            skill, power supply and site conditions. Your results may differ.
          </li>
          <li>Machine images may be illustrative renders and can differ from the machine as supplied.</li>
          <li>We keep improving our machines, so specifications and features can change without notice.</li>
        </LegalList>
        <p>We take care to keep the website accurate, but we do not guarantee that it is complete or error-free.</p>
      </LegalSection>

      <LegalSection id="quotations" number={3} title="Quotations and orders">
        <p>
          We do not sell machines through this website, and prices are not shown on it. To buy, request a quotation
          through the <Link className={linkClass} href="/contact">contact page</Link>.
        </p>
        <p>
          A price, delivery time or specification binds us only when it is in a written quotation from Harvin
          Industries, and an order exists only once we confirm it in writing. Payment terms, delivery, installation,
          commissioning and warranty are set out in that quotation or agreement, which takes priority over anything
          on this website.
        </p>
      </LegalSection>

      <LegalSection id="enquiries" number={4} title="Enquiries you send us">
        <p>
          Please give accurate details so that we can reach you. We aim to respond to every enquiry promptly, usually
          within one working day, but we cannot guarantee a response time or that we will be able to quote for every
          request.
        </p>
      </LegalSection>

      <LegalSection id="acceptable-use" number={5} title="Acceptable use">
        <p>You agree not to:</p>
        <LegalList>
          <li>use the website for anything unlawful, or to send false, misleading or abusive enquiries;</li>
          <li>send automated or bulk requests, or copy the website&rsquo;s content with scrapers or bots;</li>
          <li>try to gain unauthorised access to the website, its admin area, its servers or its data;</li>
          <li>introduce malware, or interfere with how the website works for other people.</li>
        </LegalList>
        <p>We may block access, without notice, to anyone who breaks these rules.</p>
      </LegalSection>

      <LegalSection id="intellectual-property" number={6} title="Intellectual property">
        <p>
          The Harvin Industries name, logo, text, photographs, renders, drawings and design of this website belong to
          Harvin Industries or its licensors. You may view the website and print pages for your own business
          evaluation. You may not copy, publish, modify or reuse the content for any other purpose without our written
          permission.
        </p>
      </LegalSection>

      <LegalSection id="third-parties" number={7} title="Third-party content">
        <p>
          The contact page shows a Google Map, and the website loads fonts and images from other providers. We do not
          control that content or its availability, and their own terms and privacy policies apply to it.
        </p>
      </LegalSection>

      <LegalSection id="disclaimer" number={8} title="Disclaimer">
        <p>
          The website is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. We do not promise that it will
          always be available, uninterrupted or free of errors, and we may change or withdraw any part of it at any
          time.
        </p>
      </LegalSection>

      <LegalSection id="liability" number={9} title="Limit of liability">
        <p>
          To the extent the law allows, Harvin Industries is not liable for any indirect or consequential loss, or
          loss of profit, business or data, arising from your use of this website or from relying on information on
          it. Nothing in these terms limits liability that cannot lawfully be limited. Liability for any machine we
          supply is governed by the quotation or agreement for that machine, not by this page.
        </p>
      </LegalSection>

      <LegalSection id="changes" number={10} title="Changes">
        <p>
          We may update these terms from time to time. The version on this page, with the &ldquo;Last updated&rdquo;
          date above, is the one that applies, and continuing to use the website means you accept the update.
        </p>
      </LegalSection>

      <LegalSection id="law" number={11} title="Governing law">
        <p>
          These terms are governed by the laws of India. The courts at Ahmedabad, Gujarat, have exclusive jurisdiction
          over any dispute that arises from them.
        </p>
      </LegalSection>

      <LegalSection id="contact" number={12} title="Contact">
        <p>
          Questions about these terms? Email <a className={linkClass} href={`mailto:${EMAIL}`}>{EMAIL}</a> or write to
          us at {ADDRESS_LINES.join(", ")}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
