"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import { Link } from "react-router-dom";
import { Menu, X, ExternalLink } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToElement = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to open links in new tabs
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const serviceFeatures = {
  business_formation: [
    "LLC, Corporation, & Partnership formation",
    "State filings and compliance",
    "EIN application assistance",
    "Operating agreements & corporate bylaws"
  ],
  business_consulting: [
    "Business strategy development",
    "Process optimization",
    "Market entry strategies",
    "Growth planning and scaling"
  ],
  business_plan: [
    "Market research & analysis",
    "Financial projections",
    "Executive summaries",
    "Investor presentation decks"
  ]
};

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full transition-all duration-300",
      isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-md py-2" 
        : "bg-transparent py-4"
    )}>
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 hover-effect">
          <span className="font-bold text-3xl">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Haytrex</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {/* Services Menu */}
            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className="bg-transparent hover:bg-transparent hover:text-accent focus:bg-transparent"
              >
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] grid-cols-2">
                  <ListItem 
                    title="Business Formation" 
                    href="/service/business_formation" 
                    newTab={false}
                    className="hover:bg-accent/10"
                  >
                    Establish your business entity with expert guidance
                  </ListItem>
                  <ListItem 
                    title="Business Consulting" 
                    href="/service/business_consulting" 
                    newTab={false}
                    className="hover:bg-accent/10"
                  >
                    Strategic advice for business growth and optimization
                  </ListItem>
                  {/* Accounting has no detail page of its own yet, so this
                      points at the services listing rather than a dead URL. */}
                  <ListItem
                    title="Accounting Services"
                    href="/services"
                    newTab={false}
                    className="hover:bg-accent/10"
                  >
                    Professional financial management and reporting
                  </ListItem>
                  <ListItem 
                    title="Business Plan Development" 
                    href="/service/business_plan" 
                    newTab={false}
                    className="hover:bg-accent/10"
                  >
                    Comprehensive business plans for funding and strategy
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Regular Links */}
            <NavigationMenuItem>
              <Button 
                variant="link" 
                className="text-foreground hover:text-accent hover:no-underline"
                onClick={() => openInNewTab('/about')}
              >
                <span className="flex items-center">
                  About Us
                  <ExternalLink className="ml-1 h-3 w-3" />
                </span>
              </Button>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Button 
                variant="link" 
                className="text-foreground hover:text-accent hover:no-underline"
                onClick={() => openInNewTab('/consultation')}
              >
                <span className="flex items-center">
                  Consultation
                  <ExternalLink className="ml-1 h-3 w-3" />
                </span>
              </Button>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Button 
                variant="link" 
                className="text-foreground hover:text-accent hover:no-underline"
                onClick={() => openInNewTab('/contact')}
              >
                <span className="flex items-center">
                  Contact
                  <ExternalLink className="ml-1 h-3 w-3" />
                </span>
              </Button>
            </NavigationMenuItem>

            {/* New Sections */}
            <NavigationMenuItem>
              <Button 
                variant="link" 
                className="text-foreground hover:text-accent hover:no-underline"
                onClick={() => openInNewTab('/business-map')}
              >
                <span className="flex items-center">
                  Business Map
                  <ExternalLink className="ml-1 h-3 w-3" />
                </span>
              </Button>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Button 
                variant="link" 
                className="text-foreground hover:text-accent hover:no-underline"
                onClick={() => openInNewTab('/work-feed')}
              >
                <span className="flex items-center">
                  Work Feed
                  <ExternalLink className="ml-1 h-3 w-3" />
                </span>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Button 
            variant="default" 
            className="h-11 rounded-md px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            onClick={() => openInNewTab('/consultation')}
          >
            Free Consultation
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[64px] z-30 flex flex-col bg-white shadow-lg p-6 space-y-6 animate-in slide-in-from-right">
          <Button 
            variant="ghost" 
            className="justify-start text-lg font-medium"
            onClick={() => openInNewTab('/services')}
          >
            <span className="flex items-center">
              Services
              <ExternalLink className="ml-1 h-3 w-3" />
            </span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="justify-start text-lg font-medium"
            onClick={() => openInNewTab('/about')}
          >
            <span className="flex items-center">
              About Us
              <ExternalLink className="ml-1 h-3 w-3" />
            </span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="justify-start text-lg font-medium"
            onClick={() => openInNewTab('/consultation')}
          >
            <span className="flex items-center">
              Consultation
              <ExternalLink className="ml-1 h-3 w-3" />
            </span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="justify-start text-lg font-medium"
            onClick={() => openInNewTab('/contact')}
          >
            <span className="flex items-center">
              Contact
              <ExternalLink className="ml-1 h-3 w-3" />
            </span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="justify-start text-lg font-medium"
            onClick={() => openInNewTab('/business-map')}
          >
            <span className="flex items-center">
              Business Map
              <ExternalLink className="ml-1 h-3 w-3" />
            </span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="justify-start text-lg font-medium"
            onClick={() => openInNewTab('/work-feed')}
          >
            <span className="flex items-center">
              Work Feed
              <ExternalLink className="ml-1 h-3 w-3" />
            </span>
          </Button>
          
          <Button 
            className="h-11 rounded-md px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 w-full text-white"
            onClick={() => openInNewTab('/consultation')}
          >
            <span className="flex items-center justify-center">
              Free Consultation
              <ExternalLink className="ml-1 h-3 w-3" />
            </span>
          </Button>
        </div>
      )}
    </header>
  );
}

interface ListItemProps {
  className?: string;
  title: string;
  href: string;
  newTab?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const ListItem = ({ className, title, href, newTab = false, onClick, children }: ListItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (newTab) {
      e.preventDefault();
      window.open(href, '_blank', 'noopener,noreferrer');
    }
    
    if (onClick) {
      onClick();
    }
  };
  
  return (
    <li onClick={handleClick}>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover-effect",
            className
          )}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noopener noreferrer" : undefined}
        >
          <div className="text-sm font-medium leading-none text-primary flex items-center">
            {title}
            {newTab && <ExternalLink className="ml-1 h-3 w-3" />}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};