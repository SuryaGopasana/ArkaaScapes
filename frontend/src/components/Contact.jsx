import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const WHATSAPP_NUMBER = '919999999999'; // Placeholder

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    package_interest: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/enquiries`, formData);
      
      if (response.data.success) {
        toast.success('Enquiry submitted successfully!', {
          description: 'We will contact you shortly.',
        });
        
        // Open WhatsApp in new tab
        if (response.data.whatsapp_link) {
          window.open(response.data.whatsapp_link, '_blank');
        }
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          budget: '',
          package_interest: '',
          message: '',
        });
      }
    } catch (error) {
      toast.error('Failed to submit enquiry', {
        description: 'Please try again or contact us directly.',
      });
      console.error('Enquiry submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hi! I'm interested in learning more about Arkaa Scapes' eco-luxury home construction services.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <section 
      id="contact" 
      className="section-spacing bg-cream-dark"
      data-testid="contact-section"
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
            Get In Touch
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Start Your Journey
          </h2>
          <p className="font-body text-base lg:text-lg text-charcoal/70 max-w-2xl mx-auto">
            Book a free consultation and take the first step towards your sustainable dream home.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-sm font-medium text-charcoal block mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-cream border-stone focus:border-maroon"
                    data-testid="contact-name-input"
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-charcoal block mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="bg-cream border-stone focus:border-maroon"
                    data-testid="contact-email-input"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-sm font-medium text-charcoal block mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                    className="bg-cream border-stone focus:border-maroon"
                    data-testid="contact-phone-input"
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-charcoal block mb-2">
                    Budget Range
                  </label>
                  <Select 
                    value={formData.budget} 
                    onValueChange={(value) => handleSelectChange('budget', value)}
                  >
                    <SelectTrigger className="bg-cream border-stone" data-testid="contact-budget-select">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="40-60">₹40-60 Lakhs</SelectItem>
                      <SelectItem value="60-80">₹60-80 Lakhs</SelectItem>
                      <SelectItem value="80-100">₹80 Lakhs - 1 Crore</SelectItem>
                      <SelectItem value="100+">₹1 Crore and above</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="font-body text-sm font-medium text-charcoal block mb-2">
                  Interested Package
                </label>
                <Select 
                  value={formData.package_interest} 
                  onValueChange={(value) => handleSelectChange('package_interest', value)}
                >
                  <SelectTrigger className="bg-cream border-stone" data-testid="contact-package-select">
                    <SelectValue placeholder="Select package" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="terra">Terra - ₹1,779/sq.ft.</SelectItem>
                    <SelectItem value="solara">Solara - ₹1,999/sq.ft.</SelectItem>
                    <SelectItem value="aether">Aether - ₹2,399/sq.ft.</SelectItem>
                    <SelectItem value="custom">Custom Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="font-body text-sm font-medium text-charcoal block mb-2">
                  Message
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your dream home..."
                  rows={4}
                  className="bg-cream border-stone focus:border-maroon resize-none"
                  data-testid="contact-message-input"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-maroon hover:bg-maroon-dark text-cream font-body font-medium py-6"
                data-testid="contact-submit-btn"
              >
                {isSubmitting ? 'Submitting...' : 'Book Free Consultation'}
                <Send className="ml-2" size={18} />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info & WhatsApp */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* WhatsApp CTA */}
            <div className="bg-cream rounded-xl p-8 border border-stone">
              <h3 className="font-heading text-xl font-semibold text-charcoal mb-4">
                Prefer to Chat?
              </h3>
              <p className="font-body text-charcoal/70 mb-6">
                Connect with us instantly on WhatsApp for quick queries and consultation scheduling.
              </p>
              <Button
                onClick={openWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-body font-medium py-6 whatsapp-pulse"
                data-testid="whatsapp-btn"
              >
                <MessageCircle className="mr-2" size={20} />
                Chat on WhatsApp
              </Button>
            </div>

            {/* Contact Details */}
            <div className="bg-cream rounded-xl p-8 border border-stone">
              <h3 className="font-heading text-xl font-semibold text-charcoal mb-6">
                Contact Details
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-maroon/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-maroon" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-charcoal">Phone</p>
                    <p className="font-body text-charcoal/70">+91 XXXXX XXXXX</p>
                    <p className="font-body text-xs text-charcoal/50">(Placeholder - to be updated)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-orange" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-charcoal">Email</p>
                    <p className="font-body text-charcoal/70">info@arkaascapes.com</p>
                    <p className="font-body text-xs text-charcoal/50">(Placeholder - to be updated)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-maroon/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-maroon" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-charcoal">Location</p>
                    <p className="font-body text-charcoal/70">Bangalore, Karnataka, India</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
