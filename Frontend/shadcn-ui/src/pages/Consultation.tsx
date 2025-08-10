import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, DollarSign, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function Consultation() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Book Your Consultation</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Take the first step towards your business success. Choose the consultation option that best suits your needs.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Free 15-Minute Consultation Option */}
        <Card className="border-2 hover:border-primary hover:shadow-lg transition-all duration-300 overflow-hidden relative">
          <div className="absolute -rotate-45 bg-green-500 text-white px-8 py-1 font-semibold -left-10 -top-1">
            FREE
          </div>
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center mb-2">
              <Zap className="h-10 w-10 text-yellow-500" />
            </div>
            <CardTitle className="text-2xl">Free 15 Mins</CardTitle>
            <CardDescription className="text-lg">Quick Discovery Call</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="text-3xl font-bold">$0</span>
              <Badge variant="outline" className="text-green-600 bg-green-50">FREE</Badge>
            </div>
            <ul className="text-left space-y-3 my-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Quick assessment of your business needs</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Determine if we're the right fit for your goals</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Get immediate insights on your next steps</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Perfect for quick questions and guidance</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-2">
            <a href="https://calendly.com/haytrex-info/30min" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                Book Free 15-Min Call
              </Button>
            </a>
            <div className="text-center text-sm text-muted-foreground">
              No credit card required
            </div>
          </CardFooter>
        </Card>

        {/* Paid 1-Hour Strategic Consultation Option */}
        <Card className="border-2 border-primary hover:shadow-lg transition-all duration-300 bg-gradient-to-b from-blue-50 to-white overflow-hidden relative">
          <div className="absolute -rotate-45 bg-blue-700 text-white px-6 py-1 font-semibold -left-8 -top-1">
            PREMIUM
          </div>
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-10 w-10 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">1 Hour Strategic</CardTitle>
            <CardDescription className="text-lg">In-depth Business Analysis</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="text-3xl font-bold">$100</span>
              <Badge variant="outline" className="text-blue-700 bg-blue-50">BEST VALUE</Badge>
            </div>
            <ul className="text-left space-y-3 my-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Comprehensive review of business challenges</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Personalized action plan with recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Strategic insights from business experts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Follow-up email with session summary</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-2">
            <a href="https://calendly.com/haytrex-info/consultation-meeting" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full bg-blue-700 hover:bg-blue-800" size="lg">
                Book Strategic Consultation
              </Button>
            </a>
            <div className="text-center text-sm text-muted-foreground">
              Secure payment • Money-back guarantee
            </div>
          </CardFooter>
        </Card>

        {/* Immigration Services Consultation Option */}
        <Card className="border-2 hover:border-purple-400 hover:shadow-lg transition-all duration-300 bg-gradient-to-b from-purple-50 to-white overflow-hidden relative">
          <div className="absolute -rotate-45 bg-purple-700 text-white px-6 py-1 font-semibold -left-8 -top-1">
            SPECIALIZED
          </div>
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center mb-2">
              <Globe className="h-10 w-10 text-purple-600" />
            </div>
            <CardTitle className="text-2xl">Immigration Consultation</CardTitle>
            <CardDescription className="text-lg">Work Authorization Support</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="text-3xl font-bold">$100</span>
              <Badge variant="outline" className="text-purple-700 bg-purple-50">SPECIALIZED</Badge>
            </div>
            <ul className="text-left space-y-3 my-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>Review of immigration status and options</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>Work authorization application guidance</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>State-specific requirements explained</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>Documentation requirements checklist</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-2">
            <a href="https://calendly.com/haytrex-info/consultation-meeting" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full bg-purple-700 hover:bg-purple-800" size="lg">
                Book Immigration Consultation
              </Button>
            </a>
            <div className="text-center text-sm text-muted-foreground">
              Expert guidance • Confidential service
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Haytrex Consultations?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-8">
          <div className="flex flex-col items-center p-6 rounded-lg bg-muted/50">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Expert Guidance</h3>
            <p className="text-center text-muted-foreground">
              Our team brings years of experience helping businesses thrive in competitive markets.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 rounded-lg bg-muted/50">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Actionable Advice</h3>
            <p className="text-center text-muted-foreground">
              Walk away with concrete steps and strategies you can implement immediately.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 rounded-lg bg-muted/50">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Tailored Solutions</h3>
            <p className="text-center text-muted-foreground">
              Every business is unique. Our advice is customized to your specific situation and goals.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-muted/30 p-6 rounded-lg max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-3">Satisfaction Guaranteed</h3>
        <p className="text-muted-foreground">
          We're confident in the value we provide. If you're not satisfied with your paid consultation, we'll refund your investment. Our goal is to help you succeed, and we stand by the quality of our services.
        </p>
      </div>
    </div>
  );
}