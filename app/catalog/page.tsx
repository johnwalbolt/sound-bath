import type { Metadata } from "next";
import PageShell from "@/components/pages/PageShell";
import CtaButton from "@/components/CtaButton";
import { CATEGORIES, CATEGORY_ORDER } from "@/components/site";
import { BODY, SERIF, shimmerTextStyle } from "@/components/home/panel";

export const metadata: Metadata = {
  title: "Catalog — Sound Bath",
  description:
    "Explore Sound Bath's catalog: Solfeggio, Sleep, Nature, and Meditation soundscapes.",
};

export default function CatalogPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-6">
        <h1
          className="text-[clamp(3rem,9vw,6rem)] leading-none"
          style={shimmerTextStyle}
        >
          Catalog
        </h1>
        <p className={`mt-6 max-w-2xl ${BODY}`}>
          Below are the most popular ways our listeners categorize and search
          our offerings.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {CATEGORY_ORDER.map((slug) => {
            const c = CATEGORIES[slug];
            return (
              <div key={slug} className="shimmer-panel">
                <div className="flex h-full flex-col p-8 md:p-10">
                  <h2
                    className="text-4xl leading-none text-[#FFFFE5] md:text-5xl"
                    style={{ fontFamily: SERIF }}
                  >
                    {c.name}
                  </h2>
                  <p className={`mt-5 ${BODY}`}>{c.blurb}</p>
                  <div className="mt-8">
                    <CtaButton variant="solid" href={`/${c.slug}`}>
                      LEARN AND LISTEN
                    </CtaButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
