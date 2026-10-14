import Link from "next/link";
import { secondaryButtonClass } from "@/components/admin/fields";

export default function PanelNotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="font-display text-4xl tracking-tight text-brand-ink">Not found</h1>
      <p className="mt-3 text-sm text-brand-text-secondary">That product does not exist. It may have been deleted.</p>
      <Link href="/admin/products" className={`${secondaryButtonClass} mt-6`}>
        Back to products
      </Link>
    </div>
  );
}
