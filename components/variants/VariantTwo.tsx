import Nav from "@/components/Nav";
import HeroTwo from "@/components/HeroTwo";
import MouseRipples from "@/components/MouseRipples";
import CatalogSection from "@/components/CatalogSection";
import StreamSection from "@/components/StreamSection";
import ConnectSection from "@/components/ConnectSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

// Variant 2 — original homepage plus a cursor "through water" ripple effect.
export default function VariantTwo() {
  return (
    <>
      <MouseRipples />
      <Nav />
      <main className="flex-1">
        <HeroTwo />
        <CatalogSection />
        <StreamSection />
        <ConnectSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
