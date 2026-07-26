import { site } from "@/content/site";
import { SectionLabel } from "@/components/typography/SectionLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";

/**
 * Closing CTA (§8.7).
 *
 * A subscription form would be decorative until a mailing backend exists, so
 * this deliberately offers two real actions instead: write to us, or keep up
 * on Instagram. Swap in a proper form once a newsletter provider is connected.
 */
export function NewsletterSection() {
  return (
    <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="container-gallery grid grid-cols-1 gap-10 py-[clamp(72px,12vw,150px)] md:grid-cols-12">
        <div className="md:col-span-6">
          <SectionLabel>Stay close</SectionLabel>
          <h2 className="type-h2 mt-6 max-w-[14ch] text-balance">
            Stay close to the work.
          </h2>
        </div>

        <div className="md:col-span-6 md:pt-3">
          <p className="type-body max-w-[46ch] text-[var(--color-text-secondary)]">
            New works and collections are shown first on Instagram. For
            exhibitions, collaborations or acquisition inquiries, write to us
            directly — every message is answered personally.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
            <ArrowLink href="/contact">Begin a conversation</ArrowLink>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 type-micro"
            >
              <span className="link-underline">Follow on Instagram</span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>

          <p className="type-small mt-8 text-[var(--color-text-secondary)]">
            <a
              href={`mailto:${site.contactEmail}`}
              className="text-[var(--color-text-primary)] link-underline"
            >
              {site.contactEmail}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
