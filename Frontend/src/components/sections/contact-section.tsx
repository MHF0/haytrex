import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { COMPANY } from "@/lib/constants";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface ContactSectionProps {
  initialContactType?: string | null;
}

/** Readable labels for the field names, used to lay out the email body. */
const FIELD_LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  subject: "Subject",
  company: "Company",
  service: "Service interested in",
  callTime: "Best time to call",
  message: "Message",
};

export function ContactSection({ initialContactType = null }: ContactSectionProps) {
  // Language selection state
  const [language, setLanguage] = React.useState('english');

  /**
   * There is no backend to post to, so a submission is composed into an email
   * addressed to the company and handed to the visitor's mail client. Nothing
   * is claimed to have been sent that has not been.
   */
  const sendByEmail = (subject: string) => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const lines = Array.from(data.entries())
      .filter(([, value]) => String(value).trim() !== "")
      .map(([field, value]) => `${FIELD_LABELS[field] ?? field}: ${value}`);

    lines.push(`Preferred language: ${language}`);

    window.location.href =
      `mailto:${COMPANY.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  // Handle form type based on initialContactType
  const [formType, setFormType] = React.useState<'general' | 'consultation' | 'callback'>('general');

  React.useEffect(() => {
    if (initialContactType === 'consultation') {
      setFormType('consultation');
    } else if (initialContactType === 'callback') {
      setFormType('callback');
    }
  }, [initialContactType]);

  return (
    <section className="section section relative bg-[#FFFFFF] mt-[0px] mr-[0px] mb-[0px] ml-[0px] pt-[96px] pr-[0px] pb-[96px] pl-[0px] text-[16px] font-normal font-sans opacity-100 text-[#020817]" id="contact">
      <div className="container bg-[#00000000] mt-[0px] mr-[0px] mb-[0px] ml-[0px] pt-[0px] pr-[32px] pb-[0px] pl-[32px] text-[16px] font-normal font-sans opacity-100 text-[#020817]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 text-accent border-accent">Contact Us</Badge>
          <h2 className="tracking-tight bg-[#00000000] mt-[0px] mr-[0px] mb-[16px] ml-[0px] pt-[0px] pr-[0px] pb-[0px] pl-[0px] text-[30px] font-bold text-center font-sans opacity-100 text-[#020817]">Get In Touch With <span className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{COMPANY.name}</span></h2>
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
                      <h3 className="bg-[#00000000] mt-[0px] mr-[0px] mb-[0px] ml-[0px] pt-[0px] pr-[0px] pb-[0px] pl-[0px] text-2xl font-medium font-serif opacity-100 text-[#020817]">Our Office</h3>
                      <p className="text-sm text-muted-foreground">{COMPANY.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="bg-[#00000000] mt-[0px] mr-[0px] mb-[0px] ml-[0px] pt-[0px] pr-[0px] pb-[0px] pl-[0px] text-2xl font-medium font-serif opacity-100 text-[#020817]">Email</h3>
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
                      <h3 className="bg-[#00000000] mt-[0px] mr-[0px] mb-[0px] ml-[0px] pt-[0px] pr-[0px] pb-[0px] pl-[0px] text-2xl font-medium font-serif opacity-100 text-[#020817]">Phone</h3>
                      <a 
                        href={`tel:${COMPANY.phone}`}
                        className="hover:text-accent transition-colors bg-[#00000000] mt-[0px] mr-[0px] mb-[0px] ml-[0px] pt-[0px] pr-[0px] pb-[0px] pl-[0px] text-[14px] font-normal font-sans opacity-100 text-[#0A75C2]"
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
              {/* Form Type Selector */}
              <div className="mb-6 flex flex-wrap gap-2">
                <Button 
                  onClick={() => setFormType('general')}
                  variant={formType === 'general' ? 'default' : 'outline'}
                >
                  General Inquiry
                </Button>
                <Button 
                  onClick={() => setFormType('consultation')}
                  variant={formType === 'consultation' ? 'default' : 'outline'}
                >
                  Consultation Booking
                </Button>
                <Button 
                  onClick={() => setFormType('callback')}
                  variant={formType === 'callback' ? 'default' : 'outline'}
                >
                  Request Callback
                </Button>
              </div>
              
              {/* General Form */}
              {formType === 'general' && (
                <form onSubmit={sendByEmail("General enquiry from haytrex.com")} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input id="phone" name="phone" placeholder="(555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" name="subject" placeholder="How can we help you?" required />
                    </div>
                  </div>
                  
                  {/* Language Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="language" className="flex items-center gap-2">
                      <Globe className="h-4 w-4" /> Preferred Language
                    </Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select preferred language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish (Español)</SelectItem>
                          <SelectItem value="arabic">Arabic (العربية)</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea id="message" name="message" placeholder="Please describe how we can assist you..." required className="min-h-[150px]" />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    This opens your email app with the details filled in, addressed to {COMPANY.email}. By sending it you agree to our <a href="#" className="underline hover:text-accent">Privacy Policy</a>.
                  </p>
                </form>
              )}

              {/* Consultation Form */}
              {formType === 'consultation' && (
                <form onSubmit={sendByEmail("Consultation request from haytrex.com")} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="consult-name">Full Name</Label>
                      <Input id="consult-name" name="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="consult-email">Email</Label>
                      <Input id="consult-email" name="email" type="email" placeholder="john@example.com" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="consult-phone">Phone Number</Label>
                      <Input id="consult-phone" name="phone" placeholder="(555) 123-4567" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="consult-company">Company (Optional)</Label>
                      <Input id="consult-company" name="company" placeholder="Your Company" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="consult-service">Service Interested In</Label>
                      <Input id="consult-service" name="service" placeholder="Business Formation, Strategic Planning, etc." required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" /> Preferred Language
                      </Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select preferred language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish (Español)</SelectItem>
                            <SelectItem value="arabic">Arabic (العربية)</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="consult-details">Additional Details</Label>
                    <Textarea id="consult-details" name="message" placeholder="Please provide any specific questions or information about your business needs..." className="min-h-[150px]" />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Schedule Consultation
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    This opens your email app with the details filled in, addressed to {COMPANY.email}. By sending it you agree to our <a href="#" className="underline hover:text-accent">Privacy Policy</a>.
                  </p>
                </form>
              )}

              {/* Callback Form */}
              {formType === 'callback' && (
                <form onSubmit={sendByEmail("Callback request from haytrex.com")} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="callback-name">Full Name</Label>
                      <Input id="callback-name" name="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="callback-phone">Phone Number</Label>
                      <Input id="callback-phone" name="phone" placeholder="(555) 123-4567" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="callback-time">Best Time to Call</Label>
                      <Input id="callback-time" name="callTime" placeholder="e.g., Weekdays 2-5pm EST" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" /> Preferred Language
                      </Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select preferred language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish (Español)</SelectItem>
                            <SelectItem value="arabic">Arabic (العربية)</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="callback-reason">Reason for Callback</Label>
                    <Textarea id="callback-reason" name="message" placeholder="Please briefly describe what you'd like to discuss..." className="min-h-[150px]" required />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Request Callback
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    This opens your email app with the details filled in, addressed to {COMPANY.email}. By sending it you agree to our <a href="#" className="underline hover:text-accent">Privacy Policy</a>.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    </section>
  );
}






