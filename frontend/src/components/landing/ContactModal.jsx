import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/leads`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        message: 'Contact from lead generation form'
      });
      toast.success('Request submitted successfully!');
      setFormData({ name: '', email: '', phone: '', city: '' });
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-[#2C4A6E] text-white rounded-xl shadow-2xl p-8 max-w-md w-full animate-fade-in relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:bg-white/20 p-2 rounded-lg transition-colors"
        >
          <FaTimes size={20} />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 leading-tight pr-8">GET STARTED<br />TODAY</h2>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-white focus:bg-white/20 transition-all"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-white focus:bg-white/20 transition-all"
              required
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-white focus:bg-white/20 transition-all"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-white focus:bg-white/20 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isSubmitting ? 'SUBMITTING...' : 'Start Free Trial'}
          </button>
        </form>
        
        <p className="text-white/80 text-sm text-center mt-4">
          No credit card required • 14-day free trial
        </p>
      </div>
    </div>
  );
};

export default ContactModal;
