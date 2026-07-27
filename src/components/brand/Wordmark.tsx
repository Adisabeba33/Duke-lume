/**
 * The Duke&Lume wordmark (§8).
 *
 * A locked-up composition rather than a plain heading: optical sizes are set
 * per part, kerning is hand-tuned at the joins, and the ampersand is italic,
 * bronze and slightly smaller so it reads as a mark, not a character. Kept to
 * the same cap height as before so header height is unchanged.
 */
export function Wordmark({
  className = "",
  tone = "ink",
}: {
  className?: string;
  /** "ink" on light ground, "light" on dark sections. */
  tone?: "ink" | "light";
}) {
  const base = tone === "light" ? "text-[var(--color-dark-text)]" : "text-[var(--color-text-primary)]";
  const amp = tone === "light" ? "text-[var(--color-dark-text)]/70" : "text-[var(--color-accent)]";

  return (
    <span
      className={`inline-flex items-baseline whitespace-nowrap font-[family-name:var(--font-serif)] font-medium leading-none ${base} ${className}`}
      aria-hidden
    >
      <span className="tracking-[-0.028em]">Duke</span>
      <span
        className={`mx-[0.055em] font-normal italic ${amp}`}
        style={{ fontSize: "0.82em" }}
      >
        &amp;
      </span>
      <span className="tracking-[-0.03em]">Lume</span>
    </span>
  );
}
