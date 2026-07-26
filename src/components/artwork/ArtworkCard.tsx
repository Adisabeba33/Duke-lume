import { Link } from "next-view-transitions";
import type { Artwork } from "@/content/types";
import { getCollection } from "@/content/collections";
import { ArtworkImage } from "./ArtworkImage";

/**
 * A single work in a grid. No decorative frame (§8.2, §33).
 * Desktop: faint overlay + caption on hover, image scales ~1.02.
 * Mobile: a permanent minimal caption below the image.
 */
export function ArtworkCard({
  artwork,
  sizes,
  className = "",
}: {
  artwork: Artwork;
  sizes: string;
  className?: string;
}) {
  const collection = artwork.collectionId
    ? getCollection(artwork.collectionId)
    : undefined;

  return (
    <Link
      href={`/artwork/${artwork.slug}`}
      className={`group block ${className}`}
      aria-label={`${artwork.title}, ${artwork.year}`}
    >
      <div
        className="relative overflow-hidden"
        style={{ viewTransitionName: `art-${artwork.slug}` }}
      >
        <ArtworkImage
          artwork={artwork}
          sizes={sizes}
          className="h-full group-hover:[&_img]:scale-[1.02]"
        />

        {/* Desktop hover overlay — very light (§8.2) */}
        <div className="pointer-events-none absolute inset-0 hidden items-end bg-gradient-to-t from-black/35 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 md:flex">
          <div className="flex w-full items-end justify-between p-4 lg:p-5">
            <div>
              <p className="font-[family-name:var(--font-serif)] text-[19px] leading-tight text-white">
                {artwork.title}
              </p>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-white/70">
                {artwork.year}
                {collection ? ` · ${collection.title}` : ""}
              </p>
            </div>
            <span
              aria-hidden
              className="translate-x-1 text-white opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
            >
              →
            </span>
          </div>
        </div>
      </div>

      {/* Mobile caption — always visible */}
      <div className="mt-2.5 flex items-baseline justify-between md:hidden">
        <span className="font-[family-name:var(--font-serif)] text-[16px]">
          {artwork.title}
        </span>
        <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
          {artwork.year}
        </span>
      </div>
    </Link>
  );
}
