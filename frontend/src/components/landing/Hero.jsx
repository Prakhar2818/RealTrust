import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Hero = () => {
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
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="home" className="relative pt-16 pb-16 bg-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop"
          alt="Business Growth"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Left Content */}
          <div className="animate-slide-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Accelerate Your<br />
              Business Growth<br />
              <span className="text-primary">with AI-Powered Leads</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Transform your sales pipeline with high-quality, AI-verified leads. 
              Our intelligent platform connects you with prospects ready to buy, 
              driving real revenue growth for your business.
            </p>
          </div>

          {/* Right Appointment Form */}
          <div className="animate-fade-in">
            <div className="bg-[#2C4A6E] text-white rounded-xl shadow-2xl p-8 max-w-md ml-auto">
              <h2 className="text-3xl font-bold mb-6 leading-tight">GET STARTED<br />TODAY</h2>
              
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
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? 'SUBMITTING...' : 'Start Free Trial'}
                </button>
              </form>
              
              <p className="text-white/80 text-sm text-center mt-4">
                No credit card required • 14-day free trial
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
