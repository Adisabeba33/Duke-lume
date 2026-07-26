import type { Metadata } from "next";
import { site } from "@/content/site";
import { getArtwork } from "@/content/artworks";
import { SectionLabel } from "@/components/typography/SectionLabel";
import { ContactForm } from "@/components/forms/ContactForm";
import { INQUIRY_TYPES } from "@/content/inquiry";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Begin a conversation with Duke&Lume — acquisitions, prints, exhibitions, collaborations and press.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ artwork?: string }>;
}) {
  const { artwork: slug } = await searchParams;
  const artwork = slug ? getArtwork(slug) : undefined;
  // Arriving from an artwork page pre-selects acquisition and carries the work.
  const defaultType = artwork ? "Artwork acquisition" : "General inquiry";

  return (
    <section className="container-gallery pb-24 pt-[120px] md:pt-[150px]">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-12">
        {/* left — invitation + details */}
        <div className="md:col-span-5">
          <SectionLabel withRule>Contact</SectionLabel>
          <h1 className="type-display mt-6 max-w-[16ch] text-balance">
            Let’s begin a conversation.
          </h1>
          <p className="type-body mt-8 max-w-[44ch] text-[var(--color-text-secondary)]">
            Whether you are considering a work, planning an exhibition or simply
            curious about how a piece was made — write to us. Every message is
            read and answered personally.
          </p>

          <dl className="mt-12 space-y-6">
            <div>
              <dt className="type-micro text-[var(--color-text-secondary)]">
                Email
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="type-body link-underline"
                >
                  {site.contactEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="type-micro text-[var(--color-text-secondary)]">
                Instagram
              </dt>
              <dd className="mt-1">
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="type-body link-underline"
                >
                  @dukelume
                </a>
              </dd>
            </div>
            <div>
              <dt className="type-micro text-[var(--color-text-secondary)]">
                Inquiries
              </dt>
              <dd className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                {INQUIRY_TYPES.map((t, i) => (
                  <span key={t} className="type-small text-[var(--color-text-secondary)]">
                    {t}
                    {i < INQUIRY_TYPES.length - 1 && (
                      <span aria-hidden className="ml-3 opacity-40">·</span>
                    )}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        {/* right — the form */}
        <div className="md:col-span-6 md:col-start-7">
          <ContactForm
            artworkSlug={artwork?.slug}
            artworkTitle={artwork?.title}
            artworkYear={artwork?.year}
            defaultType={defaultType}
          />
        </div>
      </div>
    </section>
  );
}
