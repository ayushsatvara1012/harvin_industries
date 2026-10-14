import type { Metadata } from "next";
import { NotFoundContent } from "@/components/layout";

export const metadata: Metadata = { title: "Page Not Found — Harvin Industries" };

// A notFound() thrown inside (site) is already wrapped by the (site) layout's
// header and footer, so this renders the message alone.
export default function SiteNotFound() {
  return <NotFoundContent />;
}
