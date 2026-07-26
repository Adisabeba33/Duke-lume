import type { Artwork } from "./types";

// ---------------------------------------------------------------------------
// Artworks.
//
// To add a real work: drop the file into /public/artworks, then add an entry
// here with `image.src` pointing at it and its true width/height. Until a file
// exists, leave `image.src` off and the gallery renders a composed tonal
// placeholder using `tone` — the layout never breaks.
//
// The demo set below reconstructs the reference mockup so the design can be
// reviewed live. Replace these with Duke&Lume's real works.
// ---------------------------------------------------------------------------

export const artworks: Artwork[] = [
  {
    id: "the-sovereign",
    slug: "the-sovereign",
    title: "The Sovereign",
    year: 2026,
    orientation: "portrait",
    collectionId: "noble-creatures",
    medium: "Digital painting",
    dimensionsWidth: 60,
    dimensionsHeight: 90,
    dimensionsUnit: "cm",
    descriptionShort:
      "A jewelled creature crowned in gold, regarding the viewer without fear.",
    descriptionLong:
      "The Sovereign sits at the threshold between the animal and the divine — a bird of prey rendered in enamel, gemstone and patient light. It is the opening voice of the Noble Creatures collection.",
    status: "available",
    featured: true,
    homepageOrder: 0,
    displaySize: "tall",
    tone: ["#4a5a4a", "#7a6a3c"],
    image: {
      width: 1200,
      height: 1600,
      alt: "A regal bird with a jewelled golden crown and iridescent feathered breast set with gemstones, gazing directly forward against a muted olive-green painterly background.",
    },
  },
  {
    id: "gemstone-bloom",
    slug: "gemstone-bloom",
    title: "Gemstone Bloom",
    year: 2024,
    orientation: "portrait",
    collectionId: "ornamental-nature",
    medium: "Digital painting",
    dimensionsWidth: 60,
    dimensionsHeight: 80,
    dimensionsUnit: "cm",
    descriptionShort:
      "A delicate balance of nature and fantasy — turquoise blossoms in a golden vessel.",
    descriptionLong:
      "Gemstones and golden leaves come together in a timeless vessel, symbolising growth, beauty and precious moments held still.",
    status: "available",
    featured: true,
    homepageOrder: 1,
    displaySize: "tall",
    tone: ["#0e5a58", "#c9a24a"],
    image: {
      width: 1000,
      height: 1250,
      alt: "An ornate golden vase set with a large opal, holding turquoise flowers with gilded leaves against a dark teal background.",
    },
  },
  {
    id: "mineral-heart",
    slug: "mineral-heart",
    title: "Mineral Heart",
    year: 2023,
    orientation: "square",
    collectionId: "mineral-forms",
    medium: "Digital painting",
    descriptionShort:
      "A cluster of raw gemstones held inside a dark reliquary box.",
    status: "not_for_sale",
    featured: true,
    homepageOrder: 2,
    displaySize: "medium",
    tone: ["#2a1620", "#6e3a52"],
    image: {
      width: 1100,
      height: 1100,
      alt: "A cluster of rough rubies, emeralds and crystals resting inside a deep black shadow-box frame.",
    },
  },
  {
    id: "opal-vessel",
    slug: "opal-vessel",
    title: "Opal Vessel",
    year: 2023,
    orientation: "portrait",
    collectionId: "ornamental-nature",
    medium: "Digital painting",
    descriptionShort:
      "An art-nouveau vessel cradling a single luminous opal in a sunlit court.",
    status: "print_available",
    featured: true,
    homepageOrder: 3,
    displaySize: "tall",
    tone: ["#b9a684", "#e6ddc9"],
    image: {
      width: 1000,
      height: 1300,
      alt: "A tall silvered art-nouveau vessel holding a glowing opal, standing before pale classical stone columns.",
    },
  },
  {
    id: "pearl-tree",
    slug: "pearl-tree",
    title: "Pearl Tree",
    year: 2024,
    orientation: "portrait",
    collectionId: "ornamental-nature",
    medium: "Digital painting",
    descriptionShort:
      "A slender tree bearing pearls and opals against deep cobalt.",
    status: "available",
    featured: true,
    homepageOrder: 4,
    displaySize: "tall",
    tone: ["#12224e", "#5b7bbd"],
    image: {
      width: 1000,
      height: 1300,
      alt: "A delicate branching tree hung with pearls and pale opal gemstones, set against a rich cobalt-blue background.",
    },
  },
  {
    id: "the-reading-room",
    slug: "the-reading-room",
    title: "The Reading Room",
    year: 2025,
    orientation: "landscape",
    collectionId: "imagined-interiors",
    medium: "Digital painting",
    descriptionShort:
      "Two noble dogs at leisure in a faded aristocratic drawing room.",
    status: "inquiry_only",
    featured: true,
    homepageOrder: 5,
    displaySize: "wide",
    tone: ["#6b5e48", "#c8b59a"],
    image: {
      width: 1600,
      height: 1040,
      alt: "A painterly interior in which two dogs dressed as 19th-century aristocrats sit reading in a sunlit, weathered drawing room with a marble bust nearby.",
    },
  },
  {
    id: "blue-hour-ostuni",
    slug: "blue-hour-ostuni",
    title: "Blue Hour, Ostuni",
    year: 2024,
    orientation: "landscape",
    collectionId: "places-and-memory",
    medium: "Digital painting",
    descriptionShort:
      "A pale-blue camper resting in a sunlit southern-Italian lane.",
    status: "print_available",
    featured: true,
    homepageOrder: 6,
    displaySize: "wide",
    tone: ["#8a6a58", "#6f93a8"],
    image: {
      width: 1600,
      height: 1060,
      alt: "A vintage pale-blue camper van parked in a narrow, sun-warmed old-town lane with weathered stone buildings and flowers.",
    },
  },
];

export function getArtwork(id: string): Artwork | undefined {
  return artworks.find((a) => a.id === id || a.slug === id);
}

export function getFeaturedArtworks(): Artwork[] {
  return artworks
    .filter((a) => a.featured)
    .sort((a, b) => (a.homepageOrder ?? 999) - (b.homepageOrder ?? 999));
}

export function getArtworksByCollection(collectionId: string): Artwork[] {
  return artworks
    .filter((a) => a.collectionId === collectionId)
    .sort((a, b) => (a.galleryOrder ?? 999) - (b.galleryOrder ?? 999));
}
