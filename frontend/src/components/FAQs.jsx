import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What factors affect house construction costs in Bangalore?",
    answer: "House construction costs depend on factors like plot size, design complexity, materials used, labor charges, and permits. Arkaa Scapes provides transparent pricing and a detailed cost breakdown to help you plan your budget effectively. Our sustainable materials may have marginally higher upfront costs but deliver long-term savings through energy efficiency."
  },
  {
    question: "What makes Arkaa Scapes different from other construction companies?",
    answer: "We specialize exclusively in eco-luxury construction, combining premium finishes with sustainable practices. While we're a new firm, our founding team brings decades of experience in green building. We offer transparent pricing, real-time project tracking, and a 10-year structural warranty on all our projects."
  },
  {
    question: "Can I customize my home design with eco-friendly features?",
    answer: "Absolutely! As eco-luxury builders, we offer fully customizable designs that incorporate sustainable features like solar panel integration, rainwater harvesting, enhanced thermal insulation, and low-VOC materials. Every home is tailored to your vision while maximizing environmental responsibility."
  },
  {
    question: "What sustainable materials do you use in construction?",
    answer: "We use a range of eco-friendly materials including fly ash bricks, AAC blocks, low-embodied carbon structural materials, sustainable wood alternatives (like bamboo or recycled wood), low-VOC paints, and recycled content in finishes. We also prioritize locally sourced materials to reduce transportation emissions."
  },
  {
    question: "How long does it take to build an eco-luxury home?",
    answer: "Construction timelines typically range from 10-14 months depending on the size and complexity of your project. Our transparent tracking system keeps you informed at every stage. We commit to on-time delivery without compromising on quality or sustainability standards."
  },
  {
    question: "What is included in your turnkey packages?",
    answer: "Our turnkey packages include everything from design (2D/3D plans, structural drawings) to construction (structure, plumbing, electrical, flooring, painting) to final finishes. All packages include rainwater harvesting and anti-termite treatment. Higher tiers add features like VR tours, home automation readiness, and premium fittings."
  },
  {
    question: "Do you offer financing options or payment plans?",
    answer: "Yes, we offer flexible payment schedules tied to construction milestones. We can also connect you with banking partners who offer home construction loans. Our team will help you understand all options during your free consultation."
  },
  {
    question: "What warranty do you provide on construction?",
    answer: "All Arkaa Scapes homes come with a 10-year structural warranty. We also ensure all materials and fittings carry their respective manufacturer warranties. Our commitment to quality means we use only branded, certified materials from trusted suppliers."
  },
];

const FAQs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="faqs" 
      className="section-spacing bg-cream"
      data-testid="faqs-section"
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
            Got Questions?
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-body text-base lg:text-lg text-charcoal/70 max-w-2xl mx-auto">
            Find answers to common questions about our eco-luxury construction services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-cream-light border border-stone rounded-xl px-6 overflow-hidden"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger className="font-body text-left text-charcoal hover:text-maroon py-5 [&[data-state=open]]:text-maroon">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-charcoal/70 pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQs;
