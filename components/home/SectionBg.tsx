"use client";

import { useRef, type RefObject } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

/** Full-bleed section background whose opacity is scroll-linked. By default it
 *  tracks its own box, but pass `targetRef` (the content wrapper) so the
 *  background fades in with the first element and out with the last. */
export default function SectionBg({
  src,
  fit = "contain",
  targetRef,
}: {
  src: StaticImageData;
  fit?: "contain" | "cover";
  targetRef?: RefObject<HTMLElement | null>;
}) {
  const localRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef ?? localRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8],
    [0, 1, 1, 0],
  );

  return (
    <motion.div
      ref={targetRef ? undefined : localRef}
      style={{ opacity }}
      className="pointer-events-none absolute inset-0"
    >
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className={`select-none ${fit === "cover" ? "object-cover" : "object-contain"}`}
      />
    </motion.div>
  );
}
