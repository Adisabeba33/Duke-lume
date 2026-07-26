import type { Artwork } from "@/content/types";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { Reveal } from "@/components/ui/Reveal";

/** A curated column-flow of works: portraits flow in two columns, while wide /
 *  full works break out to the full width as feature moments (§1, §11). */
export function EditorialWorks({ works }: { works: Artwork[] }) {
  return (
    <div className="columns-1 [column-gap:2rem] md:columns-2 md:[column-gap:3.5rem]">
      {works.map((a) => {
        const feature = a.displaySize === "full" || a.displaySize === "wide";
        return (
          <div
            key={a.id}
            className={`mb-10 break-inside-avoid md:mb-16 ${
              feature ? "md:[column-span:all]" : ""
            }`}
          >
            <Reveal>
              <ArtworkCard
                artwork={a}
                sizes={
                  feature
                    ? "(max-width: 768px) 100vw, 100vw"
                    : "(max-width: 768px) 100vw, 48vw"
                }
              />
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}
