import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-xl mb-8">The page you're looking for doesn't exist.</p>
        <div className="space-x-4">
          <Link to="/" className="btn-primary bg-white text-primary hover:bg-gray-100">
            Go Home
          </Link>
          <Link to="/admin/login" className="btn-secondary bg-white/10 text-white hover:bg-white/20">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
