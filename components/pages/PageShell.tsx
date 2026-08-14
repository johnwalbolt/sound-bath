import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/** Nav + padded main + Footer, used by every non-home page. An optional
 *  `background` node renders behind the content (content sits at z-10). */
export default function PageShell({
  children,
  background,
}: {
  children: ReactNode;
  background?: ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="relative min-h-screen overflow-hidden bg-black pb-24 pt-28">
        {background}
        <div className="relative z-10">{children}</div>
      </main>
      <Footer />
    </>
  );
}
