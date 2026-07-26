import type { Artwork } from "./types";

// ---------------------------------------------------------------------------
// Artworks — real Duke&Lume works.
//
// To add a new work: drop the file into /public/artworks, then add an entry
// here with `image.src`, its real width/height and an `alt` text. `tone` stays
// as a graceful fallback if an image is ever missing.
// ---------------------------------------------------------------------------

export const artworks: Artwork[] = [
  {
    id: "the-sovereign",
    slug: "the-sovereign",
    title: "The Sovereign",
    year: 2026,
    orientation: "portrait",
    style: "painterly",
    collectionId: "noble-creatures",
    medium: "Digital painting",
    editionType: "Original digital work",
    descriptionShort:
      "A jewelled bird crowned in gold and gemstone, meeting the viewer's eye without fear.",
    descriptionLong:
      "The Sovereign sits at the threshold between the animal and the divine — feathers rendered as enamel and precious stone, a gaze that asks for nothing. It is the opening voice of the Noble Creatures collection.",
    status: "available",
    featured: false,
    galleryOrder: 1,
    displaySize: "tall",
    tone: ["#4a5a4a", "#7a6a3c"],
    image: {
      src: "/artworks/the-sovereign.jpg",
      width: 1707,
      height: 2560,
      alt: "A painterly close portrait of a regal bird with a jewelled golden crown, deep amber eyes, an iridescent beak and a breast set with gemstones, against a textured olive-green oil background.",
    },
  },
  {
    id: "the-connoisseurs",
    slug: "the-connoisseurs",
    title: "The Connoisseurs",
    year: 2025,
    orientation: "landscape",
    style: "photorealistic",
    collectionId: "imagined-interiors",
    medium: "Digital artwork",
    editionType: "Original digital work",
    descriptionShort:
      "Two bulldogs in couture take their morning in a sunlit Parisian salon, absorbed in the world of art.",
    descriptionLong:
      "The Connoisseurs imagines a household where taste is everything and no one is quite human. One reads Le Monde de l'Art; the other watches the city from the balcony. A gentle satire of refinement, painted with complete seriousness.",
    status: "inquiry_only",
    featured: true,
    homepageOrder: 4,
    galleryOrder: 2,
    displaySize: "wide",
    tone: ["#6b5e48", "#c8b59a"],
    image: {
      src: "/artworks/the-connoisseurs.jpg",
      width: 1537,
      height: 1023,
      alt: "A photorealistic scene of two English bulldogs dressed as 19th-century aristocrats in a sunlit Parisian salon — one in a lace gown by the window, one in a suit reading a newspaper in an armchair — with a marble bust and a large gold-and-black abstract painting.",
    },
  },
  {
    id: "blue-reliquary",
    slug: "blue-reliquary",
    title: "Blue Reliquary",
    year: 2025,
    orientation: "portrait",
    style: "photorealistic",
    collectionId: "mineral-forms",
    medium: "Digital artwork",
    editionType: "Original digital work",
    descriptionShort:
      "A gem-crusted stone bowl bearing jewelled blooms, set deep in a weathered niche.",
    descriptionLong:
      "Blue Reliquary treats stone and gemstone as something almost sacred. Raw crystal, patinated metal and deep-blue blossoms gather in a vessel that feels excavated rather than made — a small altar to the mineral world.",
    status: "not_for_sale",
    featured: true,
    homepageOrder: 3,
    galleryOrder: 3,
    displaySize: "tall",
    tone: ["#16303a", "#3f6b74"],
    image: {
      src: "/artworks/blue-reliquary.jpg",
      width: 1707,
      height: 2560,
      alt: "A photorealistic dark-teal stone bowl encrusted with raw gemstones and gold, holding jewel-covered blue flowers, set inside a weathered painterly wall niche.",
    },
  },
  {
    id: "porcelain-requiem",
    slug: "porcelain-requiem",
    title: "Porcelain Requiem",
    year: 2024,
    orientation: "portrait",
    style: "surreal",
    collectionId: "ornamental-nature",
    medium: "Digital artwork",
    editionType: "Original digital work",
    descriptionShort:
      "A blue-and-white vase caught mid-dissolution, its painted roses drifting into ink and smoke.",
    descriptionLong:
      "Porcelain Requiem holds a single quiet contradiction — a vessel built to last forever, shown in the act of coming undone. The cobalt roses lift off the glaze and disperse as ink: a meditation on beauty and impermanence.",
    status: "print_available",
    featured: true,
    homepageOrder: 1,
    galleryOrder: 4,
    displaySize: "tall",
    tone: ["#c9ccd4", "#5a6b86"],
    image: {
      src: "/artworks/porcelain-requiem.jpg",
      width: 816,
      height: 1456,
      alt: "A blue-and-white porcelain vase painted with cobalt roses, its upper half dissolving into drifting black ink and smoke against a pale background.",
    },
  },
  {
    id: "grande-dame",
    slug: "grande-dame",
    title: "Grande Dame",
    year: 2024,
    orientation: "square",
    style: "photorealistic",
    collectionId: "personae",
    medium: "Digital artwork",
    editionType: "Original digital work",
    descriptionShort:
      "A portrait of late-blooming glamour — violet curls, rose-tinted lenses and rings on every finger.",
    descriptionLong:
      "Grande Dame is a study in refusing to fade. Every choice — the lilac hair, the tinted glasses, the crimson mouth — is a small act of defiance, worn with total ease.",
    status: "available",
    featured: true,
    homepageOrder: 2,
    galleryOrder: 5,
    displaySize: "medium",
    tone: ["#1f5a6b", "#8a6f9c"],
    image: {
      src: "/artworks/grande-dame.jpg",
      width: 1024,
      height: 1024,
      alt: "A photorealistic portrait of an elderly woman with voluminous lilac-grey curls, large rose-tinted round sunglasses, red lipstick and statement jewellery, resting her chin on ringed fingers against a deep teal background.",
    },
  },
  {
    id: "the-regent",
    slug: "the-regent",
    title: "The Regent",
    year: 2025,
    orientation: "portrait",
    style: "painterly",
    collectionId: "noble-creatures",
    medium: "Digital painting",
    editionType: "Original digital work",
    descriptionShort:
      "A long-necked bird in heavy oil, one eye ringed by a crown of gold and gemstone.",
    descriptionLong:
      "The Regent is painted almost as sculpture — thick, deliberate strokes building feather and jewel alike. Where The Sovereign meets your gaze head-on, the Regent turns in profile, aloof and unhurried.",
    status: "available",
    featured: true,
    homepageOrder: 5,
    galleryOrder: 6,
    displaySize: "tall",
    tone: ["#3f5a52", "#8a7a4a"],
    image: {
      src: "/artworks/the-regent.jpg",
      width: 1707,
      height: 2560,
      alt: "A heavily impasto oil painting of a long-necked bird in profile against a sea-green background, one eye encircled by an ornate crown of gold filigree and coloured gemstones.",
    },
  },
  {
    id: "gemstone-bloom",
    slug: "gemstone-bloom",
    title: "Gemstone Bloom",
    year: 2024,
    orientation: "portrait",
    style: "painterly",
    collectionId: "ornamental-nature",
    medium: "Digital painting",
    editionType: "Original digital work",
    descriptionShort:
      "An ornate golden chalice holding a bloom of blue gemstones, in the manner of an old-master still life.",
    descriptionLong:
      "Gemstone Bloom borrows the language of the classical still life — dark ground, single light, a precious vessel — and swaps petals for polished stone. Beauty made to outlast the season it imitates.",
    status: "available",
    featured: false,
    galleryOrder: 7,
    displaySize: "tall",
    tone: ["#1c1a14", "#b98a3a"],
    image: {
      src: "/artworks/gemstone-bloom.jpg",
      width: 928,
      height: 1232,
      alt: "An old-master style still life of an ornate golden chalice set with a turquoise cabochon, holding a bouquet of blue gemstone 'flowers' with gilded leaves, against a dark background.",
    },
  },
  {
    id: "the-herald",
    slug: "the-herald",
    title: "The Herald",
    year: 2025,
    orientation: "portrait",
    style: "painterly",
    collectionId: "noble-creatures",
    medium: "Digital painting",
    editionType: "Original digital work",
    descriptionShort:
      "A jewelled kingfisher with a rose-pink crest, feathers set like stained glass against verdigris.",
    descriptionLong:
      "The Herald wears its plumage as regalia — wings inlaid with pink and blue stones bound in gold, feathers rendered as cloisonné. A messenger dressed for an occasion that never ends.",
    status: "available",
    featured: false,
    galleryOrder: 8,
    displaySize: "tall",
    tone: ["#12464e", "#a34a6a"],
    image: {
      src: "/artworks/the-herald.jpg",
      width: 1435,
      height: 2560,
      alt: "A painterly close portrait of a jewelled kingfisher-like bird with a rose-pink crest and a beak, its wing and breast set with pink, blue and gold gemstones like stained glass, against a teal verdigris background.",
    },
  },
  {
    id: "mother-lode",
    slug: "mother-lode",
    title: "Mother Lode",
    year: 2024,
    orientation: "portrait",
    style: "photorealistic",
    collectionId: "mineral-forms",
    medium: "Digital artwork",
    editionType: "Original digital work",
    descriptionShort:
      "A single boulder split open to reveal a hoard of raw crystal and coloured ore.",
    descriptionLong:
      "Mother Lode frames raw geology like treasure in a vault — topaz blue, ruby red and rough ore packed into one stone, set into a weathered niche. The earth's own jewellery box, caught mid-discovery.",
    status: "not_for_sale",
    featured: false,
    galleryOrder: 9,
    displaySize: "tall",
    tone: ["#2a2320", "#7a5a4a"],
    image: {
      src: "/artworks/mother-lode.jpg",
      width: 1707,
      height: 2560,
      alt: "A photorealistic rough boulder packed with raw blue topaz, pink and red crystals and coloured ore, set inside a weathered painterly niche.",
    },
  },
  {
    id: "the-appointment",
    slug: "the-appointment",
    title: "The Appointment",
    year: 2025,
    orientation: "landscape",
    style: "photorealistic",
    collectionId: "imagined-interiors",
    medium: "Digital artwork",
    editionType: "Original digital work",
    descriptionShort:
      "A poodle in a robe takes a manicure and a magazine at an impeccably cream spa.",
    descriptionLong:
      "The Appointment continues the world of The Connoisseurs — a life of complete leisure lived by creatures who are not quite people. Here a poodle reads PAPLUX while a groomer sees to its paw. Deadpan luxury.",
    status: "inquiry_only",
    featured: true,
    homepageOrder: 6,
    galleryOrder: 10,
    displaySize: "wide",
    tone: ["#b7a98f", "#e6ddc9"],
    image: {
      src: "/artworks/the-appointment.jpg",
      width: 1402,
      height: 1122,
      alt: "A photorealistic scene of a cream standard poodle in a bathrobe reading a magazine titled PAPLUX in a plush beige spa, while a gloved attendant files its paw amid candles, roses and rows of nail polish.",
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

/** Works that belong in the public gallery (published / for viewing). */
export function getGalleryArtworks(): Artwork[] {
  const hidden = new Set(["hidden", "draft"]);
  return artworks
    .filter((a) => !hidden.has(a.status))
    .sort((a, b) => (a.galleryOrder ?? 999) - (b.galleryOrder ?? 999));
}
