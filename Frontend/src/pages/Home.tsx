import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { AboutSection } from "@/components/sections/about-section";

import { ContactSection } from "@/components/sections/contact-section";
import { DigitalServicesSection } from "@/components/sections/digital-services-section";
import { PortalSection } from "@/components/sections/portal-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ClipboardCheck, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { ScrollProgress } from "@/components/motion/particle-field";
import { Marquee } from "@/components/motion/interactions";
import { useScrollSkew } from "@/hooks/use-motion";

const CAPABILITIES = [
  "Business formation",
  "Custom business portals",
  "Website design & development",
  "Invoicing & proposals",
  "Client self-service",
  "Analytics & reporting",
  "Business plans",
  "Consulting",
];

export default function Home() {
  const skewRef = useScrollSkew<HTMLElement>(0.9);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Navbar />
      <main ref={skewRef} className="flex-1 skew-scroll">
        <HeroSection />

        {/* Capability ticker bridging the hero and the services grid. */}
        <div className="border-y border-border/60 bg-background/70 py-4">
          <Marquee items={CAPABILITIES} />
        </div>

        <ServicesSection />
        <PortalSection />
        <DigitalServicesSection />
        <AboutSection />

        {/* Featured Tools Section */}
        <section className="section bg-slate-50 py-16 relative overflow-hidden" id="featured-tools">
          <div className="container relative z-10">
            <div className="text-center mb-12">
              <Reveal>
                <Badge variant="outline" className="mb-4 text-accent border-accent">Interactive Tools</Badge>
              </Reveal>
              <Reveal delay={90}>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Explore Our Featured Tools</h2>
              </Reveal>
              <Reveal delay={180}>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Utilize our interactive business tools designed to help entrepreneurs make informed decisions
                  and get insights into our ongoing work.
                </p>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Reveal direction="left" className="h-full">
                <TiltCard intensity={5} className="h-full rounded-lg">
                  <Card className="group h-full flex flex-col lift shine border-border/60">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 transition-colors duration-300 group-hover:text-accent">
                        <MapPin className="h-5 w-5 text-accent icon-pop" />
                        US Business Formation Map
                      </CardTitle>
                      <CardDescription>
                        Interactive guide to business formation across different states
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p>
                        Compare formation requirements, fees, and strategic advantages for establishing your business
                        in popular states like Delaware, Nevada, Wyoming and more.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full group/btn">
                        <a href="/business-map" target="_blank" rel="noopener noreferrer">
                          <span className="flex items-center justify-center">
                            Explore Map
                            <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                          </span>
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </TiltCard>
              </Reveal>

              <Reveal direction="right" delay={120} className="h-full">
                <TiltCard intensity={5} className="h-full rounded-lg">
                  <Card className="group h-full flex flex-col lift shine border-border/60">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 transition-colors duration-300 group-hover:text-accent">
                        <ClipboardCheck className="h-5 w-5 text-accent icon-pop" />
                        What We're Working On
                      </CardTitle>
                      <CardDescription>
                        Live feed of our current projects and business formations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="bg-[#00000000] mr-[0px] ml-[0px] my-[1px] pr-[0px] pl-[0px] py-[11px] text-[16px] font-normal font-sans opacity-100 text-[#020817]" >
                        Get a real-time glimpse into the types of businesses we're helping to form and the projects
                        our consultants are currently handling.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full group/btn">
                        <a href="/work-feed" target="_blank" rel="noopener noreferrer">
                          <span className="flex items-center justify-center">
                            View Live Feed
                            <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                          </span>
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </TiltCard>
              </Reveal>
            </div>
          </div>

          <div aria-hidden="true" className="blob top-0 right-1/4 h-72 w-72 bg-indigo-600/10 animate-float-slow" />
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </section>


        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
