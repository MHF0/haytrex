export interface ServiceItemProps {
  id: string;
  title: string;
  iconName: string; // Changed to iconName which will be a Lucide icon name
  description: string;
  color: string;
}

// Define services with their properties
export const serviceData: ServiceItemProps[] = [
  {
    id: "plumbing",
    title: "Plumbing Services",
    iconName: "Wrench", // These are Lucide icon component names
    description: "Expert plumbing solutions for leaks, installations & repairs",
    color: "bg-blue-100",
  },
  {
    id: "cleaning",
    title: "Home Cleaning",
    iconName: "Brush",
    description: "Professional cleaning for spotless, hygienic living spaces",
    color: "bg-green-100",
  },
  {
    id: "electrical",
    title: "Electrical Work",
    iconName: "Zap",
    description: "Safe & reliable electrical repairs and installations",
    color: "bg-yellow-100",
  },
  {
    id: "carpentry",
    title: "Carpentry",
    iconName: "Hammer",
    description: "Custom woodwork, repairs, and furniture assembly",
    color: "bg-orange-100",
  },
  {
    id: "painting",
    title: "Painting",
    iconName: "Paintbrush",
    description: "Interior & exterior painting with quality finishes",
    color: "bg-purple-100",
  },
  {
    id: "renovation",
    title: "Home Renovation",
    iconName: "Home",
    description: "Complete home makeovers and renovation projects",
    color: "bg-pink-100",
  },
  {
    id: "water-heater",
    title: "Water Heater",
    iconName: "Droplet",
    description: "Installation & repair of all water heating systems",
    color: "bg-cyan-100",
  },
  {
    id: "pest-control",
    title: "Pest Control",
    iconName: "Bug",
    description: "Effective elimination of all household pests",
    color: "bg-red-100",
  },
  {
    id: "hvac",
    title: "HVAC Services",
    iconName: "Thermometer",
    description: "Heating, cooling, and ventilation solutions",
    color: "bg-indigo-100",
  },
  {
    id: "appliance",
    title: "Appliance Repair",
    iconName: "Fan",
    description: "Expert repairs for all major household appliances",
    color: "bg-teal-100",
  },
  {
    id: "security",
    title: "Home Security",
    iconName: "ShieldCheck",
    description: "Modern security solutions for your peace of mind",
    color: "bg-lime-100",
  },
];
