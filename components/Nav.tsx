import Image from "next/image";
import navLogo from "@/public/assets/nav-logo.webp";

const LINKS = ["Catalog", "Connect", "About"];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center gap-10 px-6 py-5">
        <a href="#top" className="flex items-center">
          <Image
            src={navLogo}
            alt="Sound Bath"
            priority
            // wordmark sits ~2px low in its canvas; nudge up to optically
            // center it with the (caps) nav links
            className="h-4 w-auto -translate-y-px md:h-5"
          />
        </a>
        {/* Links are dead for now (no destinations yet). */}
        <ul className="flex items-center gap-6 text-[12px] font-medium uppercase tracking-[0.18em] text-[#FFFFE5]/70 md:gap-9">
          {LINKS.map((l) => (
            <li key={l}>
              <span className="cursor-default transition-colors hover:text-[#FFFFE5]">
                {l}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
