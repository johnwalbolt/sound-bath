"use client";

import { useRef } from "react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import CtaButton from "@/components/CtaButton";
import { INSTAGRAM } from "@/components/site";
import { BODY } from "./panel";
import Reveal from "./Reveal";
import SectionBg from "./SectionBg";
import connectBg from "@/public/assets/connect-bg.webp";
import connectHeader from "@/public/assets/connect-header.webp";

/** Connect section: a main panel (header/body/CTA) plus a smaller social panel.
 *  Each panel fades independently; the background fades with the content span. */
export default function Connect() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="connect"
      // Tall enough (>= image height at full width, ~61vw) so the contained
      // ConnectBackground spans the full screen width.
      className="relative flex min-h-[max(100vh,62vw)] flex-col items-center justify-center overflow-hidden bg-black px-6 py-24"
    >
      {/* Background (ConnectBackground) — fades with the content span */}
      <SectionBg src={connectBg} targetRef={contentRef} />

      {/* Narrow column on desktop: containers span ~25% of the screen. */}
      <div
        ref={contentRef}
        className="relative z-10 flex w-full flex-col gap-6 md:w-[25vw]"
      >
        {/* Panel 1: CONNECT */}
        <Reveal className="shimmer-panel">
          <div className="p-8 md:p-12">
            <Image
              src={connectHeader}
              alt="Connect"
              className="h-auto max-h-14 w-auto max-w-full md:max-h-16"
            />
            <p className={`mt-6 max-w-xl ${BODY}`}>
              <strong className="font-bold">
                We want to connect with all of our listeners.
              </strong>{" "}
              Give us feedback on our current offerings or suggest a future
              collaboration.
            </p>
            <div className="mt-8">
              <CtaButton variant="solid" fullWidth href="/connect">
                CONNECT WITH US
              </CtaButton>
            </div>
          </div>
        </Reveal>

        {/* Panel 2: social */}
        <Reveal className="shimmer-panel">
          <div className="p-8 md:p-10">
            <p className={`max-w-xl ${BODY}`}>
              Follow along for updates and releases on social media.
            </p>
            <div className="mt-8">
              <CtaButton fullWidth href={INSTAGRAM.href}>
                <FaInstagram className="shrink-0 text-[15px]" aria-hidden />
                INSTAGRAM
              </CtaButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
