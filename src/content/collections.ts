import type { Collection } from "./types";

// Ordered curated collections. `number` is shown in the UI as a museum-style
// index; `displayOrder` controls sequence on /collections.
export const collections: Collection[] = [
  {
    id: "mineral-forms",
    slug: "mineral-forms",
    title: "Mineral Forms",
    number: "01",
    heroLayout: "detail",
    featuredQuote:
      "Stone remembers longer than we do.",
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
    heroLayout: "standard",
    featuredQuote:
      "Made to outlast the season it imitates.",
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
    heroLayout: "dark",
    featuredQuote:
      "They do not perform. They preside.",
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
    heroLayout: "fullscreen",
    featuredQuote:
      "Furnished for someone who never arrives.",
    descriptionShort:
      "Rooms that never existed, furnished and left unoccupied.",
    descriptionLong:
      "Imagined Interiors builds rooms nobody has walked into — a lamp left burning, a window opened onto a mountain, a table laid with flowers no one came to see. Furnished with complete seriousness, and empty.",
    displayOrder: 4,
  },
  {
    id: "personae",
    slug: "personae",
    title: "Personae",
    number: "05",
    heroLayout: "typographic",
    featuredQuote:
      "A face is the last thing to surrender.",
    descriptionShort:
      "Portraits of characters — people met, imagined or remembered, drawn with affection and edge.",
    descriptionLong:
      "Personae gathers portraits of character — faces met, imagined or remembered. Each is a study in presence: the way a person insists on being exactly themselves.",
    displayOrder: 5,
  },
  {
    id: "reliquaries",
    slug: "reliquaries",
    title: "Reliquaries",
    number: "06",
    heroLayout: "diptych",
    featuredQuote:
      "A vessel is an argument for keeping something.",
    descriptionShort:
      "Husks, pods and petals that cradle a gemstone heart — vessels made to keep something precious.",
    descriptionLong:
      "Reliquaries follows a single idea across many works: a plant form opened just enough to reveal the treasure it protects. Amber caught in a spent grain, turquoise wrapped in gauze, crystal blooming from stone — each is a small shrine to the act of keeping.",
    displayOrder: 6,
    featured: true,
  },
  {
    id: "allegories",
    slug: "allegories",
    title: "Allegories",
    number: "07",
    heroLayout: "typographic",
    featuredQuote:
      "Weight against lightness; permanence against passing.",
    descriptionShort:
      "Objects arranged to carry an argument — old symbols painted plainly.",
    descriptionLong:
      "Allegories gathers the works that mean something beyond themselves: a balance, a gate standing open, one tree holding a whole plain. Each is a small proposition set out in paint — weight against lightness, permanence against passing — left for the viewer to settle.",
    displayOrder: 7,
  },
  {
    id: "conditions",
    slug: "conditions",
    title: "Conditions",
    number: "08",
    heroLayout: "standard",
    featuredQuote: "The room is ordinary. One thing in it is not.",
    descriptionShort:
      "Ordinary places under one impossible condition, photographed straight.",
    descriptionLong:
      "Conditions is the cold room of the gallery. No gold, no impasto, nothing hung with stones — an ordinary place, recorded plainly, with exactly one thing in it that could not happen. The works argue nothing and explain nothing. They hold still long enough to be noticed, and leave it there.",
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
