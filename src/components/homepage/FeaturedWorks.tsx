import { site } from "@/content/site";
import { getArtwork } from "@/content/artworks";
import type { Artwork } from "@/content/types";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { SectionLabel } from "@/components/typography/SectionLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Curated selection — deliberately asymmetric, not a uniform grid (§8.2).
 * Left: four narrow verticals in a 2×2. Right: two wide horizontals stacked,
 * then whatever else is featured, smaller, in the space beneath them.
 */
export function FeaturedWorks() {
  const featured = site.featuredArtworkIds
    .map(getArtwork)
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const isWide = (a: Artwork) =>
    a.orientation === "landscape" || a.orientation === "panoramic";
  const verticals = featured.filter((a) => !isWide(a)).slice(0, 4);
  const wides = featured.filter(isWide).slice(0, 2);
  // The composition above holds six works. Anything else in the selection goes
  // under the wides as a smaller row, so the list can grow by a work or two
  // without the section having to be redrawn (§11).
  const rest = featured
    .filter((a) => !verticals.includes(a) && !wides.includes(a))
    .slice(0, 3);

  return (
    <section className="container-gallery py-[clamp(72px,12vw,160px)]">
      <div className="mb-10 flex items-end justify-between md:mb-14">
        <SectionLabel withRule>Featured Works</SectionLabel>
        <ArrowLink href="/gallery">View all works</ArrowLink>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
        {/* Left half — 2×2 verticals */}
        <div className="grid grid-cols-2 gap-4 md:col-span-5 md:gap-6">
          {verticals.map((a, i) => (
            // First work opens full-width on mobile, then the rest pair up —
            // a large-then-small rhythm instead of a uniform grid (§14).
            <Reveal
              key={a!.id}
              delay={i * 60}
              className={i === 0 ? "col-span-2 md:col-span-1" : ""}
            >
              <ArtworkCard
                artwork={a!}
                sizes={
                  i === 0
                    ? "(max-width: 768px) 100vw, 22vw"
                    : "(max-width: 768px) 50vw, 22vw"
                }
              />
            </Reveal>
          ))}
        </div>

        {/* Right half — two wide works, then the rest of the selection */}
        <div className="flex flex-col gap-4 md:col-span-7 md:gap-6">
          {wides.map((a, i) => (
            <Reveal key={a!.id} delay={i * 80} className="flex-1">
              <ArtworkCard
                artwork={a!}
                sizes="(max-width: 768px) 100vw, 56vw"
                className="h-full"
              />
            </Reveal>
          ))}

          {rest.length > 0 && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {rest.map((a, i) => {
                // Same rhythm as the verticals on the left: at 320px they pair
                // up rather than shrink to thumbnails, and an odd last work
                // takes the full width instead of sitting alone in a half.
                const full = i === rest.length - 1 && rest.length % 2 === 1;
                return (
                  <Reveal
                    key={a.id}
                    delay={160 + i * 60}
                    className={full ? "col-span-2 md:col-span-1" : ""}
                  >
                    <ArtworkCard
                      artwork={a}
                      sizes={
                        full
                          ? "(max-width: 768px) 100vw, 18vw"
                          : "(max-width: 768px) 50vw, 18vw"
                      }
                    />
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
