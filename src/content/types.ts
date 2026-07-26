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

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  year: number;
  descriptionShort?: string;
  descriptionLong?: string;
  story?: string;
  medium?: string;
  dimensionsWidth?: number;
  dimensionsHeight?: number;
  dimensionsUnit?: string;
  orientation: Orientation;
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
  homepageOrder?: number;
  galleryOrder?: number;
  displaySize?: DisplaySize;

  image: ArtworkImage;
  detailImages?: ArtworkImage[];

  /** Two-tone gradient used for the placeholder when no image file exists yet.
   *  Lets the gallery feel composed and jewel-toned before real files arrive. */
  tone?: [string, string];

  seoTitle?: string;
  seoDescription?: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  number: string; // "01", "02", ...
  yearStart?: number;
  yearEnd?: number;
  descriptionShort?: string;
  descriptionLong?: string;
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
  contactEmail: string;
  instagramUrl: string;
  footerText: string;
}
