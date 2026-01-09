import { FaDollarSign, FaPaintBrush, FaHome, FaCheckCircle } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaDollarSign className="w-12 h-12" />,
      title: 'Financial Services',
      description: 'Comprehensive financial solutions tailored to your business needs. From investment planning to financial consulting.',
    },
    {
      icon: <FaPaintBrush className="w-12 h-12" />,
      title: 'Creative Design',
      description: 'Stunning designs that captivate your audience and elevate your brand presence in the market.',
    },
    {
      icon: <FaHome className="w-12 h-12" />,
      title: 'Real Estate',
      description: 'Expert real estate services to help you find the perfect property or sell at the best price.',
    },
  ];


  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Main Container with Left and Right Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left Side - Why Choose Us */}
          <div className="animate-slide-up">
            <h2 className="text-gray-900 mb-8">Why Choose Us?</h2>
            <div className="w-20 h-1 bg-primary mb-8"></div>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We are committed to delivering excellence and innovation in every project. Our team combines creativity with technical expertise to provide solutions that exceed expectations.
            </p>


            {/* Circular Image Below */}
            <div className="mt-12 flex justify-center lg:justify-start">
              <div className="relative w-80 h-80 overflow-hidden rounded-full border-4 border-primary shadow-2xl hover:shadow-primary/50 hover:border-primary transition-all duration-300 cursor-pointer group">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop"
                  alt="Modern Team Collaboration"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-transparent group-hover:from-primary/30 transition-all duration-300"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Service Cards */}
          <div className="space-y-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 animate-slide-up border-l-4 border-primary hover:translate-y-[-4px]"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className="text-primary text-4xl flex-shrink-0 bg-primary/10 p-4 rounded-lg">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
