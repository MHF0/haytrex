import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowRight, Building2, LineChart, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Curtain, Reveal } from "@/components/motion/reveal";
import { Magnetic, TiltCard } from "@/components/motion/tilt-card";
import { useParallax } from "@/hooks/use-motion";
import { COMPANY } from "@/lib/constants";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  serviceId: string;
  /** Stagger offset in milliseconds so the grid arrives card by card. */
  delay?: number;
}

const ServiceCard = ({
  title,
  description,
  icon,
  serviceId,
  delay = 0,
}: ServiceCardProps) => (
  <Reveal delay={delay} className="h-full">
    <TiltCard intensity={6} className="h-full rounded-lg">
      <Card className="group card-fill border border-border/40 shadow-sm bg-background/60 backdrop-blur-sm h-full flex flex-col lift">
        <CardHeader className="space-y-1">
          <div className="fill-icon bg-primary/10 p-3 w-12 h-12 flex items-center justify-center rounded-lg mb-2 text-primary icon-pop">
            {icon}
          </div>
          <CardTitle className="fill-title text-xl font-bold text-primary">
            <Link to={`/service/${serviceId}`}>{title}</Link>
          </CardTitle>
          <CardDescription className="fill-body text-muted-foreground font-normal">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-2 text-sm">
            {serviceFeatures[serviceId].map((feature, index) => (
              <li key={index} className="fill-body flex items-start">
                <ArrowRight className="h-4 w-4 mr-2 shrink-0 mt-1 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-white" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Link to={`/service/${serviceId}`} className="w-full">
            <Button
              variant="outline"
              className="fill-link fill-rule w-full border-primary text-primary group/btn group-hover:bg-white/10 group-hover:border-white/40 group-hover:text-white group-hover:hover:bg-white/20"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </TiltCard>
  </Reveal>
);

const serviceFeatures = {
  business_formation: [
    "LLC, Corporation, & Partnership formation",
    "State filings and compliance",
    "EIN application assistance",
    "Operating agreements & corporate bylaws",
  ],
  business_consulting: [
    "Business strategy development",
    "Process optimization",
    "Market entry strategies",
    "Growth planning and scaling",
  ],
  business_plan: [
    "Market research & analysis",
    "Financial projections",
    "Executive summaries",
    "Investor presentation decks",
  ],
};

export function ServicesSection() {
  const { ref: imageRef, offset } = useParallax<HTMLDivElement>(0.05);

  return (
    <section className="section bg-muted/30 relative overflow-hidden" id="services">
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <Reveal direction="left">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Our Comprehensive{" "}
                <span className="text-primary">Business Services</span>
              </h2>
            </Reveal>
            <Reveal direction="left" delay={100}>
              <p className="text-muted-foreground text-lg mb-6">
                We provide end-to-end business solutions to help entrepreneurs
                establish, optimize, and grow their ventures in the United States
                market.
              </p>
            </Reveal>
            <Reveal direction="left" delay={200}>
              <Magnetic>
                <Button
                  className="bg-accent hover:bg-accent-dark text-white hover-effect group shine shadow-lg shadow-accent/20"
                  onClick={() =>
                    (window.location.href = COMPANY.calendly)
                  }
                >
                  <span className="relative z-10 flex items-center">
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-4 w-4 arrow-nudge" />
                  </span>
                </Button>
              </Magnetic>
            </Reveal>
          </div>

          <Curtain delay={120} className="rounded-xl">
            <TiltCard intensity={5} className="rounded-xl">
              <div
                ref={imageRef}
                className="rounded-xl overflow-hidden shadow-custom group relative transition-shadow duration-500 hover:shadow-hover"
                style={{ transform: `translateY(${offset}px)` }}
              >
                <img
                  src="/assets/images/business/services.jpg"
                  alt="Professional business services"
                  className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </TiltCard>
          </Curtain>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            title="Business Formation"
            description="Establish your business entity with proper legal structure and compliance."
            icon={<Building2 className="h-6 w-6" />}
            serviceId="business_formation"
            delay={0}
          />

          <ServiceCard
            title="Business Consulting"
            description="Strategic advice and solutions for business growth and optimization."
            icon={<LineChart className="h-6 w-6" />}
            serviceId="business_consulting"
            delay={110}
          />

          <ServiceCard
            title="Business Plan Development"
            description="Professional business plans for funding and strategic direction."
            icon={<FileText className="h-6 w-6" />}
            serviceId="business_plan"
            delay={220}
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="blob top-10 -left-32 h-80 w-80 bg-accent/10 animate-float-slow"
      />
    </section>
  );
}
