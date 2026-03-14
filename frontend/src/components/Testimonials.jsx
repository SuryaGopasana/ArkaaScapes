import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="testimonials" 
      className="section-spacing bg-cream"
      data-testid="testimonials-section"
    >
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block font-body text-sm font-medium text-orange uppercase tracking-wider mb-4">
            Client Stories
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            The Journey Begins
          </h2>
        </motion.div>

        {/* Coming Soon Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-cream-dark rounded-xl p-8 lg:p-12 border border-stone text-center">
            <div className="w-16 h-16 rounded-full bg-maroon/10 flex items-center justify-center mx-auto mb-6">
              <Clock size={32} className="text-maroon" />
            </div>
            
            <h3 className="font-heading text-2xl font-semibold text-charcoal mb-4">
              Our Flagship Project is Underway
            </h3>
            
            <p className="font-body text-charcoal/70 leading-relaxed mb-6 max-w-xl mx-auto">
              Our first eco-luxury residence is currently under construction, and we're documenting 
              every step of the journey. Be among the first to witness our commitment to quality 
              and sustainable innovation.
            </p>

            <div className="bg-cream rounded-lg p-6 mb-8 border border-stone">
              <p className="font-body text-charcoal/80 italic">
                "Working with Arkaa Scapes has been an incredible experience. Their attention to 
                sustainable materials and design details gives us confidence that our home will be 
                both beautiful and environmentally responsible."
              </p>
              <p className="font-body text-sm text-maroon font-semibold mt-4">
                — First Client, Flagship Project
              </p>
            </div>

            <Button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-maroon hover:bg-maroon-dark text-cream font-body font-medium"
              data-testid="testimonials-cta"
            >
              Start Your Journey
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
