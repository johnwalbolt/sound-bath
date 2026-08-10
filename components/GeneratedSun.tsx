import { LOGO_OUTLINE } from "./logoOutline";

// Interpolate the brand gradient from gold (center) to violet (edge).
function colorAt(t: number) {
  const stops = [
    [251, 191, 36], // gold
    [249, 115, 22], // orange
    [236, 72, 153], // pink
    [192, 38, 211], // magenta
    [109, 40, 217], // violet
  ];
  const scaled = t * (stops.length - 1);
  const i = Math.min(Math.floor(scaled), stops.length - 2);
  const f = scaled - i;
  const [r, g, b] = stops[i].map((c, k) =>
    Math.round(c + (stops[i + 1][k] - c) * f),
  );
  return `rgb(${r},${g},${b})`;
}

const { width, height, originX, originY, path } = LOGO_OUTLINE;
const CX = (originX / 100) * width;
const CY = (originY / 100) * height;

// Parse the traced contour into polar (angle, radius) samples about the center.
const NUMS = path.match(/-?\d+\.?\d*/g)!.map(Number);
const POLAR: { a: number; r: number }[] = [];
for (let i = 0; i + 1 < NUMS.length; i += 2) {
  const dx = NUMS[i] - CX;
  const dy = NUMS[i + 1] - CY;
  POLAR.push({ a: Math.atan2(dy, dx), r: Math.hypot(dx, dy) });
}
const MEAN_R = POLAR.reduce((s, p) => s + p.r, 0) / POLAR.length;

// Build one band: `radiusScale` = size, `waviness` blends circle(0)→contour(1).
function bandPath(radiusScale: number, waviness: number) {
  let d = "";
  POLAR.forEach((p, i) => {
    const R = MEAN_R * radiusScale * (1 + (p.r / MEAN_R - 1) * waviness);
    const x = CX + R * Math.cos(p.a);
    const y = CY + R * Math.sin(p.a);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
  });
  return `${d}Z`;
}

const BANDS = 26;

/**
 * Static, text-free "sound sun" generated from the traced logo contour:
 * concentric filled bands (violet rim → gold core) with thin dark gaps, morphing
 * from wavy at the edge to circular at the center. Stand-in for the artwork.
 */
export default function GeneratedSun({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label="Sound Bath"
    >
      <defs>
        <radialGradient id="sun-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7dc" />
          <stop offset="40%" stopColor="#fbbf24" />
          <stop offset="70%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>

      {Array.from({ length: BANDS }).map((_, i) => {
        const frac = i / (BANDS - 1); // 0 outer → 1 center
        const radiusScale = 1 - frac * 0.94; // 1.0 → 0.06
        const waviness = Math.pow(radiusScale, 1.5); // wavy rim, round core
        const t = 1 - frac; // 1 violet (outer) → 0 gold (center)
        return (
          <path
            key={i}
            d={bandPath(radiusScale, waviness)}
            fill={colorAt(t)}
            stroke="#050206"
            strokeWidth={3}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}

      <circle cx={CX} cy={CY} r={width * 0.14} fill="url(#sun-core)" />
    </svg>
  );
}
