// ---------------------------------------------------------------------------
// Builds Duke&Lume's Gallery Connect manifest from the content files.
//
// This is the mapping layer, and it is deliberately the only place that knows
// both shapes. src/content/* stays the site's own model; format.ts stays the
// public contract; changing one does not drag the other along.
// ---------------------------------------------------------------------------

import { createHash } from "node:crypto";
import { artworks } from "@/content/artworks";
import { getOrderedCollections } from "@/content/collections";
import { site } from "@/content/site";
import type { Artwork, ArtworkStatus } from "@/content/types";
import {
  GALLERY_CONNECT_VERSION,
  type GcArtwork,
  type GcCollection,
  type GcEdition,
  type GcImage,
  type GcManifest,
  type GcPrice,
  type GcTags,
} from "./format";

// Same canonical origin the sitemap and JSON-LD use.
const BASE = "https://dukelume.com";

const absolute = (path: string) => (path.startsWith("http") ? path : `${BASE}${path}`);

/**
 * How a site status maps onto the two things the format keeps apart:
 * whether the work is listed at all, and whether it is for sale.
 *
 * The site model folds both into one field, which is fine for rendering one
 * site and wrong for a catalogue — "sold" and "hidden" are not the same kind
 * of fact. The switch is exhaustive on purpose: adding a status to the content
 * model breaks the build here until someone decides what it means publicly.
 */
type Listing = {
  listed: boolean;
  availability?: GcArtwork["availability"];
  priceVisibility?: GcPrice["visibility"];
};

function listingFor(status: ArtworkStatus): Listing {
  switch (status) {
    // Not finished, or deliberately withheld. A private draft has no business
    // leaving the building in a public document.
    case "hidden":
    case "draft":
      return { listed: false };
    // Published with no claim about sale either way.
    case "published":
      return { listed: true };
    case "available":
      return { listed: true, availability: "for_sale" };
    // Priced, but the number is handled by conversation rather than published.
    case "inquiry_only":
      return { listed: true, availability: "for_sale", priceVisibility: "on_request" };
    case "print_available":
      return { listed: true, availability: "for_sale" };
    case "reserved":
      return { listed: true, availability: "reserved" };
    case "sold":
      return { listed: true, availability: "sold" };
    case "not_for_sale":
      return { listed: true, availability: "not_for_sale" };
  }
}

/** Matches the sitemap's rule, so the two never disagree about what is public. */
export const isPubliclyListed = (a: Artwork) => listingFor(a.status).listed;

function imagesFor(a: Artwork): GcImage[] | undefined {
  const images: GcImage[] = [];

  if (a.image.src) {
    images.push({
      role: "primary",
      url: absolute(a.image.src),
      width: a.image.width,
      height: a.image.height,
      alt: a.image.alt,
      position: 0,
    });
  }

  for (const [i, detail] of (a.detailImages ?? []).entries()) {
    if (!detail.src) continue;
    images.push({
      role: "additional",
      url: absolute(detail.src),
      width: detail.width,
      height: detail.height,
      alt: detail.alt,
      position: images.length + i,
    });
  }

  return images.length ? images : undefined;
}

function priceFor(a: Artwork, visibility?: GcPrice["visibility"]): GcPrice | undefined {
  // The content model stores a price in major units (4800 means 4800 dollars),
  // so it is scaled here. The format takes minor units only — see GcPrice.
  if (a.price !== undefined && a.currency) {
    return {
      amount: Math.round(a.price * 100),
      currency: a.currency.toUpperCase(),
      visibility: visibility ?? "public",
    };
  }
  // No number, but the status still says something: the work is priced and the
  // figure comes on request. Worth stating — silence would imply neither.
  return visibility ? { visibility } : undefined;
}

function editionFor(a: Artwork): GcEdition | undefined {
  const e = a.edition;
  if (!e) return undefined;
  const edition: GcEdition = {
    ...(e.physicalOriginal !== undefined && { physical_original: e.physicalOriginal }),
    ...(e.digitalFileForSale !== undefined && { digital_file_for_sale: e.digitalFileForSale }),
    ...(e.printAvailable !== undefined && { print_available: e.printAvailable }),
    ...(e.printProcess && { print_process: e.printProcess }),
    ...(e.printSizes?.length && { print_sizes: e.printSizes }),
    ...(e.editionSize !== undefined && { edition_size: e.editionSize }),
    ...(e.editionRemaining !== undefined && { edition_remaining: e.editionRemaining }),
    ...(e.certificateOfAuthenticity !== undefined && {
      certificate_of_authenticity: e.certificateOfAuthenticity,
    }),
    ...(e.commissionAvailable !== undefined && { commission_available: e.commissionAvailable }),
  };
  return Object.keys(edition).length ? edition : undefined;
}

function tagsFor(a: Artwork): GcTags | undefined {
  const tags: GcTags = {
    ...(a.subjectTags?.length && { subject: a.subjectTags }),
    ...(a.colorTags?.length && { color: a.colorTags }),
    ...(a.moodTags?.length && { mood: a.moodTags }),
  };
  return Object.keys(tags).length ? tags : undefined;
}

/**
 * Hash of the entry's own content, computed before content_hash is attached.
 * Key order is fixed by construction below, so the same content always hashes
 * the same — which is the only reason this is useful to a consumer.
 */
const hashEntry = (entry: Omit<GcArtwork, "content_hash">) =>
  `sha256:${createHash("sha256").update(JSON.stringify(entry)).digest("hex")}`;

function toGcArtwork(a: Artwork): GcArtwork {
  const { availability, priceVisibility } = listingFor(a.status);
  const price = priceFor(a, priceVisibility);
  const dimensions =
    a.dimensionsWidth !== undefined && a.dimensionsHeight !== undefined
      ? {
          width: a.dimensionsWidth,
          height: a.dimensionsHeight,
          unit: (a.dimensionsUnit ?? "cm") as "cm" | "mm" | "in",
        }
      : undefined;

  const entry: Omit<GcArtwork, "content_hash"> = {
    source_id: a.id,
    canonical_url: `${BASE}/artwork/${a.slug}`,
    title: a.title,
    // conceptLine is the site's kicker line; as a public subtitle it reads the
    // same way, so it stands in when no explicit subtitle exists.
    ...((a.subtitle ?? a.conceptLine) && { subtitle: a.subtitle ?? a.conceptLine }),
    year: a.year,
    ...(a.descriptionShort && { excerpt: a.descriptionShort }),
    ...(a.descriptionLong && { description_text: a.descriptionLong }),
    ...(a.story && { story: a.story }),
    ...(a.processNote && { process_note: a.processNote }),
    ...(a.medium && { medium_raw: a.medium }),
    artform: "Digital art",
    ...(a.style && { style: a.style }),
    ...(dimensions && { dimensions }),
    ...(price && { price }),
    ...(availability && { availability }),
    ...(editionFor(a) && { edition: editionFor(a) }),
    status: "published",
    ...(a.collectionId && { collection_id: a.collectionId }),
    ...(tagsFor(a) && { tags: tagsFor(a) }),
    ...(imagesFor(a) && { images: imagesFor(a) }),
  };

  return { ...entry, content_hash: hashEntry(entry) };
}

function toGcCollection(
  c: ReturnType<typeof getOrderedCollections>[number],
  position: number
): GcCollection {
  return {
    source_id: c.id,
    title: c.title,
    url: `${BASE}/collections/${c.slug}`,
    ...(c.subtitle && { subtitle: c.subtitle }),
    ...((c.descriptionLong ?? c.descriptionShort) && {
      description_text: c.descriptionLong ?? c.descriptionShort,
    }),
    ...(c.yearStart !== undefined && { year_start: c.yearStart }),
    ...(c.yearEnd !== undefined && { year_end: c.yearEnd }),
    position,
  };
}

/**
 * The manifest carries no build timestamp, on purpose. Anything that changes
 * on every deploy would change the ETag on every deploy, and consumers would
 * re-download an identical catalogue daily — defeating the conditional-request
 * flow this document exists to support.
 */
export function buildManifest(): GcManifest {
  const listed = artworks.filter(isPubliclyListed);
  const token = process.env.GALLERY_CONNECT_VERIFICATION_TOKEN;

  return {
    gallery_connect: GALLERY_CONNECT_VERSION,
    gallery: {
      name: site.siteTitle,
      url: BASE,
      description: site.siteDescription,
      creator: { type: "organization", name: site.siteTitle, url: BASE },
      contact: { email: site.contactEmail, url: `${BASE}/contact` },
      links: [{ rel: "instagram", url: site.instagramUrl }],
    },
    // Duke&Lume publishes this file to be syndicated, and hosted copies are
    // the point — a platform serving our originals from its own CDN spares
    // this site the traffic and survives our next redesign.
    permissions: {
      index: true,
      store_images: true,
      display_images: true,
      attribution_required: true,
    },
    ...(token && { verification: { token } }),
    collections: getOrderedCollections().map(toGcCollection),
    artworks: listed.map(toGcArtwork),
    artworks_count: listed.length,
  };
}

/** Byte-identical to what the route serves, so the ETag matches the body. */
export const serializeManifest = (manifest: GcManifest) => JSON.stringify(manifest, null, 2);

export const manifestETag = (body: string) =>
  `"${createHash("sha256").update(body).digest("hex").slice(0, 32)}"`;
