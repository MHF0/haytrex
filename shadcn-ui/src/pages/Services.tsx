import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ServicesSection } from "@/components/sections/services-section";

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
}