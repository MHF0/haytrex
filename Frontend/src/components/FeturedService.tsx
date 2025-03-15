import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Clock, Award, Users, ChevronRight } from "lucide-react";
import {
  FeaturedServiceItem,
  FeaturedServicesData,
} from "../assets/data/FeturesServiceITems";

// Feature Service Card Component
const FeaturedServiceCard: React.FC<{ service: FeaturedServiceItem }> = ({
  service,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/services/${service.id}`);
  };

  // Function to render star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        <Star size={16} fill="#FBBF24" stroke="#FBBF24" className="mr-1" />
        <span className="font-semibold text-gray-800">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={handleClick}
    >
      {/* Service Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.imageUrl}
          alt={service.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/images/services/default-featured.jpg";
          }}
        />
        {service.trending && (
          <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
            <Award size={12} className="mr-1" />
            Trending
          </div>
        )}
      </div>

      {/* Service Details */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {service.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3">{service.description}</p>

        {/* Stats & Ratings */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {renderStars(service.rating)}
            <span className="mx-2 text-gray-400">|</span>
            <div className="flex items-center text-sm text-gray-600">
              <Users size={14} className="mr-1" />
              {service.bookingsCount}+ bookings
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={14} className="mr-1" />
            {service.completionTime}
          </div>
        </div>

        {/* Professionals */}
        {service.professionals.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 mb-2">
              TOP PROFESSIONALS
            </p>
            <div className="flex space-x-2">
              {service.professionals.slice(0, 2).map((pro) => (
                <div key={pro.id} className="flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                    <img
                      src={pro.avatar}
                      alt={pro.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/images/professionals/default-avatar.jpg";
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">{pro.name}</p>
                    <p className="text-xs text-gray-500">
                      {pro.specialization}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonial */}
        {service.testimonials.length > 0 && (
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={service.testimonials[0].userAvatar}
                  alt={service.testimonials[0].userName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/users/default-avatar.jpg";
                  }}
                />
              </div>
              <div className="flex-1">
                <p className="text-xs italic text-gray-600 mb-1">
                  "{service.testimonials[0].text}"
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold">
                    {service.testimonials[0].userName}
                  </p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        fill={
                          i < service.testimonials[0].rating
                            ? "#FBBF24"
                            : "#E5E7EB"
                        }
                        stroke="none"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded transition-colors flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/booking/${service.id}`);
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

// Main Featured Services Component
const FeaturedServices: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Featured & Trending Services
            </h2>
            <p className="text-gray-600">
              Most popular services booked by our customers
            </p>
          </div>
          <button
            onClick={() => navigate("/services")}
            className="hidden sm:flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View all services
            <ChevronRight className="ml-1" size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FeaturedServicesData.map((service) => (
            <FeaturedServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <button
            onClick={() => navigate("/services")}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            View all services
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
