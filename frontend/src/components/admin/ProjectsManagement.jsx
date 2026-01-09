import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import ImageCropUpload from './ImageCropUpload';

const ProjectsManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    category: ''
  });

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
    return `${baseUrl}${imagePath}`;
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/projects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(data.data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleImageCropped = async (croppedFile) => {
    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const formDataUpload = new FormData();
      formDataUpload.append('image', croppedFile);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload/project`,
        formDataUpload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setFormData({ ...formData, image: data.imageUrl });
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      toast.error('Please upload an image');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (editingProject) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/admin/projects/${editingProject._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Project updated successfully');
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/admin/projects`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Project created successfully');
      }
      setShowModal(false);
      setFormData({ name: '', description: '', image: '', category: '' });
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      image: project.image,
      category: project.category
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', image: '', category: '' });
    setEditingProject(null);
    setShowModal(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">🚀 Projects</h1>
          <p className="text-slate-300">Manage your project portfolio</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
        >
          <FaPlus /> Add Project
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full hidden md:table">
          <thead className="bg-white border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Image</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Description</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((project) => (
              <tr key={project._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <img 
                    src={getImageUrl(project.image)} 
                    alt={project.name} 
                    className="h-16 w-16 object-cover rounded-lg shadow-sm" 
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">{project.name}</td>
                <td className="px-6 py-4">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">{project.description.substring(0, 50)}...</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="md:hidden p-4 space-y-4">
          {projects.map((project) => (
            <div key={project._id} className="bg-white shadow rounded-lg p-4">
              <div className="flex items-center gap-4">
                <img
                  src={getImageUrl(project.image)}
                  alt={project.name}
                  className="h-16 w-16 object-cover rounded-lg shadow-sm"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-900">{project.name}</div>
                    <div className="text-sm inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{project.category}</div>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{project.description.substring(0, 100)}...</p>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-3">
                <button onClick={() => handleEdit(project)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <FaEdit size={18} />
                </button>
                <button onClick={() => handleDelete(project._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              {editingProject ? '✏️ Edit Project' : '➕ Add New Project'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">Project Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-colors"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <ImageCropUpload
                  onImageCropped={handleImageCropped}
                  currentImage={formData.image}
                  label="Project Image"
                />
                {uploading && (
                  <p className="text-sm text-blue-600 mt-2 font-medium">📤 Uploading image...</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">Category</label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-colors"
                  placeholder="Enter category"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">Description</label>
                <textarea
                  required
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-colors resize-none"
                  placeholder="Enter project description"
                />
              </div>
              
              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold"
                >
                  {editingProject ? '✓ Update Project' : '➕ Create Project'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  ✕ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManagement;
