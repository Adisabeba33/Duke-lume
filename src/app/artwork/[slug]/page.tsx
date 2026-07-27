import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";
import {
  artworks,
  getArtwork,
  getCollectionNeighbours,
} from "@/content/artworks";
import { getCollection, getOrderedCollections } from "@/content/collections";
import { ArtworkViewer } from "@/components/artwork/ArtworkViewer";
import { RelatedWorks } from "@/components/artwork/RelatedWorks";
import { SectionLabel } from "@/components/typography/SectionLabel";
import type { Artwork, ArtworkStatus } from "@/content/types";

const BASE = "https://dukelume.com";

export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artwork = getArtwork(slug);
  if (!artwork) return { title: "Artwork not found" };
  const collection = artwork.collectionId
    ? getCollection(artwork.collectionId)
    : undefined;
  return {
    title: artwork.seoTitle ?? artwork.title,
    description: artwork.seoDescription ?? artwork.descriptionShort,
    alternates: { canonical: `/artwork/${artwork.slug}` },
    openGraph: {
      type: "article",
      title: `${artwork.title} — Duke&Lume`,
      description: artwork.descriptionShort,
      url: `${BASE}/artwork/${artwork.slug}`,
      // Absolute URL, uncropped: the work itself is the preview (§22).
      images: artwork.image.src
        ? [
            {
              url: `${BASE}${artwork.image.src}`,
              width: artwork.image.width,
              height: artwork.image.height,
              alt: artwork.image.alt,
            },
          ]
        : undefined,
    },
    other: collection ? { "article:section": collection.title } : undefined,
  };
}

// Detail close-ups are generated as /artworks/details/<slug>-N.jpg. Discover
// them at build time so no per-work data entry is needed.
function detailImagesFor(artwork: Artwork) {
  const dir = path.join(process.cwd(), "public", "artworks", "details");
  let files: string[] = [];
  try {
    files = fs
      .readdirSync(dir)
      .filter((f) => f.startsWith(`${artwork.slug}-`) && f.endsWith(".jpg"))
      .sort();
  } catch {
    files = [];
  }
  return files.map((f, i) => ({
    src: `/artworks/details/${f}`,
    alt: `${artwork.title} — detail ${i + 1}`,
  }));
}

const STATUS_LABEL: Record<ArtworkStatus, string | null> = {
  available: "Available",
  inquiry_only: "Available by inquiry",
  print_available: "Prints available",
  reserved: "Reserved",
  sold: "Sold",
  not_for_sale: "Private collection",
  published: null,
  draft: null,
  hidden: null,
};

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artwork = getArtwork(slug);
  if (!artwork) notFound();

  const collection = artwork.collectionId
    ? getCollection(artwork.collectionId)
    : undefined;
  const details = detailImagesFor(artwork);

  // Previous / next stay inside the collection; at the end we offer the next
  // collection rather than silently wrapping to the first work (§20).
  const { prev, next, siblings, index } = getCollectionNeighbours(artwork.slug);
  const ordered = getOrderedCollections();
  const collectionIdx = ordered.findIndex((c) => c.id === artwork.collectionId);
  const nextCollection =
    collectionIdx >= 0 ? ordered[(collectionIdx + 1) % ordered.length] : undefined;

  const dims =
    artwork.dimensionsWidth && artwork.dimensionsHeight
      ? `${artwork.dimensionsWidth} × ${artwork.dimensionsHeight} ${artwork.dimensionsUnit ?? "cm"}`
      : undefined;
  const meta: Array<[string, string | undefined]> = [
    ["Year", String(artwork.year)],
    ["Collection", collection?.title],
    ["Medium", artwork.medium],
    ["Dimensions", dims],
    ["Orientation", artwork.orientation],
  ];
  const statusLabel = STATUS_LABEL[artwork.status];
  const ed = artwork.edition;

  // Only claims backed by data (§17).
  const edition: Array<[string, string]> = [];
  if (ed?.physicalOriginal !== undefined)
    edition.push([
      "Physical original",
      ed.physicalOriginal ? "Exists" : "None — this is a digital work",
    ]);
  if (ed?.digitalFileForSale !== undefined)
    edition.push(["Digital file", ed.digitalFileForSale ? "Included in purchase" : "Not sold"]);
  if (ed?.printAvailable) edition.push(["Prints", ed.printProcess ?? "Available"]);
  if (ed?.printSizes?.length) edition.push(["Print sizes", ed.printSizes.join(" · ")]);
  if (ed?.editionSize)
    edition.push([
      "Edition",
      ed.editionRemaining !== undefined
        ? `${ed.editionRemaining} of ${ed.editionSize} remaining`
        : `Limited to ${ed.editionSize}`,
    ]);
  if (ed?.certificateOfAuthenticity)
    edition.push(["Certificate", "Signed certificate of authenticity"]);
  if (ed?.commissionAvailable)
    edition.push(["Commissions", "Similar works can be commissioned"]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: artwork.title,
    url: `${BASE}/artwork/${artwork.slug}`,
    dateCreated: String(artwork.year),
    artform: "Digital art",
    artMedium: artwork.medium,
    creator: { "@type": "Organization", name: "Duke&Lume", url: BASE },
    ...(artwork.image.src
      ? {
          image: {
            "@type": "ImageObject",
            url: `${BASE}${artwork.image.src}`,
            width: artwork.image.width,
            height: artwork.image.height,
          },
        }
      : {}),
    ...(artwork.dimensionsWidth && artwork.dimensionsHeight
      ? {
          width: {
            "@type": "QuantitativeValue",
            value: artwork.dimensionsWidth,
            unitText: artwork.dimensionsUnit ?? "cm",
          },
          height: {
            "@type": "QuantitativeValue",
            value: artwork.dimensionsHeight,
            unitText: artwork.dimensionsUnit ?? "cm",
          },
        }
      : {}),
    ...(collection
      ? {
          isPartOf: {
            "@type": "CreativeWorkSeries",
            name: collection.title,
            url: `${BASE}/collections/${collection.slug}`,
          },
        }
      : {}),
    description: artwork.descriptionShort,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Gallery", item: `${BASE}/gallery` },
      ...(collection
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: collection.title,
              item: `${BASE}/collections/${collection.slug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: collection ? 4 : 3,
        name: artwork.title,
        item: `${BASE}/artwork/${artwork.slug}`,
      },
    ],
  };

  return (
    <article className="container-gallery pb-24 pt-[120px] md:pt-[140px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex flex-wrap items-center gap-x-2 type-micro text-[var(--color-text-secondary)]"
      >
        <Link href="/gallery" className="hover:text-[var(--color-text-primary)]">
          Gallery
        </Link>
        {collection && (
          <>
            <span aria-hidden>/</span>
            <Link
              href={`/collections/${collection.slug}`}
              className="hover:text-[var(--color-text-primary)]"
            >
              {collection.title}
            </Link>
          </>
        )}
        <span aria-hidden>/</span>
        <span className="text-[var(--color-text-primary)]">{artwork.title}</span>
        {siblings.length > 1 && index >= 0 && (
          <span className="ml-2 opacity-60">
            {index + 1} / {siblings.length}
          </span>
        )}
      </nav>

      <ArtworkViewer artwork={artwork} details={details}>
        {/* concept line — names the idea before the title (§18) */}
        {artwork.conceptLine && (
          <p className="type-micro text-[var(--color-accent)]">
            {artwork.conceptLine}
          </p>
        )}

        <h1 className="type-h1 mt-4">{artwork.title}</h1>
        {collection && (
          <Link
            href={`/collections/${collection.slug}`}
            className="mt-3 inline-block type-small text-[var(--color-text-secondary)] link-underline"
          >
            {collection.title}
          </Link>
        )}

        <dl className="mt-8 space-y-3 border-t border-[var(--color-line)] pt-6">
          {meta.map(([label, value]) =>
            value ? (
              <div key={label} className="flex gap-4 type-small">
                <dt className="w-28 shrink-0 text-[var(--color-text-secondary)]">
                  {label}
                </dt>
                <dd className="capitalize">{value}</dd>
              </div>
            ) : null
          )}
        </dl>

        {artwork.descriptionLong && (
          <p className="type-body mt-8 text-[var(--color-text-secondary)]">
            {artwork.descriptionLong}
          </p>
        )}

        {artwork.processNote && (
          <div className="mt-8">
            <SectionLabel>Process</SectionLabel>
            <p className="type-body mt-3 text-[var(--color-text-secondary)]">
              {artwork.processNote}
            </p>
          </div>
        )}

        {/* availability — states only what the data actually says (§17) */}
        <div className="mt-10 border-t border-[var(--color-line)] pt-6">
          <SectionLabel>Availability</SectionLabel>
          {statusLabel && (
            <p className="mt-3 type-body text-[var(--color-accent)]">{statusLabel}</p>
          )}
          {edition.length > 0 ? (
            <dl className="mt-4 space-y-2">
              {edition.map(([label, value]) => (
                <div key={label} className="flex gap-4 type-small">
                  <dt className="w-28 shrink-0 text-[var(--color-text-secondary)]">
                    {label}
                  </dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-3 type-small text-[var(--color-text-secondary)]">
              Edition and print details are confirmed on request — write to us and
              we’ll set out exactly what is available for this work.
            </p>
          )}
        </div>

        <Link
          href={`/contact?artwork=${artwork.slug}`}
          className="mt-8 inline-flex w-full items-center justify-center border border-[var(--color-text-primary)] px-6 py-4 type-micro transition-colors hover:bg-[var(--color-text-primary)] hover:text-[var(--color-background)] md:w-auto"
        >
          Inquire about this work
        </Link>
      </ArtworkViewer>

      <RelatedWorks current={artwork.slug} />

      {/* previous / next inside the collection (§20) */}
      <nav
        className="mt-16 flex items-stretch justify-between gap-6 border-t border-[var(--color-line)] pt-8"
        aria-label="Artwork navigation"
      >
        {prev ? (
          <Link href={`/artwork/${prev.slug}`} className="group max-w-[45%]">
            <span className="type-micro text-[var(--color-text-secondary)]">
              ← Previous in {collection?.title ?? "gallery"}
            </span>
            <span className="mt-1 block truncate font-[family-name:var(--font-serif)] text-[19px] transition-opacity group-hover:opacity-70">
              {prev.title}
            </span>
          </Link>
        ) : (
          <Link href="/gallery" className="group max-w-[45%]">
            <span className="type-micro text-[var(--color-text-secondary)]">
              ← Back
            </span>
            <span className="mt-1 block font-[family-name:var(--font-serif)] text-[19px] transition-opacity group-hover:opacity-70">
              All works
            </span>
          </Link>
        )}

        {next ? (
          <Link href={`/artwork/${next.slug}`} className="group max-w-[45%] text-right">
            <span className="type-micro text-[var(--color-text-secondary)]">
              Next in {collection?.title ?? "gallery"} →
            </span>
            <span className="mt-1 block truncate font-[family-name:var(--font-serif)] text-[19px] transition-opacity group-hover:opacity-70">
              {next.title}
            </span>
          </Link>
        ) : (
          nextCollection && (
            <Link
              href={`/collections/${nextCollection.slug}`}
              className="group max-w-[45%] text-right"
            >
              <span className="type-micro text-[var(--color-text-secondary)]">
                Continue to another collection →
              </span>
              <span className="mt-1 block truncate font-[family-name:var(--font-serif)] text-[19px] transition-opacity group-hover:opacity-70">
                {nextCollection.title}
              </span>
            </Link>
          )
        )}
      </nav>
    </article>
  );
}
