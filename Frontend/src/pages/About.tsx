import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AboutSection } from "@/components/sections/about-section";
import { AboutStructureSection } from "@/components/sections/about-structure-section";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AboutSection />
        <AboutStructureSection />
      </main>
      <Footer />
    </div>
  );
}