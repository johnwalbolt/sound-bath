"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import bgSideWaves from "@/public/assets/bg-sidewaves.webp";
import heroLogo from "@/public/assets/hero-logo.webp";
import { shimmerTextStyle } from "./panel";

/** Full-screen hero: side-wave backdrop, centered logo, tagline beneath.
 *  Elements fade in on load; the whole hero fades out as you scroll past it. */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Fade the hero out over the first ~70% of scrolling past it (multiplies with
  // the per-element load fade-ins below).
  const scrollFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-screen overflow-hidden bg-black"
    >
      <motion.div className="absolute inset-0" style={{ opacity: scrollFade }}>
        {/* Side-wave backdrop (BG35Blk2) — fades in on load with the hero */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.6, delay: 0.2, ease: "easeOut" }}
        >
          <Image
            src={bgSideWaves}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="select-none object-cover"
          />
        </motion.div>

        {/* Centered logo (with wordmark baked in) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.4, delay: 0.5, ease: "easeOut" }}
            className="w-[82vw] max-w-[620px]"
          >
            <Image
              src={heroLogo}
              alt="Sound Bath"
              priority
              sizes="(max-width: 768px) 82vw, 620px"
              className="h-auto w-full select-none"
            />
          </motion.div>
        </div>

        {/* Tagline beneath, toward the bottom of the hero */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 1.8, ease: "easeOut" }}
          className="absolute inset-x-0 bottom-[10%] z-10 px-6 text-center text-[4.5vw] md:text-[1.5vw]"
          style={shimmerTextStyle}
        >
          A <strong className="font-bold">holistic wellness experience</strong>{" "}
          through <em className="italic">sound</em>.
        </motion.p>
      </motion.div>
    </section>
  );
}
