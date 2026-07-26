import { site } from "@/content/site";
import { SectionLabel } from "@/components/typography/SectionLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { Seal } from "@/components/ui/Seal";

/** A calm breathing space after the dense grid (§8.3). */
export function VisionSection() {
  return (
    <section className="relative overflow-hidden">
      {/* very soft, out-of-focus botanical shadow (§8.3) — not a photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-[420px] w-[420px] rounded-full opacity-[0.05] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, #171717 0%, transparent 60%)",
        }}
      />
      <div className="container-gallery py-[clamp(96px,16vw,200px)]">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-9">
            <SectionLabel>{site.visionTitle}</SectionLabel>
            <Reveal
              as="p"
              className="type-display mt-8 max-w-[18ch] text-balance"
            >
              {site.visionText}
            </Reveal>
            <div className="mt-10">
              <ArrowLink href="/about">About us</ArrowLink>
            </div>
          </div>

          <div className="flex justify-start md:col-span-3 md:justify-end">
            <Seal className="h-28 w-28 text-[var(--color-text-secondary)] md:h-36 md:w-36" />
          </div>
        </div>
      </div>
    </section>
  );
}
