import { COMPANY_ABOUT } from "@/data/company";
import { ADDRESS_LINES, EMAIL, PHONE } from "@/data/contact";
import { getAllProducts } from "@/lib/products";
import { CATEGORY_LABELS } from "@/lib/product-types";
import { IS_INDEXABLE, SITE_NAME, SITE_URL } from "@/lib/site";

// Plain-text summary for AI assistants and answer engines. Read per request from
// the tagged catalog cache so a newly published machine appears without a rebuild.
export const dynamic = "force-dynamic";

export async function GET() {
  if (!IS_INDEXABLE) return new Response("Not found", { status: 404 });

  const products = await getAllProducts().catch(() => []);
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${COMPANY_ABOUT}`,
    "",
    "## Pages",
    `- [Products](${SITE_URL}/products): full machine range with specifications`,
    `- [About](${SITE_URL}/about): company, vision, mission and certification`,
    `- [Contact](${SITE_URL}/contact): request a quotation`,
    "",
    "## Machines",
    ...products.map(
      (product) =>
        `- [${product.name}](${SITE_URL}/products/${product.slug}): ${CATEGORY_LABELS[product.category]}. ${product.tagline}`,
    ),
    "",
    "## Contact",
    `- Address: ${ADDRESS_LINES.join(", ")}`,
    `- Phone: ${PHONE}`,
    `- Email: ${EMAIL}`,
    "- Prices are not published. Request a quotation through the contact page.",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
