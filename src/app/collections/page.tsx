import type { Metadata } from "next";
import Link from "next/link";
import { getOrderedCollections } from "@/content/collections";
import {
  getArtwork,
  getArtworksByCollection,
  getCollectionCover,
} from "@/content/artworks";
import { ArtworkImage } from "@/components/artwork/ArtworkImage";
import { SectionLabel } from "@/components/typography/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "The collections of Duke&Lume — each a self-contained exhibition across a single idea.",
  alternates: { canonical: "/collections" },
};

function period(c: { yearStart?: number; yearEnd?: number }) {
  if (!c.yearStart) return null;
  if (c.yearEnd && c.yearEnd !== c.yearStart) return `${c.yearStart}–${c.yearEnd}`;
  return String(c.yearStart);
}

export default function CollectionsPage() {
  const collections = getOrderedCollections();

  return (
    <section className="container-gallery pb-24 pt-[120px] md:pt-[150px]">
      <div className="mb-14 max-w-[52ch] md:mb-24">
        <SectionLabel withRule>Collections</SectionLabel>
        <h1 className="type-display mt-6">Works, grouped by idea.</h1>
        <p className="type-body mt-6 text-[var(--color-text-secondary)]">
          Each collection is a self-contained exhibition — a single thread
          followed across many works.
        </p>
      </div>

      <div className="flex flex-col gap-[clamp(64px,10vw,140px)]">
        {collections.map((c, i) => {
          const works = getArtworksByCollection(c.id);
          const cover =
            getArtwork(c.coverArtworkId ?? "") ?? getCollectionCover(c.id);
          const imageRight = i % 2 === 0;

          return (
            <Reveal key={c.id}>
              <Link
                href={`/collections/${c.slug}`}
                className="group grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12"
              >
                {/* text */}
                <div
                  className={`md:col-span-5 ${
                    imageRight ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="type-micro text-[var(--color-text-secondary)]">
                      {c.number}
                    </span>
                    {period(c) && (
                      <>
                        <span aria-hidden className="h-px w-10 bg-[var(--color-line)]" />
                        <span className="type-micro text-[var(--color-text-secondary)]">
                          {period(c)}
                        </span>
                      </>
                    )}
                  </div>
                  <h2 className="type-h1 mt-5 transition-opacity duration-300 group-hover:opacity-60">
                    {c.title}
                  </h2>
                  <p className="type-body mt-5 max-w-[42ch] text-[var(--color-text-secondary)]">
                    {c.descriptionShort}
                  </p>
                  <div className="mt-7 flex items-center gap-5">
                    <span className="type-micro text-[var(--color-text-secondary)]">
                      {works.length} {works.length === 1 ? "work" : "works"}
                    </span>
                    <span className="inline-flex items-center gap-2 type-micro">
                      <span className="link-underline">View collection</span>
                      <span
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </div>

                {/* cover */}
                <div
                  className={`md:col-span-7 ${
                    imageRight ? "md:order-2" : "md:order-1"
                  }`}
                >
                  {cover && (
                    <div className="overflow-hidden border border-[var(--color-line)]">
                      <ArtworkImage
                        artwork={cover}
                        sizes="(max-width: 768px) 100vw, 56vw"
                        className="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[&_img]:scale-[1.03]"
                      />
                    </div>
                  )}
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
