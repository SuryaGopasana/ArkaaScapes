import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Home, Pencil, Leaf, Building2 } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Premium Eco-Luxury Homes',
    description: 'We bring your personalized dream home to life with sustainable materials and premium finishes that stand the test of time.',
    color: 'maroon',
  },
  {
    icon: Pencil,
    title: 'Sustainable Custom Builds',
    description: 'Tailored to your specific lifestyle needs with eco-conscious design principles and energy-efficient features.',
    color: 'orange',
  },
  {
    icon: Leaf,
    title: 'Green Home Consulting',
    description: 'Expert advice on energy efficiency, sustainable materials, and eco-friendly construction practices.',
    color: 'maroon',
  },
  {
    icon: Building2,
    title: 'Rental + Residential Construction',
    description: 'Create beautiful spaces for your tenants that feel like home while maximizing your investment returns.',
    color: 'orange',
  },
];

const ServiceCard = ({ service, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const Icon = service.icon;
  const isMaroon = service.color === 'maroon';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`card-hover bg-cream-light p-6 lg:p-8 rounded-xl border border-stone ${
        index === 0 ? 'lg:col-span-2' : ''
      }`}
      data-testid={`service-card-${index}`}
    >
      <div 
        className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 ${
          isMaroon ? 'bg-maroon/10' : 'bg-orange/10'
        }`}
      >
        <Icon 
          size={28} 
          className={isMaroon ? 'text-maroon' : 'text-orange'} 
        />
      </div>
      <h3 className="font-heading text-xl lg:text-2xl font-semibold text-charcoal mb-3">
        {service.title}
      </h3>
      <p className="font-body text-charcoal/70 leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  );
};

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="services" 
      className="section-spacing bg-cream"
      data-testid="services-section"
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
          <span className="inline-block font-body text-sm font-medium text-orange uppercase tracking-wider mb-4">
            What We Offer
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Our Services
          </h2>
          <p className="font-body text-base lg:text-lg text-charcoal/70 max-w-2xl mx-auto">
            From concept to completion, we deliver eco-conscious construction solutions 
            that exceed expectations.
          </p>
        </motion.div>

        {/* Services Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
