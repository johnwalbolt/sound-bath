import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/** Nav + padded main + Footer, used by every non-home page. */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-black pt-28 pb-24">{children}</main>
      <Footer />
    </>
  );
}
