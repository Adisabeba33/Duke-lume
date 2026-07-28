// ---------------------------------------------------------------------------
// Gallery Connect — the manifest a gallery publishes about itself.
//
// A site drops one document at /.well-known/gallery-connect.json and any
// platform that speaks this format can read the whole catalogue in a single
// request: no scraping, no guessing, no "please check what we recognised".
//
// This file is the specification. It describes what a *site* declares about
// itself and nothing else — a consuming platform's own bookkeeping (the slug
// it assigns, moderation state, sync counters, which import strategy it used)
// lives on that platform and must never appear here.
//
// Compatibility rules, so consumers can rely on this:
//   - Fields are added, never repurposed. A minor version bump may add
//     optional fields; removing or changing the meaning of one is a major bump.
//   - Every field except those marked required is optional, and an absent
//     field claims nothing. `"price": null` and no `price` key mean the same
//     thing: this document makes no statement about price. That matters —
//     inventing a default here would put words in the gallery's mouth.
//   - Unknown fields must be ignored, not treated as an error.
// ---------------------------------------------------------------------------

/** Bumped only by the rules above. Consumers should check the major part. */
export const GALLERY_CONNECT_VERSION = "0.1";

/** Who made the work. Individual artists and studios both need to fit. */
export interface GcCreator {
  type: "person" | "organization";
  name: string;
  url?: string;
}

export interface GcContact {
  email?: string;
  /** Page to send an interested visitor to — usually a contact form. */
  url?: string;
}

/** An off-site profile: Instagram, a marketplace listing, a press page. */
export interface GcLink {
  rel: string;
  url: string;
}

/**
 * What the gallery permits a consuming platform to do with this catalogue.
 *
 * Publishing this file is itself the act of offering the catalogue for
 * syndication, but leaving that implicit is exactly the kind of thing that
 * turns into an argument later. Stating it in machine-readable form means a
 * platform can prove what it was allowed to do, and a gallery can revoke by
 * editing one field instead of writing to a support address.
 *
 * Absent block = the conservative reading: index the metadata, link back, do
 * not host copies of the images.
 */
export interface GcPermissions {
  /** Metadata may be indexed and shown. */
  index?: boolean;
  /** Images may be downloaded and re-hosted (thumbnails, CDN copies). */
  store_images?: boolean;
  /** Images may be displayed on the consuming platform. */
  display_images?: boolean;
  /** Displayed works must credit the creator and link to canonical_url. */
  attribution_required?: boolean;
}

export interface GcGallery {
  name: string;
  url: string;
  description?: string;
  creator?: GcCreator;
  contact?: GcContact;
  links?: GcLink[];
}

/** A curated grouping. Optional — plenty of sites are one flat list. */
export interface GcCollection {
  source_id: string;
  title: string;
  url?: string;
  subtitle?: string;
  description_text?: string;
  year_start?: number;
  year_end?: number;
  /** Display order on the origin site, ascending. */
  position?: number;
}

export interface GcImage {
  /** Exactly one image per artwork should be `primary`. */
  role: "primary" | "additional";
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  /** Order within the artwork, ascending. */
  position?: number;
}

/**
 * Physical dimensions of the work itself — not of the image file.
 * Emit only when the gallery actually states them.
 */
export interface GcDimensions {
  width?: number;
  height?: number;
  depth?: number;
  unit: "cm" | "mm" | "in";
}

/**
 * Amount is an integer in the currency's minor unit (cents, копейки).
 * Never a float: 0.1 + 0.2 is not 0.3, and a price is not a place to discover
 * that.
 *
 * `visibility: "on_request"` with no amount is a meaningful statement — the
 * work is priced, the number is not public. That is different from omitting
 * the block entirely, which says nothing about whether a price exists.
 */
export interface GcPrice {
  amount?: number;
  /** ISO 4217, uppercase. Required whenever `amount` is set. */
  currency?: string;
  visibility: "public" | "on_request";
}

/** What exists and what a buyer actually receives. */
export interface GcEdition {
  physical_original?: boolean;
  digital_file_for_sale?: boolean;
  print_available?: boolean;
  print_process?: string;
  print_sizes?: string[];
  edition_size?: number;
  edition_remaining?: number;
  certificate_of_authenticity?: boolean;
  commission_available?: boolean;
}

/**
 * Facets, kept separate rather than flattened into one tag list, because a
 * catalogue's filters are the whole point of aggregating in the first place
 * and "gold" as a colour is not "gold" as a subject.
 */
export interface GcTags {
  subject?: string[];
  color?: string[];
  mood?: string[];
}

export interface GcArtwork {
  /**
   * Stable identifier on the origin site. Required, and it must survive the
   * work being retitled or moved: it is the only thing that lets a consumer
   * recognise an update as an update instead of creating a duplicate.
   */
  source_id: string;
  /** Absolute URL of this work on the origin site. Required. */
  canonical_url: string;
  title: string;

  subtitle?: string;
  year?: number;
  /** One or two lines, plain text. */
  excerpt?: string;
  /** Full description, plain text. */
  description_text?: string;
  /**
   * Full description as HTML, when the gallery has real markup. Consumers
   * must sanitise this against an allow-list before rendering it — it is
   * third-party HTML arriving over the network.
   */
  description_html?: string;
  /** Longer narrative about the work, when the gallery keeps one. */
  story?: string;
  /** How it was made — material and process note. */
  process_note?: string;

  /** Verbatim from the site, e.g. "Oil on linen". Not normalised. */
  medium_raw?: string;
  /** Broad category, e.g. "Painting", "Photography", "Digital art". */
  artform?: string;
  /** Free-form style label, e.g. "painterly", "abstract". */
  style?: string;
  dimensions?: GcDimensions;

  price?: GcPrice;
  availability?: "for_sale" | "sold" | "reserved" | "not_for_sale";
  edition?: GcEdition;

  /**
   * `removed` is the reason this enum exists. A work vanishing from the array
   * is ambiguous — it could be a partial render or a site half-deployed — so a
   * gallery that wants a work definitively taken down keeps the entry and says
   * so. Consumers should treat a silent disappearance as "probably gone" and
   * an explicit `removed` as "certainly gone".
   */
  status: "published" | "removed";

  collection_id?: string;
  tags?: GcTags;
  images?: GcImage[];

  /**
   * Hash of this entry's own content. Lets a consumer diff item by item
   * without trusting anyone's clock, which matters because most static sites
   * have no per-item modification time to give.
   */
  content_hash?: string;
  /** ISO 8601. Emit only if the site genuinely knows it. */
  updated_at?: string;
}

export interface GcManifest {
  /** Format version. First key so a consumer can sniff it cheaply. */
  gallery_connect: string;
  gallery: GcGallery;
  permissions?: GcPermissions;
  /**
   * Proves to a specific platform that whoever controls this site asked to be
   * listed there. The platform issues the token; the gallery echoes it here.
   * Re-verification then costs the gallery nothing, because the file it
   * already publishes carries the proof.
   */
  verification?: { token: string };
  collections?: GcCollection[];
  artworks: GcArtwork[];
  /** Total across all pages — equals `artworks.length` when unpaginated. */
  artworks_count: number;
  /**
   * Absolute URL of the next page, for catalogues too large for one document.
   * Not produced at 0.1; reserved so adding it later stays backwards
   * compatible.
   */
  next?: string;
}
