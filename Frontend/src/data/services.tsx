import React from "react";
import { Building2, LineChart, FileText } from "lucide-react";

export interface ServiceFeature {
  title: string;
  description: string;
  details: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: ServiceFeature[];
  icon: React.ReactNode;
}

export const services: Service[] = [
  {
    id: "business_formation",
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
    ],
    icon: <Building2 className="w-6 h-6" />
  },
  {
    id: "business_consulting",
    title: "Business Consulting & Strategic Planning",
    description: "Develop comprehensive business plans and growth strategies tailored to your unique objectives. Our strategic insights help position your venture for long-term success.",
    features: [
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
        title: "Growth Strategy Development",
        description: "We create customized growth strategies that align with your business goals, market opportunities, and competitive advantages.",
        details: [
          "Growth opportunity identification",
          "Market expansion planning",
          "Product/service portfolio optimization",
          "Revenue stream diversification strategies",
          "Scalability assessment and planning",
          "Performance metrics and KPI development"
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
      }
    ],
    icon: <LineChart className="w-6 h-6" />
  },
  {
    id: "business_plan",
    title: "Business Plan Development",
    description: "Professional business plans for funding and strategic direction.",
    features: [
      {
        title: "Investor-Ready Business Plans",
        description: "We create comprehensive, professional business plans designed to secure funding and provide a clear roadmap for your business.",
        details: [
          "Executive summary crafting",
          "Business concept and value proposition",
          "Industry and market analysis",
          "Competitive analysis and positioning",
          "Marketing and sales strategy",
          "Operational plan development"
        ]
      },
      {
        title: "Financial Projections",
        description: "Our financial experts develop realistic, defensible financial projections that demonstrate the viability and potential of your business.",
        details: [
          "Startup cost calculation",
          "Revenue and expense forecasting",
          "Cash flow projections",
          "Break-even analysis",
          "Balance sheet and income statement projections",
          "ROI and financial ratio analysis"
        ]
      },
      {
        title: "Pitch Deck Creation",
        description: "We design compelling, visually appealing pitch decks that effectively communicate your business opportunity to potential investors.",
        details: [
          "Core story and narrative development",
          "Visual design and presentation",
          "Key metrics and data visualization",
          "Investor objection anticipation and addressing",
          "Presentation coaching and preparation",
          "Follow-up materials development"
        ]
      },
      {
        title: "Market Research & Analysis",
        description: "We conduct thorough market research to provide data-driven insights that strengthen your business plan and strategic decisions.",
        details: [
          "Target market identification and sizing",
          "Customer segmentation and analysis",
          "Competitor benchmarking",
          "Market trends and growth analysis",
          "SWOT analysis preparation",
          "Market entry strategy development"
        ]
      }
    ],
    icon: <FileText className="w-6 h-6" />
  }
];

// Find a service by its ID
export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};