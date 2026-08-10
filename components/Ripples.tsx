import { LOGO_OUTLINE } from "./logoOutline";

/**
 * Slow, soft ripples radiating outward from the hero logo — like gentle waves
 * of water or sound. Every ripple is a concentric copy of the logo's EXACT
 * outer contour (traced from the artwork). Each emerges bright at the logo,
 * drops quickly to a soft level just outside it, then drifts softly all the way
 * to the screen edges.
 *
 * Uses a CSS keyframe loop (see `ripple-expand` in globals.css) with staggered
 * NEGATIVE animation delays, so on load the whole field is already filled with
 * ripples at every stage rather than starting empty.
 */
export default function Ripples({
  count = 8,
  duration = 56,
  className = "",
  outline = LOGO_OUTLINE,
  fullPeak = false,
}: {
  count?: number;
  duration?: number;
  className?: string;
  // Contour the ripples take the shape of (defaults to the with-text logo).
  outline?: {
    width: number;
    height: number;
    originX: number;
    originY: number;
    path: string;
  };
  // Use the peak-1.0 keyframe (for when a wrapper opacity scales the level).
  fullPeak?: boolean;
}) {
  const { width, height, originX, originY, path } = outline;
  const keyframe = fullPeak ? "ripple-expand-full" : "ripple-expand";

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          viewBox={`0 0 ${width} ${height}`}
          className="absolute inset-0 h-full w-full"
          style={{
            overflow: "visible",
            transformOrigin: `${originX}% ${originY}%`,
            filter: "drop-shadow(0 0 8px rgba(92,30,228,0.6))",
            willChange: "transform, opacity",
            // negative delay = pre-seeded, so ripples already span the screen
            animation: `${keyframe} ${duration}s linear ${(
              -(i * duration) / count
            ).toFixed(2)}s infinite`,
          }}
        >
          <path
            d={path}
            fill="none"
            stroke="#5C1EE4"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ))}
    </div>
  );
}
