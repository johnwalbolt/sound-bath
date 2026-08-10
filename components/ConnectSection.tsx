import CtaButton from "./CtaButton";
import Reveal from "./Reveal";

export default function ConnectSection() {
  return (
    <section id="connect" className="px-6 py-28 sm:py-36">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-serif text-[clamp(1.75rem,5vw,3rem)] italic text-gradient">
          stay here as long as you need.
        </p>
        <p className="mx-auto mt-8 max-w-xl leading-relaxed text-muted">
          We want to connect with all of our listeners. Give us feedback on our
          current offerings or suggest a future collaboration.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <CtaButton href="#connect">CONNECT WITH US</CtaButton>
          <CtaButton href="#" variant="outline">
            INSTAGRAM
          </CtaButton>
        </div>
        <p className="mt-6 text-sm text-muted">
          Follow along for updates and releases on social media.
        </p>
      </Reveal>
    </section>
  );
}
