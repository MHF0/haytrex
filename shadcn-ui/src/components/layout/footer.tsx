import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { COMPANY } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-dark text-white" id="footer">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 hover-effect mb-4">

              <span className="font-bold text-2xl text-white">{COMPANY.name}</span>
            </Link>
            <p className="text-gray-300 text-sm">
              {COMPANY.shortDescription}
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a 
                href={COMPANY.socialMedia.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a 
                href={COMPANY.socialMedia.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a 
                href={COMPANY.socialMedia.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Button 
                  variant="link" 
                  className="text-gray-300 hover:text-accent p-0 h-auto font-normal text-sm hover:no-underline"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Our Services
                </Button>
              </li>
              <li>
                <Button 
                  variant="link" 
                  className="text-gray-300 hover:text-accent p-0 h-auto font-normal text-sm hover:no-underline"
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  About Us
                </Button>
              </li>
              <li>
                <Button 
                  variant="link" 
                  className="text-gray-300 hover:text-accent p-0 h-auto font-normal text-sm hover:no-underline"
                  onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Free Consultation
                </Button>
              </li>
              <li>
                <Button 
                  variant="link" 
                  className="text-gray-300 hover:text-accent p-0 h-auto font-normal text-sm hover:no-underline"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Contact Us
                </Button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Button 
                  variant="link" 
                  className="text-gray-300 hover:text-accent p-0 h-auto font-normal text-sm hover:no-underline"
                >
                  Business Formation
                </Button>
              </li>
              <li>
                <Button 
                  variant="link" 
                  className="text-gray-300 hover:text-accent p-0 h-auto font-normal text-sm hover:no-underline"
                >
                  Business Consulting
                </Button>
              </li>
              <li>
                <Button 
                  variant="link" 
                  className="text-gray-300 hover:text-accent p-0 h-auto font-normal text-sm hover:no-underline"
                >
                  Accounting Services
                </Button>
              </li>
              <li>
                <Button 
                  variant="link" 
                  className="text-gray-300 hover:text-accent p-0 h-auto font-normal text-sm hover:no-underline"
                >
                  Business Plan Development
                </Button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="font-medium mr-2">Address:</span>
                <span>{COMPANY.address}</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-2">Phone:</span>
                <a href={`tel:${COMPANY.phone}`} className="hover:text-accent transition-colors">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-2">Email:</span>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-accent transition-colors">
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} {COMPANY.name}. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}