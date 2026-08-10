import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import CatalogSection from "@/components/CatalogSection";
import StreamSection from "@/components/StreamSection";
import ConnectSection from "@/components/ConnectSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

// Variant 1 — the original homepage.
export default function VariantOne() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <CatalogSection />
        <StreamSection />
        <ConnectSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
