import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export function HeroSection() {
  const scrollToConsultation = () => {
    const element = document.getElementById('consultation');
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background to-muted/30" id="hero">
      <div className="container grid md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 order-2 md:order-1">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              {COMPANY.tagline}
            </h1>
            <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl">
              {COMPANY.shortDescription} We are your dedicated partner for establishing and growing a thriving business in the USA, 
              providing essential services for both domestic and international entrepreneurs.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 min-w-[200px]">
            <Button 
              size="lg" 
              onClick={scrollToConsultation} 
              className="text-md bg-accent hover:bg-accent-dark text-white hover-effect"
            >
              Get Started Today!
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-primary text-primary hover:bg-primary-dark/10 hover-effect"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="w-full max-w-md rounded-xl shadow-custom overflow-hidden hover-scale">
            <img
              src="/assets/images/business/hero-bg.jpg"
              alt="Business professionals in a meeting"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    </section>
  );
}