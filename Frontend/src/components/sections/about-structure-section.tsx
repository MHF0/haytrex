import { Badge } from "@/components/ui/badge";
import { COMPANY } from "@/lib/constants";

export function AboutStructureSection() {
  return (
    <section className="section bg-background relative py-16" id="work-structure">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4 text-accent border-accent">How We Work</Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-8">Our Work <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Process</span></h2>
          
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg text-2xl font-bold">1</div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-muted flex-1 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Initial Consultation</h3>
                <p className="text-muted-foreground">
                  We begin with a comprehensive meeting to understand your business vision, goals, and challenges. This allows us to identify your specific needs and develop a tailored approach to help your business succeed.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg text-2xl font-bold">2</div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-muted flex-1 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Detailed Proposal</h3>
                <p className="text-muted-foreground">
                  Following our initial meeting, we develop a comprehensive proposal outlining our recommended services, timeline, expected outcomes, and investment details. This gives you complete clarity on how we'll help your business thrive.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg text-2xl font-bold">3</div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-muted flex-1 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Team Introduction</h3>
                <p className="text-muted-foreground">
                  You'll meet the dedicated professionals who will be working on your project. Our team includes specialists in business formation, IT, UX design, marketing, legal compliance, and industry-specific consultants tailored to your needs.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg text-2xl font-bold">4</div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-muted flex-1 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Transparent Tracking</h3>
                <p className="text-muted-foreground">
                  Through our client portal, you can track your project's progress step-by-step. We provide regular updates, clear milestones, and comprehensive documentation, ensuring you're always informed about your project status.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg text-2xl font-bold">5</div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-muted flex-1 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Live Feedback & Implementation</h3>
                <p className="text-muted-foreground">
                  We provide real-time updates and actively seek your input throughout the process. This collaborative approach ensures the final deliverables align perfectly with your vision and business requirements, leading to optimal results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    </section>
  );
}