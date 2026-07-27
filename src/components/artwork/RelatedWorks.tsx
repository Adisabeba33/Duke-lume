import { getArtwork, getRelatedArtworks } from "@/content/artworks";
import { getCollection } from "@/content/collections";
import { ArtworkCard } from "./ArtworkCard";
import { SectionLabel } from "@/components/typography/SectionLabel";

/** Companions for the current work (§21). Curator-chosen first, then the same
 *  collection, then shared tags / style / orientation. */
export function RelatedWorks({ current }: { current: string }) {
  const artwork = getArtwork(current);
  if (!artwork) return null;

  const picks = getRelatedArtworks(current, 3);
  if (picks.length === 0) return null;

  const collection = artwork.collectionId
    ? getCollection(artwork.collectionId)
    : undefined;
  // Only claim the collection when every pick really comes from it.
  const allSame =
    !!collection && picks.every((p) => p.collectionId === artwork.collectionId);
  const label = allSame ? `More from ${collection!.title}` : "You may also like";

  return (
    <section className="mt-24 border-t border-[var(--color-line)] pt-14 md:mt-32">
      <SectionLabel withRule className="mb-10">
        {label}
      </SectionLabel>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {picks.map((a) => (
          <ArtworkCard
            key={a.id}
            artwork={a}
            sizes="(max-width: 768px) 50vw, 30vw"
          />
        ))}
      </div>
    </section>
  );
}
