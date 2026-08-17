import {
  Blocks,
  ClipboardList,
  ReceiptText,
  MessagesSquare,
  UsersRound,
  UserCog,
  FolderLock,
  BarChart3,
  Puzzle,
  Globe,
  Palette,
  Smartphone,
  Search,
  PlugZap,
  Gauge,
  PencilRuler,
  MailCheck,
  type LucideIcon,
} from "lucide-react";

export interface DigitalFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface DigitalService {
  id: string;
  /** Card title shown on the main page. */
  title: string;
  tagline: string;
  summary: string;
  /** Optional price badge, e.g. "Starting at $99 / month". */
  price?: string;
  cta: string;
  icon: LucideIcon;
  /** Headline at the top of the detail popup. */
  detailHeadline: string;
  detailIntro: string;
  /** Section label above the feature list inside the popup. */
  featuresLabel: string;
  features: DigitalFeature[];
}

export const digitalServices: DigitalService[] = [
  {
    id: "business_portals",
    title: "Custom All-in-One Business Portals",
    tagline:
      "Everything you need to run, track, and automate your operations in one central system.",
    summary:
      "Stop juggling dozens of disconnected apps. Get a secure, customized operational portal tailored to your specific workflow, from client management to team collaboration.",
    price: "Starting at $99 / month",
    cta: "Click to Explore Portal Features",
    icon: Blocks,
    detailHeadline: "A Modern Workspace Built Around the Way You Work",
    detailIntro:
      "Managing a business gets complicated when your team uses one app for communication, another for invoicing, and a third for project tracking. Haytrex creates tailor-made management portals that centralize your entire workflow into one clean, easy-to-use dashboard. Designed for flexibility, our portal solution scales with your business without charging high monthly software fees.",
    featuresLabel: "Key Features Included in Your Portal",
    features: [
      {
        title: "Order & Work Order Management",
        description:
          "Track jobs from initial request to final delivery. Assign tasks to team members, set clear priority levels, update project statuses in real time, and monitor deadlines so nothing falls through the cracks.",
        icon: ClipboardList,
      },
      {
        title: "Invoicing, Quotes & Proposals",
        description:
          "Generate custom, branded proposals and estimates in seconds. Once approved, convert them directly into itemized invoices, set up automated payment reminders, and accept online payments through secure integrations.",
        icon: ReceiptText,
      },
      {
        title: "Live Chat & Messaging",
        description:
          "Keep internal team communications organized while offering your clients a direct, professional channel to talk to you. Includes direct messages, team group chats, and direct client support channels.",
        icon: MessagesSquare,
      },
      {
        title: "Employee & Team Management",
        description:
          "Manage your workforce effortlessly. Assign custom security access levels, track work hours and attendance, delegate daily tasks, and monitor overall performance from a unified dashboard.",
        icon: UserCog,
      },
      {
        title: "Client Self-Service Portal",
        description:
          "Give your clients a high-end portal where they can view ongoing projects, approve proposals, pay invoices, submit support tickets, and download important documents at any time.",
        icon: UsersRound,
      },
      {
        title: "Document Sharing & File Storage",
        description:
          "Store contracts, project assets, and company policies securely in the cloud. Organise files by client or project with controlled permissions.",
        icon: FolderLock,
      },
      {
        title: "Custom Analytics & Reporting",
        description:
          "Get immediate visibility into your business health. Generate real-time reports on sales, active work orders, team productivity, and outstanding balances.",
        icon: BarChart3,
      },
      {
        title: "Tailored Add-Ons & Custom Workflows",
        description:
          "Every business is different. We build custom features and integrations to match your specific industry needs, whether you run a service business, agency, consultancy, or logistics team.",
        icon: Puzzle,
      },
    ],
  },
  {
    id: "website_creation",
    title: "Custom Website Design & Development",
    tagline: "Turn visitors into paying clients with a modern, high-performing digital presence.",
    summary:
      "We design and build custom, mobile-friendly websites that showcase your brand, drive lead generation, and seamlessly connect with your existing business software.",
    cta: "Click to Explore Website Features",
    icon: Globe,
    detailHeadline: "Stand Out Online with a High-Converting Custom Website",
    detailIntro:
      "Your website is often the first impression potential clients have of your business. At Haytrex, we do not rely on generic templates that look like everyone else. We build fast, beautiful, and secure websites engineered to capture attention, build trust, and turn casual visitors into loyal customers.",
    featuresLabel: "What We Include in Every Web Project",
    features: [
      {
        title: "Custom Design Built Around Your Brand",
        description:
          "Unique layouts tailored specifically to your corporate identity, brand colors, and industry standard, ensuring you look established and professional on day one.",
        icon: Palette,
      },
      {
        title: "100% Mobile & Tablet Responsive",
        description:
          "Your site will render cleanly across desktop, tablet, and mobile screens, giving users a smooth experience on any device.",
        icon: Smartphone,
      },
      {
        title: "Search Engine Optimization (SEO) Built-In",
        description:
          "We build every website using clean code, fast page speeds, proper header structures, and metadata so search engines like Google can rank your business higher.",
        icon: Search,
      },
      {
        title: "Seamless Portal & Tool Integration",
        description:
          "Connect your website directly to your Haytrex business portal, CRM, scheduling calendars, or third-party tools so customer submissions flow instantly into your workflow.",
        icon: PlugZap,
      },
      {
        title: "Fast Loading Speeds & Enterprise Security",
        description:
          "Optimized image files, clean coding, and SSL security standards keep your site fast, reliable, and secure against cyber threats.",
        icon: Gauge,
      },
      {
        title: "Easy Content Management System (CMS)",
        description:
          "Update text, post updates, add new services, or upload portfolio photos on your own using a straightforward editing dashboard that requires zero coding knowledge.",
        icon: PencilRuler,
      },
      {
        title: "Lead Capture & Contact Forms",
        description:
          "Convert traffic into inquiries with interactive contact forms, quote requests, direct phone buttons, and live chat widgets.",
        icon: MailCheck,
      },
    ],
  },
];
