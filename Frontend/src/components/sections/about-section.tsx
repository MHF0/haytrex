import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";
import { CheckCircle2 } from "lucide-react";

export function AboutSection() {
  return (
    <section className="section bg-background relative" id="about">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 rounded-xl overflow-hidden shadow-custom hover-scale">
            <img
              src="/assets/images/business/about-us.jpg"
              alt="About Haytrex"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <Badge variant="outline" className="mb-4 text-accent border-accent">
              Who We Are
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              About{" "}
              <span className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {COMPANY.name}
              </span>
            </h2>

            <p className="text-muted-foreground mb-6">
              {COMPANY.longDescription} Founded in {COMPANY.foundingYear}, we
              have helped hundreds of entrepreneurs navigate the complexities of
              establishing and growing their businesses in the United States.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 mr-2 text-accent shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-lg">Expert Team</h3>
                  <p className="text-muted-foreground text-sm">
                    Our professionals have decades of combined experience in
                    business formation and consulting.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 mr-2 text-accent shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-lg">
                    Personalized Solutions
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    We tailor our services to meet the specific needs and goals
                    of your business.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 mr-2 text-accent shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-lg">
                    Client-Centered Approach
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Your success is our priority, and we provide ongoing support
                    throughout your business journey.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-accent hover:bg-accent-dark text-white hover-effect"
                onClick={() =>
                  (window.location.href = `https://calendly.com/haytrex-info/consultation-meeting`)
                }
              >
                Schedule a Consultation
              </Button>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary-dark/10 hover-effect"
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Our Services
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    </section>
  );
}
