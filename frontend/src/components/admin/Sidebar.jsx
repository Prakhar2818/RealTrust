import { NavLink } from 'react-router-dom';
import { FaProjectDiagram, FaUsers, FaEnvelope, FaMailBulk, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../../assets/images/logo.svg';

const Sidebar = () => {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // keep desktop collapsed/expanded state; ensure sidebar is closed on small screens
      if (window.innerWidth < 768) {
        setIsOpen(true); // keep full content when visible on mobile
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // compute responsive classes: mobile overlay when `mobileOpen`, otherwise desktop width controlled by `isOpen`
  const baseClasses = 'h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col transition-all duration-300 border-r border-slate-700 shadow-2xl';
  const desktopWidthClass = isOpen ? 'md:w-64' : 'md:w-20';
  const mobileTransformClass = mobileOpen ? 'translate-x-0' : '-translate-x-full';

  return (
    <>
      {/* Floating hamburger for mobile */}
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden fixed top-4 left-4 z-60 p-2 bg-slate-900/70 text-cyan-400 rounded-lg shadow-lg"
          aria-label="Open sidebar"
        >
          <FaBars size={18} />
        </button>
      )}

      {/* Overlay when mobile menu open */}
      {mobileOpen && <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />}

      <div
        className={`fixed top-0 left-0 z-50 ${mobileTransformClass} md:translate-x-0 md:relative ${mobileOpen ? 'w-64' : ''} ${desktopWidthClass} ${baseClasses}`}
        style={{ transitionProperty: 'transform,width' }}
      >
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
    </>
  );
};

export default Sidebar;
