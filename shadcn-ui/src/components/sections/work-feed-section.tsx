import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Clock, Briefcase, Check, Loader2 } from "lucide-react";
import { COMPANY } from "@/lib/constants";

// Mock data for the work feed
const workFeedData = {
  recentProjects: [
    {
      id: 1,
      title: "E-commerce Store Formation",
      clientInitial: "TG",
      clientImg: null,
      date: "2025-08-01",
      status: "completed",
      description: "Formed an LLC for an e-commerce business in Delaware, including EIN registration and operating agreement drafting.",
      type: "Business Formation"
    },
    {
      id: 2,
      title: "Tech Startup Incorporation",
      clientInitial: "RC",
      clientImg: null,
      date: "2025-07-28",
      status: "completed",
      description: "Incorporated a C-Corp in California for a tech startup, including board structure and investor-ready documentation.",
      type: "Business Formation"
    },
    {
      id: 3,
      title: "Annual Business Plan Review",
      clientInitial: "AM",
      clientImg: null,
      date: "2025-07-25",
      status: "completed",
      description: "Complete annual business plan revision including financial projections and strategy adjustments for a retail business.",
      type: "Business Planning"
    }
  ],
  inProgress: [
    {
      id: 4,
      title: "Restaurant Group Restructuring",
      clientInitial: "BH",
      clientImg: null,
      date: "2025-08-02",
      status: "in-progress",
      description: "Restructuring a restaurant group with multiple locations into a holding company structure for better liability protection and tax efficiency.",
      type: "Business Consulting",
      progress: 75
    },
    {
      id: 5,
      title: "Consulting Firm Setup",
      clientInitial: "LT",
      clientImg: null,
      date: "2025-08-03",
      status: "in-progress",
      description: "Establishing a professional consulting firm including business entity formation, contract templates, and service pricing structure.",
      type: "Business Formation",
      progress: 45
    },
    {
      id: 6,
      title: "SaaS Business Plan",
      clientInitial: "DP",
      clientImg: null,
      date: "2025-07-30",
      status: "in-progress",
      description: "Creating a comprehensive business plan for a SaaS startup seeking Series A funding, including market research and financial modeling.",
      type: "Business Planning",
      progress: 60
    }
  ],
  upcomingProjects: [
    {
      id: 7,
      title: "Healthcare Practice Formation",
      clientInitial: "MS",
      clientImg: null,
      date: "2025-08-10",
      status: "upcoming",
      description: "Scheduled formation of a medical practice including professional entity structure, compliance documentation, and operational procedures.",
      type: "Business Formation"
    },
    {
      id: 8,
      title: "Non-Profit Organization Setup",
      clientInitial: "CJ",
      clientImg: null,
      date: "2025-08-15",
      status: "upcoming",
      description: "Assisting with 501(c)(3) application and formation of a non-profit organization focused on environmental conservation.",
      type: "Business Formation"
    }
  ]
};

export function WorkFeedSection() {
  const [activeTab, setActiveTab] = useState("in-progress");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="section bg-background py-16 relative" id="work-feed">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-accent border-accent">Live Updates</Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-4">What We're Working On</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get a live look at the projects our team is currently handling. This feed gives you insight into 
            the types of businesses we help form and the services we provide in real-time.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-lg text-muted-foreground">Loading work feed...</span>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="in-progress" className="min-w-[150px]">
                  In Progress
                </TabsTrigger>
                <TabsTrigger value="recent" className="min-w-[150px]">
                  Recently Completed
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="min-w-[150px]">
                  Upcoming
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="in-progress">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workFeedData.inProgress.map((project) => (
                  <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription>{project.type}</CardDescription>
                      </div>
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage src={project.clientImg || ""} alt="Client" />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {project.clientInitial}
                        </AvatarFallback>
                      </Avatar>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <div className="flex items-center">
                          <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                          <span>Started: {new Date(project.date).toLocaleDateString()}</span>
                        </div>
                        <span>{project.progress}% Complete</span>
                      </div>
                      
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recent">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workFeedData.recentProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription>{project.type}</CardDescription>
                      </div>
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage src={project.clientImg || ""} alt="Client" />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {project.clientInitial}
                        </AvatarFallback>
                      </Avatar>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                          <span>Completed: {new Date(project.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-emerald-600">
                          <Check className="h-3.5 w-3.5 mr-1" />
                          <span>Completed</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workFeedData.upcomingProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription>{project.type}</CardDescription>
                      </div>
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage src={project.clientImg || ""} alt="Client" />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {project.clientInitial}
                        </AvatarFallback>
                      </Avatar>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 mr-1.5" />
                        <span>Scheduled: {new Date(project.date).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
        
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            At {COMPANY.name}, we're constantly working with entrepreneurs and business owners to establish and grow
            their companies. Each project is handled with the utmost care and professionalism by our dedicated team.
            <br /><br />
            Interested in seeing how we can help your business? <a href="#consultation" className="text-primary hover:underline">Schedule a consultation</a> today.
          </p>
        </div>
      </div>
      
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    </section>
  );
}