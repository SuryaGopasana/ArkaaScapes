import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Packages from '@/components/Packages';
import Process from '@/components/Process';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Projects from '@/components/Projects';
import FAQs from '@/components/FAQs';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream" data-testid="homepage">
      <Header isScrolled={isScrolled} />
      <main>
        <Hero />
        <Services />
        <Packages />
        <Process />
        <About />
        <Testimonials />
        <Projects />
        <FAQs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
