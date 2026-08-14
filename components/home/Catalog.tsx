"use client";

import { useRef } from "react";
import Image from "next/image";
import CtaButton from "@/components/CtaButton";
import catalogBg from "@/public/assets/catalog-bg.webp";
import albumArt from "@/public/assets/album-art.webp";
import catalogHeader from "@/public/assets/catalog-header.webp";
import { BODY } from "./panel";
import Reveal from "./Reveal";
import SectionBg from "./SectionBg";

// Store buttons; `group` renders a small label above that button.
const STORES = [
  { label: "BANDCAMP", group: "BUY" },
  { label: "AMAZON", group: "STREAM" },
  { label: "APPLE" },
  { label: "SPOTIFY" },
  { label: "YOUTUBE" },
];

/** Catalog section: sun-rings backdrop + a panel with copy/CTA and the album
 *  grid, plus a panel of store links. Each panel fades independently; the
 *  background fades with the content span (first element in → last element out). */
export default function Catalog() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="catalog"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 py-24"
    >
      {/* Background (CatalogBackground) — fades with the content span */}
      <SectionBg src={catalogBg} targetRef={contentRef} />

      <div
        ref={contentRef}
        className="relative z-10 flex w-full max-w-5xl flex-col gap-6"
      >
        {/* Panel 1: header + body + CTA / album art */}
        <Reveal className="shimmer-panel">
          <div className="flex flex-col items-center gap-10 p-8 md:flex-row md:gap-12 md:p-12">
            {/* Left: header + body + CTA */}
            <div className="flex-1">
              <Image
                src={catalogHeader}
                alt="Catalog"
                priority
                className="h-auto max-h-14 w-auto max-w-full md:max-h-16"
              />
              <p className={`mt-6 max-w-md ${BODY}`}>
                Explore our full catalog of music for healing, meditation,
                sleep, solfeggio frequencies, and more.
              </p>
              <div className="mt-8">
                <CtaButton variant="solid">VIEW CATALOG</CtaButton>
              </div>
            </div>

            {/* Right: album art (CatalogAlbumArt) */}
            <div className="w-full md:w-[46%]">
              <Image
                src={albumArt}
                alt="Sound Bath catalog"
                sizes="(max-width: 768px) 82vw, 40vw"
                className="h-auto w-full rounded-2xl"
              />
            </div>
          </div>
        </Reveal>

        {/* Panel 2: store links (BUY / STREAM) */}
        <Reveal className="shimmer-panel">
          <div className="grid grid-cols-2 gap-x-3 gap-y-4 p-8 sm:grid-cols-3 md:grid-cols-5 md:gap-x-4 md:p-10">
            {STORES.map((s) => (
              <div key={s.label} className="flex flex-col items-stretch gap-3">
                <span className="block h-4 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-[#FFFFE5]/55">
                  {s.group ?? ""}
                </span>
                <CtaButton fullWidth>{s.label}</CtaButton>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
