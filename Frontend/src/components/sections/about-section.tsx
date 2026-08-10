import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COMPANY, STATS } from "@/lib/constants";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic, TiltCard } from "@/components/motion/tilt-card";
import { CountUp } from "@/components/motion/count-up";
import { useParallax } from "@/hooks/use-motion";

const PILLARS = [
  {
    title: "Expert Team",
    body: "Our professionals have decades of combined experience in business formation, consulting and software delivery.",
  },
  {
    title: "Personalized Solutions",
    body: "We tailor every system we build to the specific needs, workflow and goals of your business.",
  },
  {
    title: "Client-Centered Approach",
    body: "Your success is our priority, and we provide ongoing support throughout your business journey.",
  },
];

const METRICS = [
  { value: COMPANY.foundingYear, label: "Founded", plain: true },
  { value: STATS.clientsServed, suffix: "+", label: "Clients served" },
  { value: STATS.countriesReached, suffix: "+", label: "Countries reached" },
];

export function AboutSection() {
  const { ref: imageRef, offset } = useParallax<HTMLDivElement>(0.05);

  return (
    <section className="section bg-background relative overflow-hidden" id="about">
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal direction="left" className="order-2 md:order-1">
            <TiltCard intensity={5} className="rounded-xl">
              <div
                ref={imageRef}
                className="rounded-xl overflow-hidden shadow-custom group relative transition-shadow duration-500 hover:shadow-hover"
                style={{ transform: `translateY(${offset}px)` }}
              >
                <img
                  src="/assets/images/business/about-us.jpg"
                  alt="About Haytrex"
                  className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </TiltCard>

            {/* Metrics strip beneath the photograph. */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {METRICS.map((metric, index) => (
                <Reveal
                  key={metric.label}
                  delay={150 + index * 120}
                  className="rounded-lg border border-border/60 bg-muted/30 px-3 py-4 text-center lift"
                >
                  <div className="text-xl md:text-2xl font-bold text-primary">
                    {metric.plain ? (
                      <span className="tabular">{metric.value}</span>
                    ) : (
                      <CountUp to={metric.value} suffix={metric.suffix} />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{metric.label}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <div className="order-1 md:order-2">
            <Reveal direction="right">
              <Badge variant="outline" className="mb-4 text-accent border-accent">
                Who We Are
              </Badge>
            </Reveal>

            <Reveal direction="right" delay={80}>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                About{" "}
                <span className="font-bold text-3xl text-gradient-animate">{COMPANY.name}</span>
              </h2>
            </Reveal>

            <Reveal direction="right" delay={160}>
              <p className="text-muted-foreground mb-4">
                {COMPANY.longDescription} Founded in{" "}
                <span className="font-semibold text-primary tabular">{COMPANY.foundingYear}</span>,{" "}
                {COMPANY.aboutMission}
              </p>
            </Reveal>

            <Reveal direction="right" delay={240}>
              <p className="text-muted-foreground mb-6">{COMPANY.aboutDetail}</p>
            </Reveal>

            <div className="space-y-4 mb-8">
              {PILLARS.map((pillar, index) => (
                <Reveal
                  key={pillar.title}
                  direction="right"
                  delay={320 + index * 110}
                  className="group flex items-start rounded-lg p-2 -mx-2 transition-colors duration-300 hover:bg-muted/50"
                >
                  <CheckCircle2 className="h-5 w-5 mr-2 text-accent shrink-0 mt-1 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12" />
                  <div>
                    <h3 className="font-medium text-lg transition-colors duration-300 group-hover:text-accent">
                      {pillar.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{pillar.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal direction="right" delay={680} className="flex flex-col sm:flex-row gap-4">
              <Magnetic>
                <Button
                  className="bg-accent hover:bg-accent-dark text-white hover-effect group shine shadow-lg shadow-accent/20"
                  onClick={() =>
                    (window.location.href = `https://calendly.com/haytrex-info/consultation-meeting`)
                  }
                >
                  <span className="relative z-10 flex items-center">
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-4 w-4 arrow-nudge" />
                  </span>
                </Button>
              </Magnetic>

              <Magnetic>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary-dark/10 hover-effect group"
                  onClick={() =>
                    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Our Services
                  <ArrowRight className="ml-2 h-4 w-4 arrow-nudge" />
                </Button>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="blob top-1/4 -right-32 h-80 w-80 bg-accent/10 animate-float-slow"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    </section>
  );
}
