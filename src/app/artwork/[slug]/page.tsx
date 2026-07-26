import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";
import { artworks, getArtwork } from "@/content/artworks";
import { getCollection } from "@/content/collections";
import { ArtworkViewer } from "@/components/artwork/ArtworkViewer";
import { RelatedWorks } from "@/components/artwork/RelatedWorks";
import type { Artwork, ArtworkStatus } from "@/content/types";

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
  return {
    title: artwork.seoTitle ?? artwork.title,
    description: artwork.seoDescription ?? artwork.descriptionShort,
    alternates: { canonical: `/artwork/${artwork.slug}` },
    openGraph: {
      title: `${artwork.title} — Duke&Lume`,
      description: artwork.descriptionShort,
      images: artwork.image.src ? [artwork.image.src] : undefined,
    },
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

  const idx = artworks.findIndex((a) => a.slug === artwork.slug);
  const prev = artworks[(idx - 1 + artworks.length) % artworks.length];
  const next = artworks[(idx + 1) % artworks.length];

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: artwork.title,
    dateCreated: String(artwork.year),
    artMedium: artwork.medium,
    creator: { "@type": "Organization", name: "Duke&Lume" },
    ...(artwork.image.src ? { image: artwork.image.src } : {}),
    description: artwork.descriptionShort,
  };

  return (
    <article className="container-gallery pb-24 pt-[120px] md:pt-[140px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-8 flex items-center justify-between type-micro text-[var(--color-text-secondary)]">
        <Link href="/gallery" className="link-underline">
          ← Back to gallery
        </Link>
        <Link href={`/artwork/${next.slug}`} className="link-underline">
          Next work →
        </Link>
      </div>

      <ArtworkViewer artwork={artwork} details={details}>
        {/* exclusivity strip (§9) */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 type-micro text-[var(--color-text-secondary)]">
          <span>Original artwork</span>
          <span aria-hidden>·</span>
          <span>One of one</span>
          {statusLabel && (
            <>
              <span aria-hidden>·</span>
              <span className="text-[var(--color-accent)]">{statusLabel}</span>
            </>
          )}
        </div>

        <h1 className="type-h1 mt-5">{artwork.title}</h1>
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

        <Link
          href={`/contact?artwork=${artwork.slug}`}
          className="mt-10 inline-flex w-full items-center justify-center border border-[var(--color-text-primary)] px-6 py-4 type-micro transition-colors hover:bg-[var(--color-text-primary)] hover:text-[var(--color-background)] md:w-auto"
        >
          Inquire about this work
        </Link>
      </ArtworkViewer>

      <RelatedWorks current={artwork.slug} />

      <nav
        className="mt-16 flex items-center justify-between border-t border-[var(--color-line)] pt-8"
        aria-label="Artwork navigation"
      >
        <Link href={`/artwork/${prev.slug}`} className="group max-w-[45%]">
          <span className="type-micro text-[var(--color-text-secondary)]">
            ← Previous
          </span>
          <span className="mt-1 block truncate font-[family-name:var(--font-serif)] text-[18px] transition-opacity group-hover:opacity-70">
            {prev.title}
          </span>
        </Link>
        <Link href={`/artwork/${next.slug}`} className="group max-w-[45%] text-right">
          <span className="type-micro text-[var(--color-text-secondary)]">
            Next →
          </span>
          <span className="mt-1 block truncate font-[family-name:var(--font-serif)] text-[18px] transition-opacity group-hover:opacity-70">
            {next.title}
          </span>
        </Link>
      </nav>
    </article>
  );
}
