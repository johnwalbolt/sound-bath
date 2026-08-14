"use client";

import { useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/** Scroll-linked reveal: fades + gently rises its children in as they enter the
 *  viewport, holds them, then fades them back out (and drifts up) as they leave.
 *  Driven by scroll position, so it reverses symmetrically in both directions. */
export default function Reveal({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Fade in as it enters (lower half), hold briefly around center, then fade
  // out from just past center → gone by ~80% (still on screen at the top, so
  // the fade-out is clearly visible before it fully leaves).
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8],
    [0, 1, 1, 0],
  );
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [40, 0, 0, -40]);

  return (
    <motion.div ref={ref} className={className} style={{ ...style, opacity, y }}>
      {children}
    </motion.div>
  );
}
