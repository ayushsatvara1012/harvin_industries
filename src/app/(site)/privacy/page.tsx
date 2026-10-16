import type { Metadata } from "next";
import { LegalList, LegalPage, LegalSection, type LegalSectionLink } from "@/components/legal";
import { ADDRESS_LINES, EMAIL, GSTIN, PHONE } from "@/data/contact";
import { OG_IMAGE, OG_IMAGES, SITE_NAME } from "@/lib/site";

const title = "Privacy Policy — Harvin Industries";
const description =
  "What personal information Harvin Industries collects through this website, why, who it is shared with, how long it is kept, and how to exercise your rights.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { title, description, url: "/privacy", siteName: SITE_NAME, type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
};

const SECTIONS: LegalSectionLink[] = [
  { id: "who-we-are", title: "Who we are" },
  { id: "what-we-collect", title: "Information we collect" },
  { id: "how-we-use-it", title: "How we use it" },
  { id: "who-we-share-with", title: "Who we share it with" },
  { id: "cookies", title: "Cookies and tracking" },
  { id: "retention", title: "How long we keep it" },
  { id: "security", title: "Security" },
  { id: "your-rights", title: "Your rights" },
  { id: "children", title: "Children" },
  { id: "changes", title: "Changes to this policy" },
  { id: "contact", title: "Contact and grievances" },
];

const linkClass = "font-semibold text-brand-accent-text underline underline-offset-2 hover:text-brand-ink";

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="We collect only what we need to answer your enquiry, and we do not sell it. This page explains exactly what that means."
      sections={SECTIONS}
    >
      <LegalSection id="who-we-are" number={1} title="Who we are">
        <p>
          This website, harvinindustries.com, is run by Harvin Industries, a manufacturer of fly ash brick, concrete
          brick and paver block making machines (GSTIN {GSTIN}). Our address is {ADDRESS_LINES.join(", ")}.
        </p>
        <p>
          In this policy, &ldquo;we&rdquo; and &ldquo;us&rdquo; mean Harvin Industries. We decide why and how the
          personal information described below is used, so we are responsible for it under Indian data protection law,
          including the Digital Personal Data Protection Act, 2023.
        </p>
      </LegalSection>

      <LegalSection id="what-we-collect" number={2} title="Information we collect">
        <p>
          <strong>Information you give us.</strong> When you send an enquiry through the contact form we receive what
          you type into it:
        </p>
        <LegalList>
          <li>your name and phone number (required);</li>
          <li>your company name, email address and location (optional);</li>
          <li>the machine you are interested in and your expected daily output (optional);</li>
          <li>any message you write.</li>
        </LegalList>
        <p>
          If you phone or email us instead, we keep the details you share in the same way. Please do not include
          anything sensitive, such as bank or identity numbers, in the message box. We never need them to give a
          quotation.
        </p>
        <p>
          <strong>Information collected automatically.</strong> Like any website, our hosting provider processes your
          IP address, browser type, the pages you request and the time of each request in standard server logs. We use
          this to keep the site secure and reliable. We do not use it to identify you personally.
        </p>
        <p>
          We do not run user accounts, take online payments or ask for card details on this website.
        </p>
      </LegalSection>

      <LegalSection id="how-we-use-it" number={3} title="How we use it">
        <LegalList>
          <li>To reply to your enquiry, call you back and prepare a quotation for the machine you asked about.</li>
          <li>To give technical, installation and after-sales information relating to your enquiry.</li>
          <li>To keep records of enquiries and quotations that our business needs to keep.</li>
          <li>To protect the website from spam, abuse and security threats.</li>
          <li>To meet legal obligations where we are required to.</li>
        </LegalList>
        <p>
          We use your information because you gave it to us for these purposes, which is your consent. We do not use it
          for advertising, we do not make automated decisions about you, and we do not sell or rent it to anyone.
        </p>
      </LegalSection>

      <LegalSection id="who-we-share-with" number={4} title="Who we share it with">
        <p>
          We use a small number of service providers to run the website. They process information on our behalf and
          only for that purpose:
        </p>
        <LegalList>
          <li>
            <strong>Cloudflare</strong> hosts the website and delivers it to your browser, so it sees the technical
            information in section 2.
          </li>
          <li>
            <strong>Neon</strong> provides the database where enquiries are stored. It runs in Singapore.
          </li>
          <li>
            <strong>Cloudinary</strong> delivers the machine photographs, so your browser connects to it when product
            images load.
          </li>
          <li>
            <strong>Google</strong> supplies the icon font used across the site and the map on the contact page. Your
            browser connects to Google to load them, which shares your IP address with Google. Google&rsquo;s own
            privacy policy applies to that.
          </li>
        </LegalList>
        <p>
          Some of these providers handle data outside India. We also disclose information if the law, a court or a
          government authority requires it. We do not share your enquiry with anyone else.
        </p>
      </LegalSection>

      <LegalSection id="cookies" number={5} title="Cookies and tracking">
        <p>
          This website does not use advertising, analytics or tracking cookies, and it does not follow you across other
          sites. The only cookie we set is a sign-in cookie for our own staff in the admin area, which visitors never
          receive.
        </p>
        <p>
          The map on the contact page is provided by Google. It loads only after you choose &quot;Load the map&quot;, and
          Google may then set its own cookies under its own policy.
        </p>
      </LegalSection>

      <LegalSection id="retention" number={6} title="How long we keep it">
        <p>
          We keep an enquiry for as long as we need it to answer you and to deal with any quotation or order that
          follows. After that we delete it or remove anything that identifies you. If you would like it deleted sooner,
          tell us and we will do so, unless we are legally required to keep it.
        </p>
      </LegalSection>

      <LegalSection id="security" number={7} title="Security">
        <p>
          The website is served over HTTPS, enquiries are stored in an access-controlled database, and the admin area
          that can read them is protected by a password-based sign-in limited to the business owner. No system is
          completely secure, so we cannot promise absolute security, but we take reasonable steps to protect your
          information.
        </p>
      </LegalSection>

      <LegalSection id="your-rights" number={8} title="Your rights">
        <p>You can ask us at any time to:</p>
        <LegalList>
          <li>tell you what personal information we hold about you and why;</li>
          <li>correct information that is wrong or out of date;</li>
          <li>erase your information;</li>
          <li>stop using your information, by withdrawing the consent you gave when you submitted the form.</li>
        </LegalList>
        <p>
          Write to <a className={linkClass} href={`mailto:${EMAIL}`}>{EMAIL}</a> and we will respond within a
          reasonable time. If you are not satisfied with our response, you may complain to the Data Protection Board
          of India.
        </p>
      </LegalSection>

      <LegalSection id="children" number={9} title="Children">
        <p>
          This website is for businesses and contractors. It is not directed at anyone under 18, and we do not
          knowingly collect information from children.
        </p>
      </LegalSection>

      <LegalSection id="changes" number={10} title="Changes to this policy">
        <p>
          If we change how we handle personal information, we will update this page and the &ldquo;Last updated&rdquo;
          date above. The version on this page is the one that applies.
        </p>
      </LegalSection>

      <LegalSection id="contact" number={11} title="Contact and grievances">
        <p>For any privacy question, request or complaint, contact:</p>
        <address className="not-italic leading-relaxed">
          <strong>Harvin Industries</strong>, attention Mr. Dhaval Sathwara, Founder
          <br />
          {ADDRESS_LINES.join(", ")}
          <br />
          Email: <a className={linkClass} href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <br />
          Phone: <a className={linkClass} href="tel:+919898575358">{PHONE}</a>
        </address>
      </LegalSection>
    </LegalPage>
  );
}
