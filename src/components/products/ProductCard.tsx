import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import {
  CATEGORY_LABELS,
  MATERIAL_LABELS,
  type Product,
} from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];
  const meta =
    product.type === "machine"
      ? [product.outputCapacity && `Up to ${product.outputCapacity.toLocaleString()} pcs/hr`, product.power]
          .filter(Boolean)
          .join(" · ")
      : product.material
        ? MATERIAL_LABELS[product.material]
        : undefined;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="rounded-xl border border-brand-border bg-brand-surface p-6"
    >
      <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-lg bg-brand-cream">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            quality={85}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Icon name="deployed_code" className="text-4xl text-brand-clay" />
          </div>
        )}
      </div>
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-text-secondary">
        {CATEGORY_LABELS[product.category]}
      </p>
      <h3 className="mt-1 font-display text-2xl text-brand-ink">{product.name}</h3>
      <p className="mt-2 text-sm text-brand-text-secondary">
        {meta || product.tagline}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-ink">
        View details
        <Icon name="arrow_forward" className="text-base" />
      </span>
    </Link>
  );
}
