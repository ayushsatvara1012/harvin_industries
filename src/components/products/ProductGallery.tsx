"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const mainImage = images[active];

  return (
    <div className="grid gap-4">
      <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-brand-cream">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Icon name="deployed_code" className="text-6xl text-brand-clay" />
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex flex-wrap gap-4">
          {images.map((image, idx) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(idx)}
              aria-current={idx === active}
              aria-label={`Show image ${idx + 1} of ${images.length}`}
              className={`relative aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-lg bg-brand-cream transition-all sm:w-24 ${
                idx === active
                  ? "ring-2 ring-brand-accent"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={image} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
