// Contact details for /contact and the footer.
//
// ─────────────────────────────────────────────────────────────────────────────
// PLACEHOLDERS TO REPLACE — everything marked `mock: true` below is a stand-in.
// Swap the value and delete the `mock` flag; anything still flagged renders with
// a small "to be confirmed" marker on the page so a placeholder can never ship
// unnoticed. The address, phone and GSTIN come from the brochure and are real.
// ─────────────────────────────────────────────────────────────────────────────

export type ContactDetail = {
  icon: string;
  label: string;
  /** Display value. */
  value: string;
  /** Optional second line, e.g. an alternate number. */
  secondary?: string;
  /** `tel:` / `mailto:` / map link. Omit for plain text. */
  href?: string;
  /** True while the value is a placeholder the owner still has to supply. */
  mock?: boolean;
};

export const ADDRESS_LINES = [
  "Shed No 28, NK Industrial Park",
  "Gatrad Bakrol Bujrang Kuha Road",
  "Bakrol Bujrang, Ahmedabad",
  "Gujarat 382430, India",
];

export const PHONE = "+91 98985 75358";
export const PHONE_HREF = "tel:+919898575358";
export const EMAIL = "info@harvinindustries.com";
export const GSTIN = "24FNRPS3414P1Z7";

export const CONTACT_DETAILS: ContactDetail[] = [
  {
    icon: "location_on",
    label: "Factory & Office",
    value: ADDRESS_LINES.join(", "),
    href: "https://www.google.com/maps/search/?api=1&query=NK+Industrial+Park+Bakrol+Bujrang+Ahmedabad+382430",
  },
  {
    icon: "call",
    label: "Phone",
    value: PHONE,
    secondary: "+91 00000 00000",
    href: PHONE_HREF,
    mock: true,
  },
  {
    icon: "mail",
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    mock: true,
  },
  {
    icon: "person",
    label: "Speak To",
    value: "Mr. Dhaval Sathwara",
    secondary: "Founder, Harvin Industries",
  },
  {
    icon: "receipt_long",
    label: "GSTIN",
    value: GSTIN,
  },
];

export const BUSINESS_HOURS = [
  { days: "Monday", hours: "9:30 AM – 6:00 PM" },
  { days: "Tuesday", hours: "Closed" },
  { days: "Wednesday – Sunday", hours: "9:30 AM – 6:00 PM" },
];

// Keyless Google Maps embed driven by the address query. Replace with the exact
// "Embed a map" URL from the Google Business listing once that profile exists,
// so the pin lands on the shed rather than the industrial park centroid.
export const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=NK+Industrial+Park,+Gatrad+Bakrol+Bujrang+Kuha+Road,+Bakrol+Bujrang,+Ahmedabad,+Gujarat+382430&output=embed";

export const MAP_IS_MOCK = true;

// Volume bands, phrased the way a buyer thinks about it rather than in specs.
// Mirrors the HI-1500 / HI-2000 / HI-3000 split on the /products comparison.
export const OUTPUT_BANDS = [
  "Under 10,000 bricks per day",
  "10,000 – 15,000 bricks per day",
  "15,000 – 20,000 bricks per day",
  "Over 20,000 bricks per day",
  "Not sure yet",
];
