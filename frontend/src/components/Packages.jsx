import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const packages = [
  {
    name: 'Terra',
    subtitle: 'Essential Sustainable',
    price: '1,779',
    color: 'stone',
    popular: false,
    highlights: [
      { label: '2D & 3D Floor Plans', included: true },
      { label: 'Structural Drawings (IS Codes)', included: true },
      { label: '10\'0" Ceiling Height', included: true },
      { label: 'A1 Gold/Kamadhenu Steel', included: true },
      { label: 'Solid Concrete Blocks 6" & 4"', included: true },
      { label: 'Rainwater Harvesting', included: true },
      { label: 'Anti-Termite Treatment', included: true },
      { label: 'CCTV/EV Charging Provision', included: false },
      { label: 'VR & AR Tour', included: false },
    ],
    specs: {
      structure: 'A1 Gold/Kamadhenu Steel, M25 Grade RCC',
      kitchen: 'Granite Countertop (₹120/sqft), SS Sink (₹3000)',
      bathroom: 'Sanitary fittings upto ₹16,500 per bathroom',
      flooring: 'Vitrified Tiles (₹60/sqft)',
      doors: 'Teak Main Door (₹20,000)',
      electrical: 'Fireproof Wires (Anchor), GM Switches',
      painting: 'JK Putty + Tractor Emulsion Interior',
    },
  },
  {
    name: 'Solara',
    subtitle: 'Balanced Premium',
    price: '1,999',
    color: 'orange',
    popular: true,
    highlights: [
      { label: '2D & 3D Floor Plans', included: true },
      { label: 'Structural Drawings (IS Codes)', included: true },
      { label: '10\'6" Ceiling Height', included: true },
      { label: 'JSW Neo Steel/Indus', included: true },
      { label: 'Solid Concrete Blocks 6" & 4"', included: true },
      { label: 'Rainwater Harvesting', included: true },
      { label: 'Anti-Termite Treatment', included: true },
      { label: 'CCTV/EV Charging Provision', included: true },
      { label: 'VR & AR Tour', included: false },
    ],
    specs: {
      structure: 'JSW Neo Steel, M25 Grade RCC, ACC Cement',
      kitchen: 'Granite Countertop (₹150/sqft), SS Sink (₹6000)',
      bathroom: 'Sanitary fittings upto ₹28,000 per bathroom',
      flooring: 'Granite/Vitrified Tiles (₹100/sqft)',
      doors: 'Teak Main Door (₹40,000), Pooja Door Included',
      electrical: 'Finolex Wires, Anchor-Roma Switches',
      painting: 'JK Putty + Apcolite Premium Emulsion',
    },
  },
  {
    name: 'Aether',
    subtitle: 'Ultimate Luxury',
    price: '2,399',
    color: 'maroon',
    popular: false,
    highlights: [
      { label: '2D & 3D Floor Plans', included: true },
      { label: 'Structural Drawings (IS Codes)', included: true },
      { label: '11\'0" Ceiling Height', included: true },
      { label: 'TATA Steel', included: true },
      { label: 'Hydraulic Pressed Blocks', included: true },
      { label: 'Rainwater Harvesting', included: true },
      { label: 'Anti-Termite Treatment', included: true },
      { label: 'CCTV/EV Charging Provision', included: true },
      { label: 'VR & AR Tour', included: true },
    ],
    specs: {
      structure: 'TATA Steel, M25 Grade RCC, Ultratech Cement',
      kitchen: 'Quartz Countertop (₹500/sqft), Premium Sink (₹9000)',
      bathroom: 'Kohler fittings upto ₹40,000 per bathroom',
      flooring: 'Premium Vitrified/Granite (₹140/sqft)',
      doors: 'Teak Main Door (₹55,000), Premium Pooja Door',
      electrical: 'Havells Wires, Legrand/GM Modular Switches',
      painting: 'Birla Putty + Apex Ultima Exterior',
    },
  },
];

const PackageCard = ({ pkg, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const colorClasses = {
    stone: { bg: 'bg-stone/20', border: 'border-stone', accent: 'text-charcoal' },
    orange: { bg: 'bg-orange/10', border: 'border-orange', accent: 'text-orange' },
    maroon: { bg: 'bg-maroon/10', border: 'border-maroon', accent: 'text-maroon' },
  };

  const colors = colorClasses[pkg.color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`package-card bg-cream-light rounded-xl border-2 ${colors.border} overflow-hidden ${
        pkg.popular ? 'package-premium ring-2 ring-orange ring-offset-4 ring-offset-cream' : ''
      }`}
      data-testid={`package-card-${pkg.name.toLowerCase()}`}
    >
      {/* Popular Badge */}
      {pkg.popular && (
        <div className="bg-orange text-cream text-center py-2 font-body text-sm font-semibold">
          Most Chosen
        </div>
      )}

      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <span className={`font-body text-sm font-medium ${colors.accent} uppercase tracking-wider`}>
            {pkg.subtitle}
          </span>
          <h3 className="font-heading text-2xl lg:text-3xl font-bold text-charcoal mt-2">
            {pkg.name}
          </h3>
          <div className="mt-4">
            <span className="font-heading text-4xl font-bold text-charcoal">₹{pkg.price}</span>
            <span className="font-body text-charcoal/60">/Sq.Ft.</span>
          </div>
        </div>

        {/* Highlights */}
        <ul className="space-y-3 mb-6">
          {pkg.highlights.map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              {item.included ? (
                <Check size={18} className="text-green-600 flex-shrink-0" />
              ) : (
                <X size={18} className="text-charcoal/30 flex-shrink-0" />
              )}
              <span className={`font-body text-sm ${item.included ? 'text-charcoal' : 'text-charcoal/40'}`}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          className={`w-full font-body font-medium ${
            pkg.popular 
              ? 'bg-orange hover:bg-orange-dark text-cream' 
              : 'bg-maroon hover:bg-maroon-dark text-cream'
          }`}
          data-testid={`package-enquire-${pkg.name.toLowerCase()}`}
        >
          Enquire Now
        </Button>

        {/* Expandable Specs */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 mt-4 pt-4 border-t border-stone text-charcoal/70 hover:text-charcoal transition-colors"
          data-testid={`package-expand-${pkg.name.toLowerCase()}`}
        >
          <span className="font-body text-sm">
            {isExpanded ? 'Hide Details' : 'View Full Specifications'}
          </span>
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {/* Expanded Specs */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-stone"
          >
            <div className="space-y-4">
              {Object.entries(pkg.specs).map(([key, value]) => (
                <div key={key}>
                  <h4 className="font-body text-xs font-semibold text-charcoal uppercase tracking-wider mb-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </h4>
                  <p className="font-body text-sm text-charcoal/70">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const Packages = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="packages" 
      className="section-spacing bg-cream-dark"
      data-testid="packages-section"
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-block font-body text-sm font-medium text-maroon uppercase tracking-wider mb-4">
            Choose Your Package
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Turnkey Packages
          </h2>
          <p className="font-body text-base lg:text-lg text-charcoal/70 max-w-2xl mx-auto">
            Transparent pricing with comprehensive specifications. Every package includes 
            our commitment to sustainable, eco-friendly construction.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.name} pkg={pkg} index={index} />
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center font-body text-sm text-charcoal/60 mt-8"
        >
          * All prices are inclusive of GST. Custom packages available on request.
        </motion.p>
      </div>
    </section>
  );
};

export default Packages;
