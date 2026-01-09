import { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/400x300?text=Project+Image';
    if (imagePath.startsWith('http')) return imagePath;
    const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
    return `${baseUrl}${imagePath}`;
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
      setProjects(response.data.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="projects" className="section-padding bg-white">
        <div className="container-custom text-center">
          <div className="animate-pulse">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-gray-900 mb-4">Our Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {projects.slice(0, 4).map((project, index) => (
            <div
              key={project._id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 animate-slide-up flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={getImageUrl(project.image)}
                  alt={project.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Project+Image';
                  }}
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-blue-600 text-sm font-semibold mb-3">
                  {project.category || 'Project'}
                </h3>
                <p className="text-gray-900 font-medium text-lg mb-2">{project.name}</p>
                <p className="text-gray-600 text-sm mb-6 flex-1">
                  {project.description}
                </p>
                <div className="mt-auto">
                  <button className="w-full bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-6 py-3 rounded transition-all duration-300">
                    READ MORE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No projects available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
