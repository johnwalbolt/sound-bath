import CtaButton from "./CtaButton";
import Reveal from "./Reveal";

export default function CatalogSection() {
  return (
    <section id="catalog" className="px-6 py-28 sm:py-36">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-[clamp(1.25rem,3.5vw,2rem)] leading-relaxed">
          Explore our full catalog of music for{" "}
          <strong className="font-bold">healing</strong>,{" "}
          <strong className="font-bold">meditation</strong>,{" "}
          <strong className="font-bold">sleep</strong>,{" "}
          <strong className="font-bold">solfeggio frequencies</strong>, and more.
        </p>
        <div className="mt-10">
          <CtaButton href="#catalog">VIEW CATALOG</CtaButton>
        </div>
      </Reveal>
    </section>
  );
}
