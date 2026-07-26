import Image from "next/image";
import Link from "next/link";
import { getArtwork } from "@/content/artworks";
import { getCollection } from "@/content/collections";
import { Reveal } from "@/components/ui/Reveal";

/**
 * A single work spotlit on a dark wall — a full-height "museum moment" with no
 * interface, where the caption fades in a beat after the work (§2, §11). The
 * dark mood deliberately contrasts the light cover-crop full-bleed elsewhere.
 */
export function MuseumMoment({ artworkId }: { artworkId: string }) {
  const artwork = getArtwork(artworkId);
  if (!artwork || !artwork.image.src) return null;
  const collection = artwork.collectionId
    ? getCollection(artwork.collectionId)
    : undefined;

  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center gap-8 bg-[var(--color-dark-section)] px-6 py-24 text-[var(--color-dark-text)]">
      <Link
        href={`/artwork/${artwork.slug}`}
        className="group flex flex-col items-center gap-8"
      >
        <Reveal className="flex justify-center">
          <Image
            src={artwork.image.src}
            alt={artwork.image.alt}
            width={artwork.image.width}
            height={artwork.image.height}
            sizes="(max-width: 768px) 88vw, 45vh"
            className="max-h-[74svh] w-auto object-contain shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.01]"
          />
        </Reveal>

        {/* caption — appears a moment later */}
        <Reveal delay={500} className="text-center">
          <p className="type-micro text-[var(--color-dark-text)]/55">
            {collection ? collection.title : "Duke&Lume"} · {artwork.year}
          </p>
          <h2 className="type-h2 mt-3">{artwork.title}</h2>
          <span className="mt-4 inline-flex items-center gap-2 type-micro text-[var(--color-dark-text)]/80">
            <span className="link-underline">View Artwork</span>
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </Reveal>
      </Link>
    </section>
  );
}
