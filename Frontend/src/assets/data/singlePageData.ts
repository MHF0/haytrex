// Types for the service data structure
interface Professional {
  id: string;
  name: string;
  avatar: string;
  title: string;
  rating: number;
  completedJobs: number;
  available: boolean;
}

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  thumbnail: string;
  iconName: string;
  rating: number;
  bookingsCount: number;
  completionTime: string;
  price: {
    amount: number;
    currency: string;
    unit: string;
  };
  isTrending: boolean;
  isPremium: boolean;
  features: string[];
  professionals: Professional[];
  reviews: Review[];
  faq: FAQ[];
  includedServices: string[];
  excludedServices: string[];
}

// Dummy data for demo
export const MOCK_SERVICE: ServiceDetail = {
  id: "plumbing",
  title: "Professional Plumbing Services",
  description:
    "Our professional plumbing services cover all your home and office plumbing needs. From fixing leaky faucets and clogged drains to installing new fixtures and water heaters, our expert plumbers are equipped to handle any job. We provide prompt, reliable service with transparent pricing and guaranteed workmanship.",
  shortDescription: "Expert plumbing solutions for your home and office",
  imageUrl:
    "https://plus.unsplash.com/premium_photo-1661884973994-d7625e52631a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  thumbnail:
    "https://plus.unsplash.com/premium_photo-1661884973994-d7625e52631a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  iconName: "Wrench",
  rating: 4.9,
  bookingsCount: 538,
  completionTime: "1-2 hours",
  price: {
    amount: 75,
    currency: "$",
    unit: "hour",
  },
  isTrending: true,
  isPremium: true,
  features: [
    "Licensed & insured professionals",
    "90-day service guarantee",
    "24/7 emergency service available",
    "Transparent pricing with no hidden fees",
    "Eco-friendly solutions available",
    "All tools and equipment included",
  ],
  professionals: [
    {
      id: "pro1",
      name: "Michael Johnson",
      avatar:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
      title: "Master Plumber",
      rating: 4.9,
      completedJobs: 243,
      available: true,
    },
    {
      id: "pro2",
      name: "Sarah Williams",
      avatar:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
      title: "Pipe Specialist",
      rating: 4.8,
      completedJobs: 187,
      available: true,
    },
    {
      id: "pro3",
      name: "Robert Chen",
      avatar:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
      title: "Plumbing Technician",
      rating: 4.7,
      completedJobs: 156,
      available: false,
    },
  ],
  reviews: [
    {
      id: "r1",
      userName: "Emma Thompson",
      userAvatar:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
      rating: 5,
      date: "August 15, 2023",
      comment:
        "Fixed my leaky faucet in no time. Very professional and clean work! I was impressed by the attention to detail and how they explained everything they were doing.",
      helpful: 12,
    },
    {
      id: "r2",
      userName: "David Wilson",
      userAvatar:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
      rating: 4,
      date: "July 23, 2023",
      comment:
        "Good service but arrived 20 minutes late. Otherwise, the work was done well and at the quoted price.",
      helpful: 5,
    },
    {
      id: "r3",
      userName: "Jessica Brown",
      userAvatar:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
      rating: 5,
      date: "September 5, 2023",
      comment:
        "Excellent service! Had a complicated pipe issue that other plumbers couldn't fix. They solved it quickly and efficiently. Highly recommend!",
      helpful: 8,
    },
  ],
  faq: [
    {
      question: "What's included in the standard plumbing service?",
      answer:
        "Our standard plumbing service includes a comprehensive assessment of your plumbing issue, fixing the immediate problem, and a basic inspection of related systems to ensure there are no additional issues developing. The service fee covers labor for the first hour and standard parts. Additional time or specialty parts may incur extra charges.",
    },
    {
      question: "Do I need to provide any tools or materials?",
      answer:
        "No, our plumbers arrive fully equipped with all necessary tools and basic materials needed for most common plumbing repairs. For specific jobs that require special fixtures or parts, you can either purchase them in advance or our plumber can advise on what's needed and provide them at market price.",
    },
    {
      question: "Is there a service guarantee?",
      answer:
        "Yes, all our plumbing work comes with a 90-day service guarantee. If you experience the same issue within 90 days of our service, we'll return and fix it at no additional charge. This guarantee covers workmanship but does not cover issues caused by normal wear and tear or misuse after the service.",
    },
    {
      question: "Do you offer emergency plumbing services?",
      answer:
        "Yes, we offer 24/7 emergency plumbing services. For emergency calls outside regular business hours (8 AM - 6 PM), an additional emergency fee will apply. Our on-call plumbers typically arrive within 60-90 minutes for urgent situations like major leaks or flooding.",
    },
  ],
  includedServices: [
    "Diagnosis and assessment of plumbing issues",
    "Fixing leaks and clogs",
    "Minor repairs on existing fixtures",
    "Basic parts and hardware",
    "Clean-up after completion of work",
    "Basic inspection of related plumbing systems",
  ],
  excludedServices: [
    "Major pipe replacement or repiping services",
    "Extensive fixture replacements",
    "Sewer line repairs or replacements",
    "Water heater installation (available as a separate service)",
    "Gas line work (available as a separate service)",
    "Permit fees for any work requiring permits",
  ],
};
