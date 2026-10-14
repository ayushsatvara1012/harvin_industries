import type { Metadata } from "next";
import { NotFoundContent, SiteShell } from "@/components/layout";

export const metadata: Metadata = { title: "Page Not Found — Harvin Industries" };

// Reached only for URLs that match no route, which sit outside the (site) layout,
// so this one has to bring its own header and footer.
export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundContent />
    </SiteShell>
  );
}
