import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Catalog from "@/components/home/Catalog";
import TextStrip from "@/components/home/TextStrip";
import Connect from "@/components/home/Connect";
import About from "@/components/home/About";

// Single homepage, built section by section. (The old 3-variant switcher was
// removed — see components/home/* for the current sections.)
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Catalog />
        <TextStrip text="stay here as long as you need." />
        <Connect />
        <TextStrip text="mindfulness + frequency = healing" />
        <About />
      </main>
      <Footer />
    </>
  );
}
