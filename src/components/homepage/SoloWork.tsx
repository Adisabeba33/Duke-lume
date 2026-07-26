import Link from "next/link";
import { getArtwork } from "@/content/artworks";
import { getCollection } from "@/content/collections";
import { ArtworkImage } from "@/components/artwork/ArtworkImage";
import { Reveal } from "@/components/ui/Reveal";

/**
 * One small work adrift in a large field of empty space (§1, §3). The sudden
 * drop in scale after the dense featured grid is the surprise — whitespace as
 * a compositional element, not a gap.
 */
export function SoloWork({
  artworkId,
  align = "right",
}: {
  artworkId: string;
  align?: "left" | "right";
}) {
  const artwork = getArtwork(artworkId);
  if (!artwork) return null;
  const collection = artwork.collectionId
    ? getCollection(artwork.collectionId)
    : undefined;

  return (
    <section className="container-gallery py-[clamp(96px,18vw,240px)]">
      <div className="grid grid-cols-12">
        <Reveal
          className={
            align === "right"
              ? "col-span-9 col-start-4 sm:col-span-5 sm:col-start-8"
              : "col-span-9 sm:col-span-5"
          }
        >
          <Link href={`/artwork/${artwork.slug}`} className="group block">
            <ArtworkImage
              artwork={artwork}
              sizes="(max-width: 768px) 75vw, 33vw"
              className="group-hover:[&_img]:scale-[1.02]"
            />
            <div className="mt-4">
              <h2 className="font-[family-name:var(--font-serif)] text-[22px] leading-tight transition-opacity duration-300 group-hover:opacity-70">
                {artwork.title}
              </h2>
              <p className="mt-1 type-micro text-[var(--color-text-secondary)]">
                {collection ? collection.title : "Duke&Lume"} · {artwork.year}
              </p>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
