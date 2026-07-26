"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileMenu } from "./MobileMenu";

const NAV = [
  { label: "Gallery", href: "/gallery" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Milky-on-scroll + hide-on-down / show-on-up (§7).
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (!menuOpen) {
        setHidden(y > last && y > 200);
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-[var(--color-background)]/80 backdrop-blur-[12px]"
            : "bg-transparent"
        }`}
      >
        <div className="container-gallery flex h-[68px] items-center justify-between md:h-[92px]">
          <Link
            href="/"
            className="font-[family-name:var(--font-serif)] text-[22px] leading-none tracking-tight md:text-[26px]"
          >
            Duke&amp;Lume
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`type-small tracking-wide transition-opacity duration-300 ${
                    active
                      ? "opacity-100"
                      : "opacity-60 hover:opacity-100"
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

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center md:-mr-2"
          >
            <span className="flex flex-col gap-[5px]">
              <span className="block h-px w-6 bg-[var(--color-text-primary)]" />
              <span className="block h-px w-6 bg-[var(--color-text-primary)]" />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        nav={NAV}
      />
    </>
  );
}
