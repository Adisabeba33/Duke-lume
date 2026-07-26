"use client";

import Link from "next/link";
import { useState } from "react";
import { collections } from "@/content/collections";
import { getArtwork } from "@/content/artworks";
import { ArtworkImage } from "@/components/artwork/ArtworkImage";
import { SectionLabel } from "@/components/typography/SectionLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";

/** Editorial collection list: large names on the left, a preview on the right
 *  that swaps as you move between rows (§8.4). Stacks on mobile. */
export function CollectionPreviewSection() {
  const ordered = [...collections].sort(
    (a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99)
  );
  const [active, setActive] = useState(0);
  const activeCollection = ordered[active];
  const preview =
    getArtwork(activeCollection?.coverArtworkId ?? "") ??
    getArtwork("gemstone-bloom");

  return (
    <section className="border-t border-[var(--color-line)]">
      <div className="container-gallery py-[clamp(72px,12vw,160px)]">
        <div className="mb-10 flex items-end justify-between md:mb-16">
          <SectionLabel withRule>Collections</SectionLabel>
          <ArrowLink href="/collections">View all collections</ArrowLink>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <ul className="md:col-span-7">
            {ordered.map((c, i) => (
              <li key={c.id} className="border-t border-[var(--color-line)] last:border-b">
                <Link
                  href={`/collections/${c.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-center gap-5 py-6 md:py-8"
                >
                  <span className="type-micro w-8 shrink-0 text-[var(--color-text-secondary)]">
                    {c.number}
                  </span>
                  <span
                    className={`type-h2 flex-1 transition-opacity duration-300 ${
                      active === i ? "opacity-100" : "opacity-45 group-hover:opacity-100"
                    }`}
                  >
                    {c.title}
                  </span>
                  <span className="hidden shrink-0 type-small text-[var(--color-text-secondary)] sm:block">
                    {c.yearStart}
                    {c.yearEnd && c.yearEnd !== c.yearStart ? `–${c.yearEnd}` : ""}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              {preview && (
                <ArtworkImage
                  artwork={preview}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="border border-[var(--color-line)]"
                />
              )}
              {activeCollection?.descriptionShort && (
                <p className="type-small mt-5 max-w-[40ch] text-[var(--color-text-secondary)]">
                  {activeCollection.descriptionShort}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
