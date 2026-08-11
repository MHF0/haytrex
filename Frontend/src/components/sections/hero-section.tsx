import { Button } from "@/components/ui/button";
import { COMPANY, STATS } from "@/lib/constants";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal, SplitHeading } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/tilt-card";
import { Odometer, ScrambleText } from "@/components/motion/interactions";
import { ParticleField } from "@/components/motion/particle-field";
import { useParallax } from "@/hooks/use-motion";

const HERO_STATS = [
  { value: STATS.clientsServed, suffix: "+", label: "Businesses launched" },
  { value: COMPANY.foundingYear, suffix: "", label: "Serving clients since", plain: true },
  { value: 24, suffix: "/7", label: "Portal access" },
];

export function HeroSection() {
  const navigation = useNavigate();
  const { ref: imageRef, offset } = useParallax<HTMLDivElement>(0.06);

  const scrollToConsultation = () => {
    navigation("/about");
  };

  return (
    <section
      className="relative py-20 md:py-32 overflow-hidden bg-[#F7FBFF] mt-[0px] mr-[0px] mb-[0px] ml-[0px] pt-[128px] pr-[0px] pb-[128px] pl-[0px] text-[16px] font-normal font-sans opacity-100 text-[#020817]"
      id="hero"
    >
      <div className="container grid md:grid-cols-2 gap-8 items-center relative z-10">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 order-2 md:order-1">
          <div className="space-y-5 max-w-2xl">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent animate-fade-in"
              style={{ animationDelay: "120ms" }}
            >
              <Sparkles className="h-3.5 w-3.5 animate-bounce-subtle" />
              <ScrambleText text="Business foundations and custom software" delay={500} />
            </div>

            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              <SplitHeading text="Your Strategic Partner in" baseDelay={150} className="block" />
              {/* One element, not split: a clipped gradient cannot paint across
                  child spans that each create their own stacking context. */}
              <span
                className="block text-gradient-animate animate-blur-in"
                style={{ animationDelay: "480ms" }}
              >
                Business Growth and Digital Transformation
              </span>
            </h1>

            <p
              className="max-w-[700px] text-muted-foreground text-lg md:text-xl animate-blur-in"
              style={{ animationDelay: "900ms" }}
            >
              {COMPANY.shortDescription}
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 min-w-[200px] animate-fade-up"
            style={{ animationDelay: "1050ms" }}
          >
            <Magnetic>
              <Button
                size="lg"
                onClick={scrollToConsultation}
                className="text-md bg-accent hover:bg-accent-dark text-white hover-effect group shine relative shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
              >
                <span className="relative z-10 flex items-center">
                  Get Started Today!
                  <ArrowRight className="ml-2 h-4 w-4 arrow-nudge" />
                </span>
              </Button>
            </Magnetic>

            <Magnetic>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
                }
                className="border-primary text-primary hover:bg-primary-dark/10 hover-effect group"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 arrow-nudge" />
              </Button>
            </Magnetic>
          </div>

          {/* Quick proof points, counting up as the hero settles. */}
          <Reveal
            delay={1200}
            className="grid grid-cols-3 gap-6 pt-4 w-full max-w-md border-t border-border/60"
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="pt-4 text-center md:text-left">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  <Odometer value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <div
            ref={imageRef}
            className="relative w-full max-w-lg animate-zoom-in-soft"
            style={{ animationDelay: "300ms" }}
          >
            {/* Halo behind the photograph. */}
            <div
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-blue-600/20 via-accent/10 to-indigo-600/20 blur-2xl animate-glow-pulse"
              aria-hidden="true"
            />

            <div
              className="rounded-xl shadow-custom overflow-hidden group relative transition-transform duration-700 ease-out hover:scale-[1.03]"
              style={{ transform: `translateY(${offset}px)` }}
            >
              <img
                src="/assets/images/business/hero-bg.jpg"
                alt="Business professionals in a meeting"
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Floating cards that lift the photograph off the page. */}
            <div
              className="absolute -bottom-5 -left-4 hidden sm:flex items-center gap-3 rounded-xl border border-border/60 bg-background/90 backdrop-blur px-4 py-3 shadow-custom animate-float"
              style={{ animationDelay: "400ms" }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent animate-pulse-ring" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-primary">Portals live</p>
                <p className="text-xs text-muted-foreground">Running your operations</p>
              </div>
            </div>

            <div
              className="absolute -top-5 -right-4 hidden sm:block rounded-xl border border-border/60 bg-background/90 backdrop-blur px-4 py-3 shadow-custom animate-float"
              style={{ animationDelay: "1.6s" }}
            >
              <p className="text-xs text-muted-foreground">Portals from</p>
              <p className="text-lg font-bold text-primary">
                <Odometer value={99} prefix="$" />
                <span className="text-xs font-normal text-muted-foreground">/mo</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative layers: the original dotted grid, plus drifting light,
          a node field and the slow blobs. */}
      <ParticleField className="z-0" opacity={0.55} aurora />
      <div
        aria-hidden="true"
        className="blob -top-24 -left-24 h-96 w-96 bg-blue-600/20 animate-float-slow"
      />
      <div
        aria-hidden="true"
        className="blob bottom-0 right-0 h-[26rem] w-[26rem] bg-indigo-600/15 animate-float-slow"
        style={{ animationDelay: "4s" }}
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    </section>
  );
}
