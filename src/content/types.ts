// ---------------------------------------------------------------------------
// Content model for Duke&Lume.
//
// These types intentionally mirror the CMS schema described in the brief
// (sections 15 & 25) so the site can migrate to Sanity / a headless CMS later
// without reshaping the front-end. For now the data lives in typed files under
// /src/content — you drop an image into /public/artworks and add one entry.
// ---------------------------------------------------------------------------

export type Orientation = "portrait" | "landscape" | "square" | "panoramic";

export type ArtworkStatus =
  | "hidden"
  | "draft"
  | "published"
  | "not_for_sale"
  | "inquiry_only"
  | "available"
  | "reserved"
  | "sold"
  | "print_available";

/** Controls the visual weight of a work inside editorial grids. */
export type DisplaySize = "small" | "medium" | "large" | "wide" | "tall" | "full";

/** Duke&Lume works span many styles by design — this is a first-class filter
 *  dimension, not a hidden tag. Add new values here as the body of work grows. */
export type ArtStyle =
  | "painterly"
  | "modern"
  | "photorealistic"
  | "abstract"
  | "surreal"
  | "illustrative";

export const ART_STYLE_LABELS: Record<ArtStyle, string> = {
  painterly: "Painterly",
  modern: "Modern",
  photorealistic: "Photorealistic",
  abstract: "Abstract",
  surreal: "Surreal",
  illustrative: "Illustrative",
};

export interface ArtworkImage {
  /** Path under /public (e.g. "/artworks/the-sovereign.jpg"). Optional while a
   *  work is still being prepared — the UI shows a tonal placeholder instead. */
  src?: string;
  width: number;
  height: number;
  alt: string;
  /** Tiny base64/CSS blur used before the full image loads. */
  blurDataURL?: string;
}

/**
 * What actually exists and what is actually for sale (§17).
 *
 * Every field is optional and nothing is assumed: the artwork page states only
 * what is set here. This is deliberate — claiming "original artwork, one of
 * one" for a digital piece that has no physical original would be untrue.
 */
export interface EditionInfo {
  /** True only if a physical original object exists. */
  physicalOriginal?: boolean;
  /** True if the digital file itself is sold to the buyer. */
  digitalFileForSale?: boolean;
  /** True if prints can be ordered. */
  printAvailable?: boolean;
  /** e.g. "Archival pigment print on cotton rag". */
  printProcess?: string;
  /** e.g. ["40 × 60 cm", "70 × 100 cm"]. */
  printSizes?: string[];
  /** Limited-edition size and how many remain, when the edition is limited. */
  editionSize?: number;
  editionRemaining?: number;
  /** Signed certificate supplied with the work. */
  certificateOfAuthenticity?: boolean;
  /** Similar works can be commissioned. */
  commissionAvailable?: boolean;
}

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  year: number;
  /** One short line that names the idea, shown above the title. */
  conceptLine?: string;
  descriptionShort?: string;
  descriptionLong?: string;
  story?: string;
  /** How the piece was built — material / process note. */
  processNote?: string;
  /** Curator-chosen companions, used before any automatic suggestion. */
  relatedArtworkIds?: string[];
  /** What exists and what is for sale. Absent = nothing is claimed. */
  edition?: EditionInfo;
  medium?: string;
  dimensionsWidth?: number;
  dimensionsHeight?: number;
  dimensionsUnit?: string;
  orientation: Orientation;
  style?: ArtStyle;
  collectionId?: string;
  subjectTags?: string[];
  colorTags?: string[];
  moodTags?: string[];
  status: ArtworkStatus;

  // --- commerce fields, hidden from the UI until phase 2+ ---
  price?: number;
  currency?: string;
  editionType?: string;
  editionSize?: number;
  editionRemaining?: number;
  originalAvailable?: boolean;
  printAvailable?: boolean;

  featured?: boolean;
  /** Prominence on the homepage and in the gallery archive. */
  homepageOrder?: number;
  galleryOrder?: number;
  /** Curated position in the Exhibition sequence; falls back to galleryOrder. */
  exhibitionPosition?: number;
  /** Visual weight in editorial grids — set by the curator, never derived from
   *  the image's pixel dimensions (§11). */
  displaySize?: DisplaySize;
  /** Insert a deliberate breath of empty space before this work. */
  whitespaceBefore?: boolean;
  /** Where the caption sits for this work in editorial layouts. */
  captionPosition?: "below" | "overlay";

  image: ArtworkImage;
  detailImages?: ArtworkImage[];

  /** Two-tone gradient used for the placeholder when no image file exists yet.
   *  Lets the gallery feel composed and jewel-toned before real files arrive. */
  tone?: [string, string];

  seoTitle?: string;
  seoDescription?: string;
}

/** How a collection opens, so each reads as its own exhibition (§15). */
export type CollectionHeroLayout =
  | "standard"    // text beside cover
  | "fullscreen"  // cover fills the first screen
  | "diptych"     // two works side by side
  | "typographic" // oversized title, cover held back
  | "dark"        // dark room, spotlit cover
  | "detail";     // opens on a close-up fragment

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  number: string; // "01", "02", ...
  /** Opening treatment for this collection's page. Defaults to "standard". */
  heroLayout?: CollectionHeroLayout;
  /** A single line held out as the collection's epigraph. */
  featuredQuote?: string;
  yearStart?: number;
  yearEnd?: number;
  descriptionShort?: string;
  descriptionLong?: string;
  /** Optional pin. Left unset, the cover is the collection's newest work —
   *  see getCollectionCover(). */
  coverArtworkId?: string;
  featured?: boolean;
  displayOrder?: number;
}

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  heroTitle: string;
  heroText: string;
  heroArtworkId: string;
  featuredArtworkIds: string[];
  visionTitle: string;
  visionText: string;
  /** Large epigraph used as a "visual pause" between sections. */
  pageQuote: string;
  contactEmail: string;
  instagramUrl: string;
  footerText: string;
}
