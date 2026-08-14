import type { Metadata } from "next";
import Image from "next/image";
import PageShell from "@/components/pages/PageShell";
import CtaButton from "@/components/CtaButton";
import { BODY } from "@/components/home/panel";
import aboutHeader from "@/public/assets/about-header.webp";
import aboutPageBg from "@/public/assets/about-page-bg.webp";
import aboutMain from "@/public/assets/about-main.webp";

export const metadata: Metadata = {
  title: "About — Sound Bath",
  description:
    "Sound Bath began in Andrew Heringer's California studio and grew into a global project devoted to immersive sound.",
};

const ARTISTS = [
  {
    name: "Andrew Heringer",
    role: "Music Producer, Recording Artist",
    href: "https://www.andrewheringer.com/",
  },
  {
    name: "The Guest and The Host",
    role: "Recording Artist",
    href: "https://www.theguestandthehost.com/",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      background={
        <Image
          src={aboutPageBg}
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
          src={aboutHeader}
          alt="About"
          priority
          className="h-auto max-h-12 w-auto max-w-full md:max-h-16"
        />
        <p className={`mt-6 max-w-2xl ${BODY}`}>
          Sound Bath started as a simple experiment in Andrew Heringer&rsquo;s
          California studio. As more people connected with the music, it grew
          into a global project devoted to thoughtful, immersive sound
          experiences.
        </p>

        <div className="mt-10">
          <Image
            src={aboutMain}
            alt="Andrew Heringer in his recording studio"
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="h-auto w-full rounded-2xl"
          />
        </div>

        <p className={`mt-12 max-w-2xl ${BODY}`}>
          Andrew is also a music producer and singer-songwriter. He creates
          indie and alternative music released under his own name and as The
          Guest and The Host.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {ARTISTS.map((a) => (
            <div key={a.name} className="shimmer-panel">
              <div className="flex h-full flex-col p-8">
                <h2 className="font-sans text-2xl font-bold leading-tight tracking-[0.02em] text-[#FFFFE5]">
                  {a.name}
                </h2>
                <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-[#FFFFE5]/55">
                  {a.role}
                </p>
                <div className="mt-6">
                  <CtaButton href={a.href}>OFFICIAL WEBSITE</CtaButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
