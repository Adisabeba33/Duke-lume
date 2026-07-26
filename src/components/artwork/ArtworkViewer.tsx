"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { Artwork } from "@/content/types";
import { SectionLabel } from "@/components/typography/SectionLabel";

interface DetailImage {
  src: string;
  alt: string;
}

/**
 * The interactive media for an artwork page (§7, §8, §10):
 * - hero shown whole (never cropped), with an expand control
 * - a "Details" section of large close-ups
 * - a fullscreen lightbox with click-to-zoom / pan, Escape + backdrop to close
 *
 * The textual info column is passed as children so it can stay server-rendered.
 */
export function ArtworkViewer({
  artwork,
  details,
  children,
}: {
  artwork: Artwork;
  details: DetailImage[];
  children: ReactNode;
}) {
  const [box, setBox] = useState<{ src: string; alt: string } | null>(null);
  const open = useCallback(
    (src: string, alt: string) => setBox({ src, alt }),
    []
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        {/* hero — shown whole */}
        <div className="md:col-span-8">
          <button
            type="button"
            onClick={() => open(artwork.image.src!, artwork.image.alt)}
            aria-label="View full image"
            style={{ viewTransitionName: `art-${artwork.slug}` }}
            className="group relative block w-full cursor-zoom-in border border-[var(--color-line)] bg-[var(--color-surface)]"
          >
            <Image
              src={artwork.image.src!}
              alt={artwork.image.alt}
              width={artwork.image.width}
              height={artwork.image.height}
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
              className="h-auto w-full"
            />
            <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-black/35 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <ExpandIcon />
            </span>
          </button>
        </div>

        {/* info column (server-rendered) */}
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">{children}</div>
        </div>
      </div>

      {/* Details / close-ups */}
      {details.length > 0 && (
        <section className="mt-20 md:mt-28">
          <div className="mb-8 flex items-center justify-between">
            <SectionLabel withRule>Details</SectionLabel>
            <button
              type="button"
              onClick={() => open(artwork.image.src!, artwork.image.alt)}
              className="group inline-flex items-center gap-2 type-micro"
            >
              <span className="link-underline">View full image</span>
              <ExpandIcon className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {details.map((d, i) => (
              <button
                key={d.src}
                type="button"
                onClick={() => open(d.src, d.alt)}
                aria-label={`View detail ${i + 1} full size`}
                className={`relative block cursor-zoom-in overflow-hidden bg-[var(--color-surface)] ${
                  i === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <Image
                  src={d.src}
                  alt={d.alt}
                  width={1100}
                  height={1100}
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="h-auto w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02]"
                />
              </button>
            ))}
          </div>
        </section>
      )}

      {box && (
        <Lightbox
          src={box.src}
          alt={box.alt}
          title={artwork.title}
          onClose={() => setBox(null)}
        />
      )}
    </>
  );
}

function Lightbox({
  src,
  alt,
  title,
  onClose,
}: {
  src: string;
  alt: string;
  title: string;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — full image`}
      tabIndex={-1}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0b0a]/[0.98] p-4 md:p-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center text-[26px] text-white/70 transition-colors hover:text-white"
      >
        <span aria-hidden>×</span>
      </button>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onClick={(e) => {
          e.stopPropagation();
          if (!zoom) {
            const r = e.currentTarget.getBoundingClientRect();
            setOrigin(
              `${((e.clientX - r.left) / r.width) * 100}% ${
                ((e.clientY - r.top) / r.height) * 100
              }%`
            );
          }
          setZoom((z) => !z);
        }}
        onMouseMove={(e) => {
          if (!zoom) return;
          const r = e.currentTarget.getBoundingClientRect();
          setOrigin(
            `${((e.clientX - r.left) / r.width) * 100}% ${
              ((e.clientY - r.top) / r.height) * 100
            }%`
          );
        }}
        style={{ transformOrigin: origin }}
        className={`max-h-full max-w-full select-none object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          zoom ? "scale-[2] cursor-zoom-out" : "scale-100 cursor-zoom-in"
        }`}
      />

      <span className="pointer-events-none absolute bottom-6 left-0 right-0 text-center type-micro text-white/50">
        {title}
      </span>
    </div>
  );
}

function ExpandIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M9 3H3v6M15 3h6v6M21 15v6h-6M3 15v6h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
