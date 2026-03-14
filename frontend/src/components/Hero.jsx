import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HERO_IMAGE = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-cream">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#6B1C23" strokeWidth="0.5"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-maroon/10 text-maroon px-4 py-2 rounded-full mb-6"
            >
              <Leaf size={16} />
              <span className="font-body text-sm font-medium">Eco-Luxury Construction</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight mb-6"
            >
              Building Tomorrow's
              <span className="text-maroon block">Legacy, Today</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-body text-base lg:text-lg text-charcoal/70 mb-8 max-w-xl"
            >
              We are a new-age construction firm in Bangalore, dedicated to crafting premium, 
              eco-conscious residences that blend timeless design with modern sustainability. 
              Your vision, built responsibly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={scrollToContact}
                className="bg-maroon hover:bg-maroon-dark text-cream font-body font-medium px-8 py-6 text-base"
                data-testid="hero-cta-btn"
              >
                Book Free Consultation
                <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button
                variant="outline"
                onClick={() => document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-stone hover:bg-stone/50 text-charcoal font-body font-medium px-8 py-6 text-base"
                data-testid="hero-packages-btn"
              >
                View Packages
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6 mt-10 pt-10 border-t border-stone"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center">
                  <Leaf size={20} className="text-maroon" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-charcoal">100% Eco-Friendly</p>
                  <p className="font-body text-xs text-charcoal/60">Sustainable Materials</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center">
                  <Shield size={20} className="text-orange" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-charcoal">10 Year Warranty</p>
                  <p className="font-body text-xs text-charcoal/60">Structural Guarantee</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center">
                  <Clock size={20} className="text-maroon" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-charcoal">On-Time Delivery</p>
                  <p className="font-body text-xs text-charcoal/60">Committed Timelines</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Animated Architecture */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={HERO_IMAGE}
                  alt="Modern Eco-Luxury Home"
                  className="w-full h-[400px] lg:h-[550px] object-cover"
                  data-testid="hero-image"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
              </div>

              {/* Animated Architecture Lines SVG */}
              <svg
                className="absolute -top-8 -right-8 w-48 h-48 opacity-80"
                viewBox="0 0 200 200"
                fill="none"
              >
                <motion.path
                  d="M20 180 L20 60 L100 20 L180 60 L180 180"
                  stroke="#6B1C23"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.path
                  d="M60 180 L60 100 L100 80 L140 100 L140 180"
                  stroke="#D35400"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="100"
                  cy="50"
                  r="8"
                  fill="#D35400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                />
              </svg>

              {/* Bottom left decoration */}
              <svg
                className="absolute -bottom-8 -left-8 w-32 h-32 opacity-60"
                viewBox="0 0 150 150"
                fill="none"
              >
                <motion.rect
                  x="20"
                  y="20"
                  width="110"
                  height="110"
                  stroke="#E8DED5"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
                <motion.rect
                  x="40"
                  y="40"
                  width="70"
                  height="70"
                  stroke="#6B1C23"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1.3 }}
                />
              </svg>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-cream rounded-xl shadow-xl p-4 border border-stone"
              >
                <p className="font-heading text-2xl font-bold text-maroon">₹1,779+</p>
                <p className="font-body text-sm text-charcoal/70">Starting per Sq.Ft.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
