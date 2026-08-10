import Reveal from "./Reveal";

const BUY = [{ label: "BANDCAMP", href: "#" }];
const STREAM = [
  { label: "AMAZON", href: "#" },
  { label: "APPLE", href: "#" },
  { label: "SPOTIFY", href: "#" },
  { label: "YOUTUBE", href: "#" },
];

function LinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="mt-6 flex flex-col items-center gap-4">
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            className="text-sm font-medium tracking-[0.2em] text-foreground/70 transition-colors hover:text-foreground"
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function StreamSection() {
  return (
    <section className="px-6 py-24">
      <Reveal className="mx-auto grid max-w-3xl grid-cols-1 gap-16 text-center sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-bold tracking-[0.25em]">BUY</h2>
          <LinkList links={BUY} />
        </div>
        <div>
          <h2 className="text-lg font-bold tracking-[0.25em]">STREAM</h2>
          <LinkList links={STREAM} />
        </div>
      </Reveal>
    </section>
  );
}
