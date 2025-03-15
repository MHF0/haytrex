import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ChevronRight
} from "lucide-react";

// Footer Quick Links with type definitions
interface QuickLinkSection {
  title: string;
  links: Array<{
    name: string;
    to: string;
    external?: boolean;
  }>;
}

const Footer: React.FC = () => {
  // Current year for copyright
  const currentYear = new Date().getFullYear();

  // Quick links sections
  const quickLinks: QuickLinkSection[] = [
    {
      title: "Company",
      links: [
        { name: "About Us", to: "/about" },
        { name: "Careers", to: "/careers" },
        { name: "Our Team", to: "/team" },
        { name: "Contact", to: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Plumbing", to: "/services/plumbing" },
        { name: "Electrical", to: "/services/electrical" },
        { name: "Cleaning", to: "/services/cleaning" },
        { name: "All Services", to: "/services" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", to: "/help" },
        { name: "FAQs", to: "/faqs" },
        { name: "Cancellation Policy", to: "/cancellation" },
        { name: "Refund Policy", to: "/refund" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", to: "/privacy" },
        { name: "Terms of Service", to: "/terms" },
        { name: "Cookie Policy", to: "/cookies" },
        { name: "Accessibility", to: "/accessibility" },
      ],
    },
  ];

  // Social media links
  const socialLinks = [
    { name: "Facebook", icon: <Facebook size={20} />, href: "https://facebook.com" },
    { name: "Twitter", icon: <Twitter size={20} />, href: "https://twitter.com" },
    { name: "Instagram", icon: <Instagram size={20} />, href: "https://instagram.com" },
    { name: "LinkedIn", icon: <Linkedin size={20} />, href: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Information */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-indigo-600">HAYTREX</span>
            </div>
            <p className="text-gray-600 mb-6">
              Professional home services at your fingertips. Quality work, verified professionals,
              and customer satisfaction guaranteed.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={18} className="text-indigo-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-600">
                  123 Service Avenue, Suite 101<br />
                  Boston, MA 02108
                </span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="text-indigo-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600">(617) 555-0123</span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="text-indigo-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600">support@haytrex.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links Sections */}
          {quickLinks.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="text-gray-800 font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.external ? (
                      <a 
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center"
                      >
                        <ChevronRight size={14} className="mr-1" />
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center"
                      >
                        <ChevronRight size={14} className="mr-1" />
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-200 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-6 md:mb-0">
              <h4 className="text-gray-800 font-bold mb-2">Subscribe to our newsletter</h4>
              <p className="text-gray-600 text-sm">Stay updated with our latest services and offers</p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
                />
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-r font-medium hover:bg-indigo-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Social Icons and Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full text-gray-600 hover:text-indigo-600 hover:shadow-md transition-all duration-200"
                aria-label={`Follow us on ${social.name}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <div className="text-gray-500 text-sm text-center md:text-right">
            <p>&copy; {currentYear} HAYTREX. All rights reserved.</p>
            <p className="mt-1">
              <Link to="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
              {" • "}
              <Link to="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;