import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  Filter,
  Star,
  Grid,
  List,
  ChevronDown,
  ArrowUpDown,
  X,
} from "lucide-react";
import { ServiceCard } from "../components/Service";
import { serviceData, ServiceItemProps } from "../assets/data/service";

// Defined service categories
const serviceCategories = [
  "All",
  "Cleaning",
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Renovation",
  "Appliance",
  "Pest Control",
  "HVAC",
  "Painting",
  "Security",
];

// Sort options
const sortOptions = [
  { label: "Recommended", value: "recommended" },
  { label: "Highest Rated", value: "rating-desc" },
  { label: "Most Popular", value: "popular" },
];

const Services: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [services, setServices] = useState<ServiceItemProps[]>([]);
  const [filteredServices, setFilteredServices] = useState<ServiceItemProps[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("query") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch services (simulated API call)
  useEffect(() => {
    // In a real app, you would fetch from API
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        setServices(serviceData);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...services];

    // Apply search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (service) =>
          service.title.toLowerCase().includes(searchLower) ||
          service.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (selectedCategory !== "All") {
      result = result.filter((service) =>
        service.title.includes(selectedCategory)
      );
    }

    // Apply rating filter
    if (ratingFilter > 0) {
      // In a real app, you'd have rating data
      // This is placeholder logic
      result = result.filter(() => Math.random() > 0.3);
    }

    // Apply price range filter (placeholder logic)
    result = result.filter(() => true);

    // Apply sorting
    switch (sortBy) {
      case "rating-desc":
        // In a real app, you'd sort by actual ratings
        result = [...result].sort(() => Math.random() - 0.5);
        break;
      case "popular":
        // In a real app, you'd sort by booking count
        result = [...result].sort(() => Math.random() - 0.5);
        break;
      default:
        // Recommended is default
        break;
    }

    setFilteredServices(result);
  }, [
    services,
    searchTerm,
    selectedCategory,
    sortBy,
    ratingFilter,
    priceRange,
  ]);

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL search params
    if (searchTerm) {
      setSearchParams({ query: searchTerm });
    } else {
      setSearchParams({});
    }
  };

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  // Handle rating filter change
  const handleRatingChange = (rating: number) => {
    setRatingFilter(rating === ratingFilter ? 0 : rating);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("recommended");
    setPriceRange([0, 500]);
    setRatingFilter(0);
    setSearchParams({});
  };

  // Render star rating selector
  const renderStarRating = (maxRating: number = 5) => {
    return (
      <div className="flex items-center space-x-1 mb-3">
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              key={starValue}
              onClick={() => handleRatingChange(starValue)}
              className={`focus:outline-none ${
                starValue <= ratingFilter ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              <Star
                size={20}
                fill={starValue <= ratingFilter ? "currentColor" : "none"}
              />
            </button>
          );
        })}
        {ratingFilter > 0 && (
          <span className="ml-2 text-sm text-gray-600">
            {ratingFilter}+ stars
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Section with Search */}
      <div className="bg-indigo-600 text-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Find the Perfect Service for Your Home
          </h1>
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex items-center bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="pl-4 text-gray-500">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  placeholder="What service do you need?"
                  className="w-full py-4 px-3 text-gray-700 focus:outline-none bg-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="h-full px-6 py-4 bg-indigo-700 hover:bg-indigo-800 text-white font-medium transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            {serviceCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                } shadow-sm`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          {/* Active Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {(selectedCategory !== "All" ||
              ratingFilter > 0 ||
              searchTerm ||
              sortBy !== "recommended") && (
              <>
                <span className="text-sm text-gray-600">Active filters:</span>
                {selectedCategory !== "All" && (
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full flex items-center">
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("All")}
                      className="ml-1 hover:text-indigo-600"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {ratingFilter > 0 && (
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full flex items-center">
                    {ratingFilter}+ Stars
                    <button
                      onClick={() => setRatingFilter(0)}
                      className="ml-1 hover:text-indigo-600"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {searchTerm && (
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full flex items-center">
                    "{searchTerm}"
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSearchParams({});
                      }}
                      className="ml-1 hover:text-indigo-600"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {sortBy !== "recommended" && (
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full flex items-center">
                    {sortOptions.find((option) => option.value === sortBy)
                      ?.label || ""}
                    <button
                      onClick={() => setSortBy("recommended")}
                      className="ml-1 hover:text-indigo-600"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Clear all
                </button>
              </>
            )}
            {!selectedCategory && !ratingFilter && !searchTerm && (
              <span className="text-sm text-gray-500">
                Showing all services
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4 self-end md:self-auto">
            {/* Filter Toggle (Mobile) */}
            <button
              className="md:hidden flex items-center px-3 py-2 bg-white border rounded-md shadow-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={18} className="mr-1" />
              Filter
            </button>

            {/* View Mode Toggle */}
            <div className="flex bg-white shadow-sm rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${
                  viewMode === "grid"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <div className="flex items-center">
                <ArrowUpDown size={16} className="text-gray-500 mr-1" />
                <select
                  className="bg-white border rounded-md py-2 pl-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden md:block w-60 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Filters</h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">Category</h4>
                <div className="space-y-2">
                  {serviceCategories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-indigo-600"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => handleCategoryChange(category)}
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">Rating</h4>
                {renderStarRating()}
              </div>
            </div>
          </div>

          {/* Filters Sidebar - Mobile */}
          {isFilterOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
              onClick={() => setIsFilterOpen(false)}
            >
              <div
                className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-gray-800">Filters</h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Filter Content - Same as desktop */}
                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Category</h4>
                  <div className="space-y-2">
                    {serviceCategories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          className="form-radio h-4 w-4 text-indigo-600"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => handleCategoryChange(category)}
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Rating</h4>
                  {renderStarRating()}
                </div>

                {/* More Filters... */}
                {/* (Price range, availability, etc. - same as desktop) */}

                <div className="mt-8 flex space-x-4">
                  <button
                    onClick={() => clearFilters()}
                    className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="flex-1 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Services Grid */}
          <div className="flex-grow">
            {isLoading ? (
              // Loading skeleton
              <div
                className={`grid ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                } gap-6`}
              >
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm p-6 animate-pulse"
                  >
                    <div className="w-14 h-14 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-5 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-5/6"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredServices.length > 0 ? (
              <>
                <div
                  className={`grid ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1"
                  } gap-6`}
                >
                  {filteredServices.map((service) => (
                    <ServiceCard
                      key={`${service.id}-${service.title}`}
                      {...service}
                    />
                  ))}
                </div>
                {/* Pagination (if needed) */}
                {filteredServices.length > 9 && (
                  <div className="mt-10 flex justify-center">
                    <nav className="inline-flex rounded-md shadow-sm">
                      <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Previous
                      </button>
                      <button className="px-3 py-2 border-t border-b border-gray-300 bg-indigo-600 text-sm font-medium text-white">
                        1
                      </button>
                      <button className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        2
                      </button>
                      <button className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        3
                      </button>
                      <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No services found
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We couldn't find any services matching your criteria. Try
                  adjusting your filters or search term.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
