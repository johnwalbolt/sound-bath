"use client";

import { useVersion } from "./VersionContext";

const LINKS = [
  { label: "HOME", href: "#top" },
  { label: "CATALOG", href: "#catalog" },
  { label: "CONNECT", href: "#connect" },
  { label: "ABOUT", href: "#about" },
];

export default function Nav() {
  const { version, count, cycle } = useVersion();

  return (
    // Header is hidden by default and slides into view when the top of the
    // screen is hovered. The header box still occupies the top strip (transform
    // doesn't change layout), so that strip is the hover trigger.
    <header className="group fixed inset-x-0 top-0 z-50">
      <div className="-translate-y-full bg-background/80 backdrop-blur-md transition-transform duration-300 ease-out group-hover:translate-y-0">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          {/* Wordmark cycles through the homepage variants */}
          <button
            type="button"
            onClick={cycle}
            title="Click to cycle homepage variations"
            className="group/logo flex items-baseline gap-2 font-serif text-2xl tracking-[0.25em] text-foreground"
          >
            SOUND&nbsp;BATH
            {count > 1 && (
              <span className="font-sans text-[10px] tracking-[0.15em] text-foreground/40 transition-colors group-hover/logo:text-foreground/70">
                {version + 1}/{count}
              </span>
            )}
          </button>
          <ul className="flex items-center gap-8 text-[13px] font-medium tracking-[0.15em] text-foreground/80">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
