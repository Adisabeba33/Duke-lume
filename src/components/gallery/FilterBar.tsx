"use client";

export interface FacetOption {
  value: string;
  label: string;
}

export interface Facet {
  key: string;
  label: string;
  options: FacetOption[];
}

/** A row of minimal, accessible facet selects (§9). Native selects give us a
 *  proper bottom sheet on mobile and full keyboard support for free. */
export function FilterBar({
  facets,
  selection,
  onChange,
  onClear,
  resultCount,
}: {
  facets: Facet[];
  selection: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onClear: () => void;
  resultCount: number;
}) {
  const hasActive = Object.values(selection).some((v) => v && v !== "all");

  return (
    <div className="flex flex-col gap-5 border-y border-[var(--color-line)] py-5 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        {facets.map((facet) => (
          <label key={facet.key} className="flex items-center gap-2">
            <span className="type-micro text-[var(--color-text-secondary)]">
              {facet.label}
            </span>
            <span className="relative inline-flex items-center">
              <select
                value={selection[facet.key] ?? "all"}
                onChange={(e) => onChange(facet.key, e.target.value)}
                className="cursor-pointer appearance-none bg-transparent pr-5 type-small text-[var(--color-text-primary)] outline-none"
              >
                <option value="all">All</option>
                {facet.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span
                aria-hidden
                className="pointer-events-none absolute right-0 text-[10px] text-[var(--color-text-secondary)]"
              >
                ▾
              </span>
            </span>
          </label>
        ))}
      </div>

      <div className="flex items-center gap-5">
        <span className="type-micro text-[var(--color-text-secondary)]">
          {resultCount} {resultCount === 1 ? "work" : "works"}
        </span>
        {hasActive && (
          <button
            onClick={onClear}
            className="type-micro text-[var(--color-text-primary)] underline-offset-4 hover:underline"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
