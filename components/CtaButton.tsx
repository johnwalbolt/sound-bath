import type { ReactNode } from "react";
import Link from "next/link";

/** Outlined pill CTA used throughout the site. `fullWidth` makes it fill its
 *  container (with lighter horizontal padding) for equal-width button rows.
 *  Internal hrefs use next/link; external (http) hrefs open in a new tab. */
export default function CtaButton({
  children,
  href = "#",
  variant = "outline",
  fullWidth = false,
}: {
  children: ReactNode;
  href?: string;
  variant?: "outline" | "solid";
  fullWidth?: boolean;
}) {
  // Only the border transitions; text color + fill switch instantly on hover so
  // they change together (a color transition would lag behind the instant fill).
  const base = `relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full py-3 text-[12px] font-bold tracking-[0.18em] transition-[border-color] duration-300 ${
    fullWidth ? "w-full px-3" : "px-8"
  }`;
  const styles =
    variant === "solid"
      ? "btn-fill-shimmer-primary bg-foreground text-background"
      : "btn-fill-shimmer border border-foreground/40 text-foreground";
  const className = `${base} ${styles}`;

  // keep label above the shine sweep
  const label = (
    <span className="relative z-10 inline-flex items-center gap-2">
      {children}
    </span>
  );

  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
