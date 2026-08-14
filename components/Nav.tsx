import Image from "next/image";
import Link from "next/link";
import { NAV_SOCIALS } from "@/components/site";
import navLogo from "@/public/assets/nav-logo.webp";

const LINKS = [
  { label: "Catalog", href: "/catalog" },
  { label: "Connect", href: "/connect" },
  { label: "About", href: "/about" },
] as const;

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
        {/* Left: logo + section links */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center">
            <Image
              src={navLogo}
              alt="Sound Bath"
              priority
              // wordmark sits ~2px low in its canvas; nudge up to optically
              // center it with the (caps) nav links
              className="h-4 w-auto -translate-y-px md:h-5"
            />
          </Link>
          <ul className="hidden items-center gap-6 text-[12px] font-medium uppercase tracking-[0.18em] text-[#FFFFE5]/70 md:flex md:gap-9">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="transition-colors hover:text-[#FFFFE5]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: platform icons */}
        <div className="flex items-center gap-4 text-[17px] text-[#FFFFE5]/70">
          {NAV_SOCIALS.map(({ key, label, href, Icon }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
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
