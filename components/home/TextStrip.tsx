import Reveal from "./Reveal";
import { shimmerTextStyle } from "./panel";

/** A small full-width section with a single centered line of bold italic
 *  body-font text, filled with a shimmering metallic purple gradient. */
export default function TextStrip({ text }: { text: string }) {
  return (
    <section className="bg-black px-6 py-28 text-center">
      <Reveal>
        <p
          className="mx-auto max-w-4xl font-sans text-[clamp(1.5rem,4vw,2.5rem)] font-bold italic leading-snug"
          style={shimmerTextStyle}
        >
          {text}
        </p>
      </Reveal>
    </section>
  );
}
