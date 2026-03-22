import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import CustomCursor from "@/components/custom-cursor";
import Footer from "@/components/footer";
import BackgroundBubbles from "@/components/background-bubbles";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <BackgroundBubbles />
      <CustomCursor />
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}
