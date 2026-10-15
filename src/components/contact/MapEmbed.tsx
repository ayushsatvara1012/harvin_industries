"use client";

import { useState } from "react";
import { Icon } from "@/components/ui";

const FRAME_HEIGHT = "h-[320px] sm:h-[420px] lg:h-[480px]";

// The embed sets Google cookies the moment it loads, so it only loads on request.
export function MapEmbed({ src, title }: { src: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={src}
        title={title}
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className={`block w-full border-0 ${FRAME_HEIGHT}`}
      />
    );
  }

  return (
    <div className={`flex w-full flex-col items-center justify-center gap-4 bg-brand-surface-alt px-6 text-center ${FRAME_HEIGHT}`}>
      <Icon name="map" className="text-5xl text-brand-accent-text" />
      <p className="max-w-sm text-sm text-brand-text-secondary">
        The map is provided by Google, which sets its own cookies when it loads.
      </p>
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-yellow-light"
      >
        Load the map
      </button>
    </div>
  );
}
