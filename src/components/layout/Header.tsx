"use client";

import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { Wordmark } from "@/components/brand/Wordmark";

const NAV = [
  { label: "Gallery", href: "/gallery" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Scroll must move more than this before the header hides or shows, so small
 *  jitter (or iOS rubber-banding) never flickers it (§10). */
const JITTER = 8;
/** Above this point the header is always visible. */
const TOP_ZONE = 120;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // While the menu is open the header must not react to scroll at all.
    if (menuOpen) return;

    let last = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      setScrolled(y > 24);

      const delta = y - last;
      if (Math.abs(delta) < JITTER) return;
      // Near the top the header is always shown.
      setHidden(y > TOP_ZONE && delta > 0);
      last = y;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [menuOpen]);

  // Any navigation reveals the header again.
  useEffect(() => {
    setHidden(false);
  }, [pathname]);

  const closeMenu = () => {
    setMenuOpen(false);
    // Focus returns to the control that opened the menu (§28).
    menuButtonRef.current?.focus();
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-[var(--color-background)]/80 backdrop-blur-[12px]"
            : "bg-transparent"
        }`}
      >
        <div className="container-gallery flex h-[68px] items-center justify-between md:h-[92px]">
          <Link
            href="/"
            aria-label="Duke and Lume — home"
            className="leading-none"
          >
            <Wordmark className="text-[23px] md:text-[27px]" />
            <span className="sr-only">Duke and Lume</span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`type-small tracking-wide transition-opacity duration-300 ${
                    active ? "opacity-100" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <span className="relative">
                    {item.label}
                    {active && (
                      <span className="absolute -bottom-1.5 left-0 h-px w-full bg-current" />
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Menu button — mobile only; on desktop the nav above is the menu, so
              a hamburger would just duplicate it (§9). */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="flex flex-col gap-[5px]">
              <span className="block h-px w-6 bg-[var(--color-text-primary)]" />
              <span className="block h-px w-6 bg-[var(--color-text-primary)]" />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} nav={NAV} />
    </>
  );
}
