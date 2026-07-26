import type { MetadataRoute } from "next";
import { artworks } from "@/content/artworks";
import { collections } from "@/content/collections";

const BASE = "https://dukelume.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/gallery", "/collections", "/about", "/contact"].map(
    (path) => ({ url: `${BASE}${path}`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : 0.7 })
  );

  const artworkRoutes = artworks
    .filter((a) => a.status !== "hidden" && a.status !== "draft")
    .map((a) => ({ url: `${BASE}/artwork/${a.slug}`, priority: 0.6 }));

  const collectionRoutes = collections.map((c) => ({
    url: `${BASE}/collections/${c.slug}`,
    priority: 0.6,
  }));

  return [...staticRoutes, ...collectionRoutes, ...artworkRoutes];
}
