import React from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Rocket, ArrowRight } from "lucide-react";

const CallToAction: React.FC = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const handleRequestService = () => {
    navigate("/request");
  };

  return (
    <section 
      ref={ref}
      className="relative py-16 bg-gradient-to-r from-indigo-600 to-indigo-800 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 800 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="40" cy="40" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="800" height="800" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          className={`flex flex-col md:flex-row md:items-center md:justify-between transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Left Content */}
          <div className="mb-8 md:mb-0 md:mr-8">
            <div className="flex items-center mb-2">
              <Rocket className="text-white mr-2" size={24} />
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Need a Service Now?
              </h2>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-indigo-200">
              Get a Trusted Professional in Minutes!
            </p>
            <p className="mt-2 text-indigo-100 max-w-lg">
              We connect you with verified professionals for all your home service needs. 
              Fast booking, quality service, satisfaction guaranteed.
            </p>
          </div>

          {/* Right Content - CTA Button */}
          <div 
            className={`transition-all duration-700 delay-300 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <button
              onClick={handleRequestService}
              className="w-full md:w-auto text-center px-8 py-4 bg-white text-indigo-600 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform flex items-center justify-center group"
            >
              Request a Service
              <ArrowRight 
                className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                size={20} 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 48"
          fill="white"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C720,96 1440,0 1440,0 L1440,96 L0,96 L0,0 Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default CallToAction;