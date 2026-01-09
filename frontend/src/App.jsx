import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import AdminPage from './pages/AdminPage';
import NotFound from './pages/NotFound';

// Admin Components
import AdminLogin from './components/admin/AdminLogin';
import ProjectsManagement from './components/admin/ProjectsManagement';
import ClientsManagement from './components/admin/ClientsManagement';
import ContactsManagement from './components/admin/ContactsManagement';
import SubscribersManagement from './components/admin/SubscribersManagement';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/projects" replace />} />
              <Route path="projects" element={<ProjectsManagement />} />
              <Route path="clients" element={<ClientsManagement />} />
              <Route path="contacts" element={<ContactsManagement />} />
              <Route path="subscribers" element={<SubscribersManagement />} />
            </Route>

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
