import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

// Import services data
const services = [
  {
    id: "business-formation",
    title: "Business Formation & Financial Setup",
    description: "The foundation of any successful venture is a solid legal and financial structure. We streamline this process to get your business up and running smoothly.",
    features: [
      {
        title: "Company Formation",
        description: "We expertly guide you through the process of forming the right legal entity for your business, including LLCs, C-Corps, S-Corps, and more. Our services are tailored to meet the specific needs of US citizens and international founders.",
        details: [
          "Entity selection consultation based on your specific business goals",
          "Preparation and filing of all formation documents",
          "Customized operating agreements and bylaws",
          "Registered agent services",
          "State-specific compliance guidance",
          "Annual report filings and maintenance"
        ]
      },
      {
        title: "Tax ID (EIN) & Bank Account",
        description: "We handle the complexities of obtaining a Federal Tax ID (EIN) and assist you in opening a dedicated business bank account, a critical step for legal and financial operations.",
        details: [
          "EIN application preparation and submission",
          "Business bank account recommendations based on your needs",
          "Documentation preparation for account opening",
          "Banking relationship establishment assistance",
          "Initial financial structure setup",
          "Accounting system integration guidance"
        ]
      },
      {
        title: "Business Licensing & Compliance",
        description: "We ensure your business meets all federal, state, and local requirements by obtaining the necessary licenses and permits for your specific industry and location.",
        details: [
          "Comprehensive license requirement analysis",
          "Permit application preparation and submission",
          "Industry-specific regulatory compliance guidance",
          "Ongoing compliance monitoring",
          "Renewal management system setup",
          "Local zoning and operational requirement navigation"
        ]
      }
      // Tax Planning & Strategy section removed as requested
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    )
  },
  {
    id: "business-consulting",
    title: "Business Establishment & Growth",
    description: "Once your business is legally established, our services focus on helping you build and scale your operations.",
    features: [
      {
        title: "Website & Digital Presence",
        description: "We create professional, modern, and high-performing websites designed to attract customers and build your brand. Our digital strategies ensure you make a strong first impression.",
        details: [
          "Custom website design and development",
          "Mobile-responsive user experience optimization",
          "Search engine optimization (SEO)",
          "Content strategy and creation",
          "Social media profile establishment",
          "Digital brand identity development"
        ]
      },
      {
        title: "Strategic Business Planning",
        description: "Our experts work with you to develop a robust business plan, establish efficient operational processes, and connect you with potential investors to secure the funding you need to grow.",
        details: [
          "Comprehensive business plan development",
          "Market analysis and competitive positioning",
          "Financial projections and modeling",
          "Operational workflow design",
          "Investment pitch deck creation",
          "Investor network access and introduction"
        ]
      },
      {
        title: "Client & Employee Acquisition",
        description: "We provide strategic support to help you acquire your initial clients and build a skilled, dedicated team, leveraging our network and expertise to accelerate your company's growth.",
        details: [
          "Target market identification and analysis",
          "Customer acquisition strategy development",
          "Sales process implementation",
          "Talent recruitment planning",
          "Job description and role definition",
          "Interview process design and training"
        ]
      },
      {
        title: "Marketing & Growth Strategies",
        description: "Our marketing experts develop targeted strategies to grow your customer base, increase revenue, and establish your brand in the marketplace.",
        details: [
          "Brand positioning and messaging development",
          "Marketing campaign planning and execution",
          "Digital advertising strategy and management",
          "Customer retention programs",
          "Analytics setup and performance tracking",
          "Growth hacking techniques implementation"
        ]
      },
      {
        title: "Business Operations Optimization",
        description: "We help streamline your operations, implement efficient systems, and establish processes that scale with your business growth.",
        details: [
          "Operational workflow assessment and optimization",
          "Technology stack selection and implementation",
          "Project management system setup",
          "Standard operating procedures development",
          "Vendor relationship management",
          "Scalability planning and resource allocation"
        ]
      }
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    )
  },
  {
    id: "global-support",
    title: "Global Entrepreneur Support",
    description: "For founders and professionals from around the world, we offer specialized assistance to navigate the unique requirements of the US business landscape.",
    features: [
      {
        title: "Legal Status & Authorization",
        description: "We assist international clients in preparing the necessary applications to secure their legal status and obtain the proper authorization to live and work in the United States, allowing them to focus on building their business.",
        details: [
          "Visa option assessment and selection",
          "E-2, L-1, and EB-5 visa application preparation",
          "O-1 visa qualification assessment",
          "Documentation gathering and organization",
          "Application preparation and submission guidance",
          "Interview preparation and support"
        ]
      },
      {
        title: "Comprehensive Guidance",
        description: "Our team provides personalized guidance on the specific regulations and opportunities available to international entrepreneurs, ensuring a smooth and compliant transition to the US market.",
        details: [
          "US business culture orientation",
          "Networking and community integration",
          "Industry-specific regulation navigation",
          "Cross-cultural business practice guidance",
          "Local market entry strategy development",
          "International tax and financial planning"
        ]
      },
      {
        title: "US Market Entry Strategy",
        description: "We develop customized strategies for international businesses looking to enter the US market, addressing cultural, logistical, and regulatory considerations.",
        details: [
          "US market analysis and opportunity identification",
          "Entry strategy development and implementation",
          "Distribution channel establishment",
          "Partnership and alliance development",
          "US customer acquisition planning",
          "Localization guidance for products and services"
        ]
      },
      {
        title: "Global Expansion Services",
        description: "For US-based businesses looking to expand internationally, we provide guidance on global market entry, compliance, and operations.",
        details: [
          "International market assessment",
          "Foreign entity establishment assistance",
          "Global compliance guidance",
          "International banking and finance setup",
          "Cross-border tax planning",
          "Global workforce development"
        ]
      },
      {
        title: "Cultural Integration & Relocation",
        description: "We help international entrepreneurs and their families with the practical aspects of relocating to the United States, ensuring a smooth transition.",
        details: [
          "Housing search and selection assistance",
          "School and education guidance",
          "Healthcare system navigation",
          "Community integration support",
          "Cultural adaptation resources",
          "Professional network development"
        ]
      }
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 12 15c-2.206 0-4.22-.815-5.77-2.158" />
      </svg>
    )
  }
];

// Create ArrowLeftIcon component
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
  
  const service = services.find((s) => s.id === serviceId);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // If service not found, redirect to home
    if (!serviceId || !service) {
      navigate('/#services');
    }
  }, [serviceId, service, navigate]);

  if (!service) {
    return null; // Will redirect via the useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/50 py-8">
        <div className="container">
          <div className="flex flex-col gap-4">
            <Link to="/#services" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors w-fit">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
            <h1 className="text-4xl font-bold">{service.title}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">{service.description}</p>
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
          <Button size="lg" onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}>
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </div>
  );
}