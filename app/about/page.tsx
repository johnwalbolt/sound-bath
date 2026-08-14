import type { Metadata } from "next";
import PageShell from "@/components/pages/PageShell";
import ImagePlaceholder from "@/components/pages/ImagePlaceholder";
import CtaButton from "@/components/CtaButton";
import { BODY, SERIF, shimmerTextStyle } from "@/components/home/panel";

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
    <PageShell>
      <section className="mx-auto max-w-4xl px-6">
        <h1
          className="text-[clamp(3rem,9vw,6rem)] leading-none"
          style={shimmerTextStyle}
        >
          About
        </h1>
        <p className={`mt-6 max-w-2xl ${BODY}`}>
          Sound Bath started as a simple experiment in Andrew Heringer&rsquo;s
          California studio. As more people connected with the music, it grew
          into a global project devoted to thoughtful, immersive sound
          experiences.
        </p>

        <div className="mt-10">
          <ImagePlaceholder label="Andrew Heringer in his recording studio" />
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
                <h2
                  className="text-3xl leading-tight text-[#FFFFE5]"
                  style={{ fontFamily: SERIF }}
                >
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
