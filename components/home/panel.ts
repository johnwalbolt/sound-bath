import type { CSSProperties } from "react";

// Body copy: Montserrat Medium, 16px, 5% letter-spacing, white.
export const BODY =
  "font-sans font-medium text-[16px] tracking-[0.05em] leading-relaxed text-white";

export const SERIF = "var(--font-instrument-serif), serif";

// Purple-dominant metallic gradient from the hero logo's palette (violet →
// magenta → pink → gold), with lavender highlight bands. Starts and ends on the
// same lavender so it loops seamlessly when the position is animated (shimmer).
const METALLIC =
  "linear-gradient(105deg,#C9B3FF 0%,#8B5CF6 10%,#7C3AED 20%,#A21CAF 30%,#C9A9FF 40%,#7C3AED 50%,#F538D4 60%,#9333EA 70%,#F5A623 80%,#B79CFF 90%,#C9B3FF 100%)";

// Shared fill for the shimmering metallic text lines (hero tagline + strips).
export const shimmerTextStyle: CSSProperties = {
  backgroundImage: METALLIC,
  backgroundSize: "200% 100%",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  filter: "drop-shadow(0 0 16px rgba(139,92,246,0.45))",
  animation: "wordmark-shimmer 20s linear infinite",
};
