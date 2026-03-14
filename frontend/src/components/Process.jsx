import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, PencilRuler, Layers, Eye, ClipboardCheck, Home } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Consult & Conceptualize',
    description: 'Free consultation to align on your vision, budget, and sustainability goals. We listen to understand your dream.',
  },
  {
    number: '02',
    icon: PencilRuler,
    title: 'Sustainable Design',
    description: 'Our architects create eco-conscious floor plans and 3D elevations tailored to your lifestyle and environmental preferences.',
  },
  {
    number: '03',
    icon: Layers,
    title: 'Material Curation',
    description: 'We help you select premium, green materials - from low-carbon blocks to sustainable wood alternatives.',
  },
  {
    number: '04',
    icon: Eye,
    title: 'Transparent Construction',
    description: 'Real-time updates on your project\'s progress. Track every milestone with complete transparency.',
  },
  {
    number: '05',
    icon: ClipboardCheck,
    title: 'Quality & Eco-Audit',
    description: 'Rigorous final checks for sustainability standards and craftsmanship excellence before handover.',
  },
  {
    number: '06',
    icon: Home,
    title: 'Handover & Harmony',
    description: 'Move into your healthy, beautiful new home backed by our 10-year structural warranty.',
  },
];

const ProcessStep = ({ step, index, isLast }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex gap-6 lg:gap-8"
      data-testid={`process-step-${index + 1}`}
    >
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
          index % 2 === 0 ? 'bg-maroon' : 'bg-orange'
        }`}>
          <Icon size={24} className="text-cream" />
        </div>
        {!isLast && (
          <div className="w-0.5 h-full min-h-[80px] bg-stone mt-4" />
        )}
      </div>

      {/* Content */}
      <div className={`pb-12 ${isLast ? 'pb-0' : ''}`}>
        <span className={`font-body text-sm font-semibold ${
          index % 2 === 0 ? 'text-maroon' : 'text-orange'
        }`}>
          Step {step.number}
        </span>
        <h3 className="font-heading text-xl lg:text-2xl font-semibold text-charcoal mt-1 mb-2">
          {step.title}
        </h3>
        <p className="font-body text-charcoal/70 leading-relaxed max-w-md">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="process" 
      className="section-spacing bg-cream"
      data-testid="process-section"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <span className="inline-block font-body text-sm font-medium text-orange uppercase tracking-wider mb-4">
              How We Work
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6">
              Our Process
            </h2>
            <p className="font-body text-base lg:text-lg text-charcoal/70 mb-8">
              From your first consultation to the moment you step into your new home, 
              we ensure a seamless, transparent, and stress-free journey.
            </p>

            {/* Process Image */}
            <div className="relative rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
                alt="Architectural blueprints"
                className="w-full h-[300px] object-cover"
                data-testid="process-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-heading text-xl text-cream font-semibold">
                  Your Dream, Our Blueprint
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Steps */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <ProcessStep 
                key={step.number} 
                step={step} 
                index={index} 
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
