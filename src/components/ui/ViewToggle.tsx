"use client";

export type GalleryMode = "exhibition" | "archive";

/** Exhibition / Archive switch (§9). Quiet — a thin underline marks the active
 *  mode, no button chrome. */
export function ViewToggle({
  mode,
  onChange,
}: {
  mode: GalleryMode;
  onChange: (m: GalleryMode) => void;
}) {
  const modes: GalleryMode[] = ["exhibition", "archive"];
  return (
    <div role="tablist" aria-label="Gallery view" className="flex items-center gap-6">
      {modes.map((m) => {
        const active = m === mode;
        return (
          <button
            key={m}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(m)}
            className={`type-micro transition-opacity duration-300 ${
              active ? "opacity-100" : "opacity-50 hover:opacity-80"
            }`}
          >
            <span className="relative">
              {m === "exhibition" ? "Exhibition" : "Archive"}
              {active && (
                <span className="absolute -bottom-1.5 left-0 h-px w-full bg-current" />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
