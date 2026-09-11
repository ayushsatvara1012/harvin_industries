"use client";

import Image from "next/image";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export type LazyVideoHandle = {
  play: () => void;
};

type LazyVideoProps = {
  src: string;
  poster: string;
  posterAlt: string;
  className?: string;
  sizes?: string;
  /** Shows a small pause/play toggle once the video is mounted (WCAG 2.2.2). */
  showControls?: boolean;
};

/**
 * Mounts <video> only once it nears the viewport (IntersectionObserver) and
 * never mounts it at all under prefers-reduced-motion — the poster (routed
 * through next/image) stands in until then. A display:none ancestor (e.g. a
 * `hidden lg:block` responsive twin) never intersects, so an off-screen copy
 * never downloads its source either.
 */
export const LazyVideo = forwardRef<LazyVideoHandle, LazyVideoProps>(function LazyVideo(
  { src, poster, posterAlt, className, sizes = "100vw", showControls = false },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || !containerRef.current || shouldLoad) return;
    const el = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, shouldLoad]);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (reducedMotion) return;
      setShouldLoad(true);
      requestAnimationFrame(() => videoRef.current?.play());
    },
  }));

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad && !reducedMotion ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        />
      ) : (
        <Image src={poster} alt={posterAlt} fill sizes={sizes} className="object-cover" />
      )}

      {showControls && shouldLoad && !reducedMotion && (
        <button
          type="button"
          onClick={() => {
            const v = videoRef.current;
            if (!v) return;
            if (v.paused) {
              v.play();
              setIsPaused(false);
            } else {
              v.pause();
              setIsPaused(true);
            }
          }}
          aria-label={isPaused ? "Play video" : "Pause video"}
          className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/15 hover:bg-black/80 transition-colors"
        >
          {isPaused ? (
            <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
});
