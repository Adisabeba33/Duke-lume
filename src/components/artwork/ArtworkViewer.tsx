"use client";

import Image from "next/image";
import { useMemo, useState, type ReactNode } from "react";
import type { Artwork } from "@/content/types";
import { SectionLabel } from "@/components/typography/SectionLabel";
import { Lightbox, type LightboxImage } from "./Lightbox";

interface DetailImage {
  src: string;
  alt: string;
}

/**
 * The interactive media for an artwork page (§7, §8, §10, §19):
 * - hero shown whole (never cropped), opening the viewer
 * - a "Details" section of large close-ups, each opening at its own index
 * - one shared fullscreen viewer across the work and all its details
 *
 * The textual column is passed as children so it stays server-rendered.
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
  const [openAt, setOpenAt] = useState<number | null>(null);

  const images = useMemo<LightboxImage[]>(
    () => [
      {
        src: artwork.image.src!,
        alt: artwork.image.alt,
        label: `${artwork.title} — full work`,
      },
      ...details.map((d, i) => ({
        src: d.src,
        alt: d.alt,
        label: `${artwork.title} — detail ${i + 1}`,
      })),
    ],
    [artwork, details]
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        {/* hero — shown whole */}
        <div className="md:col-span-8">
          <button
            type="button"
            onClick={() => setOpenAt(0)}
            aria-label="View full image"
            aria-haspopup="dialog"
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
              onClick={() => setOpenAt(0)}
              aria-haspopup="dialog"
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
                onClick={() => setOpenAt(i + 1)}
                aria-label={`View detail ${i + 1} full size`}
                aria-haspopup="dialog"
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

      {openAt !== null && (
        <Lightbox
          images={images}
          startIndex={openAt}
          title={artwork.title}
          onClose={() => setOpenAt(null)}
        />
      )}
    </>
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
