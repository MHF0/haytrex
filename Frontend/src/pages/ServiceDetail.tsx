import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { getServiceById } from "@/data/services";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

// ArrowLeftIcon component
const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const service = getServiceById(serviceId || "");

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // If service not found, redirect to home
    if (!serviceId || !service) {
      navigate("/services");
    }
  }, [serviceId, service, navigate]);

  if (!service) {
    return null; // Will redirect via the useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Header */}
      <div className="bg-muted/50 py-8">
        <div className="container">
          <div className="flex flex-col gap-4">
            <Link
              to="/services"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors w-fit"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
            <h1 className="text-4xl font-bold">{service.title}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {service.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <div className="space-y-16">
          {service.features.map((feature, index) => (
            <div key={index} className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-2">
                <div className="sticky top-8">
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {service.icon}
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{feature.title}</h2>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
              <div className="md:col-span-3">
                <div className="bg-card rounded-lg border p-6">
                  <h3 className="text-lg font-medium mb-4">What we provide:</h3>
                  <ul className="space-y-3">
                    {feature.details?.map((detail, idx) => (
                      <li key={idx} className="flex gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0"></div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to get started?</h2>
          <Button
            size="lg"
            onClick={() =>
              (window.location.href = `https://calendly.com/haytrex-info/consultation-meeting`)
            }
          >
            Schedule a Consultation
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
