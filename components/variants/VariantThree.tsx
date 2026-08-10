"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Nav from "@/components/Nav";
import LogoRippleEmitter from "@/components/LogoRippleEmitter";
import Footer from "@/components/Footer";
import CtaButton from "@/components/CtaButton";
import logoNoText from "@/public/assets/logo-notext.png";

// ── Scroll geometry helpers (client-only; called inside transforms) ──────────
const fsz = () => Math.max(40, Math.min(0.09 * window.innerWidth, 112)); // 9vw / 7rem
// Base "top" of the first stacked item (Catalog); later items are offset from it.
const catalogBase = () => 1.75 * window.innerHeight - 48 - 0.55 * fsz();

/** A stacked text item: rises 1:1, fades in from the bottom, out at the top. */
function useScrollSection(scrollY: MotionValue<number>, baseTop: () => number) {
  const y = useTransform(scrollY, (v) => {
    if (typeof window === "undefined" || v <= 0) return 2000;
    return baseTop() - v;
  });
  const opacity = useTransform(y, (yy) => {
    if (typeof window === "undefined") return 0;
    const H = window.innerHeight;
    const fadeIn = Math.min(Math.max((H - yy) / (0.5 * H), 0), 1);
    const fadeOut = Math.min(Math.max(yy / (0.25 * H), 0), 1);
    return Math.min(fadeIn, fadeOut);
  });
  return { y, opacity };
}

const CATALOG = {
  title: "Catalog",
  body: "Explore our full catalog of music for healing, meditation, sleep, solfeggio frequencies, and more.",
  color: "#00AEFF",
  cta: "View Catalog",
};
// About + Connect share one scroll section (two columns, both left-aligned).
const ABOUT = {
  title: "About",
  body: "Andrew Heringer started Sound Bath as an experiment in minimalism and gentle ambient soundscapes. As more listeners tuned in, the project expanded into a space for intentional sound.",
  color: "#FFA80B",
  cta: "About Sound Bath",
};
const CONNECT = {
  title: "Connect",
  body: "We want to connect with all of our listeners. Give us feedback on our current offerings or suggest a future collaboration.",
  color: "#F538D4",
  cta: "Connect with us",
};
const SERIF = "var(--font-instrument-serif), serif";
// Resting top for the About + Connect duo, as a fraction of viewport height.
const DUO_REST = 0.2;

export default function VariantThree() {
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const categoryTextRef = useRef<HTMLDivElement>(null);
  const stayTextRef = useRef<HTMLSpanElement>(null);

  // Load-timeline motion values (driven imperatively below).
  const taglineOpacity = useMotionValue(0);
  const taglineY = useMotionValue(0);
  const logoOpacity = useMotionValue(0); // fades to 0.5, then to 1 after the title
  const soundOpacity = useMotionValue(0);

  const { scrollY } = useScroll();

  // ── Hero text ──────────────────────────────────────────────────────────
  const columnY = useTransform(scrollY, (v) => -v);
  const titleScrollOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // ── Text items: Catalog → "stay" strip → About + Connect (two columns) ──
  const catalog = useScrollSection(scrollY, () => catalogBase());
  // Closer to Catalog than a full gap, so it enters while Catalog is still in view.
  const stay = useScrollSection(scrollY, () => catalogBase() + 0.65 * window.innerHeight);
  // About + Connect arrive together (two columns), then settle as the final
  // section: they rise to a resting position, stop there, and never fade out —
  // the whole hero later slides up to reveal the footer below them.
  const duoBase = () => catalogBase() + 1.3 * window.innerHeight;
  const duoY = useTransform(scrollY, (v) => {
    if (typeof window === "undefined" || v <= 0) return 2000;
    return Math.max(duoBase() - v, DUO_REST * window.innerHeight);
  });
  const duoOpacity = useTransform(duoY, (yy) => {
    if (typeof window === "undefined") return 0;
    const H = window.innerHeight;
    // Fade in from the bottom only — this is the bottom of the page.
    return Math.min(Math.max((H - yy) / (0.5 * H), 0), 1);
  });

  // "stay here…" grows as it rises, reaching full viewport width at the top 25%
  // of the screen and holding there (never wider, so the end letters never
  // clip). Driven by its own top (stay.y).
  const stayScale = useTransform(stay.y, (y) => {
    const el = stayTextRef.current;
    if (!el || typeof window === "undefined") return 1;
    const W = window.innerWidth;
    const H = window.innerHeight;
    if (y >= H) return 1; // not yet risen into view
    const natural = el.scrollWidth || 1;
    // 86% of the viewport so the end letters keep a comfortable margin.
    const fullWidthScale = (0.86 * W) / natural;
    const t = Math.min((H - y) / (0.75 * H), 1); // 0 at bottom → 1 (full width), capped
    return Math.max(0.5, 1 + (fullWidthScale - 1) * t);
  });

  // Gradient text fills that flow through the palette as the elements scroll up.
  const categoryGradientX = useTransform(scrollY, (v) => `${-v * 1.5}px`);
  const stayGradientX = useTransform(scrollY, (v) => `${v * 1.2}px`);

  // ── Category strip ─────────────────────────────────────────────────────
  const CATEGORY_GROW = 2;
  const CATEGORY_DROP = 0.3;
  const categoryExit = () =>
    typeof window === "undefined"
      ? 900
      : window.innerHeight * (1 + CATEGORY_DROP) - 48;
  const categoryY = useTransform(scrollY, (v) => -v);
  const categoryScale = useTransform(
    scrollY,
    (v) => 1 + (CATEGORY_GROW - 1) * Math.min(v / categoryExit(), 1),
  );
  const categoryX = useTransform(scrollY, (v) => {
    const el = categoryTextRef.current;
    if (!el || typeof window === "undefined") return 0;
    const scale = 1 + (CATEGORY_GROW - 1) * Math.min(v / categoryExit(), 1);
    const overflow = el.scrollWidth * scale - window.innerWidth;
    if (overflow <= 0) return 0;
    const shift = overflow + window.innerWidth * 0.05;
    return -shift * Math.min(v / categoryExit(), 1);
  });
  const categoryOpacity = useTransform(scrollY, (v) => {
    if (typeof window === "undefined") return 0;
    const H = window.innerHeight;
    const exit = categoryExit();
    const mid = H / 2 - 48 - 0.55 * fsz() + CATEGORY_DROP * H;
    const fadeIn = Math.min(v / 150, 1);
    const fadeOut = v > mid ? 1 - Math.min((v - mid) / (exit - mid), 1) : 1;
    return fadeIn * fadeOut;
  });

  // ── Logo path ──────────────────────────────────────────────────────────
  const logoMoveStart = () => catalogBase() + 0.8 * window.innerHeight; // Connect prominent
  const logoMoveEnd = () => catalogBase() + 2.05 * window.innerHeight; // ~About prominent
  // Right → center (as Catalog arrives), then holds center for the rest of the page.
  const logoX = useTransform(scrollY, (v) => {
    if (typeof window === "undefined" || v <= 0) return 0;
    const W = window.innerWidth;
    const center = catalogBase() - 0.38 * window.innerHeight;
    const centerX = -0.34 * W;
    return centerX * Math.min(v / center, 1);
  });
  // Sun disc rotates gently with scroll (~0.03°/px).
  const logoRotate = useTransform(scrollY, (v) => v * 0.03);
  // Scale: 1.5× → 0.8× reaching center (Catalog), holds, then grows back to its
  // original 1.5× in place (centered) from Connect toward About.
  const logoScale = useTransform(scrollY, (v) => {
    if (typeof window === "undefined" || v <= 0) return 1.5;
    const center = catalogBase() - 0.38 * window.innerHeight;
    const start = logoMoveStart();
    if (v <= center) return 1.5 + (0.8 - 1.5) * Math.min(v / center, 1);
    if (v <= start) return 0.8;
    return 0.8 + (1.5 - 0.8) * Math.min((v - start) / (logoMoveEnd() - start), 1);
  });
  // Effective logo opacity = load fade-in × a scroll fade-out that begins as the
  // user scrolls down from Catalog. The logo (and its ripples) stays visible
  // while the "stay here…" strip drifts over it, and is gone before the
  // About + Connect duo arrives.
  const logoFinalOpacity = useTransform(
    [logoOpacity, scrollY],
    ([lo, sv]: number[]) => {
      if (typeof window === "undefined") return lo;
      const H = window.innerHeight;
      const fadeStart = catalogBase(); // Catalog scrolling up
      const fadeEnd = catalogBase() + 0.72 * H; // before the duo is prominent
      const fade =
        1 - Math.min(Math.max((sv - fadeStart) / (fadeEnd - fadeStart), 0), 1);
      return lo * fade;
    },
  );

  useEffect(() => {
    const el = taglineRef.current;
    let offset = 0;
    if (el) {
      const r = el.getBoundingClientRect();
      offset = window.innerHeight / 2 - r.top - r.height / 2;
    }
    taglineY.set(offset);

    const ease = [0.22, 1, 0.36, 1] as const;
    // A slower, more deliberate load — each element eases in gently in sequence.
    const timers = [
      setTimeout(() => animate(taglineOpacity, 1, { duration: 1.4 }), 300),
      // logo + ripples fade in to 100% (before the title appears)
      setTimeout(() => animate(logoOpacity, 1, { duration: 1.8 }), 1900),
      setTimeout(() => animate(taglineY, 0, { duration: 1.4, ease }), 3800),
      setTimeout(() => animate(soundOpacity, 1, { duration: 1.6 }), 5200),
    ];
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Nav />
      {/* Tall container gives scroll room to drive the whole sequence; sized so
          the duo settles near the end, then the footer follows (no dead scroll) */}
      <div className="relative h-[400vh] bg-black">
        <section className="sticky top-0 flex h-screen flex-col overflow-hidden bg-black">
          <div className="relative mx-auto flex w-full flex-col items-center gap-10 px-6 pt-28 md:block md:px-10">
            {/* Hero text column — scrolls up and fades out (tagline + title
                together) as the user scrolls. */}
            <motion.div
              className="relative z-10 w-full md:w-[52vw]"
              style={{ y: columnY, opacity: titleScrollOpacity }}
            >
              <motion.p
                ref={taglineRef}
                className="whitespace-nowrap text-[5vw] text-[#FFFFE5] md:text-[2.1vw]"
                style={{ opacity: taglineOpacity, y: taglineY }}
              >
                A{" "}
                <strong className="font-bold">
                  holistic wellness experience
                </strong>{" "}
                through <em className="italic">sound</em>.
              </motion.p>
              <motion.h1
                className="mt-1 text-[26vw] leading-[0.82] tracking-tight text-[#FFFFE5] md:text-[20.6vw]"
                style={{
                  fontFamily: "var(--font-instrument-serif), serif",
                  opacity: soundOpacity,
                }}
              >
                <span className="block">SOUND</span>
                <span className="block">BATH</span>
              </motion.h1>
            </motion.div>

            {/* Logo — glides right → center; the sun disc also rotates. Its
                ripples are emitted separately (see LogoRippleEmitter) so they
                don't move with the logo. */}
            <motion.div
              className="relative w-[68vw] max-w-[420px] shrink-0 md:absolute md:bottom-0 md:right-0 md:top-28 md:-mr-[6vw] md:aspect-square md:w-auto md:max-w-none"
              style={{
                opacity: logoFinalOpacity,
                x: logoX,
                scale: logoScale,
              }}
            >
              {/* Ripples ride inside the logo block, so they move with it */}
              <LogoRippleEmitter rotation={logoRotate} />
              <motion.div
                className="relative h-auto w-full md:h-full"
                style={{ rotate: logoRotate }}
              >
                <Image
                  src={logoNoText}
                  alt="Sound Bath"
                  priority
                  className="h-auto w-full select-none md:h-full"
                  sizes="(max-width: 768px) 68vw, 45vw"
                  style={{ animation: "sun-breathe 8s ease-in-out infinite" }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Catalog rises first */}
          <motion.div
            className="absolute inset-x-0 top-0 z-20 px-6 md:px-10"
            style={{ y: catalog.y, opacity: catalog.opacity }}
          >
            <h2
              className="text-[150px] leading-none"
              style={{ fontFamily: SERIF, color: CATALOG.color }}
            >
              {CATALOG.title}
            </h2>
            <p className="mt-6 max-w-md font-sans text-[16px] leading-relaxed text-[#FFFFE5]">
              {CATALOG.body}
            </p>
            <div className="mt-8">
              <CtaButton>{CATALOG.cta}</CtaButton>
            </div>
          </motion.div>

          {/* About + Connect — two columns, arrive together, both left-aligned;
              they settle here as the bottom of the page (no fade-out) */}
          <motion.div
            className="absolute inset-x-0 top-0 z-20 px-6 md:px-10"
            style={{ y: duoY, opacity: duoOpacity }}
          >
            <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
              {[CONNECT, ABOUT].map((s) => (
                <div key={s.title}>
                  <h2
                    className="text-[clamp(4rem,10vw,150px)] leading-none"
                    style={{ fontFamily: SERIF, color: s.color }}
                  >
                    {s.title}
                  </h2>
                  <p className="mt-6 max-w-md font-sans text-[16px] leading-relaxed text-[#FFFFE5]">
                    {s.body}
                  </p>
                  <div className="mt-8">
                    <CtaButton>{s.cta}</CtaButton>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* "stay here as long as you need" strip — between Catalog and Connect */}
          <motion.div
            className="absolute inset-x-0 top-0 z-20 flex justify-center px-6"
            style={{ y: stay.y, opacity: stay.opacity }}
          >
            <motion.span
              ref={stayTextRef}
              className="whitespace-nowrap text-center text-[clamp(2rem,5vw,4rem)] italic"
              style={{
                fontFamily: "var(--font-instrument-serif), serif",
                scale: stayScale,
                transformOrigin: "center",
                backgroundImage:
                  "linear-gradient(90deg,#6105f6,#00AEFF,#05F6EA,#F53838,#F44A64,#6105f6)",
                backgroundSize: "200% 100%",
                backgroundRepeat: "repeat",
                backgroundPositionX: stayGradientX,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              stay here as long as you need
            </motion.span>
          </motion.div>

          {/* Category strip — fades in, rises, grows, and shifts left */}
          <motion.div
            className="mt-[30vh] select-none pb-12"
            style={{ opacity: categoryOpacity, y: categoryY }}
          >
            <motion.div
              ref={categoryTextRef}
              className="whitespace-nowrap px-6 font-serif text-[clamp(2.5rem,9vw,7rem)] leading-[1.35] md:px-12"
              style={{
                x: categoryX,
                scale: categoryScale,
                transformOrigin: "left bottom",
                paddingBottom: "0.18em",
                backgroundImage:
                  "linear-gradient(90deg,#00AEFF,#05F6EA,#6105f6,#F44A64,#F53838,#00AEFF)",
                backgroundSize: "200% 100%",
                backgroundRepeat: "repeat",
                backgroundPositionX: categoryGradientX,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Nature&nbsp;&nbsp;&nbsp;Solfeggio&nbsp;&nbsp;&nbsp;Meditation&nbsp;&nbsp;&nbsp;Sleep
            </motion.div>
          </motion.div>
        </section>
      </div>

      <Footer />
    </>
  );
}
