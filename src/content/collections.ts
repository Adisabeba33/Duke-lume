import type { Collection } from "./types";

// Ordered curated collections. `number` is shown in the UI as a museum-style
// index; `displayOrder` controls sequence on /collections.
export const collections: Collection[] = [
  {
    id: "mineral-forms",
    slug: "mineral-forms",
    title: "Mineral Forms",
    number: "01",
    yearStart: 2022,
    yearEnd: 2024,
    descriptionShort:
      "Stone, crystal and metal studied as if they were living things.",
    displayOrder: 1,
    featured: true,
  },
  {
    id: "ornamental-nature",
    slug: "ornamental-nature",
    title: "Ornamental Nature",
    number: "02",
    yearStart: 2023,
    yearEnd: 2024,
    descriptionShort:
      "A collection inspired by the beauty of growth, organic forms and the precious detail found in nature.",
    coverArtworkId: "gemstone-bloom",
    displayOrder: 2,
    featured: true,
  },
  {
    id: "noble-creatures",
    slug: "noble-creatures",
    title: "Noble Creatures",
    number: "03",
    yearStart: 2024,
    yearEnd: 2026,
    descriptionShort:
      "Portraits of imagined beings, crowned in gold and quiet authority.",
    coverArtworkId: "the-sovereign",
    displayOrder: 3,
    featured: true,
  },
  {
    id: "imagined-interiors",
    slug: "imagined-interiors",
    title: "Imagined Interiors",
    number: "04",
    yearStart: 2023,
    yearEnd: 2025,
    descriptionShort:
      "Rooms that never existed, and the characters who quietly inhabit them.",
    displayOrder: 4,
  },
  {
    id: "places-and-memory",
    slug: "places-and-memory",
    title: "Places & Memory",
    number: "05",
    yearStart: 2022,
    yearEnd: 2025,
    descriptionShort:
      "Streets, light and stillness — places remembered more than seen.",
    displayOrder: 5,
  },
];

export function getCollection(id: string): Collection | undefined {
  return collections.find((c) => c.id === id || c.slug === id);
}
