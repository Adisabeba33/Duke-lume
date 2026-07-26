import { SectionLabel } from "@/components/typography/SectionLabel";

/** Temporary scaffold for routes not yet built out, kept on-brand so the
 *  navigation is fully walkable during the foundation stage. */
export function PagePlaceholder({
  label,
  title,
  note,
}: {
  label: string;
  title: string;
  note: string;
}) {
  return (
    <section className="container-gallery flex min-h-[70svh] flex-col justify-center py-[clamp(96px,16vw,200px)] pt-[140px]">
      <SectionLabel withRule>{label}</SectionLabel>
      <h1 className="type-display mt-8 max-w-[14ch] text-balance">{title}</h1>
      <p className="type-body mt-7 max-w-[52ch] text-[var(--color-text-secondary)]">
        {note}
      </p>
    </section>
  );
}
