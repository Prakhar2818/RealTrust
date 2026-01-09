import { useState, useEffect } from 'react';
import { FaSearch, FaDownload, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { getLeads, deleteLead, exportLeads, updateLead } from '../../services/api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const LeadsTable = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchLeads();
  }, [search, statusFilter, currentPage]);

  const fetchLeads = async () => {
    try {
      const params = {
        page: currentPage,
        limit: 10,
        search,
        status: statusFilter,
      };
      const response = await getLeads(params);
      setLeads(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await deleteLead(id);
        toast.success('Lead deleted successfully');
        fetchLeads();
      } catch (error) {
        toast.error('Failed to delete lead');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateLead(id, { status: newStatus });
      toast.success('Status updated successfully');
      fetchLeads();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleExport = async () => {
    try {
      const blob = await exportLeads();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Leads exported successfully');
    } catch (error) {
      toast.error('Failed to export leads');
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      new: 'bg-yellow-100 text-yellow-800',
      contacted: 'bg-orange-100 text-orange-800',
      qualified: 'bg-blue-100 text-blue-800',
      converted: 'bg-green-100 text-green-800',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Leads Management</h1>
        <button onClick={handleExport} className="btn-primary flex items-center">
          <FaDownload className="mr-2" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
          </select>

          {/* Reset */}
          <button
            onClick={() => {
              setSearch('');
              setStatusFilter('');
              setCurrentPage(1);
            }}
            className="btn-secondary"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 hidden md:table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    No leads found
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.company || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadge(
                          lead.status
                        )}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(lead.createdAt), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => alert(`View details for: ${lead.name}`)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDelete(lead._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="md:hidden p-4 space-y-4">
          {leads.length === 0 ? (
            <div className="text-center text-gray-500">No leads found</div>
          ) : (
            leads.map((lead) => (
              <div key={lead._id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{lead.name}</div>
                    <div className="text-sm text-gray-600">{lead.email} • {lead.phone}</div>
                    <div className="text-sm text-gray-500 mt-2">{lead.company || '-'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{format(new Date(lead.createdAt), 'MMM dd, yyyy')}</div>
                    <div className="mt-2 flex items-center justify-end space-x-2">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadge(lead.status)}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-3">
                  <button onClick={() => alert(`View details for: ${lead.name}`)} className="text-blue-600">
                    <FaEye />
                  </button>
                  <button onClick={() => handleDelete(lead._id)} className="text-red-600">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(currentPage * 10, pagination.total)}
              </span>{' '}
              of <span className="font-medium">{pagination.total}</span> results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === pagination.pages}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsTable;
