import { artworks, getArtworksByCollection } from "@/content/artworks";
import { getCollection } from "@/content/collections";
import { ArtworkCard } from "./ArtworkCard";
import { SectionLabel } from "@/components/typography/SectionLabel";

/** "You may also like" — prefers the same collection, then fills with others
 *  (§13). Deepens exploration without dead ends. */
export function RelatedWorks({ current }: { current: string }) {
  const artwork = artworks.find((a) => a.slug === current);
  if (!artwork) return null;

  const sameCollection = artwork.collectionId
    ? getArtworksByCollection(artwork.collectionId).filter(
        (a) => a.slug !== current
      )
    : [];
  const others = artworks.filter(
    (a) => a.slug !== current && !sameCollection.includes(a)
  );
  const picks = [...sameCollection, ...others].slice(0, 3);
  if (picks.length === 0) return null;

  const collection = artwork.collectionId
    ? getCollection(artwork.collectionId)
    : undefined;
  // Only claim "More from <collection>" when every pick truly is from it.
  const allSameCollection = picks.every((p) => sameCollection.includes(p));
  const label =
    allSameCollection && collection
      ? `More from ${collection.title}`
      : "You may also like";

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
