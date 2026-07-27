import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  collections,
  getCollection,
  getOrderedCollections,
} from "@/content/collections";
import {
  getArtwork,
  getArtworksByCollection,
  getCollectionCover,
} from "@/content/artworks";
import fs from "node:fs";
import path from "node:path";
import { CollectionHero } from "@/components/collection/CollectionHero";
import { EditorialWorks } from "@/components/collection/EditorialWorks";

const BASE = "https://dukelume.com";

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
  // Cover art doubles as the collection's social preview (§22).
  const cover =
    getArtwork(c.coverArtworkId ?? "") ?? getCollectionCover(c.id);
  return {
    title: `${c.title} — Collection`,
    description: c.descriptionShort,
    alternates: { canonical: `/collections/${c.slug}` },
    openGraph: {
      title: `${c.title} — Duke&Lume Collection`,
      description: c.descriptionShort,
      url: `${BASE}/collections/${c.slug}`,
      images: cover?.image.src
        ? [
            {
              url: `${BASE}${cover.image.src}`,
              width: cover.image.width,
              height: cover.image.height,
              alt: cover.image.alt,
            },
          ]
        : undefined,
    },
  };
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
  // Cover = the collection's newest work (a pinned coverArtworkId wins if set).
  const cover =
    getArtwork(collection.coverArtworkId ?? "") ??
    getCollectionCover(collection.id);
  // The cover is already shown large in the hero — don't repeat it below.
  const rest = works.filter((w) => w.id !== cover?.id);

  // First close-up of the cover, used by the "detail" opening layout.
  let detailSrc: string | undefined;
  if (cover) {
    try {
      const dir = path.join(process.cwd(), "public", "artworks", "details");
      const file = fs
        .readdirSync(dir)
        .filter((f) => f.startsWith(`${cover.slug}-`) && f.endsWith(".jpg"))
        .sort()[0];
      if (file) detailSrc = `/artworks/details/${file}`;
    } catch {
      detailSrc = undefined;
    }
  }

  // The diptych opening shows a second work beside the cover, so it must not
  // appear again in the body list either.
  const bodyWorks =
    (collection.heroLayout ?? "standard") === "diptych" ? rest.slice(1) : rest;

  const ordered = getOrderedCollections();
  const idx = ordered.findIndex((c) => c.id === collection.id);
  const nextCollection = ordered[(idx + 1) % ordered.length];

  const seriesLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name: collection.title,
    url: `${BASE}/collections/${collection.slug}`,
    description: collection.descriptionLong ?? collection.descriptionShort,
    creator: { "@type": "Organization", name: "Duke&Lume", url: BASE },
    numberOfItems: works.length,
    ...(cover?.image.src ? { image: `${BASE}${cover.image.src}` } : {}),
    hasPart: works.map((w) => ({
      "@type": "VisualArtwork",
      name: w.title,
      url: `${BASE}/artwork/${w.slug}`,
    })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Collections", item: `${BASE}/collections` },
      {
        "@type": "ListItem",
        position: 3,
        name: collection.title,
        item: `${BASE}/collections/${collection.slug}`,
      },
    ],
  };

  return (
    <article className="pb-24 pt-[120px] md:pt-[150px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="container-gallery">
        {/* breadcrumb (§23) */}
        <nav aria-label="Breadcrumb" className="type-micro text-[var(--color-text-secondary)]">
          <Link href="/" className="hover:text-[var(--color-text-primary)]">Home</Link>
          <span aria-hidden className="mx-2">/</span>
          <Link href="/collections" className="hover:text-[var(--color-text-primary)]">Collections</Link>
          <span aria-hidden className="mx-2">/</span>
          <span className="text-[var(--color-text-primary)]">{collection.title}</span>
        </nav>

      </div>

      {/* opening screen — differs per collection (§15) */}
      <div className="mt-10 md:mt-14">
        <CollectionHero
          collection={collection}
          cover={cover}
          second={rest[0]}
          detailSrc={detailSrc}
          count={works.length}
        />
      </div>

      {/* the collection's epigraph (§16) */}
      {collection.featuredQuote && (
        <div className="container-gallery pt-[clamp(56px,9vw,110px)]">
          <blockquote className="mx-auto max-w-[26ch] text-balance text-center type-h2 italic">
            {collection.featuredQuote}
          </blockquote>
        </div>
      )}

      {/* the works (excluding the cover, shown above) */}
      {bodyWorks.length > 0 && (
        <div className="container-gallery mt-[clamp(72px,12vw,150px)]">
          <EditorialWorks works={bodyWorks} />
        </div>
      )}
      {works.length === 0 && (
        <div className="container-gallery">
          <p className="type-h3 py-16 text-[var(--color-text-secondary)]">
            Works from this collection are being prepared.
          </p>
        </div>
      )}

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
