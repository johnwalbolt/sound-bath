import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import PageShell from "@/components/pages/PageShell";
import ImagePlaceholder from "@/components/pages/ImagePlaceholder";
import CtaButton from "@/components/CtaButton";
import { CATEGORIES, CATEGORY_ORDER } from "@/components/site";
import { BODY } from "@/components/home/panel";
import catalogHeader from "@/public/assets/catalog-header.webp";
import catalogHeroBg from "@/public/assets/catalog-hero-bg.webp";
import solfeggioArt from "@/public/assets/solfeggio-art.webp";
import sleepArt from "@/public/assets/sleep-art.jpg";

// Per-category card artwork (placeholder until the rest are supplied).
const CARD_ART: Record<string, StaticImageData> = {
  solfeggio: solfeggioArt,
  sleep: sleepArt,
};

// Mostly-white shimmering header, but each category gets a different accent
// color and its own speed + phase so they don't animate in unison.
const headerStyle = (
  grad: string,
  dur: number,
  delay: number,
  glow: string,
): CSSProperties => ({
  backgroundImage: `linear-gradient(105deg,${grad})`,
  backgroundSize: "200% 100%",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  filter: `drop-shadow(0 0 14px ${glow})`,
  animation: `wordmark-shimmer ${dur}s linear ${delay}s infinite`,
});

const HEADER_STYLES: Record<string, CSSProperties> = {
  solfeggio: headerStyle(
    "#fff,#c9b3ff,#fff,#b79cff,#fff,#d9c2ff,#fff",
    18,
    0,
    "rgba(183,156,255,0.3)",
  ),
  sleep: headerStyle(
    "#fff,#9ee0ff,#fff,#7fd8f0,#fff,#bfeaff,#fff",
    23,
    -6,
    "rgba(127,216,240,0.3)",
  ),
  nature: headerStyle(
    "#fff,#a8ecd0,#fff,#7fe3c0,#fff,#c9f2e2,#fff",
    20,
    -11,
    "rgba(127,227,192,0.3)",
  ),
  meditation: headerStyle(
    "#fff,#ffc0e0,#fff,#ff9ecb,#fff,#ffd6ea,#fff",
    15,
    -3,
    "rgba(255,158,203,0.3)",
  ),
};

// Saturated per-category glow (shown as a shimmering halo behind the art on
// hover), matching each header's accent.
const GLOW: Record<string, string> = {
  solfeggio: "linear-gradient(105deg,#a855f7,#7c3aed,#c084fc,#8b5cf6,#a855f7)",
  sleep: "linear-gradient(105deg,#38bdf8,#22d3ee,#7dd3fc,#0ea5e9,#38bdf8)",
  nature: "linear-gradient(105deg,#2dd4bf,#34d399,#5eead4,#14b8a6,#2dd4bf)",
  meditation: "linear-gradient(105deg,#f472b6,#ec4899,#f9a8d4,#db2777,#f472b6)",
};

export const metadata: Metadata = {
  title: "Catalog — Sound Bath",
  description:
    "Explore Sound Bath's catalog: Solfeggio, Sleep, Nature, and Meditation soundscapes.",
};

export default function CatalogPage() {
  return (
    <PageShell
      background={
        <Image
          src={catalogHeroBg}
          alt=""
          aria-hidden
          priority
          sizes="100vw"
          className="pointer-events-none absolute inset-x-0 top-0 h-auto w-full select-none"
        />
      }
    >
      <section className="mx-auto max-w-5xl px-6">
        <Image
          src={catalogHeader}
          alt="Catalog"
          priority
          className="h-auto max-h-12 w-auto max-w-full md:max-h-16"
        />
        <p className={`mt-6 max-w-2xl ${BODY}`}>
          Below are the most popular ways our listeners categorize and search
          our offerings.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_ORDER.map((slug) => {
            const c = CATEGORIES[slug];
            const art = CARD_ART[slug];
            return (
              <div key={slug} className="flex h-full flex-col">
                {/* Header (links to the category page) */}
                <Link href={`/${c.slug}`} className="w-fit">
                  <h2
                    className="font-sans text-2xl font-bold tracking-[0.02em]"
                    style={HEADER_STYLES[slug]}
                  >
                    {c.name}
                  </h2>
                </Link>

                {/* Art (links to the category page) */}
                <Link
                  href={`/${c.slug}`}
                  className="art-glow relative isolate mt-4 block rounded-xl transition-transform duration-300 hover:scale-[1.02]"
                  style={{ "--glow": GLOW[slug] } as CSSProperties}
                >
                  {art ? (
                    <Image
                      src={art}
                      alt={`${c.name} artwork`}
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                      className="h-auto w-full rounded-xl"
                    />
                  ) : (
                    <ImagePlaceholder
                      label={`${c.name} artwork`}
                      className="aspect-square"
                    />
                  )}
                </Link>

                {/* Text */}
                <p className={`mt-5 ${BODY}`}>{c.blurb}</p>

                {/* Button (aligned to the bottom of each column) */}
                <div className="mt-auto pt-6">
                  <CtaButton variant="solid" fullWidth href={`/${c.slug}`}>
                    LEARN AND LISTEN
                  </CtaButton>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
