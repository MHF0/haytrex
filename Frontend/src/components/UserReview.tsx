import React, { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Review, reviewsData } from "../assets/data/review";

// Star Rating Component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={18}
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

// Single Review Card Component
const ReviewCard: React.FC<{
  review: Review;
  isVisible: boolean;
  index: number;
}> = ({ review, isVisible, index }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <img
              src={review.avatar}
              alt={`${review.name}'s profile`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/images/avatars/default-avatar.jpg";
              }}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{review.name}</h4>
            <p className="text-sm text-gray-600">{review.service}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end">
            <StarRating rating={review.rating} />
            <span className="ml-2 text-gray-700 font-medium">
              {review.rating.toFixed(1)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{review.date}</p>
        </div>
      </div>
      <div className="relative">
        <Quote
          size={24}
          className="absolute -top-3 -left-1 text-indigo-100 rotate-180"
        />
        <p className="text-gray-600 italic pl-5">{review.text}</p>
        <Quote
          size={24}
          className="absolute -bottom-3 -right-1 text-indigo-100"
        />
      </div>
      {review.verified && (
        <div className="flex items-center mt-4 text-green-600 text-sm">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Verified Customer
        </div>
      )}
    </div>
  );
};

// Main UserReview Component with Testimonial Slider
const UserReview: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const reviewsPerView = 3;
  const totalSlides = Math.ceil(reviewsData.length / reviewsPerView);

  const nextSlide = useCallback(() => {
    if (!animating) {
      setAnimating(true);
      setActiveSlide((prev) => (prev + 1) % totalSlides);
      setTimeout(() => setAnimating(false), 700);
    }
  }, [animating, totalSlides]);

  const prevSlide = useCallback(() => {
    if (!animating) {
      setAnimating(true);
      setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      setTimeout(() => setAnimating(false), 700);
    }
  }, [animating, totalSlides]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (inView && autoplay) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [inView, autoplay, nextSlide]);

  const visibleReviews = reviewsData.slice(
    activeSlide * reviewsPerView,
    activeSlide * reviewsPerView + reviewsPerView
  );

  // Handle responsive display
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate how many reviews to show based on screen size
  let displayedReviews = visibleReviews;
  if (isMobile) {
    displayedReviews = visibleReviews.slice(0, 1);
  } else if (isTablet) {
    displayedReviews = visibleReviews.slice(0, 2);
  }

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Read honest reviews from real customers who have experienced our
            services
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
            <button
              onClick={prevSlide}
              className="bg-white rounded-full w-10 h-10 shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 focus:outline-none"
              disabled={animating}
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
            <button
              onClick={nextSlide}
              className="bg-white rounded-full w-10 h-10 shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 focus:outline-none"
              disabled={animating}
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Reviews Grid */}
          <div className="mx-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedReviews.map((review, index) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  isVisible={inView}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  activeSlide === index ? "bg-indigo-600" : "bg-gray-300"
                }`}
                onClick={() => {
                  if (!animating) {
                    setAnimating(true);
                    setActiveSlide(index);
                    setTimeout(() => setAnimating(false), 700);
                  }
                }}
                onMouseEnter={() => setAutoplay(false)}
                onMouseLeave={() => setAutoplay(true)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserReview;
