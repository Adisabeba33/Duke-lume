import Image from "next/image";
import type { Artwork } from "@/content/types";

/**
 * Renders an artwork while preserving its true aspect ratio (§20, §33).
 *
 * - If the work has an image file, uses next/image (responsive, lazy, AVIF/WebP).
 * - If not, renders a composed tonal placeholder from the work's `tone` so the
 *   editorial layout stays intact before real files arrive (the "draft/image
 *   unavailable" state from §27). Never crops, never a spinner.
 */
export function ArtworkImage({
  artwork,
  sizes,
  priority = false,
  cover = false,
  className = "",
}: {
  artwork: Artwork;
  sizes: string;
  priority?: boolean;
  /** Fill the parent (which must be positioned + sized) instead of holding the
   *  work's own aspect ratio. Used by the full-bleed section. */
  cover?: boolean;
  className?: string;
}) {
  const { image, tone, title, year } = artwork;
  const ratio = image.width / image.height;

  return (
    <div
      className={`overflow-hidden bg-[var(--color-surface)] ${
        cover ? "absolute inset-0 h-full w-full" : "relative w-full"
      } ${className}`}
      style={cover ? undefined : { aspectRatio: `${image.width} / ${image.height}` }}
    >
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder={image.blurDataURL ? "blur" : "empty"}
          blurDataURL={image.blurDataURL}
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        />
      ) : (
        <Placeholder tone={tone} title={title} year={year} ratio={ratio} />
      )}
    </div>
  );
}

function Placeholder({
  tone,
  title,
  year,
  ratio,
}: {
  tone?: [string, string];
  title: string;
  year: number;
  ratio: number;
}) {
  const [a, b] = tone ?? ["#3a3a38", "#6d685f"];
  return (
    <div
      className="absolute inset-0 flex items-end"
      style={{
        backgroundImage: `radial-gradient(120% 90% at 30% 20%, ${a} 0%, ${b} 55%, ${a} 100%)`,
      }}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay [background-image:repeating-linear-gradient(45deg,#fff_0,#fff_1px,transparent_1px,transparent_3px)]" />
      <div className="relative w-full p-4 sm:p-5">
        <span
          className="block text-[var(--color-dark-text)]/85 font-[family-name:var(--font-serif)] leading-none"
          style={{ fontSize: ratio > 1.4 ? "clamp(18px,2vw,26px)" : "clamp(16px,1.6vw,22px)" }}
        >
          {title}
        </span>
        <span className="mt-1 block text-[10px] uppercase tracking-[0.16em] text-[var(--color-dark-text)]/55">
          {year} · image coming
        </span>
      </div>
    </div>
  );
}
