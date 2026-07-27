"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface LightboxImage {
  src: string;
  alt: string;
  label?: string;
}

const MAX_ZOOM = 3;

/**
 * Fullscreen viewer (§19): zoom (click / double-tap / pinch), pan by drag,
 * swipe or arrow keys between images, Escape to close, focus trapped, page
 * scroll locked. Honours prefers-reduced-motion by dropping the transitions.
 */
export function Lightbox({
  images,
  startIndex = 0,
  title,
  onClose,
}: {
  images: LightboxImage[];
  startIndex?: number;
  title: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [animate, setAnimate] = useState(true);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  // active pointers for pinch / drag
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{
    startDist: number;
    startZoom: number;
    startOffset: { x: number; y: number };
    startPoint: { x: number; y: number };
    moved: boolean;
  } | null>(null);

  const current = images[index];
  const multiple = images.length > 1;

  const reset = useCallback(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const go = useCallback(
    (delta: number) => {
      if (!multiple) return;
      setIndex((i) => (i + delta + images.length) % images.length);
      reset();
    },
    [images.length, multiple, reset]
  );

  // reduced motion
  useEffect(() => {
    setAnimate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // keyboard + scroll lock + focus trap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowRight") return go(1);
      if (e.key === "ArrowLeft") return go(-1);
      if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled])"
        );
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [go, onClose]);

  const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    Math.hypot(a.x - b.x, a.y - b.y);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()];
    gesture.current = {
      startDist: pts.length === 2 ? dist(pts[0], pts[1]) : 0,
      startZoom: zoom,
      startOffset: offset,
      startPoint: { x: e.clientX, y: e.clientY },
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    if (!g) return;
    const pts = [...pointers.current.values()];

    // pinch
    if (pts.length === 2 && g.startDist > 0) {
      const ratio = dist(pts[0], pts[1]) / g.startDist;
      setZoom(Math.min(MAX_ZOOM, Math.max(1, g.startZoom * ratio)));
      g.moved = true;
      return;
    }

    const dx = e.clientX - g.startPoint.x;
    const dy = e.clientY - g.startPoint.y;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) g.moved = true;

    // pan while zoomed
    if (zoom > 1) {
      setOffset({ x: g.startOffset.x + dx, y: g.startOffset.y + dy });
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const g = gesture.current;
    const start = g?.startPoint;
    pointers.current.delete(e.pointerId);

    if (g && start && pointers.current.size === 0) {
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      // swipe between images when not zoomed
      if (zoom === 1 && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
        go(dx < 0 ? 1 : -1);
      } else if (!g.moved) {
        // a clean tap toggles zoom around the tapped point
        if (zoom === 1) {
          const rect = imgRef.current?.getBoundingClientRect();
          if (rect) {
            const cx = e.clientX - (rect.left + rect.width / 2);
            const cy = e.clientY - (rect.top + rect.height / 2);
            setZoom(2);
            setOffset({ x: -cx, y: -cy });
          } else {
            setZoom(2);
          }
        } else {
          reset();
        }
      }
      gesture.current = null;
    }
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — full image viewer`}
      className="fixed inset-0 z-[100] flex flex-col bg-[#0b0b0a]/[0.985]"
    >
      {/* top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 md:px-6">
        <span className="type-micro text-white/55">
          {current.label ?? title}
          {multiple && (
            <span className="ml-3 text-white/35">
              {index + 1} / {images.length}
            </span>
          )}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center text-[26px] leading-none text-white/70 transition-colors hover:text-white"
        >
          <span aria-hidden>×</span>
          <span className="sr-only">Close viewer</span>
        </button>
      </div>

      {/* image stage */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={current.src}
          alt={current.alt}
          draggable={false}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transition: animate && pointers.current.size === 0
              ? "transform 0.4s cubic-bezier(0.22,1,0.36,1)"
              : "none",
            touchAction: "none",
            cursor: zoom > 1 ? "grab" : "zoom-in",
          }}
          className="max-h-full max-w-full select-none object-contain"
        />

        {multiple && (
          <>
            <ArrowButton side="left" onClick={() => go(-1)} />
            <ArrowButton side="right" onClick={() => go(1)} />
          </>
        )}
      </div>

      {/* thumbnails */}
      {multiple && (
        <div className="relative z-10 flex justify-center gap-2 px-4 pb-5 pt-2">
          {images.map((im, i) => (
            <button
              key={im.src}
              type="button"
              onClick={() => {
                setIndex(i);
                reset();
              }}
              aria-label={`View image ${i + 1}`}
              aria-current={i === index}
              className={`h-11 w-11 overflow-hidden border transition-opacity ${
                i === index ? "border-white/70 opacity-100" : "border-white/20 opacity-50 hover:opacity-80"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={im.src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <p className="pb-4 text-center text-[10px] uppercase tracking-[0.16em] text-white/30">
        Tap or pinch to zoom · swipe or arrows to move · Esc to close
      </p>
    </div>
  );
}

function ArrowButton({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={`absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-[22px] text-white/55 transition-colors hover:text-white sm:flex ${
        side === "left" ? "left-2 md:left-5" : "right-2 md:right-5"
      }`}
    >
      <span aria-hidden>{side === "left" ? "←" : "→"}</span>
    </button>
  );
}
