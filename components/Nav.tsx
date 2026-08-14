import Image from "next/image";
import {
  FaBandcamp,
  FaAmazon,
  FaApple,
  FaSpotify,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import navLogo from "@/public/assets/nav-logo.webp";

const LINKS = ["Catalog", "Connect", "About"];

const SOCIALS = [
  { label: "Bandcamp", Icon: FaBandcamp },
  { label: "Amazon", Icon: FaAmazon },
  { label: "Apple", Icon: FaApple },
  { label: "Spotify", Icon: FaSpotify },
  { label: "YouTube", Icon: FaYoutube },
  { label: "Instagram", Icon: FaInstagram },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
        {/* Left: logo + section links */}
        <div className="flex items-center gap-10">
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
          <ul className="hidden items-center gap-6 text-[12px] font-medium uppercase tracking-[0.18em] text-[#FFFFE5]/70 md:flex md:gap-9">
            {LINKS.map((l) => (
              <li key={l}>
                <span className="cursor-default transition-colors hover:text-[#FFFFE5]">
                  {l}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: platform icons (dead for now) */}
        <div className="flex items-center gap-4 text-[17px] text-[#FFFFE5]/70">
          {SOCIALS.map(({ label, Icon }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="transition-colors hover:text-[#FFFFE5]"
            >
              <Icon />
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
