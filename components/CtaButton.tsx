import type { ReactNode } from "react";

/** Outlined pill CTA used throughout the site. */
export default function CtaButton({
  children,
  href = "#",
  variant = "outline",
}: {
  children: ReactNode;
  href?: string;
  variant?: "outline" | "solid";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-8 py-3 text-[12px] font-bold tracking-[0.18em] transition-all duration-300";
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
