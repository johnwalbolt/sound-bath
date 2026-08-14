import PageShell from "./PageShell";
import CtaButton from "@/components/CtaButton";
import { CATEGORIES, CATEGORY_ORDER } from "@/components/site";
import { BODY, SERIF, shimmerTextStyle } from "@/components/home/panel";

/** Shared layout for a catalog category (Solfeggio / Sleep / Nature /
 *  Meditation): intro, playlist links + embed, and cross-links. */
export default function CategoryPage({ slug }: { slug: string }) {
  const c = CATEGORIES[slug];
  const others = CATEGORY_ORDER.filter((s) => s !== slug);

  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-6">
        <h1
          className="text-[clamp(3rem,9vw,6rem)] leading-none"
          style={shimmerTextStyle}
        >
          {c.name}
        </h1>
        <p className={`mt-6 ${BODY}`}>{c.intro}</p>

        {c.frequencies && (
          <div className="mt-8 flex flex-wrap gap-3">
            {c.frequencies.map((f) => (
              <span
                key={f}
                className="rounded-full border border-foreground/25 px-4 py-2 text-[13px] font-medium tracking-[0.12em] text-[#FFFFE5]/85"
              >
                {f}
              </span>
            ))}
          </div>
        )}

        {/* Playlist */}
        <h2
          className="mt-14 text-2xl text-[#FFFFE5] md:text-3xl"
          style={{ fontFamily: SERIF }}
        >
          {c.playlistLabel}
        </h2>
        <p className={`mt-3 text-[13px] uppercase tracking-[0.18em] text-[#FFFFE5]/55`}>
          Direct playlist platform links
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {c.links.map((l) => (
            <CtaButton key={l.label} href={l.href}>
              <l.Icon className="shrink-0 text-[15px]" aria-hidden />
              {l.label.toUpperCase()}
            </CtaButton>
          ))}
        </div>

        {/* Embed */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-foreground/15 bg-black/40">
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

        {/* Other categories */}
        <h2
          className="mt-16 text-2xl text-[#FFFFE5] md:text-3xl"
          style={{ fontFamily: SERIF }}
        >
          Other Catalog Categories
        </h2>
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
