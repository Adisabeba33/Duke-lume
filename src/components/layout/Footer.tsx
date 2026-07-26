import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
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
    </footer>
  );
}
