import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaTrash, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactsManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/admin/leads`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(data.data);
    } catch (error) {
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/leads/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Contact deleted successfully');
      fetchContacts();
    } catch (error) {
      toast.error('Failed to delete contact');
    }
  };

  const filteredContacts = filter === 'all' 
    ? contacts 
    : contacts.filter(c => c.status === filter);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">📧 Contact Forms</h1>
          <p className="text-slate-300">View and manage contact form submissions</p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-colors font-medium"
        >
          <option value="all">All Contacts</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-white border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Full Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Email Address</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Mobile Number</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">City</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Date</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredContacts.map((contact) => (
              <tr key={contact._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900">{contact.name}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaEnvelope className="text-blue-600" />
                    {contact.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaPhone className="text-green-600" />
                    {contact.phone || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaMapMarkerAlt className="text-red-600" />
                    {contact.city || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleDelete(contact._id)}
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
        {filteredContacts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No contact submissions found
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsManagement;
