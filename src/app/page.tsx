import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}
