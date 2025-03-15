import React, { useEffect, useState } from "react";
import { Search, Calendar, CheckCircle, ArrowRight } from "lucide-react";
import { useInView } from 'react-intersection-observer';

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  isInView: boolean;
}

const Step: React.FC<StepProps> = ({ number, title, description, icon, isActive, isInView }) => {
  return (
    <div 
      className={`flex flex-col items-center text-center transform
        ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        ${isActive ? 'scale-105' : 'scale-100'}
        transition-all duration-300`}
    >
      <div 
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white
          ${isActive ? 'bg-indigo-600' : 'bg-indigo-500'} 
          transition-colors duration-200 shadow-md`}
      >
        {icon}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm mb-3 mx-auto">
          {number}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true // Changed to true to reduce re-renders
  });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (inView) {
      interval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % 3);
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [inView]);

  const steps = [
    {
      number: 1,
      title: "Choose a Service",
      description: "Browse our list of services and select what you need.",
      icon: <Search className="w-7 h-7" />,
    },
    {
      number: 2,
      title: "Book Instantly",
      description: "Enter your details and confirm your service request.",
      icon: <Calendar className="w-7 h-7" />,
    },
    {
      number: 3,
      title: "Get It Done!",
      description: "A verified professional arrives ready to help.",
      icon: <CheckCircle className="w-7 h-7" />,
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting professional help is easier than ever
          </p>
        </div>

        {/* Process steps - Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <Step
                {...step}
                isActive={activeStep === index}
                isInView={inView}
              />
              {index < 2 && (
                <div className="absolute top-8 hidden xl:flex justify-center pointer-events-none" style={{ left: `${33.33 * (index + 0.5)}%` }}>
                  <ArrowRight 
                    className={`w-8 h-8 text-indigo-400 ${inView ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Process steps - Mobile */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-300`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white
                    ${activeStep === index ? 'bg-indigo-600' : 'bg-indigo-500'} 
                    transition-colors duration-200 mr-4 flex-shrink-0`}
                >
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs mr-2">
                      {step.number}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
              {index < 2 && (
                <div className="ml-6 my-4 flex justify-center">
                  <ArrowRight className="rotate-90 w-6 h-6 text-indigo-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {/* <div 
          className={`mt-12 text-center ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-500`}
          style={{ transitionDelay: '400ms' }}
        >
          <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-medium rounded-lg shadow-md transition-colors duration-200">
            Get Started Now
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default HowItWorks;