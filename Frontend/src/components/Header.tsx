import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  User,
  Home,
  Phone,
  Briefcase,
  Settings,
} from "lucide-react";

interface NavItem {
  name: string;
  to: string;
  icon: React.ReactNode;
  requiresAuth?: boolean;
}

const Header: React.FC = () => {
  const location = useLocation();
  const isLoggedIn = false; // Replace with actual auth state

  // No need for any dark mode state or effects

  const navItems: NavItem[] = [
    { name: "Home", to: "/", icon: <Home size={20} /> },
    { name: "Services", to: "/services", icon: <Settings size={20} /> },
    { name: "My Requests", to: "/requests", icon: <Briefcase size={20} />, requiresAuth: true },
    { name: "Contact", to: "/contact", icon: <Phone size={20} /> },
  ];

  // Filter nav items based on authentication status
  const filteredNavItems = navItems.filter(item => !item.requiresAuth || isLoggedIn);

  return (
    <>
      {/* Desktop Header */}
      <header className="bg-white shadow-md hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-indigo-600">
                  HAYTREX
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="flex items-center">
              <nav className="ml-10 flex items-center space-x-2">
                {filteredNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      location.pathname === item.to
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Login/Register or Profile */}
              {isLoggedIn ? (
                <Link
                  to="/profile"
                  className="ml-4 flex items-center px-4 py-2 rounded-md text-sm font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors duration-200"
                >
                  <User size={18} className="mr-2" />
                  Profile
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="ml-4 px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow"
                >
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Top Mini Header (just logo) */}
      <header className="bg-white shadow-sm md:hidden fixed top-0 left-0 right-0 z-10">
        <div className="px-4 py-2 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-lg font-bold text-indigo-600">
              HAYTREX
            </span>
          </Link>
          {/* Removed dark mode toggle button */}
        </div>
      </header>

      {/* Mobile Bottom Tab Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-10 border-t border-gray-200">
        <div className="flex justify-around">
          {filteredNavItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={`flex flex-col items-center py-2 px-3 ${
                location.pathname === item.to
                  ? "text-indigo-600"
                  : "text-gray-600"
              }`}
            >
              <div
                className={`p-1 rounded-full ${
                  location.pathname === item.to
                    ? "bg-indigo-100"
                    : ""
                }`}
              >
                {item.icon}
              </div>
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
          {isLoggedIn ? (
            <Link
              to="/profile"
              className={`flex flex-col items-center py-2 px-3 ${
                location.pathname === "/profile"
                  ? "text-indigo-600"
                  : "text-gray-600"
              }`}
            >
              <div
                className={`p-1 rounded-full ${
                  location.pathname === "/profile"
                    ? "bg-indigo-100"
                    : ""
                }`}
              >
                <User size={20} />
              </div>
              <span className="text-xs mt-1">Profile</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className={`flex flex-col items-center py-2 px-3 ${
                location.pathname === "/login"
                  ? "text-indigo-600"
                  : "text-gray-600"
              }`}
            >
              <div
                className={`p-1 rounded-full ${
                  location.pathname === "/login"
                    ? "bg-indigo-100"
                    : ""
                }`}
              >
                <User size={20} />
              </div>
              <span className="text-xs mt-1">Login</span>
            </Link>
          )}
        </div>
      </nav>

      {/* Add padding to the main content to account for fixed mobile navigation */}
      <style>{`
        @media (max-width: 767px) {
          #root > div:not([class*="fixed"]) {
            padding-top: 48px;
            padding-bottom: 64px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
