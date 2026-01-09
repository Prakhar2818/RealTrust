import { useState } from 'react';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import Services from '../components/landing/Services';
import About from '../components/landing/About';
import Projects from '../components/landing/Projects';
import Testimonials from '../components/landing/Testimonials';
import Footer from '../components/landing/Footer';
import ContactModal from '../components/landing/ContactModal';

const LandingPage = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onContactClick={() => setIsContactModalOpen(true)} />
      <Hero />
      <Services />
      <About />
      <Projects />
      <Testimonials />
      <Footer onContactClick={() => setIsContactModalOpen(true)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
};

export default LandingPage;
