import Link from "next/link";

/** A quiet text link with a trailing arrow that eases forward on hover.
 *  Used for "Explore Gallery", "View all works", "About us", etc. */
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 type-micro text-[var(--color-text-primary)] ${className}`}
    >
      <span className="link-underline">{children}</span>
      <span
        aria-hidden
        className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
