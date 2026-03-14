import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube, ArrowUp } from 'lucide-react';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_cf026f49-75f8-48ba-accf-6fda5e741c80/artifacts/w1waun4y_WhatsApp%20Image%202026-03-14%20at%2019.28.21.jpeg";

const footerLinks = {
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
  packages: [
    { label: 'Terra Package', href: '#packages' },
    { label: 'Solara Package', href: '#packages' },
    { label: 'Aether Package', href: '#packages' },
    { label: 'Custom Builds', href: '#contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href) => {
    if (href.startsWith('#') && href !== '#') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-charcoal text-cream pt-16 pb-8" data-testid="footer">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={LOGO_URL} 
                alt="Arkaa Scapes Logo" 
                className="h-16 w-16 object-contain rounded-md bg-cream"
              />
              <span className="font-heading text-xl font-semibold text-cream">
                Arkaa Scapes
              </span>
            </div>
            <p className="font-body text-cream/70 text-sm leading-relaxed mb-6">
              Building Tomorrow's Legacy, Today. Premium eco-luxury home construction 
              in Bangalore with a commitment to sustainability and craftsmanship.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-maroon transition-colors"
                    data-testid={`footer-social-${social.label.toLowerCase()}`}
                  >
                    <Icon size={18} className="text-cream" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-cream mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="font-body text-sm text-cream/70 hover:text-orange transition-colors"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-cream mb-4">
              Packages
            </h4>
            <ul className="space-y-3">
              {footerLinks.packages.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="font-body text-sm text-cream/70 hover:text-orange transition-colors"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-cream mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-cream/70 hover:text-orange transition-colors"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cream/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-sm text-cream/50">
              © {new Date().getFullYear()} Arkaa Scapes. All rights reserved.
            </p>
            
            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 font-body text-sm text-cream/70 hover:text-orange transition-colors"
              data-testid="back-to-top-btn"
            >
              Back to top
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
