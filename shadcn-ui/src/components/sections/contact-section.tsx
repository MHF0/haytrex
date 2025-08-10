import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { COMPANY } from "@/lib/constants";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a backend
    alert("Message sent successfully! We'll get back to you soon.");
  };

  return (
    <section className="section bg-background relative" id="contact">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 text-accent border-accent">Contact Us</Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-4">Get In Touch With <span className="text-primary">{COMPANY.name}</span></h2>
          <p className="text-muted-foreground">
            Have questions or ready to take the next step? Reach out to our team for prompt assistance with your business needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border border-border/40 shadow-sm hover:shadow-hover transition-all duration-300 bg-background/60 backdrop-blur-sm overflow-hidden">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Our Office</h3>
                      <p className="text-sm text-muted-foreground">{COMPANY.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <a 
                        href={`mailto:${COMPANY.email}`}
                        className="text-sm text-primary hover:text-accent transition-colors"
                      >
                        {COMPANY.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4 text-primary">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <a 
                        href={`tel:${COMPANY.phone}`}
                        className="text-sm text-primary hover:text-accent transition-colors"
                      >
                        {COMPANY.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="rounded-xl overflow-hidden shadow-custom hover-scale">
              <img 
                src="/assets/images/business/contact.jpg" 
                alt="Contact us" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Business Hours:</strong><br />
                Monday - Friday: 9:00 AM - 5:00 PM<br />
                Saturday - Sunday: Closed
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <Card className="lg:col-span-2 border border-border/40 shadow-md bg-background/95 backdrop-blur-sm">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input id="phone" placeholder="(555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help you?" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea id="message" placeholder="Please describe how we can assist you..." required className="min-h-[150px]" />
                </div>
                
                <Button type="submit" className="w-full bg-accent hover:bg-accent-dark text-white">
                  Send Message
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to our <a href="#" className="underline hover:text-accent">Privacy Policy</a>.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    </section>
  );
}