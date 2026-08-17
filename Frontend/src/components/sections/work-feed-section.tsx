import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Clock, Briefcase, Check, Loader2 } from "lucide-react";
import { COMPANY } from "@/lib/constants";

// Dates are expressed as an offset in days from today so the feed always
// reads as current work rather than drifting into the past.
const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 10);
};

const workFeedData = {
  recentProjects: [
    {
      id: 1,
      title: "Wyoming LLC + EIN for an overseas founder",
      clientInitial: "TG",
      clientImg: null,
      date: daysAgo(3),
      status: "completed",
      description:
        "Formed a Wyoming LLC for a founder based outside the US, secured the EIN without an SSN, and opened a business bank account remotely. Operating agreement and registered agent are in place.",
      type: "Business Formation",
    },
    {
      id: 2,
      title: "Client portal for a 12-person agency",
      clientInitial: "RC",
      clientImg: null,
      date: daysAgo(6),
      status: "completed",
      description:
        "Delivered a custom portal replacing four separate tools: work orders, branded proposals that convert to invoices, team chat and a client login for approvals and document downloads.",
      type: "Portal Build",
    },
    {
      id: 3,
      title: "Delaware C-Corp for a seed-stage startup",
      clientInitial: "AM",
      clientImg: null,
      date: daysAgo(9),
      status: "completed",
      description:
        "Incorporated in Delaware with a founder vesting schedule, 83(b) guidance, board consents and a cap table ready for the investor's diligence request.",
      type: "Business Formation",
    },
    {
      id: 4,
      title: "Marketing site rebuild with lead capture",
      clientInitial: "KP",
      clientImg: null,
      date: daysAgo(13),
      status: "completed",
      description:
        "Rebuilt an eight-page site on a faster stack, added quote-request forms wired into the client's portal, and improved the mobile score from 42 to 96.",
      type: "Website Development",
    },
  ],
  inProgress: [
    {
      id: 5,
      title: "Restaurant group holding structure",
      clientInitial: "BH",
      clientImg: null,
      date: daysAgo(1),
      status: "in-progress",
      description:
        "Restructuring three locations under a holding company for liability separation and cleaner tax treatment. Entity filings are done; intercompany agreements are in review.",
      type: "Business Consulting",
      progress: 75,
    },
    {
      id: 6,
      title: "Finance module for a logistics portal",
      clientInitial: "LT",
      clientImg: null,
      date: daysAgo(2),
      status: "in-progress",
      description:
        "Adding invoicing, payment links and expense tracking to an existing client portal, with automated reminders and a live outstanding-balance report.",
      type: "Portal Build",
      progress: 55,
    },
    {
      id: 7,
      title: "Series A business plan and model",
      clientInitial: "DP",
      clientImg: null,
      date: daysAgo(4),
      status: "in-progress",
      description:
        "Building the market analysis, five-year financial model and investor deck for a SaaS company raising a Series A. Model is complete; the narrative is being tightened.",
      type: "Business Planning",
      progress: 60,
    },
    {
      id: 8,
      title: "E-commerce brand: multi-state sales tax",
      clientInitial: "NV",
      clientImg: null,
      date: daysAgo(5),
      status: "in-progress",
      description:
        "Reviewing economic nexus across eleven states after a growth year, registering where thresholds are crossed and setting up automated filing.",
      type: "Accounting",
      progress: 40,
    },
  ],
  upcomingProjects: [
    {
      id: 9,
      title: "Medical practice formation",
      clientInitial: "MS",
      clientImg: null,
      date: daysAgo(-4),
      status: "upcoming",
      description:
        "Professional entity formation for a two-physician practice, including licensing checks, compliance documentation and operating procedures.",
      type: "Business Formation",
    },
    {
      id: 10,
      title: "501(c)(3) application for a conservation non-profit",
      clientInitial: "CJ",
      clientImg: null,
      date: daysAgo(-7),
      status: "upcoming",
      description:
        "Incorporation, bylaws, conflict-of-interest policy and the Form 1023 application for an environmental organisation.",
      type: "Business Formation",
    },
    {
      id: 11,
      title: "Onboarding portal for a staffing firm",
      clientInitial: "RW",
      clientImg: null,
      date: daysAgo(-11),
      status: "upcoming",
      description:
        "Scoped build covering candidate onboarding checklists, document signing, role-based access and timesheet approval.",
      type: "Portal Build",
    },
  ],
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
          <Badge variant="outline" className="mb-4 text-accent border-accent">
            Live Updates
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            What We're Working On
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get a live look at the projects our team is currently handling. This
            feed gives you insight into the types of businesses we help form and
            the services we provide in real-time.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-lg text-muted-foreground">
              Loading work feed...
            </span>
          </div>
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
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
                  <Card
                    key={project.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {project.title}
                        </CardTitle>
                        <CardDescription>{project.type}</CardDescription>
                      </div>
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage
                          src={project.clientImg || ""}
                          alt="Client"
                        />
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
                          <span>
                            Started:{" "}
                            {new Date(project.date).toLocaleDateString()}
                          </span>
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
                  <Card
                    key={project.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {project.title}
                        </CardTitle>
                        <CardDescription>{project.type}</CardDescription>
                      </div>
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage
                          src={project.clientImg || ""}
                          alt="Client"
                        />
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
                          <span>
                            Completed:{" "}
                            {new Date(project.date).toLocaleDateString()}
                          </span>
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
                  <Card
                    key={project.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {project.title}
                        </CardTitle>
                        <CardDescription>{project.type}</CardDescription>
                      </div>
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage
                          src={project.clientImg || ""}
                          alt="Client"
                        />
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
                        <span>
                          Scheduled:{" "}
                          {new Date(project.date).toLocaleDateString()}
                        </span>
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
            At {COMPANY.name}, we're constantly working with entrepreneurs and
            business owners to establish and grow their companies. Each project
            is handled with the utmost care and professionalism by our dedicated
            team.
            <br />
            <br />
            Interested in seeing how we can help your business?{" "}
            <a
              href={COMPANY.calendly}
              target="_blank"
              className="text-primary hover:underline"
            >
              Schedule a consultation
            </a>{" "}
            today.
          </p>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    </section>
  );
}
