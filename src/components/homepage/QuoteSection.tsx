import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

/** A large epigraph used as a breathing pause between dense sections (§5, §11).
 *  Mostly empty space — the point is to let the eye rest. */
export function QuoteSection() {
  return (
    <section className="container-gallery py-[clamp(120px,22vw,280px)]">
      <div className="mx-auto max-w-[min(780px,90vw)] text-center">
        <span
          aria-hidden
          className="block font-[family-name:var(--font-serif)] text-[clamp(48px,8vw,120px)] leading-[0.5] text-[var(--color-text-secondary)]/40"
        >
          &ldquo;
        </span>
        <Reveal
          as="blockquote"
          className="type-display mt-2 text-balance italic text-[var(--color-text-primary)]"
        >
          {site.pageQuote}
        </Reveal>
      </div>
    </section>
  );
}
