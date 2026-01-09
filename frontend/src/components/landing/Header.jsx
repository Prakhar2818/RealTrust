import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';

const Header = ({ onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleContactClick = () => {
    setIsMobileMenuOpen(false);
    onContactClick?.();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md py-3`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold text-[#2B5FA8]">Real <span className="text-gray-600">Trust</span></span>
              <span className="text-sm font-bold text-gray-900">RealEstate</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-primary font-medium transition"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-primary font-medium transition"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-primary font-medium transition"
            >
              Our Services
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-700 hover:text-primary font-medium transition"
            >
              Testimonials
            </button>
            <button
              onClick={handleContactClick}
              className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-medium rounded transition"
            >
              Contact Us
            </button>
            <Link to="/admin/login" className="text-gray-600 hover:text-primary text-sm font-medium">
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Testimonials
            </button>
            <button
              onClick={handleContactClick}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Contact Us
            </button>
            <Link
              to="/admin/login"
              className="block w-full text-left px-4 py-2 text-gray-500 hover:bg-gray-100 rounded"
            >
              Admin Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
