// Define interfaces for the featured services data structure
interface ProfessionalInfo {
  id: string;
  name: string;
  avatar: string;
  specialization: string;
}

interface Testimonial {
  id: string;
  text: string;
  userName: string;
  userAvatar: string;
  rating: number;
}

export interface FeaturedServiceItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  imageUrl: string;
  rating: number;
  bookingsCount: number;
  completionTime: string;
  trending: boolean;
  professionals: ProfessionalInfo[];
  testimonials: Testimonial[];
}

// Sample data for featured services
// In a real application, this would come from your API
export const FeaturedServicesData: FeaturedServiceItem[] = [
  {
    id: "plumbing",
    title: "Plumbing Services",
    icon: "Wrench",
    description: "Professional plumbing services for your home and office",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661884973994-d7625e52631a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.9,
    bookingsCount: 538,
    completionTime: "1-2 hours",
    trending: true,
    professionals: [
      {
        id: "pro1",
        name: "Michael Johnson",
        avatar:
          "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
        specialization: "Master Plumber",
      },
      {
        id: "pro2",
        name: "Sarah Williams",
        avatar:
          "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
        specialization: "Pipe Specialist",
      },
    ],
    testimonials: [
      {
        id: "t1",
        text: "Fixed my leaky faucet in no time. Very professional and clean work!",
        userName: "Emma Thompson",
        userAvatar:
          "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
        rating: 5,
      },
    ],
  },
  {
    id: "cleaning",
    title: "Home Cleaning",
    icon: "Brush",
    description: "Thorough home cleaning services by verified professionals",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1663011218145-c1d0c3ba3542?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8,
    bookingsCount: 712,
    completionTime: "3-4 hours",
    trending: true,
    professionals: [
      {
        id: "pro3",
        name: "Ana Martinez",
        avatar:
          "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
        specialization: "Deep Cleaning Expert",
      },
    ],
    testimonials: [
      {
        id: "t2",
        text: "My home has never been this clean! Will definitely book again.",
        userName: "David Wilson",
        userAvatar:
          "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
        rating: 5,
      },
    ],
  },
  {
    id: "electrical",
    title: "Electrical Work",
    icon: "Zap",
    description: "Safe and reliable electrical services for your property",
    imageUrl:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.7,
    bookingsCount: 429,
    completionTime: "2-3 hours",
    trending: false,
    professionals: [
      {
        id: "pro4",
        name: "Robert Chen",
        avatar:
          "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
        specialization: "Licensed Electrician",
      },
    ],
    testimonials: [
      {
        id: "t3",
        text: "Robert did an amazing job installing new fixtures throughout my home.",
        userName: "Jessica Brown",
        userAvatar:
          "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
        rating: 4.5,
      },
    ],
  },
];
