import type { ReactNode } from "react";

/** Outlined pill CTA used throughout the site. `fullWidth` makes it fill its
 *  container (with lighter horizontal padding) for equal-width button rows. */
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
  const base = `inline-flex items-center justify-center rounded-full py-3 text-[12px] font-bold tracking-[0.18em] transition-all duration-300 ${
    fullWidth ? "w-full px-3" : "px-8"
  }`;
  const styles =
    variant === "solid"
      ? "bg-foreground text-background hover:opacity-90"
      : "border border-foreground/40 text-foreground hover:border-foreground hover:bg-foreground hover:text-background";
  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
    </a>
  );
}
