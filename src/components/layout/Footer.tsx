import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  // Build stamp is developer information — shown in development and on Vercel
  // preview deploys, never on the production site.
  const showVersion =
    process.env.NODE_ENV !== "production" ||
    (process.env.NEXT_PUBLIC_VERCEL_ENV ?? "") === "preview";
  const commit = process.env.NEXT_PUBLIC_COMMIT;
  const version = `v${process.env.NEXT_PUBLIC_BUILD_STAMP ?? "dev"}${
    commit ? ` · ${commit}` : ""
  }`;
  return (
    <footer className="border-t border-[var(--color-line)]">
      <div className="container-gallery relative flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between md:py-12">
        <p className="type-small text-[var(--color-text-secondary)]">
          <span className="font-[family-name:var(--font-serif)] text-[15px] text-[var(--color-text-primary)]">
            Duke&amp;Lume
          </span>{" "}
          © {year}
        </p>

        <p className="type-micro text-[var(--color-text-secondary)] md:absolute md:left-1/2 md:-translate-x-1/2">
          {site.footerText}
        </p>

        <div className="flex items-center gap-7 type-small">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
          >
            Instagram
          </a>
          <a
            href={`mailto:${site.contactEmail}`}
            className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
          >
            Email
          </a>
        </div>
      </div>

      {/* build version — development / preview only */}
      {showVersion && (
        <div className="container-gallery pb-8">
          <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-secondary)]/50">
            {version}
          </p>
        </div>
      )}
    </footer>
  );
}
