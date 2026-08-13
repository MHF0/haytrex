import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, UserPlus, MessagesSquare, CreditCard, ChevronRight } from "lucide-react";
import { COMPANY, PORTAL } from "@/lib/constants";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic, TiltCard } from "@/components/motion/tilt-card";
import { PortalMock } from "@/components/sections/portal-mock";

const CAPABILITIES = [
  {
    title: "Live Project Tracking",
    body: "Real-time dashboards for every project. Track milestones, deadlines, task progress, and team workload at a glance.",
    icon: Activity,
  },
  {
    title: "Team Onboarding",
    body: "Streamlined onboarding flows for new team members — checklists, role assignments, document signing, and access provisioning.",
    icon: UserPlus,
  },
  {
    title: "Communication Portal",
    body: "Built-in team messaging, threaded conversations, file sharing, and instant notifications — no third-party chat tools needed.",
    icon: MessagesSquare,
  },
  {
    title: "Finance Portal",
    body: "Send payment links, manage invoices, track expenses, view financial summaries, and get paid faster — all in one place.",
    icon: CreditCard,
  },
];

export function PortalSection() {
  return (
    <section className="section bg-background relative overflow-hidden" id="portal">
      <div className="container relative z-10">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <Reveal>
            <Badge variant="outline" className="mb-4 text-accent border-accent tracking-[0.14em] text-[11px]">
              PORTAL MANAGEMENT
            </Badge>
          </Reveal>

          <Reveal delay={90}>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Your Business.
              <span className="block text-gradient-animate">{PORTAL.tagline}</span>
            </h2>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-4 text-lg text-muted-foreground">
              We build custom work management portals for your business — giving your team live
              tracking, seamless communication, and complete financial oversight from a single
              platform.
            </p>
          </Reveal>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="space-y-2">
              {CAPABILITIES.map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <Reveal
                    key={capability.title}
                    direction="left"
                    delay={index * 110}
                    className="group flex items-start gap-4 rounded-xl p-3 -mx-3 transition-colors duration-300 hover:bg-muted/50"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      {/* Explicit size: the global h3 rule is display-scale. */}
                      <h3 className="text-base font-semibold text-primary transition-colors duration-300 group-hover:text-accent">
                        {capability.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{capability.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal direction="left" delay={480} className="mt-8">
              <Magnetic>
                <Button
                  size="lg"
                  className="group shine bg-accent text-white shadow-lg shadow-accent/20 hover:bg-accent-dark hover-effect"
                  onClick={() =>
                    (window.location.href = COMPANY.calendly)
                  }
                >
                  <span className="relative z-10 flex items-center">
                    Request a Portal Demo
                    <ChevronRight className="ml-1.5 h-4 w-4 arrow-nudge" />
                  </span>
                </Button>
              </Magnetic>
            </Reveal>
          </div>

          <Reveal direction="right" delay={140}>
            <TiltCard intensity={4} spotlight={false} className="rounded-xl">
              <PortalMock />
            </TiltCard>
          </Reveal>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="blob -right-32 top-1/3 h-96 w-96 bg-indigo-600/10 animate-float-slow"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    </section>
  );
}
