import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ConsultationSection } from "@/components/sections/consultation-section";

export default function ConsultationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ConsultationSection />
      </main>
      <Footer />
    </div>
  );
}