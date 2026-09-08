// Displays a compact loading indicator with an accessible status label.
export function Spinner({ label = "Loading" }) {
  return (
    <span className="inline-flex items-center gap-2" role="status" aria-live="polite">
      <span className="size-3.5 animate-spin rounded-full border-2 border-line border-t-ink" />
      <span className="sr-only font-author title ">{label}</span>
    </span>
  );
}
