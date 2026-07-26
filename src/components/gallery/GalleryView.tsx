"use client";

import { useMemo, useState } from "react";
import type { Artwork } from "@/content/types";
import { ART_STYLE_LABELS } from "@/content/types";
import { collections } from "@/content/collections";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { ViewToggle, type GalleryMode } from "@/components/ui/ViewToggle";
import { FilterBar, type Facet } from "./FilterBar";

// Works flagged full/wide break out to span every column — a full-width feature
// that gives the exhibition its curated, asymmetric rhythm (§9).
const isFeature = (a: Artwork) =>
  a.displaySize === "full" || a.displaySize === "wide";

export function GalleryView({ artworks }: { artworks: Artwork[] }) {
  const [mode, setMode] = useState<GalleryMode>("exhibition");
  const [selection, setSelection] = useState<Record<string, string>>({});

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

  const filtered = useMemo(() => {
    return artworks.filter((a) => {
      if (selection.collection && selection.collection !== "all" && a.collectionId !== selection.collection)
        return false;
      if (selection.style && selection.style !== "all" && a.style !== selection.style)
        return false;
      if (selection.orientation && selection.orientation !== "all" && a.orientation !== selection.orientation)
        return false;
      if (selection.medium && selection.medium !== "all" && a.medium !== selection.medium)
        return false;
      if (selection.year && selection.year !== "all" && String(a.year) !== selection.year)
        return false;
      return true;
    });
  }, [artworks, selection]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <ViewToggle mode={mode} onChange={setMode} />
        {mode === "archive" && (
          <span className="type-micro text-[var(--color-text-secondary)] md:hidden">
            {filtered.length}
          </span>
        )}
      </div>

      {mode === "archive" && (
        <div className="mb-10">
          <FilterBar
            facets={facets}
            selection={selection}
            onChange={(k, v) => setSelection((s) => ({ ...s, [k]: v }))}
            onClear={() => setSelection({})}
            resultCount={filtered.length}
          />
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState onClear={() => setSelection({})} />
      ) : mode === "exhibition" ? (
        <div className="columns-1 [column-gap:2rem] md:columns-2 md:[column-gap:3rem]">
          {filtered.map((a) => {
            const feature = isFeature(a);
            return (
              <div
                key={a.id}
                className={`mb-8 break-inside-avoid md:mb-14 ${
                  feature ? "md:[column-span:all]" : ""
                }`}
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
    <div className="flex flex-col items-start gap-4 py-24">
      <p className="type-h3 text-[var(--color-text-secondary)]">
        No works match these filters.
      </p>
      <button onClick={onClear} className="type-micro link-underline">
        Clear filters
      </button>
    </div>
  );
}
