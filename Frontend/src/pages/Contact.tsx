import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ContactSection } from "@/components/sections/contact-section";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [contactType, setContactType] = useState<string | null>(null);
  
  useEffect(() => {
    // Get the query parameter from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const type = queryParams.get('type');
    if (type) {
      setContactType(type);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ContactSection initialContactType={contactType} />
      </main>
      <Footer />
    </div>
  );
}