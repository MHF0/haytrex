import { Card, CardContent } from "@/components/ui/card";

export function VideoSection() {
  return (
    <section id="video" className="py-16 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">See How We Help</h2>
              <p className="text-muted-foreground text-lg">
                Watch our overview of how Haytrex can assist with your business needs. Our comprehensive services are designed to support entrepreneurs at every stage of their journey.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">What You'll Learn:</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>How we simplify business formation in the USA</li>
                <li>Our approach to growth strategies and digital presence</li>
                <li>Special support for international entrepreneurs</li>
                <li>Why entrepreneurs choose Haytrex as their partner</li>
              </ul>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0 aspect-video">
                <iframe 
                  src="https://www.veed.io/embed/da2a9cec-f7cf-439a-9d42-07da76f80463?panel=share" 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  title="Haytrex Business Services"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="aspect-video"
                ></iframe>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}