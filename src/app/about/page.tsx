import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { artworks, getArtwork } from "@/content/artworks";
import { collections } from "@/content/collections";
import { ArtworkImage } from "@/components/artwork/ArtworkImage";
import { SectionLabel } from "@/components/typography/SectionLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { Seal } from "@/components/ui/Seal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Duke&Lume are two voices working inside one visual world — how the work is made, and why.",
  alternates: { canonical: "/about" },
};

const PRACTICE = [
  {
    n: "01",
    title: "Idea",
    text: "A work begins as a single stubborn image — a crowned bird, a husk holding a stone. Nothing is made until that image refuses to leave.",
  },
  {
    n: "02",
    title: "Composition",
    text: "Form, light and colour are built digitally, layer over layer, closer to painting than to photography. Scale and stillness are decided here.",
  },
  {
    n: "03",
    title: "Detail",
    text: "The work is then gone over by hand — texture, edges, the catch of light on a stone. Most of the time a piece takes is spent at this stage.",
  },
  {
    n: "04",
    title: "Final work",
    text: "A piece is finished only once it holds together at full size and in close-up. Then it either joins a collection or waits for the one it belongs to.",
  },
];

export default function AboutPage() {
  const total = artworks.length;
  const detail1 = "/artworks/details/the-sovereign-1.jpg";
  const detail2 = "/artworks/details/the-orb-2.jpg";
  const detail3 = "/artworks/details/ember-grain-2.jpg";
  const statementWork = getArtwork("the-regent");

  return (
    <>
      {/* 01 — Hero */}
      <section className="container-gallery pt-[120px] md:pt-[150px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <SectionLabel withRule>About</SectionLabel>
            <h1 className="type-display mt-6 max-w-[14ch] text-balance">
              We are Duke&amp;Lume.
            </h1>
            <p className="type-body mt-8 max-w-[52ch] text-[var(--color-text-secondary)]">
              Two voices working inside one visual world. We make images that
              sit between the painted and the impossible — jewelled creatures,
              vessels that keep something precious, rooms that never existed.
              {" "}
              {total} works so far, gathered into {collections.length}{" "}
              collections.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--color-line)]">
              <Image
                src={detail1}
                alt="A close detail of The Sovereign — gold filigree and set gemstones over painted feathers."
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Our Story */}
      <section className="container-gallery py-[clamp(80px,14vw,180px)]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <SectionLabel withRule>Our story</SectionLabel>
          </div>
          <div className="md:col-span-8">
            <div className="max-w-[62ch] space-y-6">
              <p className="type-h3">
                Duke&amp;Lume began as a private habit — making pictures for
                each other, with no audience in mind.
              </p>
              <p className="type-body text-[var(--color-text-secondary)]">
                The name holds both halves of it: Duke for weight, ceremony,
                the pull toward something regal; Lume for light, and for the
                way a single glow can decide a whole image. The work sits where
                those two instincts meet.
              </p>
              <p className="type-body text-[var(--color-text-secondary)]">
                What started as separate sketches turned into a shared world.
                The same creatures kept reappearing, the same stones, the same
                quiet rooms — until it was clear these were not single pictures
                but one long body of work. This gallery is that world, laid out
                in the order we would hang it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Our Practice */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-surface)]">
        <div className="container-gallery py-[clamp(80px,14vw,180px)]">
          <div className="mb-14 max-w-[46ch]">
            <SectionLabel withRule>Our practice</SectionLabel>
            <h2 className="type-h2 mt-6">
              Built digitally, finished by hand.
            </h2>
          </div>
          <ol className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
            {PRACTICE.map((step) => (
              <Reveal as="li" key={step.n}>
                <div className="flex items-baseline gap-4">
                  <span className="type-micro text-[var(--color-text-secondary)]">
                    {step.n}
                  </span>
                  <h3 className="type-h3">{step.title}</h3>
                </div>
                <p className="type-body mt-4 max-w-[46ch] text-[var(--color-text-secondary)]">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 — Two Voices / One World */}
      <section className="container-gallery py-[clamp(80px,14vw,180px)]">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel withRule>Two voices, one world</SectionLabel>
            <div className="mt-8 space-y-8">
              <div>
                <h3 className="type-h3">Duke</h3>
                <p className="type-body mt-2 max-w-[38ch] text-[var(--color-text-secondary)]">
                  Structure, weight and ceremony. Drawn to crowns, stone,
                  heraldry and the authority of a still figure.
                </p>
              </div>
              <div>
                <h3 className="type-h3">Lume</h3>
                <p className="type-body mt-2 max-w-[38ch] text-[var(--color-text-secondary)]">
                  Light, colour and atmosphere. Drawn to what glows from
                  inside — amber, opal, the last hour of the day.
                </p>
              </div>
            </div>
            <p className="type-small mt-10 max-w-[42ch] text-[var(--color-text-secondary)]">
              We do not sign works separately. Every piece is finished only when
              both of us would hang it.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:col-span-7 md:gap-6">
            <Reveal className="relative aspect-square overflow-hidden border border-[var(--color-line)]">
              <Image
                src={detail2}
                alt="A close detail of The Orb — banded brass and opal cabochons against smoky quartz."
                fill
                sizes="(max-width: 768px) 50vw, 28vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal
              delay={80}
              className="relative aspect-square overflow-hidden border border-[var(--color-line)]"
            >
              <Image
                src={detail3}
                alt="A close detail of Ember Grain — a seam of burning amber inside a violet husk."
                fill
                sizes="(max-width: 768px) 50vw, 28vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 05 — Artistic statement */}
      <section className="bg-[var(--color-dark-section)] text-[var(--color-dark-text)]">
        <div className="container-gallery py-[clamp(96px,16vw,200px)]">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
            <div className="md:col-span-8">
              <span className="type-micro text-[var(--color-dark-text)]/50">
                Artistic statement
              </span>
              <Reveal
                as="blockquote"
                className="type-display mt-8 max-w-[24ch] text-balance italic"
              >
                {site.pageQuote}
              </Reveal>
              <p className="type-body mt-10 max-w-[54ch] text-[var(--color-dark-text)]/70">
                We are not documenting objects. Each work is a memory of
                something that never happened — a bird that was never crowned,
                a stone no one has held. The detail is there to make the
                impossible feel remembered.
              </p>
            </div>
            <div className="flex md:col-span-4 md:justify-end">
              <Seal className="h-28 w-28 text-[var(--color-dark-text)]/60 md:h-40 md:w-40" />
            </div>
          </div>
        </div>
      </section>

      {/* 06 — a work, full width */}
      {statementWork && (
        <section className="container-gallery py-[clamp(80px,14vw,180px)]">
          <Reveal>
            <Link href={`/artwork/${statementWork.slug}`} className="group block">
              <div className="mx-auto max-w-[620px]">
                <ArtworkImage
                  artwork={statementWork}
                  sizes="(max-width: 768px) 100vw, 620px"
                  className="border border-[var(--color-line)] group-hover:[&_img]:scale-[1.02]"
                />
                <div className="mt-4 flex items-baseline justify-between">
                  <span className="font-[family-name:var(--font-serif)] text-[19px]">
                    {statementWork.title}
                  </span>
                  <span className="type-micro text-[var(--color-text-secondary)]">
                    {statementWork.year}
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      {/* 07 — Closing CTA */}
      <section className="border-t border-[var(--color-line)]">
        <div className="container-gallery grid grid-cols-1 gap-10 py-[clamp(72px,12vw,150px)] md:grid-cols-2">
          <div>
            <h2 className="type-h2 max-w-[16ch] text-balance">
              Explore the work.
            </h2>
            <div className="mt-7">
              <ArrowLink href="/gallery">View the gallery</ArrowLink>
            </div>
          </div>
          <div>
            <h2 className="type-h2 max-w-[16ch] text-balance">
              Begin a conversation.
            </h2>
            <p className="type-small mt-5 max-w-[42ch] text-[var(--color-text-secondary)]">
              For acquisitions, prints, exhibitions and collaborations.
            </p>
            <div className="mt-7">
              <ArrowLink href="/contact">Contact us</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
