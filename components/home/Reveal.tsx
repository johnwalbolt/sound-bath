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
  // Fade in as it enters (lower half), then hold much longer — only fading out
  // late in its travel (0.72 → 0.95), so elements stay visible further up the
  // screen before dissolving near the top.
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.72, 0.95],
    [0, 1, 1, 0],
  );
  const y = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [40, 0, 0, -40]);

  return (
    <motion.div ref={ref} className={className} style={{ ...style, opacity, y }}>
      {children}
    </motion.div>
  );
}
