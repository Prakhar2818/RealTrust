import { useState } from 'react';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import logo from '../../assets/images/logo.svg';
import footerImage from '../../assets/images/pexels-andres-ayrton-6578391.svg';

const Footer = ({ onContactClick }) => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/subscribers`, { email });
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Subscription failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-secondary text-white">
      {/* Image Section with Newsletter */}
      <div className="relative">
        {/* Background Image */}
        <div className="relative h-[400px] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=400&fit=crop" 
            alt="Team Collaboration" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container-custom text-center text-white px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join thousands of businesses accelerating their growth with LeadGen
              </h2>
              <p className="text-lg text-gray-200">Unlock your potential with our AI-powered lead generation platform</p>
            </div>
          </div>
        </div>

        {/* Newsletter Section - Blue Background */}
        <div className="bg-primary py-6 shadow-lg">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 max-w-7xl mx-auto px-4">
              {/* Left Navigation Links */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-white">
                <button
                  onClick={() => scrollToSection('home')}
                  className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-all duration-300 font-medium text-sm"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-all duration-300 font-medium text-sm"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-all duration-300 font-medium text-sm"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-all duration-300 font-medium text-sm"
                >
                  Projects
                </button>
                <button
                  onClick={onContactClick}
                  className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-all duration-300 font-medium text-sm"
                >
                  Contact
                </button>
              </div>

              {/* Right Newsletter Form */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                <span className="text-white font-semibold text-sm whitespace-nowrap tracking-wide">Get Updates</span>
                <form onSubmit={handleSubscribe} className="flex w-full sm:w-auto shadow-xl">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="px-5 py-3 rounded-l-lg focus:outline-none border border-white text-gray-900 placeholder-gray-500 w-full sm:w-72 text-sm bg-white"
                    required
                    disabled={loading}
                  />
                  <button 
                    type="submit" 
                    className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-r-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg whitespace-nowrap"
                    disabled={loading}
                  >
                    {loading ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="Logo" className="h-10 w-auto brightness-0 invert" />
              <span className="text-2xl font-bold text-white">LeadGen</span>
            </div>
            <p className="text-gray-300 mb-6">
              AI-powered lead generation platform helping businesses scale and grow with qualified prospects.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition"
              >
                <FaTwitter />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="hover:text-primary transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="hover:text-primary transition"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="hover:text-primary transition"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="hover:text-primary transition"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={onContactClick}
                  className="hover:text-primary transition"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="hover:text-primary transition cursor-pointer text-gray-300">Lead Generation</li>
              <li className="hover:text-primary transition cursor-pointer text-gray-300">AI Analytics</li>
              <li className="hover:text-primary transition cursor-pointer text-gray-300">Marketing Solutions</li>
              <li className="hover:text-primary transition cursor-pointer text-gray-300">Sales Support</li>
              <li className="hover:text-primary transition cursor-pointer text-gray-300">Consulting Services</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span>456 Tech Avenue, Suite 200, San Francisco, CA 94105</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-primary flex-shrink-0" />
                <a href="tel:+18885551234" className="hover:text-primary transition">
                  +1 (888) 555-1234
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-primary flex-shrink-0" />
                <a href="mailto:support@leadgen.com" className="hover:text-primary transition">
                  support@leadgen.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} LeadGen. All rights reserved. Powered by AI-driven insights.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-primary text-sm transition">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-primary text-sm transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
