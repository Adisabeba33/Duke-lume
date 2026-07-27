"use client";

import { useEffect, useRef, useState } from "react";
import type { Facet } from "./FilterBar";

/**
 * Mobile filtering (§12): a single "Filters" button with the active count,
 * opening a bottom sheet. Choices are staged locally and only committed on
 * "Apply", so the grid doesn't churn under the sheet.
 */
export function MobileFilters({
  facets,
  selection,
  activeCount,
  resultCount,
  onApply,
}: {
  facets: Facet[];
  selection: Record<string, string>;
  activeCount: number;
  resultCount: number;
  onApply: (selection: Record<string, string>) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(selection);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Re-sync when the committed selection changes elsewhere (e.g. chips).
  useEffect(() => {
    if (!open) setDraft(selection);
  }, [selection, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>("select, button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  const apply = () => {
    onApply(draft);
    close();
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="filter-sheet"
        className="inline-flex items-center gap-2 type-micro md:hidden"
      >
        Filters
        {activeCount > 0 && (
          <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center bg-[var(--color-text-primary)] px-1 text-[10px] leading-none text-[var(--color-background)]">
            {activeCount}
          </span>
        )}
      </button>

      <div
        id="filter-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Filter works"
        aria-hidden={!open}
        {...(!open ? { inert: "" as unknown as boolean } : {})}
        className={`fixed inset-0 z-[70] md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* backdrop */}
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close filters"
          onClick={close}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-400 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          ref={sheetRef}
          className={`absolute inset-x-0 bottom-0 max-h-[85svh] overflow-y-auto bg-[var(--color-background)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="container-gallery py-7">
            <div className="flex items-center justify-between">
              <h2 className="type-h3">Filters</h2>
              <button
                type="button"
                onClick={close}
                aria-label="Close filters"
                className="flex h-11 w-11 items-center justify-center text-[22px]"
              >
                <span aria-hidden>×</span>
              </button>
            </div>

            <div className="mt-6 flex flex-col divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
              {facets.map((facet) => (
                <label
                  key={facet.key}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <span className="type-micro text-[var(--color-text-secondary)]">
                    {facet.label}
                  </span>
                  <select
                    value={draft[facet.key] ?? "all"}
                    onChange={(e) =>
                      setDraft((d) => {
                        const next = { ...d };
                        if (e.target.value === "all") delete next[facet.key];
                        else next[facet.key] = e.target.value;
                        return next;
                      })
                    }
                    className="min-h-[44px] cursor-pointer bg-transparent type-body outline-none"
                  >
                    <option value="all">All</option>
                    {facet.options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>

            <div className="mt-7 flex items-center gap-4">
              <button
                type="button"
                onClick={apply}
                className="min-h-[48px] flex-1 border border-[var(--color-text-primary)] bg-[var(--color-text-primary)] px-6 type-micro text-[var(--color-background)]"
              >
                Apply filters
              </button>
              <button
                type="button"
                onClick={() => setDraft({})}
                className="min-h-[48px] px-4 type-micro"
              >
                Clear all
              </button>
            </div>

            <p className="mt-4 type-small text-[var(--color-text-secondary)]">
              {resultCount} {resultCount === 1 ? "work" : "works"} currently shown.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
