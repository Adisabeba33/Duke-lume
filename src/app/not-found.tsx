import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-gallery flex min-h-[70svh] flex-col items-start justify-center py-40">
      <span className="type-micro text-[var(--color-text-secondary)]">404</span>
      <h1 className="type-display mt-6">This room is empty.</h1>
      <Link href="/" className="mt-8 type-micro link-underline">
        Return to the gallery →
      </Link>
    </section>
  );
}
