"use client";

import { useRef } from "react";
import Image from "next/image";
import CtaButton from "@/components/CtaButton";
import { BODY } from "./panel";
import Reveal from "./Reveal";
import SectionBg from "./SectionBg";
import aboutBg from "@/public/assets/about-bg.webp";
import aboutImage from "@/public/assets/about.webp";
import aboutHeader from "@/public/assets/about-header.webp";

/** About section: image on the left, header/body/CTA on the right. The panel
 *  fades on its own; the background fades with it. */
export default function About() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 py-24"
    >
      {/* Background (AboutBackground) — fades with the content */}
      <SectionBg src={aboutBg} targetRef={contentRef} />

      <div ref={contentRef} className="relative z-10 w-full max-w-5xl">
        <Reveal className="shimmer-panel">
          <div className="flex flex-col items-center gap-10 p-8 md:flex-row md:gap-12 md:p-12">
            {/* Left: image (AboutImage) */}
            <div className="w-full md:w-[46%]">
              <Image
                src={aboutImage}
                alt="Sound Bath"
                sizes="(max-width: 768px) 82vw, 40vw"
                className="h-auto w-full rounded-2xl"
              />
            </div>

            {/* Right: header + body + CTA */}
            <div className="flex-1">
              <Image
                src={aboutHeader}
                alt="About"
                className="h-auto max-h-14 w-auto max-w-full md:max-h-16"
              />
              <p className={`mt-6 max-w-md ${BODY}`}>
                Andrew Heringer started Sound Bath as an experiment in minimalism
                and gentle ambient soundscapes. As more listeners tuned in, the
                project expanded into a space for intentional sound.
              </p>
              <div className="mt-8">
                <CtaButton variant="solid">ABOUT SOUND BATH</CtaButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
