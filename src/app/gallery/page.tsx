import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { artworks } from "@/content/artworks";

export const metadata: Metadata = {
  title: "Gallery",
  description: "All works by Duke&Lume — an exhibition and archive.",
};

export default function GalleryPage() {
  const count = artworks.filter((a) => a.status !== "hidden").length;
  return (
    <PagePlaceholder
      label="Gallery"
      title="A complete archive of works."
      note={`${count} works. The Exhibition and Archive views, filters and the full editorial grid arrive in the next stage — the foundation, layout system and content model are already in place.`}
    />
  );
}
