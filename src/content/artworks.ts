import type { Artwork, EditionInfo } from "./types";

// ---------------------------------------------------------------------------
// Artworks — real Duke&Lume works.
//
// To add a new work: drop the file into /public/artworks, then add an entry
// here with `image.src`, its real width/height and an `alt` text. `tone` stays
// as a graceful fallback if an image is ever missing.
// ---------------------------------------------------------------------------

/**
 * House terms, identical for every work (§17). The works are digital, so no
 * physical original exists; the buyer receives the file itself, and prints can
 * be ordered. Print process, print sizes and any edition limit stay unset
 * until they are actually decided — the artwork page states only what is set
 * here, so an empty field claims nothing.
 */
const DIGITAL_EDITION: EditionInfo = {
  physicalOriginal: false,
  digitalFileForSale: true,
  printAvailable: true,
};

export const artworks: Artwork[] = [
  {
    id: "the-sovereign",
    slug: "the-sovereign",
    title: "The Sovereign",
    year: 2026,
    conceptLine: "Authority without a throne",
    orientation: "portrait",
    style: "painterly",
    collectionId: "noble-creatures",
    medium: "Digital painting",
    processNote:
      "Built up in heavy digital oil, then worked over by hand at full size — the filigree and set stones were painted last, one catch of light at a time.",
    descriptionShort:
      "A jewelled bird crowned in gold and gemstone, meeting the viewer's eye without fear.",
    descriptionLong:
      "The Sovereign sits at the threshold between the animal and the divine — feathers rendered as enamel and precious stone, a gaze that asks for nothing. It is the opening voice of the Noble Creatures collection.",
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
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
    conceptLine: "Refinement, played entirely straight",
    orientation: "landscape",
    style: "photorealistic",
    collectionId: "imagined-interiors",
    medium: "Digital artwork",
    processNote:
      "Composed like a period interior photograph: one window as the only light source, everything else built to obey it.",
    descriptionShort:
      "Two bulldogs in couture take their morning in a sunlit Parisian salon, absorbed in the world of art.",
    descriptionLong:
      "The Connoisseurs imagines a household where taste is everything and no one is quite human. One reads Le Monde de l'Art; the other watches the city from the balcony. A gentle satire of refinement, painted with complete seriousness.",
    edition: DIGITAL_EDITION,
    status: "hidden",
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
    descriptionShort:
      "A gem-crusted stone bowl bearing jewelled blooms, set deep in a weathered niche.",
    descriptionLong:
      "Blue Reliquary treats stone and gemstone as something almost sacred. Raw crystal, patinated metal and deep-blue blossoms gather in a vessel that feels excavated rather than made — a small altar to the mineral world.",
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
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
    collectionId: "allegories",
    medium: "Digital artwork",
    descriptionShort:
      "A blue-and-white vase caught mid-dissolution, its painted roses drifting into ink and smoke.",
    descriptionLong:
      "Porcelain Requiem holds a single quiet contradiction — a vessel built to last forever, shown in the act of coming undone. The cobalt roses lift off the glaze and disperse as ink: a meditation on beauty and impermanence.",
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
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
    descriptionShort:
      "A portrait of late-blooming glamour — violet curls, rose-tinted lenses and rings on every finger.",
    descriptionLong:
      "Grande Dame is a study in refusing to fade. Every choice — the lilac hair, the tinted glasses, the crimson mouth — is a small act of defiance, worn with total ease.",
    edition: DIGITAL_EDITION,
    status: "hidden",
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
    descriptionShort:
      "A long-necked bird in heavy oil, one eye ringed by a crown of gold and gemstone.",
    descriptionLong:
      "The Regent is painted almost as sculpture — thick, deliberate strokes building feather and jewel alike. Where The Sovereign meets your gaze head-on, the Regent turns in profile, aloof and unhurried.",
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
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
    descriptionShort:
      "An ornate golden chalice holding a bloom of blue gemstones, in the manner of an old-master still life.",
    descriptionLong:
      "Gemstone Bloom borrows the language of the classical still life — dark ground, single light, a precious vessel — and swaps petals for polished stone. Beauty made to outlast the season it imitates.",
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
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
    descriptionShort:
      "A jewelled kingfisher with a rose-pink crest, feathers set like stained glass against verdigris.",
    descriptionLong:
      "The Herald wears its plumage as regalia — wings inlaid with pink and blue stones bound in gold, feathers rendered as cloisonné. A messenger dressed for an occasion that never ends.",
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
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
    descriptionShort:
      "A single boulder split open to reveal a hoard of raw crystal and coloured ore.",
    descriptionLong:
      "Mother Lode frames raw geology like treasure in a vault — topaz blue, ruby red and rough ore packed into one stone, set into a weathered niche. The earth's own jewellery box, caught mid-discovery.",
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 9,
    whitespaceBefore: true,
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
    descriptionShort:
      "A poodle in a robe takes a manicure and a magazine at an impeccably cream spa.",
    descriptionLong:
      "The Appointment continues the world of The Connoisseurs — a life of complete leisure lived by creatures who are not quite people. Here a poodle reads PAPLUX while a groomer sees to its paw. Deadpan luxury.",
    edition: DIGITAL_EDITION,
    status: "hidden",
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
  {
    id: "the-treasurer",
    slug: "the-treasurer",
    title: "The Treasurer",
    year: 2026,
    conceptLine: "Everything it ever took, worn at once",
    orientation: "portrait",
    style: "painterly",
    collectionId: "noble-creatures",
    medium: "Digital painting",
    processNote:
      "The ground was scraped back to bare gold in places so the bird stands against a wall that is already treasure — the black of the feathers is the only cool colour left in the picture.",
    descriptionShort:
      "A raven wearing its whole hoard — gold filigree and set stones laid over black iridescent feathers.",
    descriptionLong:
      "The Treasurer takes the corvid's logic entirely seriously: everything it ever carried off, worn at once. Amethyst at the brow, citrine and peridot down the wing, a gilded plinth to stand on — and underneath all of it a plain black bird that has clearly won.",
    relatedArtworkIds: ["regalia", "the-regent"],
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: true,
    homepageOrder: 7,
    galleryOrder: 11,
    displaySize: "tall",
    subjectTags: ["raven", "bird", "jewellery"],
    colorTags: ["black", "gold", "amethyst"],
    moodTags: ["opulent", "regal", "still"],
    tone: ["#2a2418", "#c2a45a"],
    image: {
      src: "/artworks/the-treasurer.jpg",
      width: 1054,
      height: 1492,
      alt: "A painterly portrait of a black raven in profile, its head, breast and wing encrusted with gold filigree and coloured gemstones — amethyst, citrine and peridot — perched on an ornate gilded pedestal against a mottled gold and verdigris background.",
    },
  },
  {
    id: "the-confidants",
    slug: "the-confidants",
    title: "The Confidants",
    year: 2024,
    orientation: "portrait",
    style: "illustrative",
    collectionId: "ornamental-nature",
    medium: "Digital artwork",
    descriptionShort:
      "Two cranes turned toward one another, sculpted in soft pastel relief among reeds.",
    descriptionLong:
      "The Confidants is modelled like a plaster bas-relief — a pair of cranes among reeds and blossom, rendered in low sculptural relief. Two creatures caught mid-conversation, forever.",
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 12,
    displaySize: "tall",
    tone: ["#d8ccb6", "#c98f86"],
    image: {
      src: "/artworks/the-confidants.jpg",
      width: 928,
      height: 1232,
      alt: "A soft pastel sculptural bas-relief of two white cranes turned toward each other among reeds, grasses and pink blossom in cream and blush tones.",
    },
  },
  {
    id: "agate-bloom",
    slug: "agate-bloom",
    title: "Agate Bloom",
    year: 2024,
    orientation: "portrait",
    style: "painterly",
    collectionId: "reliquaries",
    medium: "Digital painting",
    descriptionShort:
      "A pastel bloom opening around a banded agate held at its heart.",
    descriptionLong:
      "Agate Bloom states the Reliquaries idea in miniature — the botanical and the mineral fused. Thick, buttery strokes build petals of peach and blue around a single striped stone.",
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 13,
    displaySize: "tall",
    tone: ["#d8a98a", "#a9b4b0"],
    image: {
      src: "/artworks/agate-bloom.jpg",
      width: 720,
      height: 1280,
      alt: "A heavily impasto painting of a large pastel flower — peach and cream petals — opening around a smooth banded blue-and-tan agate stone at its centre.",
    },
  },
  {
    id: "at-the-threshold",
    slug: "at-the-threshold",
    title: "At the Threshold",
    year: 2024,
    orientation: "landscape",
    style: "photorealistic",
    // Retired with Places & Memory, which no longer exists as a collection.
    medium: "Digital artwork",
    descriptionShort:
      "A dog waits in the doorway of a weathered house, half in shadow.",
    descriptionLong:
      "At the Threshold is quiet and unstaged — a village dog sitting where the light meets the dark of an old doorway. A picture about waiting, and about places that hold their own memory.",
    edition: DIGITAL_EDITION,
    status: "hidden",
    featured: false,
    galleryOrder: 14,
    displaySize: "wide",
    tone: ["#6a6f72", "#3a3f42"],
    image: {
      src: "/artworks/at-the-threshold.jpg",
      width: 1232,
      height: 928,
      alt: "A muted, moody photograph of a shaggy grey-and-white dog sitting in the shadowed doorway of a weathered old house beside a peeling pale-blue wooden door.",
    },
  },
  {
    id: "blue-hour-ostuni",
    slug: "blue-hour-ostuni",
    title: "Blue Hour, Ostuni",
    year: 2024,
    orientation: "landscape",
    style: "photorealistic",
    // Retired with Places & Memory, which no longer exists as a collection.
    medium: "Digital artwork",
    descriptionShort:
      "A pale-blue camper resting in a sunlit southern-Italian lane.",
    descriptionLong:
      "Blue Hour, Ostuni is a postcard from a place remembered more than seen — a weathered blue camper wedged into a narrow stone lane, flowers at its feet, warm light on old plaster.",
    edition: DIGITAL_EDITION,
    status: "hidden",
    featured: false,
    galleryOrder: 15,
    displaySize: "wide",
    tone: ["#8a6a58", "#6f93a8"],
    image: {
      src: "/artworks/blue-hour-ostuni.jpg",
      width: 1344,
      height: 896,
      alt: "A vintage pale-blue Volkswagen camper van parked in a narrow, sun-warmed old-town stone lane with weathered buildings and pots of flowers.",
    },
  },
  {
    id: "arcadia",
    slug: "arcadia",
    title: "Arcadia",
    year: 2025,
    orientation: "portrait",
    style: "photorealistic",
    collectionId: "personae",
    medium: "Digital artwork",
    descriptionShort:
      "A face painted as a landscape — cypress, a golden temple and a crescent moon.",
    descriptionLong:
      "Arcadia turns a portrait into a country. A Mediterranean scene — cypress trees, a gilded temple, a thin gold moon — is painted across the skin, so the person and the place they carry become one image.",
    edition: DIGITAL_EDITION,
    status: "hidden",
    featured: false,
    galleryOrder: 16,
    displaySize: "tall",
    tone: ["#1f4a5a", "#c79a4a"],
    image: {
      src: "/artworks/arcadia.jpg",
      width: 784,
      height: 1168,
      alt: "A photorealistic portrait of a green-eyed woman whose face is painted with a blue-and-gold Mediterranean landscape — cypress trees, a golden temple and a crescent moon — with gilded lips.",
    },
  },
  {
    id: "the-muse",
    slug: "the-muse",
    title: "The Muse",
    year: 2025,
    orientation: "portrait",
    style: "modern",
    collectionId: "personae",
    medium: "Digital artwork",
    descriptionShort:
      "An elegance without a face — a sculpted figure in a flowing teal-and-bronze gown.",
    descriptionLong:
      "The Muse is a persona rather than a person: a faceless figure in a wide hat and liquid gown, cast as if in enamelled metal and set in a marble niche. Style itself, standing still.",
    edition: DIGITAL_EDITION,
    status: "hidden",
    featured: false,
    galleryOrder: 17,
    displaySize: "tall",
    tone: ["#1f4f52", "#b98a5a"],
    image: {
      src: "/artworks/the-muse.jpg",
      width: 784,
      height: 1168,
      alt: "A glossy sculptural figure of an elegant faceless woman in a wide-brimmed hat and a flowing teal-and-bronze gown, standing in a marble niche.",
    },
  },
  {
    id: "the-empress",
    slug: "the-empress",
    title: "The Empress",
    year: 2025,
    orientation: "portrait",
    style: "painterly",
    collectionId: "personae",
    medium: "Digital painting",
    descriptionShort:
      "A profile in an amber headdress and armoured collar, painted in the old manner.",
    descriptionLong:
      "The Empress is painted like a rediscovered old master — a woman in profile, eyes lowered, crowned in a headdress of amber and blackened metal. Composure rendered as regalia.",
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 18,
    displaySize: "tall",
    tone: ["#241a12", "#a86a2c"],
    image: {
      src: "/artworks/the-empress.jpg",
      width: 928,
      height: 1232,
      alt: "An old-master style oil portrait of a woman in profile with lowered eyes, wearing an ornate amber-and-bronze headdress and a ribbed armoured collar, against a dark background.",
    },
  },
  {
    id: "homeland",
    slug: "homeland",
    title: "Homeland",
    year: 2025,
    conceptLine: "A place worn on the skin",
    orientation: "portrait",
    style: "photorealistic",
    collectionId: "personae",
    medium: "Digital artwork",
    processNote:
      "The savanna was painted as its own landscape first, then laid over the portrait and pushed until light on skin and light in the scene agreed.",
    descriptionShort:
      "A savanna sunset painted across a face — an acacia, the low sun, a gold ring.",
    descriptionLong:
      "Homeland carries a place on the skin: an African savanna at dusk — a lone acacia, banded sunset light — painted across a serene face with eyes closed. Belonging, worn openly.",
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 19,
    displaySize: "tall",
    tone: ["#2a1a10", "#c2662a"],
    image: {
      src: "/artworks/homeland.jpg",
      width: 896,
      height: 1344,
      alt: "A close photorealistic portrait of a Black woman with eyes closed and a gold nose ring, her face painted with an African savanna sunset — a lone acacia tree, the low sun and banded orange light.",
    },
  },
  {
    id: "chalcedony",
    slug: "chalcedony",
    title: "Chalcedony",
    year: 2024,
    orientation: "portrait",
    style: "photorealistic",
    collectionId: "mineral-forms",
    medium: "Digital artwork",
    descriptionShort:
      "A translucent shell of chalcedony opened to show crystal, amber orbs and pale fibre.",
    descriptionLong:
      "Chalcedony sits on a windowsill like a relic caught in low light — a great translucent shell split open to reveal quartz, amber cabochons and a braid of pale fibre. Geology as reliquary.",
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 20,
    displaySize: "tall",
    tone: ["#8f97a0", "#c98a3a"],
    image: {
      src: "/artworks/chalcedony.jpg",
      width: 784,
      height: 1168,
      alt: "A photorealistic large translucent chalcedony shell opened on a windowsill, revealing clear quartz, two glowing amber orbs and a braid of pale fibre in soft light.",
    },
  },
  {
    id: "crystalline-heart",
    slug: "crystalline-heart",
    title: "Crystalline Heart",
    year: 2026,
    orientation: "portrait",
    style: "photorealistic",
    collectionId: "mineral-forms",
    medium: "Digital artwork",
    descriptionShort:
      "A monstrance of smoky quartz, malachite and mother-of-pearl, blooming from a fractured stone base.",
    descriptionLong:
      "Crystalline Heart is the collection at its most ceremonial — quartz points, malachite and nacre radiating like petals from a jewelled core, set on a kintsugi-veined slab. Part mineral specimen, part reliquary, part sunburst.",
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 21,
    displaySize: "tall",
    tone: ["#3a4a3e", "#c2a45a"],
    image: {
      src: "/artworks/crystalline-heart.jpg",
      width: 1024,
      height: 1536,
      alt: "A photorealistic sculptural sunburst of smoky quartz crystal points, malachite and iridescent mother-of-pearl edged in gold, radiating from a jewelled centre on a gold-veined black stone base, against a soft floral painted backdrop.",
    },
  },
  {
    id: "the-cradle",
    slug: "the-cradle",
    title: "The Cradle",
    year: 2026,
    orientation: "portrait",
    style: "painterly",
    collectionId: "reliquaries",
    medium: "Digital painting",
    descriptionShort:
      "A bronze husk holding a turquoise core wrapped in gauze, roots reaching above it.",
    descriptionLong:
      "The Cradle is the darkest of the Reliquaries — a metallic pod opened in near-blackness, its turquoise heart veiled in gauze while fine roots search the air above. Protection rendered as architecture.",
    edition: DIGITAL_EDITION,
    status: "hidden",
    featured: false,
    galleryOrder: 22,
    whitespaceBefore: true,
    displaySize: "tall",
    tone: ["#171a1f", "#2f7f8c"],
    image: {
      src: "/artworks/the-cradle.jpg",
      width: 1024,
      height: 1536,
      alt: "A dark painterly close-up of a bronze-toned seed pod opened to reveal a veined turquoise egg wrapped in translucent gauze, with fine roots rising behind it against a near-black textured ground.",
    },
  },
  {
    id: "seedkeeper",
    slug: "seedkeeper",
    title: "Seedkeeper",
    year: 2026,
    orientation: "portrait",
    style: "painterly",
    collectionId: "reliquaries",
    medium: "Digital painting",
    descriptionShort:
      "A lantern of oat stems and gauze holding a turquoise stone, painted in pale sea light.",
    descriptionLong:
      "Seedkeeper is the light counterpart to The Cradle — a woven cage of oat stems and cobweb-thin gauze cupping a turquoise stone, set against broad strokes of sea-green and cream. Fragility doing the work of a vault.",
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 23,
    displaySize: "tall",
    tone: ["#8fa89e", "#d8cba8"],
    image: {
      src: "/artworks/seedkeeper.jpg",
      width: 1024,
      height: 1536,
      alt: "A painterly lantern-shaped cage of dried oat stems and sheer gauze cradling a gold-veined turquoise egg, against thick sea-green and cream brushstrokes.",
    },
  },
  {
    id: "amber-vespers",
    slug: "amber-vespers",
    title: "Amber Vespers",
    year: 2026,
    orientation: "portrait",
    style: "painterly",
    collectionId: "reliquaries",
    medium: "Digital painting",
    descriptionShort:
      "A blush petal opened around a glowing amber stone held in a membrane of light.",
    descriptionLong:
      "Amber Vespers is the warmest of the Reliquaries — a peach-and-rose bract parted to show amber lit from within, sealed in a translucent membrane. Evening light, kept.",
    edition: DIGITAL_EDITION,
    status: "hidden",
    featured: false,
    galleryOrder: 24,
    displaySize: "tall",
    tone: ["#d99a72", "#c4632a"],
    image: {
      src: "/artworks/amber-vespers.jpg",
      width: 1024,
      height: 1536,
      alt: "A painterly blush-pink and cream flower bract opened to reveal a glowing golden amber stone wrapped in a translucent membrane, against a warm peach impasto background.",
    },
  },
  {
    id: "ember-grain",
    slug: "ember-grain",
    title: "Ember Grain",
    year: 2026,
    conceptLine: "The last heat of a harvest",
    orientation: "portrait",
    style: "painterly",
    collectionId: "reliquaries",
    medium: "Digital painting",
    processNote:
      "The husk was painted in dry, dusty strokes so the amber seam could stay glassy — the contrast is in the surface, not the colour.",
    descriptionShort:
      "A split husk of violet grain revealing a seam of burning amber.",
    descriptionLong:
      "Ember Grain sets the series' warmest core against its coolest surroundings — a violet ear of wheat splitting open on a lens of amber that burns like a coal. The last heat of a harvest.",
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 25,
    displaySize: "tall",
    tone: ["#4a3a58", "#d2761f"],
    image: {
      src: "/artworks/ember-grain.jpg",
      width: 1024,
      height: 1536,
      alt: "A painterly close-up of a violet-toned ear of wheat split open to reveal a glowing seam of orange amber, against dusty purple and slate-blue impasto strokes.",
    },
  },
  {
    id: "the-patriarch",
    slug: "the-patriarch",
    title: "The Patriarch",
    year: 2026,
    orientation: "landscape",
    style: "photorealistic",
    collectionId: "imagined-interiors",
    medium: "Digital artwork",
    descriptionShort:
      "A lion in a quilted velvet robe takes his cigar lit for him in a green drawing room.",
    descriptionLong:
      "The Patriarch is the head of the household the Imagined Interiors keep circling — a lion in emerald velvet, entirely at ease while two butlers attend to the fire, the silver and the flame at the end of his cigar. Old money, older instincts.",
    edition: DIGITAL_EDITION,
    status: "hidden",
    featured: false,
    galleryOrder: 26,
    displaySize: "wide",
    tone: ["#243328", "#b08a4a"],
    image: {
      src: "/artworks/the-patriarch.jpg",
      width: 1537,
      height: 1023,
      alt: "A photorealistic scene of a lion in a quilted emerald velvet robe seated in a leather wing chair, having his cigar lit by a butler in black tie, with a second butler carrying silver, a marble fireplace and a green panelled drawing room behind.",
    },
  },
  {
    id: "the-weighing",
    slug: "the-weighing",
    title: "The Weighing",
    year: 2026,
    orientation: "portrait",
    style: "painterly",
    collectionId: "allegories",
    medium: "Digital painting",
    descriptionShort:
      "An antique balance holding a violet stone against a single white feather.",
    descriptionLong:
      "The Weighing sets a polished violet stone against one pale feather on a crescent balance — an old allegory painted plainly: what has weight, and what has lightness, and how rarely they settle.",
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 27,
    displaySize: "tall",
    tone: ["#b39a72", "#5f2a4a"],
    image: {
      src: "/artworks/the-weighing.jpg",
      width: 1024,
      height: 1536,
      alt: "An old-master style oil painting of an ornate crescent-shaped brass balance on a marble plinth, one pan holding a polished violet stone and the other a single white feather, in warm window light.",
    },
  },
  {
    id: "moonstone-sceptre",
    slug: "moonstone-sceptre",
    title: "Moonstone Sceptre",
    year: 2026,
    orientation: "portrait",
    style: "painterly",
    collectionId: "mineral-forms",
    medium: "Digital painting",
    descriptionShort:
      "A crescent of nacre cradling a moonstone, mounted on a jewelled reliquary base.",
    descriptionLong:
      "Moonstone Sceptre is painted like a museum plate — a pale crescent of mother-of-pearl holding a single luminous moonstone above a stone tablet set with cabochons and worn gold glyphs. An object whose ceremony has been forgotten but not its authority.",
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 28,
    displaySize: "tall",
    tone: ["#3d3a2c", "#cfc3a4"],
    image: {
      src: "/artworks/moonstone-sceptre.jpg",
      width: 1024,
      height: 1536,
      alt: "An old-master style oil painting of a ceremonial sceptre — a pale mother-of-pearl crescent holding a glowing moonstone cabochon, on a gilded column above a stone tablet inset with gems and carved glyphs.",
    },
  },
  {
    id: "the-orb",
    slug: "the-orb",
    title: "The Orb",
    year: 2026,
    conceptLine: "A vessel made, not grown",
    orientation: "portrait",
    style: "photorealistic",
    collectionId: "reliquaries",
    medium: "Digital artwork",
    processNote:
      "Metal, stone and cabochons were composed as separate studies, then assembled and relit so the brass reads as one continuous cage.",
    descriptionShort:
      "A brass armillary cage holding a smoky quartz heart, set with opals on a malachite base.",
    descriptionLong:
      "The Orb is the Reliquaries idea built in metal rather than grown — a banded brass cage clasping a great smoky quartz, studded with opal and garnet, rising from a rough malachite-veined block. A vessel made deliberately, for keeping.",
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 29,
    displaySize: "tall",
    tone: ["#3d2a18", "#c9a15a"],
    image: {
      src: "/artworks/the-orb.jpg",
      width: 1024,
      height: 1536,
      alt: "A photorealistic ornate brass armillary cage enclosing a large smoky quartz orb, set with opal, garnet and pearl cabochons, mounted on a rough dark stone base veined with malachite against a gilded damask backdrop.",
    },
  },
  {
    id: "opal-tower",
    slug: "opal-tower",
    title: "Opal Tower",
    year: 2026,
    orientation: "portrait",
    style: "photorealistic",
    collectionId: "imagined-interiors",
    medium: "Digital artwork",
    descriptionShort:
      "A stacked column of opal spheres, framed and hung in a lamplit marble room.",
    descriptionLong:
      "Opal Tower shows a Duke&Lume object where it belongs — a column of caged opal spheres, framed in gilt and hung above a fluted cabinet in warm lamplight. A picture of a picture, and of the room that wanted it.",
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 30,
    displaySize: "tall",
    tone: ["#2e1e14", "#c98a3a"],
    image: {
      src: "/artworks/opal-tower.jpg",
      width: 1024,
      height: 1536,
      alt: "A photorealistic dark interior in warm lamplight: a large gilt-framed painting of a stacked column of caged iridescent opal spheres hangs above a fluted marble-topped cabinet with dried flowers, crystals and an amber lamp.",
    },
  },
  {
    id: "regalia",
    slug: "regalia",
    title: "Regalia",
    year: 2026,
    conceptLine: "Dressed for a ceremony no one remembers",
    orientation: "portrait",
    style: "painterly",
    collectionId: "noble-creatures",
    medium: "Digital painting",
    processNote:
      "Palette-knife plumage built in thick passes, then gold leaf laid into the ground behind it. The chains and settings were painted last, so the jewels sit on the feathers rather than over them.",
    descriptionShort:
      "A crane in full court ornament — chains, cabochons and a single gold beak cutting the frame.",
    descriptionLong:
      "Regalia is the most adorned of the Noble Creatures: pink, violet and deep teal plumage laid on in heavy strokes, hung with chains and set stones. The gold beak runs the whole width of the picture and holds the opulence together — without it the ornament would have nowhere to rest.",
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 31,
    displaySize: "tall",
    tone: ["#2f3a3c", "#c2a45a"],
    image: {
      src: "/artworks/regalia.jpg",
      width: 1085,
      height: 1450,
      alt: "A heavily impasto painting of a crane in profile, its plumage moving from blush pink through violet to deep teal, hung with fine gold chains, gemstone cabochons and a jewelled collar, with a long gold beak crossing the frame against a gold-leaf and plaster background.",
    },
  },
  {
    id: "the-long-field",
    slug: "the-long-field",
    title: "The Long Field",
    year: 2026,
    conceptLine: "One tree, keeping the whole plain",
    orientation: "portrait",
    style: "painterly",
    collectionId: "allegories",
    medium: "Digital painting",
    processNote:
      "Sky and field were scumbled in thin, dry layers until the weave of the ground showed through; the tree is the only part painted wet, so it holds the single clear edge in the picture.",
    descriptionShort:
      "A single golden tree standing alone in an open plain, under a sky that takes up most of the frame.",
    descriptionLong:
      "The Long Field gives almost everything to the sky and the grass, and lets one tree carry the rest. The horizon sits low and far, the colour never rises above ochre and dust — a place recalled rather than visited, where the only thing memory kept in focus is the tree.",
    relatedArtworkIds: ["the-crossing", "the-hermitage"],
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: true,
    homepageOrder: 9,
    galleryOrder: 32,
    displaySize: "tall",
    subjectTags: ["tree", "field", "horizon"],
    colorTags: ["ochre", "gold", "grey"],
    moodTags: ["quiet", "solitary", "still"],
    tone: ["#b9b3a6", "#8a6a2c"],
    image: {
      src: "/artworks/the-long-field.jpg",
      width: 1122,
      height: 1402,
      alt: "A painterly landscape of a solitary round-crowned tree with golden autumn foliage standing in a wide ochre field, beneath a pale grey sky with one soft cloud and distant low hills on the horizon.",
    },
  },
  {
    id: "nacre",
    slug: "nacre",
    title: "Nacre",
    year: 2026,
    conceptLine: "The one vessel that grew its own treasure",
    orientation: "portrait",
    style: "photorealistic",
    collectionId: "reliquaries",
    medium: "Digital artwork",
    processNote:
      "Lit as a single-source still life so the shell's rough outer crust and its polished inner lining come from the same light — the pearl is the only surface allowed a direct highlight.",
    descriptionShort:
      "An oyster shell held open around a great pearl, its rough crust giving way to a mother-of-pearl interior.",
    descriptionLong:
      "Nacre answers the question the rest of the Reliquaries leave open. Every other vessel in the series was given something to keep; this one made it. The shell is split between a barnacled grey exterior and an interior of layered mother-of-pearl, and the pearl sitting in it is too large to be anything but deliberate.",
    relatedArtworkIds: ["the-orb", "the-clutch"],
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: true,
    homepageOrder: 8,
    galleryOrder: 33,
    displaySize: "tall",
    subjectTags: ["shell", "pearl", "vessel"],
    colorTags: ["pearl", "grey", "cream"],
    moodTags: ["quiet", "still", "precious"],
    tone: ["#4c4a46", "#d6cec1"],
    image: {
      src: "/artworks/nacre.jpg",
      width: 1144,
      height: 1375,
      alt: "A photorealistic still life of a large oyster shell standing upright and open, its rough grey outer crust curving around a lustrous mother-of-pearl interior that cradles a single oversized baroque pearl, against a mottled grey and bronze wall.",
    },
  },
  {
    // Re-filed from Noble Creatures: the bird here is an object in a room, so
    // it belongs with the interiors rather than with the painted creatures.
    id: "gilded-heron",
    slug: "gilded-heron",
    title: "Gilded Heron",
    year: 2025,
    conceptLine: "A household that keeps a bird which will never move",
    orientation: "portrait",
    style: "photorealistic",
    collectionId: "imagined-interiors",
    medium: "Digital artwork",
    descriptionShort:
      "A heron cast in white and gold, standing perfectly still on a marble plinth in a bright, near-empty room.",
    descriptionLong:
      "Gilded Heron is a room with a single occupant, and the occupant is an object. Polished metal on marble, a large canvas behind it, nothing else asked to happen — a house that keeps a bird which will never move, and treats that as entirely ordinary.",
    relatedArtworkIds: ["opal-tower", "gold-lining"],
    edition: DIGITAL_EDITION,
    status: "hidden",
    featured: false,
    // Re-filed rather than newly added, so it keeps its place in the sequence
    // (just after The Appointment) instead of claiming the newest slot — which
    // would make it this collection's cover and pull it out of the grid.
    galleryOrder: 10.5,
    displaySize: "tall",
    tone: ["#cfc3ad", "#e9e2d2"],
    image: {
      src: "/artworks/gilded-heron.jpg",
      width: 960,
      height: 1200,
      alt: "A photorealistic white-and-gold heron sculpture standing on a marble plinth in a bright modern interior, with a large abstract painting behind it.",
    },
  },
  {
    id: "the-elder",
    slug: "the-elder",
    title: "The Elder",
    year: 2026,
    conceptLine: "Nothing to prove, and everything hung on it",
    orientation: "portrait",
    style: "painterly",
    collectionId: "noble-creatures",
    medium: "Digital painting",
    processNote:
      "The wall was built up and scraped back until the plaster showed gold, then the animal was laid over it as one pale mass — the settings and stones are the only part of the picture given a hard edge.",
    descriptionShort:
      "A pale bull facing the viewer square on, hung with gold filigree, amethyst and pearl.",
    descriptionLong:
      "The Elder is the heaviest presence in the Noble Creatures court and the least interested in the fact. Horns banded in gold, a browpiece of amethyst set between them, strands of pearl falling from the ears — ornament piled onto an animal that would stand exactly the same way without any of it.",
    relatedArtworkIds: ["the-treasurer", "regalia"],
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 34,
    displaySize: "tall",
    subjectTags: ["bull", "animal", "jewellery"],
    colorTags: ["cream", "gold", "amethyst"],
    moodTags: ["calm", "regal", "still"],
    tone: ["#6a4f5e", "#c8a86a"],
    image: {
      src: "/artworks/the-elder.jpg",
      width: 1112,
      height: 1415,
      alt: "A painterly frontal portrait of a cream-coloured bull with gold-banded horns, a gold filigree browpiece set with a large amethyst, strands of pearl and amethyst beads hanging from its ears, and a jewelled collar, against a heavily textured purple and gold-leaf background.",
    },
  },
  {
    id: "the-clutch",
    slug: "the-clutch",
    title: "The Clutch",
    year: 2026,
    conceptLine: "A nest that was never going to hatch",
    orientation: "portrait",
    style: "photorealistic",
    collectionId: "reliquaries",
    medium: "Digital artwork",
    processNote:
      "Held at macro range so the husk's dust and the stones' polish share one plane of focus; the fibre was left soft so the turquoise reads as the only solid thing in the picture.",
    descriptionShort:
      "A dry husk split open on a clutch of turquoise eggs, bedded in pale fibre.",
    descriptionLong:
      "The Clutch is the Reliquaries idea taken at its most literal: a pod broken open to show what it was carrying, and what it was carrying is stone. Veined turquoise eggs sit in fibre that behaves exactly like down — every instinct of a nest, and nothing in it that was ever alive.",
    relatedArtworkIds: ["seedkeeper", "agate-bloom"],
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 35,
    displaySize: "tall",
    subjectTags: ["pod", "stones", "nest"],
    colorTags: ["turquoise", "sand", "brown"],
    moodTags: ["quiet", "precious", "still"],
    tone: ["#8a7c62", "#4fb3b3"],
    image: {
      src: "/artworks/the-clutch.jpg",
      width: 784,
      height: 1168,
      alt: "A photorealistic macro of a dry cream-coloured husk split open to reveal several polished turquoise eggs veined with brown, nested in fine pale fibres.",
    },
  },
  {
    id: "the-envoy",
    slug: "the-envoy",
    title: "The Envoy",
    year: 2026,
    conceptLine: "Sent, and in no hurry to say by whom",
    orientation: "portrait",
    style: "painterly",
    collectionId: "personae",
    medium: "Digital painting",
    processNote:
      "Thin glazes over a warm ground, the way a period portrait is built. Each cabochon was left as a single wet highlight so the gold around it stays matte.",
    descriptionShort:
      "A woman in a patterned turban and a wide collar of black cabochons, painted in old-master oil.",
    descriptionLong:
      "The Envoy carries herself like someone who has already been received. Gold filigree, jet stones, a turban wound in faded red and blue — and a gaze that has decided in advance how much it will give you. The paint stays dark and slow so the jewels do all the talking.",
    relatedArtworkIds: ["the-empress", "homeland"],
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 36,
    displaySize: "tall",
    subjectTags: ["portrait", "jewellery", "turban"],
    colorTags: ["gold", "black", "umber"],
    moodTags: ["composed", "regal", "still"],
    tone: ["#3b3a30", "#a8863f"],
    image: {
      src: "/artworks/the-envoy.jpg",
      width: 1024,
      height: 1536,
      alt: "An old-master style oil portrait of a Black woman in a richly patterned turban with a gold browpiece, long gold earrings and a wide collar set with rows of polished black cabochons, against a dark olive background.",
    },
  },
  {
    id: "the-herbarium",
    slug: "the-herbarium",
    title: "The Herbarium",
    year: 2026,
    conceptLine: "A specimen sheet with something hidden in it",
    orientation: "portrait",
    style: "painterly",
    collectionId: "ornamental-nature",
    medium: "Digital painting",
    processNote:
      "The ground was laid in thick teal and cream strokes and left to set first, so the leaves could be placed on a surface that already had weather in it.",
    descriptionShort:
      "Dried ginkgo leaves fanned across teal plaster, with turquoise and pale stones nested where the stems meet.",
    descriptionLong:
      "The Herbarium lays a ginkgo out the way a collector would — every leaf turned to show its veins — and then hides a small hoard at the join. Turquoise, quartz and a single rose pebble sit in the tangle, kept by leaves that dried a long time ago.",
    relatedArtworkIds: ["gemstone-bloom", "the-confidants"],
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 37,
    displaySize: "tall",
    subjectTags: ["leaves", "stones", "botanical"],
    colorTags: ["teal", "cream", "turquoise"],
    moodTags: ["quiet", "delicate", "still"],
    tone: ["#1f6a72", "#ded3bd"],
    image: {
      src: "/artworks/the-herbarium.jpg",
      width: 720,
      height: 1280,
      alt: "Dried cream-coloured ginkgo leaves fanned out on a thickly painted teal and grey plaster ground, with rough turquoise pieces, a rose pebble and pale quartz nested among the stems.",
    },
  },
  {
    id: "chrysalis",
    slug: "chrysalis",
    title: "Chrysalis",
    year: 2026,
    conceptLine: "Faceted, and still deciding to open",
    orientation: "portrait",
    style: "photorealistic",
    collectionId: "reliquaries",
    medium: "Digital artwork",
    processNote:
      "Lit from behind so the inclusions catch while the bracts stay opaque — the crystal is the only part of the picture allowed to transmit light.",
    descriptionShort:
      "A bud parting around a faceted crystal shot through with green.",
    descriptionLong:
      "Chrysalis puts the treasure where the flower should be. Pink-and-cream bracts open just far enough to show a quartz point with an emerald field caught inside it — a bloom that skipped the petal stage and went straight to stone.",
    relatedArtworkIds: ["agate-bloom", "seedkeeper"],
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 38,
    displaySize: "tall",
    subjectTags: ["bud", "crystal", "botanical"],
    colorTags: ["blush", "green", "cream"],
    moodTags: ["delicate", "precious", "still"],
    tone: ["#c9a0a8", "#3f8f66"],
    image: {
      src: "/artworks/chrysalis.jpg",
      width: 1024,
      height: 1536,
      alt: "A photorealistic close-up of a pink-and-cream bud whose bracts have parted around a faceted transparent crystal filled with a field of green and gold inclusions.",
    },
  },
  {
    id: "the-crossing",
    slug: "the-crossing",
    title: "The Crossing",
    year: 2026,
    conceptLine: "The gate was never the difficult part",
    orientation: "portrait",
    style: "painterly",
    collectionId: "allegories",
    medium: "Digital painting",
    processNote:
      "Laid in as slabs of grey and black with gold worked into the joints, so the only warm light in the picture is the light coming through the arch.",
    descriptionShort:
      "A colossal gate standing open over still water, and one figure who has stopped in front of it.",
    descriptionLong:
      "The Crossing sets its argument out plainly. A gate the size of a cliff, already open. A path of light laid across the water. A single figure halted on the near side, with nothing at all barring the way. The whole weight of the picture rests on the pause.",
    relatedArtworkIds: ["the-weighing", "porcelain-requiem"],
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 39,
    displaySize: "tall",
    subjectTags: ["gate", "figure", "water"],
    colorTags: ["grey", "gold", "black"],
    moodTags: ["solemn", "vast", "still"],
    tone: ["#2e3134", "#c9a45a"],
    image: {
      src: "/artworks/the-crossing.jpg",
      width: 1122,
      height: 1402,
      alt: "A painterly scene of a colossal stone gateway standing open above still water in a rocky gorge, a pale sun low behind cloud within the archway, gold worked into the masonry, a windswept tree to the right and a single cloaked figure standing on the wet flagstones before it.",
    },
  },
  {
    id: "the-hermitage",
    slug: "the-hermitage",
    title: "The Hermitage",
    year: 2026,
    conceptLine: "Some houses can only be built alone",
    orientation: "portrait",
    style: "painterly",
    collectionId: "allegories",
    medium: "Digital painting",
    processNote:
      "Held to two values almost throughout, so the lit window and the halo behind the rock carry all the light. The marginal notes, circles and registration marks are printed into the surface rather than laid over it.",
    descriptionShort:
      "A single house on a rock spire above still water, reached by a long stair, under a crescent moon.",
    descriptionLong:
      "The Hermitage makes its case for solitude without hedging: one house, one tree, one stair cut up a rock that stands alone in a flat sea, a gold halo behind it and a crescent overhead. The work carries its own notes in the margin — silence is also a form of strength; sometimes solitude builds houses you could not build together; here time is in no hurry to remind you of itself — set into the surface like annotations on a plate.",
    relatedArtworkIds: ["the-crossing", "the-long-field"],
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 40,
    displaySize: "tall",
    subjectTags: ["house", "island", "moon"],
    colorTags: ["gold", "black", "grey"],
    moodTags: ["solitary", "quiet", "vast"],
    tone: ["#2b2620", "#c9a45a"],
    image: {
      src: "/artworks/the-hermitage.jpg",
      width: 1122,
      height: 1402,
      alt: "A painterly nocturne of a small house with one lit window standing on a tall rock spire above calm water, a long stair cut up the rock, a wind-bent tree beside the house, a crescent moon above and a wide gold halo behind, with faint Russian marginal notes and registration marks printed into the surface.",
    },
  },
  {
    id: "the-moon-window",
    slug: "the-moon-window",
    title: "The Moon Window",
    year: 2026,
    conceptLine: "The room was arranged around it, and then everyone left",
    orientation: "portrait",
    style: "painterly",
    collectionId: "imagined-interiors",
    medium: "Digital painting",
    processNote:
      "Every surface was built in short overlapping strokes so the walls read as plaster mended many times over; the view through the window is the only part of the picture left smooth.",
    descriptionShort:
      "A dark room built around a circular window, with plum branches, a low table and one lit bulb.",
    descriptionLong:
      "The Moon Window gives a room a single opening and lets it carry everything: mountains, water and a white sky held inside a perfect circle, with plum blossom reaching across it from a jar on the table. The rest — the bowl, the cup, the cushion set down on the floor, the bulb burning under its dark shade — is arranged as though someone were about to sit, and no one does.",
    relatedArtworkIds: ["opal-tower", "the-patriarch"],
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 41,
    displaySize: "tall",
    subjectTags: ["interior", "window", "blossom"],
    colorTags: ["grey", "gold", "red"],
    moodTags: ["quiet", "contemplative", "still"],
    tone: ["#2a2620", "#b9a173"],
    image: {
      src: "/artworks/the-moon-window.jpg",
      width: 1122,
      height: 1402,
      alt: "A painterly dark interior with a large circular moon window opening on misty mountains and water, plum blossom branches reaching across it from a dark jar, a low table set with a bowl and cup, a hanging lamp with a lit bulb, a red calligraphic scroll on the right-hand wall and a cushion on the polished floor.",
    },
  },
  {
    id: "the-long-watch",
    slug: "the-long-watch",
    title: "The Long Watch",
    year: 2026,
    conceptLine: "Armour that stood still long enough to become a garden",
    orientation: "portrait",
    style: "photorealistic",
    collectionId: "personae",
    medium: "Digital artwork",
    processNote:
      "Metal, moss and skin were kept under one soft light so none of them reads as an effect; the blossom is held to a single pale pink so the armour never tips into decoration.",
    descriptionShort:
      "A young woman in mossed brass armour, eyes closed, small blossoms opening along the seams.",
    descriptionLong:
      "The Long Watch is a portrait of someone who has not moved in a very long time. The verdigris plate and brass rings still hold their shape, but lichen has taken the joints and a hedge of small flowers has come into bloom across the shoulder and helm. A thin gold circle stands behind her head — half halo, half surveyor's mark — and her eyes stay closed.",
    relatedArtworkIds: ["the-envoy", "the-empress"],
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 42,
    displaySize: "tall",
    subjectTags: ["portrait", "armour", "flowers"],
    colorTags: ["verdigris", "brass", "blush"],
    moodTags: ["quiet", "solemn", "still"],
    tone: ["#3c4038", "#c9a45a"],
    image: {
      src: "/artworks/the-long-watch.jpg",
      width: 1086,
      height: 1448,
      alt: "A photorealistic profile portrait of a young woman with closed eyes wearing a verdigris and brass helmet and high collar overgrown with moss, lichen and small pale pink blossoms, a crystal drop earring on a fine chain, and a thin gold circle drawn on the dark wall behind her head.",
    },
  },
  {
    id: "chorus",
    slug: "chorus",
    title: "Chorus",
    year: 2026,
    conceptLine: "One face, and the whole room answering",
    orientation: "landscape",
    style: "modern",
    collectionId: "personae",
    medium: "Digital painting",
    processNote:
      "Blocked in as flat fields first, then broken with drips, scraped edges and gold leaf so the geometry never settles into clean vector work.",
    descriptionShort:
      "A profile in black and gold held inside a field of colour blocks, drips and arcs.",
    descriptionLong:
      "Chorus is the loudest voice in Personae and the one with the least detail. The face is a single dark profile against a gold disc; everything else — teal, cream, magenta, a column of burnt orange, a gold line ruled straight across the middle — is flat blocks answering it. No features are drawn at all, and the likeness still holds the picture together.",
    relatedArtworkIds: ["homeland", "grande-dame"],
    edition: DIGITAL_EDITION,
    status: "hidden",
    featured: false,
    galleryOrder: 43,
    displaySize: "wide",
    subjectTags: ["portrait", "profile", "geometry"],
    colorTags: ["teal", "magenta", "gold"],
    moodTags: ["bold", "luminous", "graphic"],
    tone: ["#1d6f7a", "#e0447a"],
    image: {
      src: "/artworks/chorus.jpg",
      width: 1402,
      height: 1122,
      alt: "A modern abstract painting of a woman's dark profile with her chin lifted against a large gold disc, surrounded by flat blocks of teal, cream, magenta, pink and burnt orange with paint drips, scraped texture, circles and fine ruled gold lines.",
    },
  },
  {
    id: "the-mend",
    slug: "the-mend",
    title: "The Mend",
    year: 2026,
    conceptLine: "The vessel broke; the flowers did not notice",
    orientation: "portrait",
    style: "painterly",
    collectionId: "imagined-interiors",
    medium: "Digital painting",
    processNote:
      "Worked entirely with the knife. The background is laid in as blocks and each bloom is built from single loaded strokes, so the paint stays as thick at the edge of a petal as it is in the middle.",
    descriptionShort:
      "Blooms in plum, cream and gold rising out of a broken white vessel seamed with gold.",
    descriptionLong:
      "The Mend rests on a small contradiction. The vessel is in pieces, held at the breaks by gold, and the flowers standing in it are the healthiest thing in the picture. A dried lotus pod leans out on a black stem, one leaf has gone to gold outright, and three petals have already come down on the table.",
    relatedArtworkIds: ["gold-lining", "the-moon-window"],
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 44,
    displaySize: "tall",
    subjectTags: ["flowers", "vessel", "still life"],
    colorTags: ["blush", "gold", "plum"],
    moodTags: ["opulent", "tender", "still"],
    tone: ["#c98b8b", "#d9b25a"],
    image: {
      src: "/artworks/the-mend.jpg",
      width: 1023,
      height: 1537,
      alt: "A heavily impasto palette-knife still life of peony-like flowers in plum, cream, blush and gold rising from a broken white vessel seamed with gold, with a dried lotus seed pod on a black stem, one gilded leaf and fallen petals on the table, against a blocked pink, cream and black background.",
    },
  },
  {
    id: "gold-lining",
    slug: "gold-lining",
    title: "Gold Lining",
    year: 2026,
    conceptLine: "The bowl keeps its gold on the inside",
    orientation: "portrait",
    style: "painterly",
    collectionId: "imagined-interiors",
    medium: "Digital painting",
    processNote:
      "The wall was built as overlapping panels of knife-work and left cracked throughout, so nothing in the picture holds a clean edge except the gold inside the bowl.",
    descriptionShort:
      "A blossom branch in a round cream vessel, beside a black bowl gilded on the inside.",
    descriptionLong:
      "Gold Lining sets three plain things against a wall of blocks: a heavy round vessel, a bare branch carrying a handful of white blossoms, and a black bowl that keeps its gold where only someone standing over it would find it. Everything on show is chalk, ash and cracked plaster. The one rich surface in the picture is turned away.",
    relatedArtworkIds: ["the-mend", "the-moon-window"],
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 45,
    displaySize: "tall",
    subjectTags: ["vessel", "branch", "still life"],
    colorTags: ["cream", "gold", "rust"],
    moodTags: ["quiet", "spare", "still"],
    tone: ["#2c2a26", "#c9a45a"],
    image: {
      src: "/artworks/gold-lining.jpg",
      width: 1023,
      height: 1537,
      alt: "An impasto palette-knife still life of a large round cream vessel holding a bare branch with a few white blossoms, beside a black bowl lined with gold, standing on a pale ledge against a wall of blocked black, cream, gold and rust panels.",
    },
  },
  {
    id: "heartwood",
    slug: "heartwood",
    title: "Heartwood",
    year: 2026,
    conceptLine: "A vessel grown, not made",
    orientation: "portrait",
    style: "photorealistic",
    collectionId: "reliquaries",
    medium: "Digital artwork",
    processNote:
      "The gold ground was laid and cracked before anything was set against it, so the disc reads as a wall that has been gilded and left, not as light behind the object.",
    descriptionShort:
      "A blossoming bough curled around a smoky quartz point, raised on gold-veined marble.",
    descriptionLong:
      "Heartwood is The Orb's opposite number. Where that reliquary was built out of brass to hold its stone, this one grew around it: an old bough has closed on a quartz point, put out plum blossom along the far branches, and set the whole arrangement on marble cracked and refilled with gold. The crystal is the only part of the picture that lets light through.",
    relatedArtworkIds: ["the-orb", "chrysalis"],
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 46,
    displaySize: "tall",
    subjectTags: ["crystal", "wood", "blossom"],
    colorTags: ["gold", "smoke", "plum"],
    moodTags: ["still", "precious", "reverent"],
    tone: ["#3a3226", "#c9a45a"],
    image: {
      src: "/artworks/heartwood.jpg",
      width: 1023,
      height: 1537,
      alt: "A photorealistic still life of a gnarled dark bough curled around a large smoky quartz crystal point and flowering with deep red plum blossom, standing on a cracked marble plinth veined with gold, against a gilded disc on a weathered plaster wall.",
    },
  },
  {
    id: "white-out",
    slug: "white-out",
    title: "White Out",
    year: 2026,
    conceptLine: "Nine tenths of the picture is weather",
    orientation: "portrait",
    style: "photorealistic",
    collectionId: "conditions",
    medium: "Digital artwork",
    processNote:
      "Left flat and uncorrected — no vignette, no added contrast, nothing darkened at the edges to help the eye find the figure. Whoever looks has to do the work.",
    descriptionShort:
      "A figure walking away into falling snow, their tracks already closing over.",
    descriptionLong:
      "White Out gives almost the whole frame to nothing at all. A dark coat, a line of footprints filling in behind it, and snow thick enough to have taken the horizon with it. It is the quietest work in the gallery and the only one that is mostly empty — which is why it hangs at full width, where the emptiness is the subject rather than a fault.",
    relatedArtworkIds: ["the-weather-inside", "the-long-field"],
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 47,
    // Given the full-width slot deliberately: at thumbnail size a near-white
    // work reads as an image that failed to load (§11).
    displaySize: "full",
    subjectTags: ["figure", "snow", "field"],
    colorTags: ["white", "ash", "charcoal"],
    moodTags: ["quiet", "solitary", "stark"],
    tone: ["#e6e7e8", "#8f9296"],
    image: {
      src: "/artworks/white-out.jpg",
      width: 1024,
      height: 1536,
      alt: "A near-white photograph of a lone figure in a dark hooded coat seen from behind, walking away across an open snowfield in heavy falling snow, with a line of footprints filling in behind them and no visible horizon.",
    },
  },
  {
    id: "the-weather-inside",
    slug: "the-weather-inside",
    title: "The Weather Inside",
    year: 2026,
    conceptLine: "One cloud, and it chose a bedroom",
    orientation: "portrait",
    style: "photorealistic",
    collectionId: "conditions",
    medium: "Digital artwork",
    processNote:
      "One window as the only light, deep focus front to back, and not a trace of glow anywhere on the cloud. The picture only holds if nothing in it is treated as magic.",
    descriptionShort:
      "A rain cloud the size of a table hangs over a made bed, raining steadily onto it.",
    descriptionLong:
      "The Weather Inside puts a storm indoors and then refuses to make anything of it. The cloud is grey and physical, lit from the window like everything else in the room; the bedspread has gone black with water and a puddle has spread across the boards. The chair is dry. The room is otherwise in perfect order, and that is what makes it strange.",
    relatedArtworkIds: ["white-out", "the-moon-window"],
    edition: DIGITAL_EDITION,
    status: "inquiry_only",
    featured: false,
    galleryOrder: 48,
    displaySize: "tall",
    subjectTags: ["cloud", "room", "rain"],
    colorTags: ["grey", "oatmeal", "slate"],
    moodTags: ["quiet", "strange", "deadpan"],
    tone: ["#3f4245", "#c9c2b4"],
    image: {
      src: "/artworks/the-weather-inside.jpg",
      width: 1024,
      height: 1536,
      alt: "A photograph of an ordinary bedroom in cold daylight with a small grey rain cloud hanging at eye level above the bed, rain falling from it in straight lines onto a soaked dark bedspread and spreading as a puddle across the wooden floorboards, while the wooden chair and the rest of the room stay dry.",
    },
  },
];

export function getArtwork(id: string): Artwork | undefined {
  return artworks.find((a) => a.id === id || a.slug === id);
}

/**
 * Is this work on show?
 *
 * Retiring a work is a curatorial act, not a deletion: `hidden` and `draft`
 * keep the entry, the files and the crops, and take the work out of the public
 * site completely — listings, collection pages, companions, its own URL and the
 * sitemap. Every reader of the catalogue goes through this, so a work can be
 * put back by changing one word.
 */
export function isPublished(a: Artwork): boolean {
  return a.status !== "hidden" && a.status !== "draft";
}

export function getFeaturedArtworks(): Artwork[] {
  return artworks
    .filter((a) => a.featured && isPublished(a))
    .sort((a, b) => (a.homepageOrder ?? 999) - (b.homepageOrder ?? 999));
}

export function getArtworksByCollection(collectionId: string): Artwork[] {
  return artworks
    .filter((a) => a.collectionId === collectionId && isPublished(a))
    .sort((a, b) => (a.galleryOrder ?? 999) - (b.galleryOrder ?? 999));
}

/**
 * The years a collection actually spans, read from the works on show rather
 * than declared by hand — retiring a work or adding one moves it by itself, so
 * the period can never drift away from what is hanging. A collection may still
 * state its own period via yearStart / yearEnd when the curator wants one.
 */
export function getCollectionPeriod(collectionId: string): string | undefined {
  const years = getArtworksByCollection(collectionId).map((a) => a.year);
  if (years.length === 0) return undefined;
  const from = Math.min(...years);
  const to = Math.max(...years);
  return from === to ? String(from) : `${from}–${to}`;
}

/**
 * The cover for a collection: its most recently added work.
 *
 * `galleryOrder` is assigned incrementally as works are added, so the highest
 * value in a collection is the newest one. Add a work to a collection and it
 * automatically becomes that collection's cover. A collection may still pin a
 * specific work via `coverArtworkId` if it ever needs to override this.
 */
export function getCollectionCover(collectionId: string): Artwork | undefined {
  const works = getArtworksByCollection(collectionId);
  if (works.length === 0) return undefined;
  return works.reduce((latest, w) =>
    (w.galleryOrder ?? -1) > (latest.galleryOrder ?? -1) ? w : latest
  );
}

/**
 * Companions for an artwork (§21), in priority order:
 *   1. curator-chosen relatedArtworkIds
 *   2. same collection
 *   3. shared colour / mood / subject tags
 *   4. same style, then same orientation
 */
export function getRelatedArtworks(slug: string, limit = 3): Artwork[] {
  const current = getArtwork(slug);
  if (!current) return [];

  const picked: Artwork[] = [];
  const add = (a?: Artwork) => {
    // A curator-chosen companion is still subject to the work being on show —
    // otherwise a retired work would be pulled back into view from here.
    if (a && isPublished(a) && a.slug !== slug && !picked.some((p) => p.slug === a.slug))
      picked.push(a);
  };

  // 1 — manual
  for (const id of current.relatedArtworkIds ?? []) add(getArtwork(id));

  const pool = getGalleryArtworks().filter((a) => a.slug !== slug);

  // 2 — same collection
  if (current.collectionId) {
    for (const a of pool.filter((a) => a.collectionId === current.collectionId)) add(a);
  }

  // 3 — shared tags
  const tags = new Set([
    ...(current.colorTags ?? []),
    ...(current.moodTags ?? []),
    ...(current.subjectTags ?? []),
  ]);
  if (tags.size > 0) {
    const scored = pool
      .map((a) => {
        const theirs = [
          ...(a.colorTags ?? []),
          ...(a.moodTags ?? []),
          ...(a.subjectTags ?? []),
        ];
        return { a, score: theirs.filter((t) => tags.has(t)).length };
      })
      .filter((x) => x.score > 0)
      .sort((x, y) => y.score - x.score);
    for (const { a } of scored) add(a);
  }

  // 4 — same style, then same orientation
  for (const a of pool.filter((a) => a.style === current.style)) add(a);
  for (const a of pool.filter((a) => a.orientation === current.orientation)) add(a);

  return picked.slice(0, limit);
}

/**
 * Previous / next within the work's own collection (§20). Never wraps silently:
 * at either end the neighbour is undefined and the page offers the next
 * collection instead.
 */
export function getCollectionNeighbours(slug: string): {
  prev?: Artwork;
  next?: Artwork;
  siblings: Artwork[];
  index: number;
} {
  const current = getArtwork(slug);
  if (!current?.collectionId) return { siblings: [], index: -1 };
  const siblings = getArtworksByCollection(current.collectionId);
  const index = siblings.findIndex((a) => a.slug === slug);
  return {
    prev: index > 0 ? siblings[index - 1] : undefined,
    next: index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : undefined,
    siblings,
    index,
  };
}

/** Works that belong in the public gallery (published / for viewing). */
export function getGalleryArtworks(): Artwork[] {
  return artworks
    .filter(isPublished)
    .sort((a, b) => (a.galleryOrder ?? 999) - (b.galleryOrder ?? 999));
}
