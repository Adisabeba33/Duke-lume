import Image from "next/image";
import type { Artwork, Collection } from "@/content/types";
import { getCollectionPeriod } from "@/content/artworks";
import { ArtworkImage } from "@/components/artwork/ArtworkImage";
import { Reveal } from "@/components/ui/Reveal";

function period(c: Collection) {
  if (!c.yearStart) return getCollectionPeriod(c.id) ?? null;
  if (c.yearEnd && c.yearEnd !== c.yearStart) return `${c.yearStart}–${c.yearEnd}`;
  return String(c.yearStart);
}

function Index({ c, tone = "ink" }: { c: Collection; tone?: "ink" | "light" }) {
  const dim = tone === "light" ? "text-[var(--color-dark-text)]/55" : "text-[var(--color-text-secondary)]";
  const rule = tone === "light" ? "bg-white/25" : "bg-[var(--color-line)]";
  return (
    <div className="flex items-center gap-4">
      <span className={`type-micro ${dim}`}>{c.number}</span>
      <span aria-hidden className={`h-px w-14 ${rule}`} />
      {period(c) && <span className={`type-micro ${dim}`}>{period(c)}</span>}
    </div>
  );
}

function Meta({
  c,
  count,
  tone = "ink",
}: {
  c: Collection;
  count: number;
  tone?: "ink" | "light";
}) {
  const dim =
    tone === "light"
      ? "text-[var(--color-dark-text)]/70"
      : "text-[var(--color-text-secondary)]";
  return (
    <>
      <p className={`type-body mt-7 max-w-[46ch] ${dim}`}>
        {c.descriptionLong ?? c.descriptionShort}
      </p>
      <p className={`mt-8 type-micro ${dim}`}>
        {count} {count === 1 ? "work" : "works"}
      </p>
    </>
  );
}

/**
 * A collection's opening screen (§15). Each collection declares a heroLayout so
 * no two read the same way — one opens fullscreen, another on a dark wall,
 * another on a close-up fragment, another as pure typography.
 */
export function CollectionHero({
  collection,
  cover,
  second,
  detailSrc,
  count,
}: {
  collection: Collection;
  cover?: Artwork;
  /** Second work, used by the diptych layout. */
  second?: Artwork;
  /** A close-up fragment of the cover, used by the detail layout. */
  detailSrc?: string;
  count: number;
}) {
  const layout = collection.heroLayout ?? "standard";

  // --- fullscreen: the cover fills the first screen, text over its foot ------
  if (layout === "fullscreen" && cover?.image.src) {
    return (
      <section className="relative h-[88svh] min-h-[520px] w-full">
        <Image
          src={cover.image.src}
          alt={cover.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/10" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="container-gallery pb-12 md:pb-16">
            <Index c={collection} tone="light" />
            <h1 className="type-display mt-5 text-[var(--color-dark-text)]">
              {collection.title}
            </h1>
            <Meta c={collection} count={count} tone="light" />
          </div>
        </div>
      </section>
    );
  }

  // --- dark: a spotlit work on a dark wall ----------------------------------
  if (layout === "dark" && cover) {
    return (
      <section className="bg-[var(--color-dark-section)] text-[var(--color-dark-text)]">
        <div className="container-gallery grid grid-cols-1 items-center gap-12 py-[clamp(64px,10vw,120px)] md:grid-cols-12">
          <div className="md:col-span-5">
            <Index c={collection} tone="light" />
            <h1 className="type-display mt-6">{collection.title}</h1>
            <Meta c={collection} count={count} tone="light" />
          </div>
          <Reveal className="md:col-span-7">
            <ArtworkImage
              artwork={cover}
              sizes="(max-width: 768px) 100vw, 56vw"
              priority
              className="shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]"
            />
          </Reveal>
        </div>
      </section>
    );
  }

  // --- diptych: two works, side by side -------------------------------------
  if (layout === "diptych" && cover) {
    return (
      <section className="container-gallery">
        <div className="max-w-[46ch]">
          <Index c={collection} />
          <h1 className="type-display mt-6">{collection.title}</h1>
          <Meta c={collection} count={count} />
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 md:gap-6">
          <Reveal>
            <ArtworkImage
              artwork={cover}
              sizes="(max-width: 640px) 100vw, 48vw"
              priority
              className="border border-[var(--color-line)]"
            />
          </Reveal>
          {second && (
            <Reveal delay={100} className="sm:mt-14">
              <ArtworkImage
                artwork={second}
                sizes="(max-width: 640px) 100vw, 48vw"
                className="border border-[var(--color-line)]"
              />
            </Reveal>
          )}
        </div>
      </section>
    );
  }

  // --- typographic: the title carries the screen, the work is held back -----
  if (layout === "typographic") {
    return (
      <section className="container-gallery">
        <Index c={collection} />
        <h1 className="type-display-xl mt-8 max-w-[16ch] text-balance">
          {collection.title}
        </h1>
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Meta c={collection} count={count} />
          </div>
          {cover && (
            <Reveal className="md:col-span-4 md:col-start-9">
              <ArtworkImage
                artwork={cover}
                sizes="(max-width: 768px) 100vw, 30vw"
                priority
                className="border border-[var(--color-line)]"
              />
            </Reveal>
          )}
        </div>
      </section>
    );
  }

  // --- detail: opens on a close-up fragment ---------------------------------
  if (layout === "detail" && detailSrc) {
    return (
      <section className="container-gallery">
        <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-7">
            <div className="relative aspect-[5/4] w-full overflow-hidden border border-[var(--color-line)]">
              <Image
                src={detailSrc}
                alt={`${collection.title} — a detail from ${cover?.title ?? "the collection"}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 56vw"
                className="object-cover"
              />
            </div>
            {cover && (
              <p className="mt-3 type-micro text-[var(--color-text-secondary)]">
                Detail — {cover.title}
              </p>
            )}
          </Reveal>
          <div className="md:col-span-5">
            <Index c={collection} />
            <h1 className="type-display mt-6">{collection.title}</h1>
            <Meta c={collection} count={count} />
          </div>
        </div>
      </section>
    );
  }

  // --- standard: text beside the cover --------------------------------------
  return (
    <section className="container-gallery">
      <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-6">
          <Index c={collection} />
          <h1 className="type-display mt-6">{collection.title}</h1>
          <Meta c={collection} count={count} />
        </div>
        {cover && (
          <div className="md:col-span-6">
            <ArtworkImage
              artwork={cover}
              sizes="(max-width: 768px) 100vw, 48vw"
              priority
              className="border border-[var(--color-line)]"
            />
          </div>
        )}
      </div>
    </section>
  );
}
