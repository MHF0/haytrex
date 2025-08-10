import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, Calendar, Clock, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

export function ConsultationSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, we'd send this data to a server
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };
  
  const consultationTimes = [
    { id: "morning", label: "Morning", time: "9:00 - 11:00 AM", icon: <Clock className="h-4 w-4" /> },
    { id: "afternoon", label: "Afternoon", time: "1:00 - 3:00 PM", icon: <Clock className="h-4 w-4" /> },
    { id: "evening", label: "Evening", time: "5:00 - 7:00 PM", icon: <Clock className="h-4 w-4" /> }
  ];
  
  return (
    <section className="section bg-muted/30" id="consultation">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-4 text-accent border-accent">Free Consultation</Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Schedule Your <span className="text-primary">Free Consultation</span></h2>
            
            <p className="text-muted-foreground mb-6">
              Take the first step towards establishing or growing your business. Our 30-minute consultation is completely free, with no obligations.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-accent/10 p-2 rounded-full mr-4 text-accent">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Expert Guidance</h3>
                  <p className="text-muted-foreground">Get personalized advice from our business specialists.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-accent/10 p-2 rounded-full mr-4 text-accent">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Flexible Scheduling</h3>
                  <p className="text-muted-foreground">Choose a time that works best for your schedule.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-accent/10 p-2 rounded-full mr-4 text-accent">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">No Obligation</h3>
                  <p className="text-muted-foreground">Free 30-minute session without any commitment required.</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-custom hover-scale">
              <img 
                src="/assets/images/business/consultation.jpg" 
                alt="Business consultation" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          <Card className="border border-border/40 shadow-md bg-background/95 backdrop-blur-sm">
            <CardContent className="pt-6">
              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">Thank You!</h3>
                  <p className="text-muted-foreground">
                    We've received your consultation request. A member of our team will contact you shortly to confirm your appointment.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-bold text-center mb-6">Book Your Free Consultation</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="(555) 123-4567" required />
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Preferred Consultation Time</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {consultationTimes.map((time) => (
                        <div
                          key={time.id}
                          className={cn(
                            "flex flex-col items-center p-3 border rounded-lg cursor-pointer hover:border-accent transition-all",
                            selectedTime === time.id ? "border-accent bg-accent/5" : "border-border"
                          )}
                          onClick={() => setSelectedTime(time.id)}
                        >
                          <RadioGroup value={selectedTime || ""} className="hidden">
                            <RadioGroupItem value={time.id} id={time.id} />
                          </RadioGroup>
                          <span className="text-sm font-medium">{time.label}</span>
                          <div className="flex items-center text-muted-foreground text-xs mt-1">
                            {time.icon}
                            <span className="ml-1">{time.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Information (Optional)</Label>
                    <Textarea id="message" placeholder="Tell us about your business needs..." />
                  </div>
                  
                  <Button type="submit" className="w-full bg-accent hover:bg-accent-dark text-white">
                    Book Consultation
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}