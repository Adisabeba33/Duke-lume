import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  collections,
  getCollection,
  getOrderedCollections,
} from "@/content/collections";
import { getArtwork, getArtworksByCollection } from "@/content/artworks";
import { ArtworkImage } from "@/components/artwork/ArtworkImage";
import { EditorialWorks } from "@/components/collection/EditorialWorks";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return { title: "Collection not found" };
  return {
    title: `${c.title} — Collection`,
    description: c.descriptionShort,
    alternates: { canonical: `/collections/${c.slug}` },
    openGraph: { title: `${c.title} — Duke&Lume Collection`, description: c.descriptionShort },
  };
}

function period(c: { yearStart?: number; yearEnd?: number }) {
  if (!c.yearStart) return null;
  if (c.yearEnd && c.yearEnd !== c.yearStart) return `${c.yearStart}–${c.yearEnd}`;
  return String(c.yearStart);
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const works = getArtworksByCollection(collection.id);
  const cover =
    getArtwork(collection.coverArtworkId ?? "") ?? works[0];

  const ordered = getOrderedCollections();
  const idx = ordered.findIndex((c) => c.id === collection.id);
  const nextCollection = ordered[(idx + 1) % ordered.length];

  return (
    <article className="pb-24 pt-[120px] md:pt-[150px]">
      <div className="container-gallery">
        {/* breadcrumb (§23) */}
        <nav aria-label="Breadcrumb" className="type-micro text-[var(--color-text-secondary)]">
          <Link href="/" className="hover:text-[var(--color-text-primary)]">Home</Link>
          <span aria-hidden className="mx-2">/</span>
          <Link href="/collections" className="hover:text-[var(--color-text-primary)]">Collections</Link>
          <span aria-hidden className="mx-2">/</span>
          <span className="text-[var(--color-text-primary)]">{collection.title}</span>
        </nav>

        {/* hero */}
        <div className="mt-10 grid grid-cols-1 items-end gap-10 md:mt-14 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-4">
              <span className="type-micro text-[var(--color-text-secondary)]">
                {collection.number}
              </span>
              <span aria-hidden className="h-px w-14 bg-[var(--color-line)]" />
              {period(collection) && (
                <span className="type-micro text-[var(--color-text-secondary)]">
                  {period(collection)}
                </span>
              )}
            </div>
            <h1 className="type-display mt-6">{collection.title}</h1>
            <p className="type-body mt-7 max-w-[46ch] text-[var(--color-text-secondary)]">
              {collection.descriptionLong ?? collection.descriptionShort}
            </p>
            <p className="mt-8 type-micro text-[var(--color-text-secondary)]">
              {works.length} {works.length === 1 ? "work" : "works"}
            </p>
          </div>

          <div className="md:col-span-6">
            {cover && (
              <ArtworkImage
                artwork={cover}
                sizes="(max-width: 768px) 100vw, 48vw"
                priority
                className="border border-[var(--color-line)]"
              />
            )}
          </div>
        </div>
      </div>

      {/* the works */}
      <div className="container-gallery mt-[clamp(72px,12vw,150px)]">
        {works.length > 0 ? (
          <EditorialWorks works={works} />
        ) : (
          <p className="type-h3 py-16 text-[var(--color-text-secondary)]">
            Works from this collection are being prepared.
          </p>
        )}
      </div>

      {/* next collection */}
      <div className="container-gallery mt-[clamp(72px,12vw,150px)] border-t border-[var(--color-line)] pt-12">
        <Link href={`/collections/${nextCollection.slug}`} className="group block">
          <span className="type-micro text-[var(--color-text-secondary)]">
            Next collection
          </span>
          <div className="mt-3 flex items-baseline gap-5">
            <span className="type-micro text-[var(--color-text-secondary)]">
              {nextCollection.number}
            </span>
            <span className="type-h1 transition-opacity duration-300 group-hover:opacity-60">
              {nextCollection.title}
            </span>
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </div>
        </Link>
      </div>
    </article>
  );
}
