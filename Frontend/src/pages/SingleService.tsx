import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  Star, 
  Clock, 
  Users, 
  Calendar,
  CheckCircle, 
  Award, 
  ChevronRight, 
  MessageCircle, 
  PlusCircle, 
  MinusCircle,
  Smile,
  Bookmark,
  Share2,
  DollarSign,
  MapPin,
  HelpCircle
} from "lucide-react";
import { MOCK_SERVICE, ServiceDetail } from "../assets/data/singlePageData";

// Render star ratings
const StarRating: React.FC<{ rating: number, size?: number }> = ({ rating, size = 16 }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`${
            star <= rating
              ? "text-yellow-400 fill-yellow-400"
              : star - 0.5 <= rating
              ? "text-yellow-400 fill-yellow-400 half-star"
              : "text-gray-300"
          }`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
};

const SingleService: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [expandedFAQs, setExpandedFAQs] = useState<Record<number, boolean>>({});
  const [isSaved, setIsSaved] = useState(false);
  
  // Fetch service data
  useEffect(() => {
    const fetchServiceDetails = async () => {
      setLoading(true);
      try {
        // In a real app, fetch from API
        // const response = await fetch(`/api/services/${serviceId}`);
        // const data = await response.json();
        
        // Using mock data for demo
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        setService(MOCK_SERVICE);
      } catch (error) {
        console.error("Error fetching service details:", error);
        // Handle error state
      } finally {
        setLoading(false);
      }
    };
    
    fetchServiceDetails();
  }, [serviceId]);

  // Toggle FAQ expanded state
  const toggleFAQ = (index: number) => {
    setExpandedFAQs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Handle booking
  const handleBookNow = () => {
    navigate(`/booking/${serviceId}`, { 
      state: { 
        selectedDate, 
        selectedTime 
      } 
    });
  };

  // Handle save/bookmark
  const handleSaveService = () => {
    setIsSaved(!isSaved);
    // In a real app, you would also save this to user's account
  };

  // Handle share
  const handleShareService = () => {
    // In a real app, this would open a share dialog
    // For now, just copy URL to clipboard
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        alert("Service URL copied to clipboard!");
      })
      .catch(err => {
        console.error('Failed to copy URL: ', err);
      });
  };

  // Handle time slot selection
  const handleTimeSelection = (time: string) => {
    setSelectedTime(time === selectedTime ? null : time);
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Generate available dates
  const getAvailableDates = () => {
    const dates = [];
    const now = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(now.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Generate time slots
  const getTimeSlots = () => {
    return [
      "09:00 AM", 
      "10:00 AM", 
      "11:00 AM", 
      "01:00 PM", 
      "02:00 PM", 
      "03:00 PM", 
      "04:00 PM"
    ];
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-80 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="flex gap-4 mb-8">
            <div className="h-20 w-1/3 bg-gray-200 rounded"></div>
            <div className="h-20 w-1/3 bg-gray-200 rounded"></div>
            <div className="h-20 w-1/3 bg-gray-200 rounded"></div>
          </div>
          <div className="h-40 bg-gray-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-60 bg-gray-200 rounded"></div>
            <div className="h-60 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!service) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <HelpCircle size={64} className="mx-auto text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Service Not Found</h1>
        <p className="text-gray-600 mb-6">The service you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/services" 
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Browse All Services
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={service.imageUrl} 
            alt={service.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/services/default-hero.jpg';
            }}
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-4">
              {service.isTrending && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500 text-white">
                  <Award size={14} className="mr-1" />
                  Trending
                </span>
              )}
              {service.isPremium && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-600 text-white">
                  <Star size={14} className="mr-1" />
                  Premium Service
                </span>
              )}
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
            <p className="text-lg text-gray-200 mb-6">{service.shortDescription}</p>
            
            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center">
                <Star className="text-yellow-400 mr-1" size={20} />
                <span className="font-semibold mr-1">{service.rating}</span>
                <span className="text-gray-300">({service.bookingsCount}+ bookings)</span>
              </div>
              <div className="flex items-center">
                <Clock className="text-gray-300 mr-1" size={18} />
                <span>{service.completionTime}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="text-gray-300 mr-1" size={18} />
                <span>
                  {service.price.currency}{service.price.amount}/{service.price.unit}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Service Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Overview</h2>
              <p className="text-gray-700 mb-6">{service.description}</p>
              
              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* What's Included */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">What's Included</h2>
              <div className="grid grid-cols-1 gap-3 mb-6">
                {service.includedServices.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Not Included</h3>
              <div className="grid grid-cols-1 gap-3">
                {service.excludedServices.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <MinusCircle size={18} className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Top Professionals */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Top Professionals</h2>
              <div className="space-y-6">
                {service.professionals.map((professional) => (
                  <div 
                    key={professional.id}
                    className="flex items-start p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                  >
                    <div className="mr-4 relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img 
                          src={professional.avatar} 
                          alt={professional.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/professionals/default-avatar.jpg';
                          }}
                        />
                      </div>
                      {professional.available && (
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{professional.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{professional.title}</p>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center">
                          <StarRating rating={professional.rating} size={14} />
                          <span className="ml-1 text-sm text-gray-700">{professional.rating}</span>
                        </div>
                        <span className="text-sm text-gray-600">{professional.completedJobs} jobs completed</span>
                      </div>
                    </div>
                    <button 
                      className="px-3 py-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                      onClick={() => navigate(`/professionals/${professional.id}`)}
                    >
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Customer Reviews</h2>
                <Link 
                  to={`/services/${serviceId}/reviews`}
                  className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                >
                  See all reviews
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
              
              {service.reviews.length > 0 ? (
                <div className="space-y-6">
                  {service.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start">
                        <div className="mr-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img 
                              src={review.userAvatar} 
                              alt={review.userName}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/users/default-avatar.jpg';
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{review.userName}</h3>
                          <div className="flex items-center mt-1 mb-2">
                            <StarRating rating={review.rating} size={14} />
                            <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700 mb-3">{review.comment}</p>
                          <div className="flex items-center">
                            <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                              <Smile size={16} className="mr-1" />
                              Helpful ({review.helpful})
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageCircle size={40} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">No reviews yet for this service.</p>
                </div>
              )}
            </div>
            
            {/* FAQs */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {service.faq.map((item, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      className="flex justify-between items-center w-full px-6 py-4 text-left font-medium text-gray-800 hover:bg-gray-50 focus:outline-none"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span>{item.question}</span>
                      {expandedFAQs[index] ? (
                        <MinusCircle size={18} className="flex-shrink-0 text-indigo-600" />
                      ) : (
                        <PlusCircle size={18} className="flex-shrink-0 text-indigo-600" />
                      )}
                    </button>
                    {expandedFAQs[index] && (
                      <div className="px-6 pb-4 text-gray-700">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking and Sidebar */}
          <div>
            {/* Fixed position container for right sidebar */}
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Booking Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Book this Service</h3>
                
                {/* Price */}
                <div className="flex items-baseline mb-6">
                  <span className="text-2xl font-bold text-indigo-600 mr-2">
                    {service.price.currency}{service.price.amount}
                  </span>
                  <span className="text-gray-600">/{service.price.unit}</span>
                </div>
                
                {/* Date Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <div className="flex overflow-x-auto pb-2 -mx-2">
                    {getAvailableDates().map((date, index) => (
                      <div key={index} className="px-1.5 flex-shrink-0">
                        <button
                          className={`w-20 py-2 rounded-lg border text-center focus:outline-none ${
                            selectedDate && date.toDateString() === selectedDate.toDateString()
                              ? "bg-indigo-600 border-indigo-600 text-white"
                              : "border-gray-300 hover:border-indigo-400 text-gray-800"
                          }`}
                          onClick={() => setSelectedDate(date)}
                        >
                          <span className="block text-xs">{formatDate(date).split(',')[0]}</span>
                          <span className="font-medium">{date.getDate()}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Time Selection */}
                {selectedDate && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Time
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {getTimeSlots().map((time, index) => (
                        <button
                          key={index}
                          className={`py-2 text-sm rounded-lg border text-center focus:outline-none ${
                            selectedTime === time
                              ? "bg-indigo-600 border-indigo-600 text-white"
                              : "border-gray-300 hover:border-indigo-400 text-gray-800"
                          }`}
                          onClick={() => handleTimeSelection(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Book Now Button */}
                <button
                  className={`w-full py-3 px-4 rounded-lg flex items-center justify-center font-medium text-white transition-colors ${
                    selectedDate && selectedTime 
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!(selectedDate && selectedTime)}
                  onClick={handleBookNow}
                >
                  <Calendar className="mr-2" size={18} />
                  Book Now
                </button>
                
                <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
                  <Users size={16} className="mr-1" />
                  {service.bookingsCount}+ people booked this service
                </div>
              </div>
              
              {/* Share and Save */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={handleShareService}
                    className="flex items-center text-sm text-gray-700 hover:text-indigo-600 transition-colors"
                  >
                    <Share2 size={16} className="mr-1" />
                    Share
                  </button>
                  <div className="border-r border-gray-200"></div>
                  <button 
                    onClick={handleSaveService}
                    className={`flex items-center text-sm transition-colors ${
                      isSaved ? "text-indigo-600" : "text-gray-700 hover:text-indigo-600"
                    }`}
                  >
                    <Bookmark size={16} className={`mr-1 ${isSaved ? "fill-indigo-600" : ""}`} />
                    {isSaved ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
              
              {/* Location */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <MapPin className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Service Area</h4>
                    <p className="text-sm text-gray-600">This service is available in Boston and surrounding areas within a 30-mile radius.</p>
                  </div>
                </div>
              </div>
              
              {/* Customer Support */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-center">
                  <h4 className="font-medium text-gray-800 mb-2">Need help?</h4>
                  <p className="text-sm text-gray-600 mb-3">Our customer support team is here for you</p>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 hover:bg-indigo-50"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleService;