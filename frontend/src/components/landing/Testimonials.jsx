import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';

const Testimonials = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 5;

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://ui-avatars.com/api/?name=Client';
    if (imagePath.startsWith('http')) return imagePath;
    const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
    return `${baseUrl}${imagePath}`;
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/clients`);
      setClients(response.data.data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(clients.length / ITEMS_PER_PAGE);
  const currentClients = clients.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    setCurrentPage(prev => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  // Auto-play carousel
  useEffect(() => {
    if (clients.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentPage(prev => (prev < totalPages - 1 ? prev + 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, [clients.length, totalPages]);

  if (loading) {
    return (
      <section id="testimonials" className="section-padding bg-white">
        <div className="container-custom text-center">
          <div className="animate-pulse">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-gray-900 mb-4">Happy Clients</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Previous Button */}
          {totalPages > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-all duration-300 -ml-6"
              aria-label="Previous"
            >
              <FaChevronLeft className="text-gray-700 text-xl" />
            </button>
          )}

          {/* Client Cards Grid */}
          <div className="px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {currentClients.map((client, index) => (
                <div
                  key={client._id}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Client Image */}
                  <div className="flex justify-center mb-4">
                    <img
                      src={getImageUrl(client.image)}
                      alt={client.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                      onError={(e) => {
                        e.target.src = 'https://ui-avatars.com/api/?name=' + client.name;
                      }}
                    />
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 text-center min-h-[80px]">
                    {client.description}
                  </p>

                  {/* Client Name */}
                  <h4 className="text-blue-600 font-semibold text-center mb-1">
                    {client.name}
                  </h4>

                  {/* Client Designation */}
                  <p className="text-gray-500 text-sm text-center">
                    {client.designation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          {totalPages > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-all duration-300 -mr-6"
              aria-label="Next"
            >
              <FaChevronRight className="text-gray-700 text-xl" />
            </button>
          )}
        </div>

        {/* Carousel Indicators */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentPage === index ? 'bg-primary w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}

        {clients.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No client testimonials available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
