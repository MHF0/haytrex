import React from "react";
import { useNavigate } from "react-router-dom";
import { serviceData, ServiceItemProps } from "../assets/data/service";
import * as LucideIcons from "lucide-react";

// Helper function to render dynamic Lucide icons from string names
const renderLucideIcon = (iconName: string, className: string = "") => {
  // Type assertion to access the icons by name
  const LucideIconsMap = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  
  // Check if the icon exists in Lucide
  if (LucideIconsMap[iconName]) {
    const IconComponent = LucideIconsMap[iconName];
    return <IconComponent className={className} />;
  }
  
  // Fallback to a default icon if not found
  return <LucideIcons.HelpCircle className={className} />;
};

// Individual Service Card Component
export const ServiceCard: React.FC<ServiceItemProps> = ({
  id,
  title,
  iconName, // Changed from iconUrl to iconName for Lucide icons
  description,
  color,
}) => {
  const navigate = useNavigate();

  const handleServiceClick = () => {
    navigate(`/services/${id}`);
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/booking/${id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={handleServiceClick}
    >
      <div className="p-6">
        <div
          className={`w-14 h-14 rounded-lg ${color} flex items-center justify-center mb-4`}
        >
          {renderLucideIcon(iconName, "w-7 h-7 text-gray-700")}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <button
            onClick={handleBookNow}
            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded transition-colors duration-300"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Services Grid Component
const ServiceGrid: React.FC = () => {
  return (
    <section id="services-section" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Our Professional Services
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose from our wide range of professional home services, delivered by
          verified experts with quality guaranteed.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {serviceData.map((service) => (
          <ServiceCard
            key={`${service.id}-${service.title}`}
            id={service.id}
            title={service.title}
            iconName={service.iconName} // Updated to use iconName
            description={service.description}
            color={service.color}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceGrid;
