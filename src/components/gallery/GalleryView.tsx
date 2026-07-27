"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Artwork } from "@/content/types";
import { ART_STYLE_LABELS } from "@/content/types";
import { collections } from "@/content/collections";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { ViewToggle, type GalleryMode } from "@/components/ui/ViewToggle";
import { FilterBar, type Facet } from "./FilterBar";
import { MobileFilters } from "./MobileFilters";

// Works flagged full/wide break out to span every column — a full-width feature
// that gives the exhibition its curated, asymmetric rhythm (§9).
const isFeature = (a: Artwork) =>
  a.displaySize === "full" || a.displaySize === "wide";

const FACET_KEYS = ["collection", "style", "orientation", "medium", "year"] as const;

export function GalleryView({ artworks }: { artworks: Artwork[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // --- state lives in the URL, so filters survive reload, Back and sharing (§13)
  const mode: GalleryMode = params.get("view") === "archive" ? "archive" : "exhibition";
  const selection = useMemo(() => {
    const s: Record<string, string> = {};
    for (const k of FACET_KEYS) {
      const v = params.get(k);
      if (v) s[k] = v;
    }
    return s;
  }, [params]);

  const write = useCallback(
    (next: { view?: GalleryMode; selection?: Record<string, string> }) => {
      const sp = new URLSearchParams();
      const view = next.view ?? mode;
      if (view === "archive") sp.set("view", "archive");
      const sel = next.selection ?? selection;
      for (const k of FACET_KEYS) {
        if (sel[k] && sel[k] !== "all") sp.set(k, sel[k]);
      }
      const qs = sp.toString();
      // scroll: false keeps the reading position when only filters change.
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [mode, selection, pathname, router]
  );

  const facets = useMemo<Facet[]>(() => {
    const present = <T,>(pick: (a: Artwork) => T | undefined) =>
      Array.from(new Set(artworks.map(pick).filter(Boolean))) as T[];

    const styleValues = present((a) => a.style);
    const orientationValues = present((a) => a.orientation);
    const mediumValues = present((a) => a.medium);
    const years = present((a) => a.year).sort((a, b) => Number(b) - Number(a));
    const collectionValues = collections.filter((c) =>
      artworks.some((a) => a.collectionId === c.id)
    );

    return [
      {
        key: "collection",
        label: "Collection",
        options: collectionValues.map((c) => ({ value: c.id, label: c.title })),
      },
      {
        key: "style",
        label: "Style",
        options: styleValues.map((s) => ({ value: s, label: ART_STYLE_LABELS[s] })),
      },
      {
        key: "orientation",
        label: "Orientation",
        options: orientationValues.map((o) => ({
          value: o,
          label: o[0].toUpperCase() + o.slice(1),
        })),
      },
      {
        key: "medium",
        label: "Medium",
        options: mediumValues.map((m) => ({ value: m, label: m })),
      },
      {
        key: "year",
        label: "Year",
        options: years.map((y) => ({ value: String(y), label: String(y) })),
      },
    ];
  }, [artworks]);

  // Exhibition sequence is curator-controlled (§11): exhibitionPosition first,
  // falling back to galleryOrder. Never derived from image dimensions.
  const sequence = useMemo(
    () =>
      [...artworks].sort(
        (a, b) =>
          (a.exhibitionPosition ?? a.galleryOrder ?? 999) -
          (b.exhibitionPosition ?? b.galleryOrder ?? 999)
      ),
    [artworks]
  );

  const filtered = useMemo(() => {
    return sequence.filter((a) => {
      const pass = (key: string, value: string | undefined) =>
        !selection[key] || selection[key] === "all" || selection[key] === value;
      return (
        pass("collection", a.collectionId) &&
        pass("style", a.style) &&
        pass("orientation", a.orientation) &&
        pass("medium", a.medium) &&
        pass("year", String(a.year))
      );
    });
  }, [sequence, selection]);

  const activeCount = Object.values(selection).filter((v) => v && v !== "all").length;

  // Announce result changes to screen readers, but not on first paint (§27).
  const firstRender = useRef(true);
  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setAnnouncement(
      `${filtered.length} ${filtered.length === 1 ? "work" : "works"} match the current filters.`
    );
  }, [filtered.length]);

  const clear = () => write({ selection: {} });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <ViewToggle mode={mode} onChange={(m) => write({ view: m })} />

        <div className="flex items-center gap-5">
          {/* count is visible in both views, on every breakpoint (§14) */}
          <span className="type-micro text-[var(--color-text-secondary)]">
            {filtered.length} {filtered.length === 1 ? "work" : "works"}
          </span>
          {mode === "archive" && (
            <MobileFilters
              facets={facets}
              selection={selection}
              activeCount={activeCount}
              resultCount={filtered.length}
              onApply={(sel) => write({ selection: sel })}
            />
          )}
        </div>
      </div>

      {mode === "archive" && (
        // desktop keeps the inline horizontal filter row
        <div className="mb-10 hidden md:block">
          <FilterBar
            facets={facets}
            selection={selection}
            onChange={(k, v) => write({ selection: { ...selection, [k]: v } })}
            onClear={clear}
            resultCount={filtered.length}
          />
        </div>
      )}

      {/* active filters as removable chips — mobile especially (§12) */}
      {mode === "archive" && activeCount > 0 && (
        <div className="mb-8 flex flex-wrap items-center gap-2 md:hidden">
          {FACET_KEYS.filter((k) => selection[k] && selection[k] !== "all").map((k) => {
            const facet = facets.find((f) => f.key === k);
            const label =
              facet?.options.find((o) => o.value === selection[k])?.label ?? selection[k];
            return (
              <button
                key={k}
                onClick={() => {
                  const next = { ...selection };
                  delete next[k];
                  write({ selection: next });
                }}
                className="inline-flex items-center gap-2 border border-[var(--color-line)] px-3 py-1.5 type-micro"
              >
                {label}
                <span aria-hidden>×</span>
                <span className="sr-only">Remove filter</span>
              </button>
            );
          })}
          <button onClick={clear} className="type-micro underline-offset-4 hover:underline">
            Clear all
          </button>
        </div>
      )}

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      {filtered.length === 0 ? (
        <EmptyState onClear={clear} />
      ) : mode === "exhibition" ? (
        <div className="columns-1 [column-gap:2rem] md:columns-2 md:[column-gap:3rem]">
          {filtered.map((a) => {
            const feature = isFeature(a);
            return (
              <div
                key={a.id}
                className={`break-inside-avoid ${
                  a.whitespaceBefore ? "mt-[clamp(56px,10vw,140px)]" : ""
                } mb-8 md:mb-14 ${feature ? "md:[column-span:all]" : ""}`}
              >
                <ArtworkCard
                  artwork={a}
                  sizes={
                    feature
                      ? "(max-width: 768px) 100vw, 100vw"
                      : "(max-width: 768px) 100vw, 48vw"
                  }
                />
              </div>
            );
          })}
        </div>
      ) : (
        // Archive: masonry that keeps every work's true proportions, stable gaps.
        <div className="[column-gap:1rem] columns-2 md:[column-gap:1.5rem] md:columns-3 xl:columns-4">
          {filtered.map((a) => (
            <div key={a.id} className="mb-4 break-inside-avoid md:mb-6">
              <ArtworkCard artwork={a} sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-start gap-5 py-24">
      <p className="type-h3 max-w-[34ch] text-[var(--color-text-secondary)]">
        No works match this combination of filters.
      </p>
      <p className="type-body max-w-[46ch] text-[var(--color-text-secondary)]">
        Try removing one of them — or view the full body of work.
      </p>
      <div className="flex flex-wrap items-center gap-7">
        <button onClick={onClear} className="type-micro link-underline">
          Clear filters
        </button>
      </div>
    </div>
  );
}
