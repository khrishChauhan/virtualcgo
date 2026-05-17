import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ShowcaseSection />
      <PricingSection />
      <ContactSection />
    </main>
  );
}
