/** Small uppercase museum-style label, optionally with a hairline rule beside it. */
export function SectionLabel({
  children,
  withRule = false,
  className = "",
}: {
  children: React.ReactNode;
  withRule?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="type-micro text-[var(--color-text-secondary)]">
        {children}
      </span>
      {withRule && (
        <span
          aria-hidden
          className="h-px w-16 bg-[var(--color-line)] sm:w-24"
        />
      )}
    </div>
  );
}
