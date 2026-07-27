"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";

interface NavItem {
  label: string;
  href: string;
}

/** Full-screen overlay menu (§7). Numbered large links, social at the bottom,
 *  Escape to close, focus trapped while open. */
export function MobileMenu({
  open,
  onClose,
  nav,
}: {
  open: boolean;
  onClose: () => void;
  nav: NavItem[];
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (!focusables || focusables.length === 0) return;
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
    document.body.style.overflow = "hidden";
    // Move focus into the panel.
    const t = window.setTimeout(() => {
      panelRef.current
        ?.querySelector<HTMLElement>("a[href], button")
        ?.focus();
    }, 60);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      // Closed: kept out of the accessibility tree and unfocusable (§28).
      aria-hidden={!open}
      {...(!open ? { inert: "" as unknown as boolean } : {})}
      className={`fixed inset-0 z-[60] bg-[var(--color-dark-section)] text-[var(--color-dark-text)] transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div className="container-gallery flex h-full flex-col">
        <div className="flex h-[68px] items-center justify-between md:h-[92px]">
          <Link
            href="/"
            onClick={onClose}
            className="font-[family-name:var(--font-serif)] text-[22px] md:text-[26px]"
          >
            Duke&amp;Lume
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center text-[22px]"
          >
            <span aria-hidden>×</span>
          </button>
        </div>

        <nav
          className="flex flex-1 flex-col justify-center gap-1 py-10"
          aria-label="Primary"
        >
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="group flex items-baseline gap-5 py-2"
            >
              <span className="type-micro w-8 text-[var(--color-dark-text)]/40">
                0{i + 1}
              </span>
              <span className="type-h1 transition-opacity duration-300 group-hover:opacity-70">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-white/12 py-7 type-small">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="opacity-70 transition-opacity hover:opacity-100"
          >
            Instagram
          </a>
          <a
            href={`mailto:${site.contactEmail}`}
            className="opacity-70 transition-opacity hover:opacity-100"
          >
            {site.contactEmail}
          </a>
        </div>
      </div>
    </div>
  );
}
