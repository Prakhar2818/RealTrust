import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';

const AdminPage = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>

      {/* Sidebar - Right Side */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>
    </div>
  );
};

export default AdminPage;
