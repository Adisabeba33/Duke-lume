import type { Metadata } from "next";
import { getGalleryArtworks } from "@/content/artworks";
import { SectionLabel } from "@/components/typography/SectionLabel";
import { GalleryView } from "@/components/gallery/GalleryView";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "The complete body of work by Duke&Lume — an exhibition and archive across painterly, modern, photorealistic and abstract styles.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const artworks = getGalleryArtworks();

  return (
    <section className="container-gallery pb-24 pt-[120px] md:pt-[150px]">
      <div className="mb-10 max-w-[52ch] md:mb-14">
        <SectionLabel withRule>Gallery</SectionLabel>
        <h1 className="type-display mt-6">A complete archive of works.</h1>
        <p className="type-body mt-6 text-[var(--color-text-secondary)]">
          {artworks.length} works, across many styles and moods. View the curated
          exhibition, or open the archive to filter by collection, style,
          orientation and year.
        </p>
      </div>

      <GalleryView artworks={artworks} />
    </section>
  );
}
