import { site } from "@/content/site";
import { SectionLabel } from "@/components/typography/SectionLabel";

/** Quiet closing CTA — no aggressive popup (§8.7). The form is presentational
 *  for now; wiring to Resend / a server action comes with the contact build. */
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

        <div className="md:col-span-6 md:pt-2">
          <form
            className="flex max-w-md items-center gap-4 border-b border-[var(--color-text-primary)]/40 pb-3"
            aria-label="Subscribe to updates"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Your email"
              className="w-full bg-transparent type-body outline-none placeholder:text-[var(--color-text-secondary)]"
            />
            <button
              type="submit"
              className="shrink-0 type-micro transition-opacity hover:opacity-60"
            >
              Subscribe
            </button>
          </form>

          <p className="type-small mt-8 max-w-[46ch] text-[var(--color-text-secondary)]">
            For exhibitions, collaborations or acquisition inquiries:{" "}
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
