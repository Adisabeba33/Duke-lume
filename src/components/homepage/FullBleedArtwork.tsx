import Link from "next/link";
import { getArtwork } from "@/content/artworks";
import { getCollection } from "@/content/collections";
import { ArtworkImage } from "@/components/artwork/ArtworkImage";
import { Reveal } from "@/components/ui/Reveal";

/** One full-width work between sections — breaks the "page" feeling and
 *  restores the sense of an exhibition (§8.5). */
export function FullBleedArtwork({ artworkId }: { artworkId: string }) {
  const artwork = getArtwork(artworkId);
  if (!artwork) return null;
  const collection = artwork.collectionId
    ? getCollection(artwork.collectionId)
    : undefined;

  return (
    <section className="relative">
      <div className="relative h-[75svh] min-h-[440px] w-full md:h-[92svh]">
        <ArtworkImage artwork={artwork} sizes="100vw" cover />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="container-gallery pb-10 md:pb-14">
            {/* caption fades in a beat after the image (§2) */}
            <Reveal
              delay={450}
              className="flex flex-col gap-4 text-[var(--color-dark-text)] md:flex-row md:items-end md:justify-between"
            >
              <div>
                <p className="type-micro text-white/70">
                  {collection ? collection.title : "Duke&Lume"} · {artwork.year}
                </p>
                <h2 className="type-h1 mt-3 text-white">{artwork.title}</h2>
              </div>
              <Link
                href={`/artwork/${artwork.slug}`}
                className="pointer-events-auto"
              >
                <span className="inline-flex items-center gap-3 type-micro text-white">
                  <span className="link-underline">View Artwork</span>
                  <span aria-hidden>→</span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
