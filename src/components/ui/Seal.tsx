/** Circular typographic seal for Duke&Lume. Text follows a circle, D&L centred.
 *  Purely decorative (aria-hidden) — quiet, not glossy (§8.3). */
export function Seal({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Duke and Lume seal"
    >
      <defs>
        <path
          id="seal-top"
          d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
          fill="none"
        />
      </defs>
      <circle
        cx="100"
        cy="100"
        r="88"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
      />
      <text
        fontSize="11.5"
        letterSpacing="4.5"
        fill="currentColor"
        fontFamily="var(--font-sans)"
      >
        <textPath href="#seal-top" startOffset="0%">
          DUKE &amp; LUME · ART IS OUR LANGUAGE ·
        </textPath>
      </text>
      <text
        x="100"
        y="112"
        textAnchor="middle"
        fontSize="34"
        fill="currentColor"
        fontFamily="var(--font-serif)"
      >
        D&amp;L
      </text>
    </svg>
  );
}
