import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Construction, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="projects" 
      className="section-spacing bg-cream-dark"
      data-testid="projects-section"
    >
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block font-body text-sm font-medium text-maroon uppercase tracking-wider mb-4">
            Our Work
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Projects
          </h2>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8 items-center"
        >
          {/* Project Preview Image */}
          <div className="relative rounded-xl overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
              alt="Flagship Project Preview"
              className="w-full h-[350px] lg:h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
              data-testid="project-preview-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
            
            {/* Coming Soon Badge */}
            <div className="absolute top-4 left-4 bg-orange text-cream px-4 py-2 rounded-full font-body text-sm font-semibold">
              In Progress
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="font-heading text-2xl text-cream font-semibold mb-2">
                Flagship Eco-Luxury Residence
              </h3>
              <p className="font-body text-cream/80 text-sm">
                Bangalore • 3,500 Sq.Ft. • Aether Package
              </p>
            </div>
          </div>

          {/* Coming Soon Info */}
          <div className="bg-cream rounded-xl p-8 lg:p-10 border border-stone">
            <div className="w-14 h-14 rounded-full bg-orange/10 flex items-center justify-center mb-6">
              <Construction size={28} className="text-orange" />
            </div>
            
            <h3 className="font-heading text-2xl font-semibold text-charcoal mb-4">
              Coming Soon
            </h3>
            
            <p className="font-body text-charcoal/70 leading-relaxed mb-6">
              Our portfolio is growing! We're currently working on our flagship project - 
              a stunning eco-luxury residence that showcases everything Arkaa Scapes stands for.
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-maroon mt-2" />
                <span className="font-body text-charcoal/80">
                  100% sustainable materials and construction practices
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-maroon mt-2" />
                <span className="font-body text-charcoal/80">
                  Solar panel integration and rainwater harvesting
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-maroon mt-2" />
                <span className="font-body text-charcoal/80">
                  Premium finishes with low-VOC paints and materials
                </span>
              </li>
            </ul>

            <Button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-maroon hover:bg-maroon-dark text-cream font-body font-medium w-full sm:w-auto"
              data-testid="projects-cta"
            >
              Be Our Next Project
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
