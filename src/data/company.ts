// Company narrative content — About, Vision, Mission, Key Factors and the
// founder's message. Sourced verbatim in substance from the owner-supplied
// "harvin about us, vision details" document in `public/`, lightly edited for
// sentence flow. This is the single home for this copy: the homepage shows a
// trimmed intro and icon labels, `/about` carries the full text.

// Split so the homepage can lead with the styled "HARVIN INDUSTRIES" wordmark
// and continue into the same sentence, without a second copy of the text.
export const COMPANY_INTRO_PREDICATE =
  " is a trusted Ahmedabad-based manufacturer of Fly Ash Brick, Concrete Brick, and Paver Block Making Machines. ISO 9001:2015 certified, we combine precision engineering with robust design to deliver machines built for performance, durability, and consistent output.";

export const COMPANY_INTRO = `Harvin Industries${COMPANY_INTRO_PREDICATE}`;

export const COMPANY_ABOUT = `${COMPANY_INTRO} From small enterprises to large-scale production units, our solutions empower businesses across India to meet growing construction demands — backed by dedicated technical support every step of the way.`;

export const VISION =
  "To empower every builder, entrepreneur, and contractor with world-class brick making solutions that set new standards in efficiency, durability, and productivity.";

export type Pillar = { icon: string; title: string; body: string };

export const MISSION: Pillar[] = [
  {
    icon: "verified",
    title: "Quality Without Compromise",
    body: "To manufacture brick and block making machines that meet the highest standards of precision, durability, and performance — backed by ISO 9001:2015 certification.",
  },
  {
    icon: "group",
    title: "Customer-First Approach",
    body: "To understand the unique needs of every client and deliver tailored solutions with reliable after-sales support and technical assistance.",
  },
  {
    icon: "trending_up",
    title: "Empowering Growth",
    body: "To enable entrepreneurs, contractors, and manufacturers across India to scale their production efficiently with cost-effective and high-output machinery.",
  },
  {
    icon: "lightbulb",
    title: "Innovation & Advancement",
    body: "To continuously evolve our products through research and engineering, staying ahead of industry demands and construction trends.",
  },
];

export const KEY_FACTORS: Pillar[] = [
  {
    icon: "workspace_premium",
    title: "ISO 9001:2015 Certified Manufacturing",
    body: "Every machine is built under a strict quality management system, ensuring consistent performance, precision engineering, and long-lasting reliability.",
  },
  {
    icon: "precision_manufacturing",
    title: "Advanced Technology & Robust Design",
    body: "Our machines are engineered with high-grade materials and modern manufacturing techniques, delivering maximum output with minimal maintenance.",
  },
  {
    icon: "support_agent",
    title: "Pan-India Reach & Strong Support Network",
    body: "From installation to after-sales service, we stand by our customers across India — ensuring minimal downtime and maximum productivity.",
  },
  {
    icon: "tune",
    title: "Customised Solutions for Every Scale",
    body: "Whether you are a startup unit or a large-scale producer, we offer flexible machine models tailored to match your production capacity and budget.",
  },
];

export const FOUNDER = {
  name: "Mr. Dhaval Sathwara",
  role: "Harvin Industries, Ahmedabad",
  paragraphs: [
    "It is with great pride and enthusiasm that I introduce you to Harvin Industries, a company built on innovation, precision, and a commitment to excellence in machinery — with a primary focus on brick manufacturing plants.",
    "As a new player in the industry, Harvin Industries brings fresh energy, cutting-edge technology, and a vision to revolutionise the brick industry. We understand that efficiency, safety, and reliability are at the heart of any brick plant, and our mission is to deliver high-performance brick machines that meet and exceed industry standards.",
    "We combine advanced engineering, durable materials, and state-of-the-art manufacturing processes to build plants that are smart, sustainable, and cost-effective.",
    "Though we may be new, our passion, expertise, and commitment set us apart. We look forward to building strong partnerships, fostering innovation, and making a lasting impact in the brick manufacturing industry.",
  ],
  closing:
    "On behalf of the entire Harvin Industries family, thank you for your time and trust. We believe every brick laid with our machine carries our commitment to quality — and your vision for a better tomorrow.",
};

// Factual, verifiable stat line used on the homepage. Deliberately holds no
// machine-count or customer-count claims: the founder's own message describes
// Harvin as a new entrant, so those numbers would not be defensible.
export const COMPANY_STATS = [
  { icon: "workspace_premium", value: "ISO", label: "9001:2015 Certified" },
  { icon: "precision_manufacturing", value: "3", label: "Press Machine Models" },
  { icon: "grid_view", value: "9", label: "Product Forms Produced" },
  { icon: "support_agent", value: "India", label: "Pan-India Service Reach" },
];
