import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import ImageCropUpload from './ImageCropUpload';

const ClientsManagement = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    description: '',
    image: ''
  });

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
    return `${baseUrl}${imagePath}`;
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/clients`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClients(data.data);
    } catch (error) {
      toast.error('Failed to fetch clients');
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
        `${import.meta.env.VITE_API_URL}/upload/client`,
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
      if (editingClient) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/admin/clients/${editingClient._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Client updated successfully');
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/admin/clients`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Client created successfully');
      }
      setShowModal(false);
      setFormData({ name: '', designation: '', description: '', image: '' });
      setEditingClient(null);
      fetchClients();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      designation: client.designation,
      description: client.description,
      image: client.image
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this client?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/clients/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Client deleted successfully');
      fetchClients();
    } catch (error) {
      toast.error('Failed to delete client');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', designation: '', description: '', image: '' });
    setEditingClient(null);
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
          <h1 className="text-4xl font-bold text-white mb-2">👥 Clients</h1>
          <p className="text-slate-300">Manage client testimonials and information</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
        >
          <FaPlus /> Add Client
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-white border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Image</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Designation</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Description</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clients.map((client) => (
              <tr key={client._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <img 
                    src={getImageUrl(client.image)} 
                    alt={client.name} 
                    className="h-16 w-16 object-cover rounded-full shadow-sm" 
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">{client.name}</td>
                <td className="px-6 py-4">
                  <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {client.designation}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">{client.description.substring(0, 50)}...</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(client)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(client._id)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {editingClient ? 'Edit Client' : 'Add New Client'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: CEO, Web Developer, Designer"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  required
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <ImageCropUpload
                  onImageCropped={handleImageCropped}
                  currentImage={formData.image}
                  label="Client Image"
                />
                {uploading && (
                  <p className="text-sm text-primary mt-2">Uploading image...</p>
                )}
              </div>
              
              {/* Image Preview after upload */}
              {formData.image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image Preview</label>
                  <img 
                    src={getImageUrl(formData.image)} 
                    alt="Preview" 
                    className="h-32 w-32 object-cover rounded-full border-2 border-gray-200" 
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white px-6 py-3 rounded hover:bg-primary/90 transition font-medium"
                >
                  {editingClient ? 'Update' : 'Create'} Client
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsManagement;
