import React, { useState, useEffect } from "react";
import { ArrowDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroImage from "../assets/images/hero.png";

// Popular service categories for search suggestions
const popularServices = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "House Cleaning",
  "Painter",
  "AC Repair",
  "Pest Control",
  "Appliance Repair",
];

const Hero: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const navigate = useNavigate();

  // Track scroll position for animation effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleServiceSelect = (service: string) => {
    setSearchTerm(service);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/services?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Scroll to the next section
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("services-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter services based on search term
  const filteredServices = popularServices.filter((service) =>
    service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image with Lighter Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(25, 47, 89, 0.75), rgba(61, 51, 121, 0.65)), url(${HeroImage})`,
        }}
      ></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 pb-32 md:pt-32 text-center flex-grow">
        <div className="max-w-3xl mx-auto">
          {/* Main Title with Animation */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{
              opacity: Math.max(1 - scrollPosition / 500, 0.2),
              transform: `translateY(${Math.min(scrollPosition * 0.1, 20)}px)`,
            }}
          >
            Book Professional Home Services in Seconds!
          </h1>

          <p
            className="text-lg md:text-xl text-gray-100 mb-10"
            style={{
              opacity: Math.max(1 - scrollPosition / 400, 0.2),
              transform: `translateY(${Math.min(scrollPosition * 0.15, 30)}px)`,
            }}
          >
            Get help from verified professionals for all your home needs
          </p>

          {/* Search Bar */}
          <div
            className="w-full max-w-xl mx-auto mb-10"
            style={{
              opacity: Math.max(1 - scrollPosition / 600, 0.5),
              transform: `translateY(${Math.min(scrollPosition * 0.05, 10)}px)`,
            }}
          >
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="pl-4 text-gray-500">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  placeholder="What service do you need?"
                  className="w-full py-4 px-3 text-gray-700 focus:outline-none bg-transparent"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <button
                  type="submit"
                  className="h-full px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
                >
                  Search
                </button>
              </div>

              {/* Always show filtered services dropdown when search term exists */}
              {searchTerm && filteredServices.length > 0 && (
                <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                  <ul>
                    {filteredServices.map((service) => (
                      <li
                        key={service}
                        className="px-4 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-0"
                        onClick={() => handleServiceSelect(service)}
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </div>

          {/* Big CTA Button */}
          <button
            className="py-4 px-8 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => navigate("/services")}
            style={{
              opacity: Math.max(1 - scrollPosition / 700, 0.5),
              transform: `translateY(${Math.min(scrollPosition * 0.03, 5)}px)`,
            }}
          >
            Request a Service Now
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce"
        style={{ opacity: Math.max(1 - scrollPosition / 200, 0) }}
      >
        <button
          onClick={scrollToNextSection}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown className="text-white" size={24} />
        </button>
      </div>
    </div>
  );
};

export default Hero;
