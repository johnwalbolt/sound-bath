import CtaButton from "./CtaButton";
import Reveal from "./Reveal";

export default function AboutSection() {
  return (
    <section id="about" className="px-6 py-28 sm:py-36">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-serif text-[clamp(1.75rem,5vw,3rem)] italic text-gradient">
          mindfulness + frequency = healing
        </p>
        <p className="mx-auto mt-8 max-w-xl leading-relaxed text-muted">
          Andrew Heringer started Sound Bath as an experiment in minimalism and
          gentle ambient soundscapes. As more listeners tuned in, the project
          expanded into a space for intentional sound.
        </p>
        <div className="mt-10">
          <CtaButton href="#about">ABOUT SOUND BATH</CtaButton>
        </div>
      </Reveal>
    </section>
  );
}
