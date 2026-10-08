import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 text-center">
        {/* The nav bar's section links are hidden below the md breakpoint, so
            this is the route to the FAQ on phones. */}
        <Link
          href="/faq"
          className="inline-block rounded-sm px-5 py-3 text-[12px] font-medium uppercase tracking-[0.18em] text-[#FFFFE5]/70 transition-colors hover:text-[#FFFFE5] focus-visible:text-[#FFFFE5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#FFFFE5]"
        >
          FAQ
        </Link>
        <p className="text-xs tracking-[0.15em] text-muted">
          Sound Bath
        </p>
      </div>
    </footer>
  );
}
