import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/pages/PageShell";
import { BODY, shimmerTextWhiteStyle } from "@/components/home/panel";
import { FAQ, FAQ_UPDATED, type FaqLink } from "@/components/faq";
import categoryHero from "@/public/assets/category-hero-bg.webp";

export const metadata: Metadata = {
  title: "FAQ — Sound Bath",
  description:
    "Plain answers about sound baths, solfeggio frequencies, binaural beats, music for sleep, and Sound Bath, the ambient music project by Andrew Heringer.",
  alternates: { canonical: "/faq/" },
};

const eyebrow = "text-[13px] uppercase tracking-[0.18em] text-[#FFFFE5]/55";
const linkClass =
  "underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white";

// FAQPage structured data, built from the same FAQ array the page renders, so
// the structured answers always match the visible ones.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://soundbathvibrations.com/faq/#faq",
  url: "https://soundbathvibrations.com/faq/",
  name: "Sound Bath FAQ",
  dateModified: FAQ_UPDATED,
  isPartOf: { "@id": "https://soundbathvibrations.com/#website" },
  about: { "@id": "https://soundbathvibrations.com/#soundbath" },
  mainEntity: FAQ.flatMap((s) =>
    s.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a.join(" ") },
    })),
  ),
};

function AnswerLink({ link }: { link: FaqLink }) {
  return link.href.startsWith("/") ? (
    <Link href={link.href} className={linkClass}>
      {link.label}
    </Link>
  ) : (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
    >
      {link.label}
    </a>
  );
}

export default function FaqPage() {
  return (
    <PageShell
      background={
        <Image
          src={categoryHero}
          alt=""
          aria-hidden
          priority
          sizes="100vw"
          className="pointer-events-none absolute inset-x-0 top-0 h-auto w-full select-none"
        />
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className="mx-auto max-w-3xl px-6">
        <h1
          className="text-[clamp(3rem,9vw,6rem)] leading-[1.15] pb-[0.12em]"
          style={shimmerTextWhiteStyle}
        >
          FAQ
        </h1>
        <p className={`mt-6 ${BODY}`}>
          Plain answers about sound baths, solfeggio frequencies, binaural
          beats, and Sound Bath, the ambient music project by Andrew Heringer.
        </p>

        <nav aria-label="FAQ sections" className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {FAQ.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`${eyebrow} transition-colors hover:text-[#FFFFE5]`}
            >
              {s.title}
            </a>
          ))}
        </nav>

        {FAQ.map((s) => (
          <section key={s.id} id={s.id} className="mt-16 scroll-mt-28">
            <p className={eyebrow}>{s.title}</p>
            {s.items.map((item) => (
              <article
                key={item.q}
                className="mt-8 border-t border-white/10 pt-8"
              >
                <h2 className="font-sans text-xl font-bold leading-snug tracking-[0.02em] text-[#FFFFE5] md:text-2xl">
                  {item.q}
                </h2>
                {item.a.map((p) => (
                  <p key={p} className={`mt-4 ${BODY}`}>
                    {p}
                  </p>
                ))}
                {item.links && (
                  <ul className="mt-4 space-y-2 text-[14px] tracking-[0.05em] text-white/75">
                    {item.links.map((l) => (
                      <li key={l.href + l.label}>
                        <AnswerLink link={l} />
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </section>
        ))}

        <p className="mt-16 text-[13px] leading-relaxed tracking-[0.05em] text-white/55">
          This page is general information, not medical advice. Last updated{" "}
          {FAQ_UPDATED}.
        </p>
      </section>
    </PageShell>
  );
}
