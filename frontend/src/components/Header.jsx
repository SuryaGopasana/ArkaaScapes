import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_cf026f49-75f8-48ba-accf-6fda5e741c80/artifacts/w1waun4y_WhatsApp%20Image%202026-03-14%20at%2019.28.21.jpeg";

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Process', href: '#process' },
  { label: 'About Us', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Contact', href: '#contact' },
];

const Header = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-cream/95 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
      data-testid="header"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a 
            href="#home" 
            className="flex items-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            data-testid="logo-link"
          >
            <img 
              src={LOGO_URL} 
              alt="Arkaa Scapes Logo" 
              className="h-16 w-16 object-contain rounded-md"
            />
            <span className="font-heading text-xl font-semibold text-maroon hidden sm:block">
              Arkaa Scapes
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
            {navItems.slice(0, 6).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link text-charcoal hover:text-maroon transition-colors font-body text-sm font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => scrollToSection('#contact')}
              className="border-maroon text-maroon hover:bg-maroon/10 font-body font-medium px-5"
              data-testid="contact-btn"
            >
              Contact
            </Button>
            <Button
              onClick={() => scrollToSection('#contact')}
              className="bg-maroon hover:bg-maroon-dark text-cream font-body font-medium px-5"
              data-testid="get-quote-btn"
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-charcoal"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-cream border-t border-stone"
            data-testid="mobile-menu"
          >
            <nav className="container-custom py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-charcoal hover:text-maroon transition-colors font-body text-base py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  data-testid={`mobile-nav-${item.label.toLowerCase().replace(' ', '-')}`}
                >
                  {item.label}
                </a>
              ))}
              <Button
                onClick={() => scrollToSection('#contact')}
                className="bg-maroon hover:bg-maroon-dark text-cream font-body font-medium w-full mt-4"
                data-testid="mobile-get-quote-btn"
              >
                Get Quote
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
