import type { Collection } from "./types";

// Ordered curated collections. `number` is shown in the UI as a museum-style
// index; `displayOrder` controls sequence on /collections.
export const collections: Collection[] = [
  {
    id: "mineral-forms",
    slug: "mineral-forms",
    title: "Mineral Forms",
    number: "01",
    yearStart: 2023,
    yearEnd: 2025,
    descriptionShort:
      "Stone, crystal and metal studied as if they were living things.",
    descriptionLong:
      "Mineral Forms looks at the earth's raw material — crystal, ore, patinated metal — as though it were alive. Each work treats stone the way a portraitist treats a face: with patience, reverence and an eye for the single catching detail.",
    coverArtworkId: "blue-reliquary",
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
      "Growth, decay and organic form — the precious detail found in nature.",
    descriptionLong:
      "Ornamental Nature grows where the botanical meets the jeweller's bench. Flowers become gemstones, leaves turn to gold, and the fragile is remade into something that refuses to wilt.",
    coverArtworkId: "porcelain-requiem",
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
    descriptionLong:
      "Noble Creatures is a court of imagined beings — birds and beasts crowned in filigree and gemstone, painted in heavy oil. They meet the viewer as equals: sovereign, unhurried and entirely unbothered.",
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
    descriptionLong:
      "Imagined Interiors builds rooms that never existed and fills them with characters who are not quite people. Deadpan luxury, painted with complete seriousness.",
    coverArtworkId: "the-connoisseurs",
    displayOrder: 4,
  },
  {
    id: "personae",
    slug: "personae",
    title: "Personae",
    number: "05",
    yearStart: 2024,
    yearEnd: 2026,
    descriptionShort:
      "Portraits of characters — people met, imagined or remembered, drawn with affection and edge.",
    descriptionLong:
      "Personae gathers portraits of character — faces met, imagined or remembered. Each is a study in presence: the way a person insists on being exactly themselves.",
    coverArtworkId: "grande-dame",
    displayOrder: 5,
  },
  {
    id: "places-and-memory",
    slug: "places-and-memory",
    title: "Places & Memory",
    number: "06",
    yearStart: 2024,
    yearEnd: 2024,
    descriptionShort:
      "Streets, light and stillness — places remembered more than seen.",
    descriptionLong:
      "Places & Memory steps outside the studio. Weathered doorways, sunlit lanes, a waiting dog — quiet scenes held in warm light, more about the feeling a place leaves behind than the place itself.",
    coverArtworkId: "blue-hour-ostuni",
    displayOrder: 6,
  },
];

export function getCollection(id: string): Collection | undefined {
  return collections.find((c) => c.id === id || c.slug === id);
}

export function getOrderedCollections(): Collection[] {
  return [...collections].sort(
    (a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99)
  );
}
