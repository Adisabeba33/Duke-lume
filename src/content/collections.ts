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
    displayOrder: 6,
  },
  {
    id: "reliquaries",
    slug: "reliquaries",
    title: "Reliquaries",
    number: "07",
    yearStart: 2024,
    yearEnd: 2026,
    descriptionShort:
      "Husks, pods and petals that cradle a gemstone heart — vessels made to keep something precious.",
    descriptionLong:
      "Reliquaries follows a single idea across many works: a plant form opened just enough to reveal the treasure it protects. Amber caught in a spent grain, turquoise wrapped in gauze, crystal blooming from stone — each is a small shrine to the act of keeping.",
    displayOrder: 7,
    featured: true,
  },
  {
    id: "allegories",
    slug: "allegories",
    title: "Allegories",
    number: "08",
    yearStart: 2026,
    yearEnd: 2026,
    descriptionShort:
      "Objects arranged to carry an argument — old symbols painted plainly.",
    descriptionLong:
      "Allegories gathers the works that mean something beyond themselves: a balance, a feather, a stone. Each is a small proposition set out in paint — weight against lightness, permanence against passing — left for the viewer to settle.",
    displayOrder: 8,
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
