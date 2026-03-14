import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, Award, Users, Target } from 'lucide-react';

const values = [
  {
    icon: Leaf,
    title: 'Sustainability First',
    description: 'Every decision we make prioritizes environmental responsibility without compromising on luxury.',
  },
  {
    icon: Award,
    title: 'Uncompromising Quality',
    description: 'Premium materials, expert craftsmanship, and attention to detail in every square foot.',
  },
  {
    icon: Users,
    title: 'Client Partnership',
    description: 'We treat every project as a collaboration, ensuring your vision guides our execution.',
  },
  {
    icon: Target,
    title: 'Transparent Process',
    description: 'No hidden costs, no surprises. Just honest communication from start to finish.',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="about" 
      className="section-spacing bg-cream-dark"
      data-testid="about-section"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                alt="Modern sustainable home interior"
                className="w-full h-[400px] lg:h-[500px] object-cover"
                data-testid="about-image"
              />
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-maroon rounded-xl p-6 shadow-xl max-w-[200px]"
            >
              <p className="font-heading text-3xl font-bold text-cream">4+</p>
              <p className="font-body text-sm text-cream/80">Years of Expertise</p>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block font-body text-sm font-medium text-maroon uppercase tracking-wider mb-4">
              About Us
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6">
              Born from a Passion for Green Building
            </h2>
            <div className="space-y-4 font-body text-charcoal/70 leading-relaxed mb-8">
              <p>
                We're a young, ambitious firm driven by a bold vision — to redefine what 
                eco-luxury means in residential construction. Fresh perspectives meet proven expertise.
              </p>
              <p>
                We launched <span className="text-maroon font-semibold">Arkaa Scapes</span> with 
                a singular mission: to prove that ultra-luxury homes and environmental responsibility 
                are not mutually exclusive, but perfectly compatible.
              </p>
              <p>
                Our team combines youthful energy with deep technical knowledge, bringing innovative 
                approaches to every project. We're not just building structures; we're crafting 
                sustainable legacies for families who share our values.
              </p>
              <p className="text-orange font-medium">
                We are currently constructing our flagship project — a showcase of everything 
                we stand for. Join us at the beginning of something extraordinary.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex gap-4"
                    data-testid={`about-value-${index}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-maroon/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-maroon" />
                    </div>
                    <div>
                      <h4 className="font-body text-sm font-semibold text-charcoal mb-1">
                        {value.title}
                      </h4>
                      <p className="font-body text-xs text-charcoal/60">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
