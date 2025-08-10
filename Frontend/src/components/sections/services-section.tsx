import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ArrowRight,
  Building2,
  LineChart,
  FileText,
  Plane,
} from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  serviceId: string;
}

const ServiceCard = ({
  title,
  description,
  icon,
  serviceId,
}: ServiceCardProps) => (
  <Card className="border border-border/40 shadow-sm hover:shadow-hover transition-all duration-300 bg-background/60 backdrop-blur-sm h-full flex flex-col">
    <CardHeader className="space-y-1">
      <div className="bg-primary/10 p-3 w-12 h-12 flex items-center justify-center rounded-lg mb-2 text-primary">
        {icon}
      </div>
      <CardTitle className="text-xl font-bold text-primary hover:text-accent transition-colors">
        <Link to={`/service/${serviceId}`}>{title}</Link>
      </CardTitle>
      <CardDescription className="text-muted-foreground font-normal">
        {description}
      </CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <ul className="space-y-2 text-sm">
        {serviceFeatures[serviceId].map((feature, index) => (
          <li key={index} className="flex items-start">
            <ArrowRight className="h-4 w-4 mr-2 text-accent shrink-0 mt-1" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Link to={`/service/${serviceId}`}>
        <Button
          variant="outline"
          className="w-full border-primary text-primary hover:bg-primary-dark/10 group"
        >
          Learn More
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </CardFooter>
  </Card>
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
  immigration_services: [
    "Business visa applications",
    "Investor visa guidance (E-2, EB-5)",
    "Immigration planning for entrepreneurs",
    "Compliance with US immigration laws",
  ],
  business_plan: [
    "Market research & analysis",
    "Financial projections",
    "Executive summaries",
    "Investor presentation decks",
  ],
};

export function ServicesSection() {
  return (
    <section className="section bg-muted/30" id="services">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Our Comprehensive{" "}
              <span className="text-primary">Business Services</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              We provide end-to-end business solutions to help entrepreneurs
              establish, optimize, and grow their ventures in the United States
              market.
            </p>
            <Button
              className="bg-accent hover:bg-accent-dark text-white hover-effect"
              onClick={() =>
                (window.location.href = `https://calendly.com/haytrex-info/consultation-meeting`)
              }
            >
              Schedule a Consultation
            </Button>
          </div>
          <div className="rounded-xl overflow-hidden shadow-custom hover-scale">
            <img
              src="/assets/images/business/services.jpg"
              alt="Professional business services"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard
            title="Business Formation"
            description="Establish your business entity with proper legal structure and compliance."
            icon={<Building2 className="h-6 w-6" />}
            serviceId="business_formation"
          />

          <ServiceCard
            title="Business Consulting"
            description="Strategic advice and solutions for business growth and optimization."
            icon={<LineChart className="h-6 w-6" />}
            serviceId="business_consulting"
          />

          <ServiceCard
            title="Immigration Services"
            description="Expert guidance for business visas and immigration planning for entrepreneurs."
            icon={<Plane className="h-6 w-6" />}
            serviceId="immigration_services"
          />

          <ServiceCard
            title="Business Plan Development"
            description="Professional business plans for funding and strategic direction."
            icon={<FileText className="h-6 w-6" />}
            serviceId="business_plan"
          />
        </div>
      </div>
    </section>
  );
}
