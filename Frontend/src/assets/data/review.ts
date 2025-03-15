// Interface for Review data
export interface Review {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    date: string;
    service: string;
    text: string;
    verified: boolean;
  }

// Sample review data - in production, this would come from your API
export const reviewsData: Review[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
    rating: 5,
    date: "July 12, 2023",
    service: "House Cleaning",
    text: "The cleaning service was exceptional! The team arrived on time and transformed my home. Every corner was spotless, and they paid attention to all the details I mentioned. Highly recommend!",
    verified: true,
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
    rating: 4.5,
    date: "August 3, 2023",
    service: "Plumbing Repair",
    text: "Fast and professional service. The plumber diagnosed the issue quickly and fixed my leaking sink without making a mess. Fair pricing and good communication throughout.",
    verified: true,
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
    rating: 5,
    date: "June 28, 2023",
    service: "Electrical Work",
    text: "I had several electrical issues that needed fixing throughout my home. The electrician was knowledgeable, efficient, and explained everything clearly. All issues were resolved in one visit!",
    verified: true,
  },
  {
    id: "4",
    name: "David Chen",
    avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
    rating: 4,
    date: "September 5, 2023",
    service: "Painting Service",
    text: "The painters were professional and courteous. They completed the job on schedule and the quality was generally good, though there were a few spots that needed touch-ups which they promptly fixed when I pointed them out.",
    verified: true,
  },
  {
    id: "5",
    name: "Lisa Thompson",
    avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
    rating: 5,
    date: "October 12, 2023",
    service: "Furniture Assembly",
    text: "Absolutely amazing service! I had several complicated pieces of furniture that needed assembly, and the professional made it look easy. Everything was assembled perfectly, and they even cleaned up afterward.",
    verified: true,
  },
];
