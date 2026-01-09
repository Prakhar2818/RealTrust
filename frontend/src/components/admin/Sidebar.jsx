import { NavLink } from 'react-router-dom';
import { FaProjectDiagram, FaUsers, FaEnvelope, FaMailBulk, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/images/logo.svg';

const Sidebar = () => {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/projects', icon: <FaProjectDiagram />, label: 'Projects' },
    { path: '/admin/clients', icon: <FaUsers />, label: 'Clients' },
    { path: '/admin/contacts', icon: <FaEnvelope />, label: 'Contact Forms' },
    { path: '/admin/subscribers', icon: <FaMailBulk />, label: 'Subscribers' },
  ];

  return (
    <div className={`h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} border-r border-slate-700 shadow-2xl`}>
      {/* Header with Toggle */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {isOpen && (
          <div className="flex items-center space-x-3 flex-1">
            <img src={logo} alt="LeadGen Logo" className="h-10 w-auto brightness-0 invert" />
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-cyan-400"
        >
          {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </div>

      {/* Admin Info */}
      {isOpen && (
        <div className="p-6 border-b border-slate-700 bg-slate-800/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
              {admin?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div>
              <p className="font-semibold text-sm">{admin?.name || 'Admin'}</p>
              <p className="text-xs text-slate-400">{admin?.role === 'super-admin' ? 'Super Admin' : 'Admin'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <nav className="flex-1 p-3 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center ${isOpen ? 'space-x-3 px-4' : 'justify-center'} py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-cyan-400'
              }`
            }
          >
            <span className={`text-lg ${isOpen ? '' : 'text-xl'}`}>{item.icon}</span>
            {isOpen && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-3 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${isOpen ? 'space-x-3 px-4' : 'justify-center'} py-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all duration-200 font-medium`}
        >
          <FaSignOutAlt size={18} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
