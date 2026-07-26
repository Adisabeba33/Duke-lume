import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artworks, getArtwork } from "@/content/artworks";
import { getCollection } from "@/content/collections";
import { ArtworkImage } from "@/components/artwork/ArtworkImage";
import { SectionLabel } from "@/components/typography/SectionLabel";

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

const META_LABELS: Array<[string, (a: NonNullable<ReturnType<typeof getArtwork>>) => string | undefined]> =
  [
    ["Year", (a) => String(a.year)],
    ["Collection", (a) => (a.collectionId ? getCollection(a.collectionId)?.title : undefined)],
    ["Medium", (a) => a.medium],
    [
      "Dimensions",
      (a) =>
        a.dimensionsWidth && a.dimensionsHeight
          ? `${a.dimensionsWidth} × ${a.dimensionsHeight} ${a.dimensionsUnit ?? "cm"}`
          : undefined,
    ],
    ["Orientation", (a) => a.orientation],
  ];

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artwork = getArtwork(slug);
  if (!artwork) notFound();

  const idx = artworks.findIndex((a) => a.slug === artwork.slug);
  const prev = artworks[(idx - 1 + artworks.length) % artworks.length];
  const next = artworks[(idx + 1) % artworks.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: artwork.title,
    dateCreated: String(artwork.year),
    artMedium: artwork.medium,
    artform: "Digital painting",
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

      {/* top nav */}
      <div className="mb-8 flex items-center justify-between type-micro text-[var(--color-text-secondary)]">
        <Link href="/gallery" className="link-underline">
          ← Back to gallery
        </Link>
        <Link href={`/artwork/${next.slug}`} className="link-underline">
          Next work →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        {/* work — shown whole, never cropped (§10) */}
        <div className="md:col-span-8">
          <div className="border border-[var(--color-line)] bg-[var(--color-surface)]">
            <ArtworkImage
              artwork={artwork}
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>
        </div>

        {/* details */}
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <h1 className="type-h1">{artwork.title}</h1>

            <dl className="mt-8 space-y-3">
              {META_LABELS.map(([label, get]) => {
                const value = get(artwork);
                if (!value) return null;
                return (
                  <div key={label} className="flex gap-4 type-small">
                    <dt className="w-28 shrink-0 text-[var(--color-text-secondary)]">
                      {label}
                    </dt>
                    <dd className="capitalize">{value}</dd>
                  </div>
                );
              })}
            </dl>

            {artwork.descriptionLong && (
              <p className="type-body mt-8 text-[var(--color-text-secondary)]">
                {artwork.descriptionLong}
              </p>
            )}

            <div className="mt-10">
              <SectionLabel>Status</SectionLabel>
              <p className="mt-2 type-body capitalize">
                {artwork.status.replace(/_/g, " ")}
              </p>
            </div>

            {/* Pre-commerce action (§10, §26) */}
            <Link
              href={`/contact?artwork=${artwork.slug}`}
              className="mt-8 inline-flex w-full items-center justify-center border border-[var(--color-text-primary)] px-6 py-4 type-micro transition-colors hover:bg-[var(--color-text-primary)] hover:text-[var(--color-background)] md:w-auto"
            >
              Inquire about this work
            </Link>
          </div>
        </div>
      </div>

      {/* prev / next */}
      <nav
        className="mt-20 flex items-center justify-between border-t border-[var(--color-line)] pt-8"
        aria-label="Artwork navigation"
      >
        <Link href={`/artwork/${prev.slug}`} className="group">
          <span className="type-micro text-[var(--color-text-secondary)]">
            ← Previous
          </span>
          <span className="mt-1 block font-[family-name:var(--font-serif)] text-[18px] transition-opacity group-hover:opacity-70">
            {prev.title}
          </span>
        </Link>
        <Link href={`/artwork/${next.slug}`} className="group text-right">
          <span className="type-micro text-[var(--color-text-secondary)]">
            Next →
          </span>
          <span className="mt-1 block font-[family-name:var(--font-serif)] text-[18px] transition-opacity group-hover:opacity-70">
            {next.title}
          </span>
        </Link>
      </nav>
    </article>
  );
}
