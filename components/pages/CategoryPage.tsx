import type { CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import PageShell from "./PageShell";
import ImagePlaceholder from "./ImagePlaceholder";
import CtaButton from "@/components/CtaButton";
import { CATEGORIES, CATEGORY_ORDER } from "@/components/site";
import { BODY, shimmerTextWhiteStyle } from "@/components/home/panel";
import categoryHero from "@/public/assets/category-hero-bg.webp";
import solfeggioArt from "@/public/assets/solfeggio-art.webp";
import sleepArt from "@/public/assets/sleep-art.jpg";
import freq417 from "@/public/assets/solfeggio-417.webp";
import freq396 from "@/public/assets/solfeggio-396.webp";
import freq528 from "@/public/assets/solfeggio-528.webp";
import freq741 from "@/public/assets/solfeggio-741.webp";
import freq639 from "@/public/assets/solfeggio-639.webp";
import freq852 from "@/public/assets/solfeggio-852.webp";
import freq963 from "@/public/assets/solfeggio-963.webp";

// Optional per-category artwork shown beside the header/intro.
const ART: Record<string, StaticImageData> = {
  solfeggio: solfeggioArt,
  sleep: sleepArt,
};

// Frequency thumbnails keyed by their label.
const FREQ_IMAGES: Record<string, StaticImageData> = {
  "417 Hz": freq417,
  "396 Hz": freq396,
  "528 Hz": freq528,
  "741 Hz": freq741,
  "639 Hz": freq639,
  "852 Hz": freq852,
  "963 Hz": freq963,
};

const eyebrow = "text-[13px] uppercase tracking-[0.18em] text-[#FFFFE5]/55";

// Multicolor glow shown behind a frequency thumbnail on hover.
const FREQ_GLOW = "linear-gradient(105deg,#a855f7,#f472b6,#38bdf8,#f5a623,#a855f7)";

/** Shared layout for a catalog category (Solfeggio / Sleep / Nature /
 *  Meditation): intro, playlist links + embed, and cross-links. */
export default function CategoryPage({ slug }: { slug: string }) {
  const c = CATEGORIES[slug];
  const others = CATEGORY_ORDER.filter((s) => s !== slug);
  const art = ART[slug];

  const platformLinks = (
    <div>
      <p className={eyebrow}>Direct playlist platform links</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {c.links.map((l) => (
          <CtaButton key={l.label} fullWidth href={l.href}>
            <l.Icon className="shrink-0 text-[15px]" aria-hidden />
            {l.label.toUpperCase()}
          </CtaButton>
        ))}
      </div>
    </div>
  );

  const embed = (
    <div className="overflow-hidden rounded-2xl border border-foreground/15 bg-black/40">
      {c.embed.type === "spotify" ? (
        <iframe
          title={`${c.name} playlist`}
          src={c.embed.src}
          width="100%"
          height={352}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          style={{ border: 0, display: "block" }}
        />
      ) : (
        <div className="relative aspect-video w-full">
          <iframe
            title={`${c.name} playlist`}
            src={c.embed.src}
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );

  // The playlist eyebrow + embed. With artwork it sits in the left column under
  // the intro; without artwork it runs full-width below.
  const playlist = (
    <div>
      <p className={eyebrow}>{c.playlistLabel}</p>
      <div className="mt-4">{embed}</div>
    </div>
  );

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
      <section className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          <div className="md:flex-1">
            <h1
              className="text-[clamp(3rem,9vw,6rem)] leading-[1.15] pb-[0.12em]"
              style={shimmerTextWhiteStyle}
            >
              {c.name}
            </h1>
            <p className={`mt-6 ${BODY}`}>{c.intro}</p>
            {/* Playlist + embed sit under the paragraph */}
            <div className="mt-10">{playlist}</div>
          </div>

          <div className="w-full max-w-sm shrink-0 md:w-[38%] md:max-w-none">
            {art ? (
              <Image
                src={art}
                alt={`${c.name} artwork`}
                sizes="(max-width: 768px) 90vw, 38vw"
                className="h-auto w-full rounded-2xl"
              />
            ) : (
              <ImagePlaceholder
                label={`${c.name} artwork`}
                className="aspect-square"
              />
            )}
            <div className="mt-6">{platformLinks}</div>
          </div>
        </div>

        {/* Frequencies (Solfeggio) — image thumbnails linking to each video */}
        {c.frequencies && (
          <>
            <p className={`mt-14 ${eyebrow}`}>Listen to {c.name} Frequencies</p>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-7">
              {c.frequencies.map((f) => (
                <a
                  key={f.hz}
                  href={f.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${f.hz} — listen on YouTube`}
                  className="art-glow relative isolate block rounded-xl transition-transform duration-300 hover:scale-[1.04]"
                  style={{ "--glow": FREQ_GLOW } as CSSProperties}
                >
                  <span className="block overflow-hidden rounded-xl border border-foreground/15">
                    <Image
                      src={FREQ_IMAGES[f.hz]}
                      alt={f.hz}
                      sizes="(max-width: 640px) 45vw, (max-width: 768px) 22vw, 13vw"
                      className="h-auto w-full"
                    />
                  </span>
                </a>
              ))}
            </div>
          </>
        )}

        {/* Other categories */}
        <p className={`mt-16 ${eyebrow}`}>Other Catalog Categories</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {others.map((s) => (
            <CtaButton key={s} href={`/${s}`}>
              {CATEGORIES[s].name.toUpperCase()}
            </CtaButton>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
