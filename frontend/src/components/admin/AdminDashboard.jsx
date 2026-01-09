import { useState, useEffect } from 'react';
import { FaUsers, FaUserPlus, FaCheckCircle, FaChartLine, FaTrendingUp, FaFire } from 'react-icons/fa';
import { getLeadStats } from '../../services/api';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getLeadStats();
      setStats(response.data);
    } catch (error) {
      toast.error('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Leads',
      value: stats?.total || 0,
      icon: <FaUsers className="w-8 h-8" />,
      gradient: 'from-blue-600 to-blue-400',
      bgGradient: 'from-blue-600/10 to-blue-400/5',
      change: '+12% from last month',
    },
    {
      title: 'New Leads',
      value: stats?.byStatus?.new || 0,
      icon: <FaUserPlus className="w-8 h-8" />,
      gradient: 'from-green-600 to-emerald-400',
      bgGradient: 'from-green-600/10 to-emerald-400/5',
      change: `${stats?.recentLeads || 0} in last 30 days`,
    },
    {
      title: 'Converted',
      value: stats?.byStatus?.converted || 0,
      icon: <FaCheckCircle className="w-8 h-8" />,
      gradient: 'from-purple-600 to-pink-400',
      bgGradient: 'from-purple-600/10 to-pink-400/5',
      change: `${stats?.conversionRate || 0}% conversion rate`,
    },
    {
      title: 'Contacted',
      value: stats?.byStatus?.contacted || 0,
      icon: <FaChartLine className="w-8 h-8" />,
      gradient: 'from-orange-600 to-yellow-400',
      bgGradient: 'from-orange-600/10 to-yellow-400/5',
      change: 'In progress',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 shadow-2xl">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Welcome Back! 👋
        </h1>
        <p className="text-slate-400">Here's your dashboard overview for today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${card.bgGradient} backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:scale-105 group`}
          >
            {/* Icon */}
            <div className={`inline-block p-4 rounded-lg bg-gradient-to-br ${card.gradient} text-white mb-4 group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110`}>
              {card.icon}
            </div>

            {/* Value */}
            <h3 className="text-4xl font-bold text-white mb-2">{card.value}</h3>

            {/* Title */}
            <p className="text-slate-300 font-semibold mb-3">{card.title}</p>

            {/* Change Info */}
            <div className="flex items-center space-x-2 text-sm">
              {index === 0 && <FaTrendingUp className="text-green-400" />}
              {index === 2 && <FaFire className="text-orange-400" />}
              <span className={index === 0 || index === 2 ? 'text-green-400' : 'text-slate-400'}>
                {card.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Leads */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <FaUsers className="text-cyan-400" />
            <span>Top Lead Sources</span>
          </h2>
          <div className="space-y-3">
            {['Email', 'Website Form', 'Social Media', 'Referral'].map((source, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                <span className="text-slate-300">{source}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-cyan-500 to-blue-600`}
                      style={{ width: `${100 - index * 20}%` }}
                    />
                  </div>
                  <span className="text-cyan-400 font-semibold text-sm">{100 - index * 20}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <FaChartLine className="text-green-400" />
            <span>Performance</span>
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-green-600/10 to-emerald-400/5 rounded-lg border border-green-600/20">
              <p className="text-sm text-slate-400 mb-1">Conversion Rate</p>
              <p className="text-3xl font-bold text-green-400">{stats?.conversionRate || 0}%</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-600/10 to-blue-400/5 rounded-lg border border-blue-600/20">
              <p className="text-sm text-slate-400 mb-1">Avg. Response Time</p>
              <p className="text-3xl font-bold text-blue-400">2.5 hrs</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-600/10 to-pink-400/5 rounded-lg border border-purple-600/20">
              <p className="text-sm text-slate-400 mb-1">Customer Satisfaction</p>
              <p className="text-3xl font-bold text-purple-400">4.8/5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;