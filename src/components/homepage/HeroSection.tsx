import Link from "next/link";
import { site } from "@/content/site";
import { getArtwork, getFeaturedArtworks } from "@/content/artworks";
import { ArtworkImage } from "@/components/artwork/ArtworkImage";
import { ArrowLink } from "@/components/ui/ArrowLink";

export function HeroSection() {
  const hero = getArtwork(site.heroArtworkId);
  const total = getFeaturedArtworks().length + 1;
  if (!hero) return null;

  return (
    <section className="container-gallery">
      <div className="grid min-h-[calc(100svh-68px)] grid-cols-1 gap-y-10 pb-16 pt-[92px] md:min-h-[calc(100svh-92px)] md:grid-cols-12 md:gap-x-8 md:pb-24 md:pt-[112px]">
        {/* Left — editorial text (≈42%). Text-first on mobile (§8.1). */}
        <div className="flex flex-col md:col-span-5 md:justify-center md:pr-8">
          <div className="flex items-center gap-4">
            <span className="type-micro text-[var(--color-text-secondary)]">01</span>
            <span aria-hidden className="h-px w-14 bg-[var(--color-line)]" />
          </div>

          <h1 className="type-display-xl mt-6 max-w-[9ch] text-balance md:mt-8">
            {site.heroTitle}
          </h1>

          <p className="type-body mt-7 max-w-[42ch] text-[var(--color-text-secondary)]">
            {site.heroText}
          </p>

          <div className="mt-9">
            <ArrowLink href="/gallery">Explore Gallery</ArrowLink>
          </div>

          <div className="mt-10 flex items-center gap-3 type-small text-[var(--color-text-secondary)] md:mt-auto md:pt-14">
            <span className="text-[var(--color-text-primary)]">01</span>
            <span aria-hidden>/</span>
            <span>{String(total).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Right — one dominant vertical work (≈58%) */}
        <div className="md:col-span-7">
          <Link href={`/artwork/${hero.slug}`} className="group block">
            <div className="relative border border-[var(--color-line)]">
              <ArtworkImage
                artwork={hero}
                priority
                sizes="(max-width: 768px) 100vw, 58vw"
                className="max-h-[calc(100svh-160px)] group-hover:[&_img]:scale-[1.02]"
              />
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-[family-name:var(--font-serif)] text-[18px]">
                {hero.title}
              </span>
              <span className="type-micro text-[var(--color-text-secondary)]">
                {hero.year}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
