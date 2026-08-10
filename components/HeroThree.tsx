"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Ripples from "./Ripples";
import heroRings from "@/public/assets/hero-rings.webp";

// Variant 3 — copy of the original hero, but with 7× as many ripples.
export default function HeroThree() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24"
    >
      {/* Logo + ripples share one box so the traced contour overlays the art */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[min(88vw,720px)]"
      >
        {/* 7× the original 8 ripples */}
        <Ripples count={56} className="absolute inset-0" />

        {/* Sound-sun graphic (wordmark is baked into the artwork).
            Gentle uniform "breathing" scale keeps the text centered + readable. */}
        <motion.div
          className="relative"
          animate={{ scale: [1, 1.025, 1] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        >
          <Image
            src={heroRings}
            alt="Sound Bath"
            priority
            className="h-auto w-full select-none"
            sizes="(max-width: 768px) 88vw, 720px"
          />
        </motion.div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="mt-10 text-center text-[clamp(1.1rem,3vw,1.6rem)] text-foreground"
      >
        A <strong className="font-bold">holistic wellness experience</strong>{" "}
        through <em className="italic">sound</em>.
      </motion.p>
    </section>
  );
}
