import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { digitalServices, type DigitalService } from "@/data/digital-services";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic, TiltCard } from "@/components/motion/tilt-card";

/** The card a visitor sees on the main page, before opening the detail popup. */
function ServiceCard({
  service,
  index,
  onOpen,
}: {
  service: DigitalService;
  index: number;
  onOpen: () => void;
}) {
  const Icon = service.icon;

  return (
    <Reveal direction={index === 0 ? "left" : "right"} delay={index * 140} className="h-full">
      <TiltCard intensity={6} className="h-full rounded-xl">
        <button
          type="button"
          onClick={onOpen}
          aria-label={`${service.title} — ${service.cta}`}
          className="group relative h-full w-full text-left rounded-xl border border-border/60 bg-background/70 backdrop-blur-sm p-7 lift shine glow-border flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="bg-primary/10 text-primary p-3 w-14 h-14 flex items-center justify-center rounded-xl icon-pop">
                <Icon className="h-7 w-7" />
              </div>

              {service.price ? (
                <Badge className="bg-accent/10 text-accent border border-accent/30 hover:bg-accent/15 font-semibold px-3 py-1.5 whitespace-nowrap animate-glow-pulse">
                  {service.price}
                </Badge>
              ) : null}
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-primary mb-2 transition-colors duration-300 group-hover:text-accent">
              {service.title}
            </h3>

            <p className="text-accent font-medium mb-4">{service.tagline}</p>

            <p className="text-muted-foreground flex-grow mb-6">{service.summary}</p>

            {/* Preview of what is inside the popup. */}
            <div className="flex flex-wrap gap-2 mb-6">
              {service.features.slice(0, 3).map((feature) => (
                <span
                  key={feature.title}
                  className="text-xs rounded-full border border-border/70 bg-muted/50 px-2.5 py-1 text-muted-foreground transition-colors duration-300 group-hover:border-accent/40 group-hover:text-primary"
                >
                  {feature.title}
                </span>
              ))}
              <span className="text-xs rounded-full border border-accent/30 bg-accent/5 px-2.5 py-1 text-accent font-medium">
                +{service.features.length - 3} more
              </span>
            </div>

            <span className="inline-flex items-center font-semibold text-primary transition-colors duration-300 group-hover:text-accent link-sweep w-fit">
              {service.cta}
              <ArrowRight className="ml-2 h-4 w-4 arrow-nudge" />
            </span>
          </div>
        </button>
      </TiltCard>
    </Reveal>
  );
}

/** The detailed popup page, opened from a card. */
function ServiceDialog({
  service,
  open,
  onOpenChange,
}: {
  service: DigitalService | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!service) return null;
  const Icon = service.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[88vh] overflow-y-auto p-0 gap-0">
        {/* Popup header, echoing the card that opened it. */}
        <div className="relative overflow-hidden bg-muted/40 border-b px-7 py-8 md:px-10 md:py-10">
          <div
            aria-hidden="true"
            className="blob -top-20 -right-10 h-64 w-64 bg-accent/20 animate-float-slow"
          />
          <DialogHeader className="relative z-10 space-y-4 text-left">
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-primary/10 text-primary p-2.5 w-12 h-12 flex items-center justify-center rounded-xl animate-zoom-in-soft">
                <Icon className="h-6 w-6" />
              </div>
              {service.price ? (
                <Badge className="bg-accent/10 text-accent border border-accent/30 hover:bg-accent/15 font-semibold px-3 py-1.5">
                  {service.price}
                </Badge>
              ) : null}
            </div>

            <DialogTitle className="text-2xl md:text-3xl font-bold tracking-tight pr-8 animate-fade-up">
              {service.detailHeadline}
            </DialogTitle>

            <DialogDescription
              className="text-base text-muted-foreground leading-relaxed animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              {service.detailIntro}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Feature list, arriving one row at a time. */}
        <div className="px-7 py-8 md:px-10">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-4 w-4 text-accent animate-bounce-subtle" />
            <h4 className="font-bold text-lg text-primary">{service.featuresLabel}:</h4>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {service.features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group rounded-lg border border-border/60 bg-card p-5 lift animate-fade-up"
                  style={{ animationDelay: `${180 + index * 70}ms` }}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="bg-accent/10 text-accent p-2 rounded-lg shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <FeatureIcon className="h-5 w-5" />
                    </div>
                    <h5 className="font-semibold text-primary leading-snug pt-1.5 transition-colors duration-300 group-hover:text-accent">
                      {feature.title}
                    </h5>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Closing call to action. */}
          <div
            className="mt-8 rounded-xl border border-accent/25 bg-accent/5 p-6 text-center animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            <h4 className="text-lg font-bold text-primary mb-2">
              Ready to build this for your business?
            </h4>
            <p className="text-sm text-muted-foreground mb-5 max-w-xl mx-auto">
              Book a free consultation and we will map out exactly how this would work for your
              team, your workflow, and your budget.
            </p>
            <Magnetic>
              <Button
                size="lg"
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DigitalServicesSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = digitalServices.find((service) => service.id === activeId) ?? null;

  return (
    <section className="section bg-background relative overflow-hidden" id="digital-services">
      <div className="container relative z-10">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <Reveal>
            <Badge variant="outline" className="mb-4 text-accent border-accent">
              Digital Solutions
            </Badge>
          </Reveal>

          <Reveal delay={90}>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Software That Runs{" "}
              <span className="text-gradient-animate">Your Whole Operation</span>
            </h2>
          </Reveal>

          <Reveal delay={180}>
            <p className="text-muted-foreground text-lg">
              Replace messy paperwork and disconnected apps with systems built around the way you
              actually work. Select a solution to see everything it includes.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {digitalServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onOpen={() => setActiveId(service.id)}
            />
          ))}
        </div>

        {/* Reassurance strip under the two cards. */}
        <Reveal delay={200} className="mt-10">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              "No high monthly software fees",
              "Built around your workflow",
              "Scales as you grow",
            ].map((point, index) => (
              <span
                key={point}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground animate-fade-in"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <Check className="h-4 w-4 text-accent shrink-0" />
                {point}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <ServiceDialog
        service={active}
        open={active !== null}
        onOpenChange={(open) => !open && setActiveId(null)}
      />

      <div
        aria-hidden="true"
        className="blob -bottom-24 -left-24 h-96 w-96 bg-blue-600/10 animate-float-slow"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    </section>
  );
}
