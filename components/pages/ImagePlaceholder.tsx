/** Labeled placeholder for an image the user will supply later. */
export default function ImagePlaceholder({
  label,
  className = "aspect-[3/2]",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-2xl border border-dashed border-foreground/25 bg-black/40 ${className}`}
    >
      <span className="px-6 text-center text-[11px] uppercase tracking-[0.2em] text-[#FFFFE5]/40">
        {label}
      </span>
    </div>
  );
}
