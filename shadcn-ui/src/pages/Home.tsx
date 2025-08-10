import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { AboutSection } from "@/components/sections/about-section";
import { ConsultationSection } from "@/components/sections/consultation-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ClipboardCheck, ExternalLink } from "lucide-react";

export default function Home() {
  // Function to open links in new tabs
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        
        {/* Featured Tools Section */}
        <section className="section bg-slate-50 py-16 relative" id="featured-tools">
          <div className="container">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 text-accent border-accent">Interactive Tools</Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-4">Explore Our Featured Tools</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Utilize our interactive business tools designed to help entrepreneurs make informed decisions
                and get insights into our ongoing work.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-accent" />
                    US Business Formation Map
                  </CardTitle>
                  <CardDescription>
                    Interactive guide to business formation across different states
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Compare formation requirements, fees, and strategic advantages for establishing your business
                    in popular states like Delaware, Nevada, Wyoming and more.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => openInNewTab('/business-map')}
                    className="w-full"
                  >
                    <span className="flex items-center justify-center">
                      Explore Map
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-accent" />
                    What We're Working On
                  </CardTitle>
                  <CardDescription>
                    Live feed of our current projects and business formations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Get a real-time glimpse into the types of businesses we're helping to form and the projects
                    our consultants are currently handling.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => openInNewTab('/work-feed')}
                    className="w-full"
                  >
                    <span className="flex items-center justify-center">
                      View Live Feed
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </section>
        
        <ConsultationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}