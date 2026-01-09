import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminLogin } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    console.log('🔵 handleSubmit called, event:', e);
    e.preventDefault();
    e.stopPropagation();

    console.log('=== Form Submission Started ===');
    console.log('Form submitted with data:', { email, password });

    if (!validateForm()) {
      console.log('❌ Form validation failed:', errors);
      toast.error('Please fill in all fields correctly');
      return;
    }

    setIsSubmitting(true);
    console.log('✅ Validation passed, sending API request...');

    try {
      console.log('📤 Calling adminLogin API with email:', email);
      const response = await adminLogin({ email, password });
      console.log('✅ Login response received:', response);

      if (response?.data) {
        login(response.data);
        console.log('✅ User logged in via context');
        toast.success('Login successful!');

        console.log('🔄 Navigating to /admin/projects...');
        setTimeout(() => {
          navigate('/admin/projects');
        }, 1000);
      } else {
        console.error('❌ No data in response:', response);
        toast.error('Login failed: No user data received');
      }
    } catch (error) {
      console.error('❌ Login error caught:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      console.error('Error status:', error.response?.status);

      const errorMessage = error.response?.data?.message || error.message || 'Invalid credentials';
      console.error('Showing error toast:', errorMessage);
      toast.error(errorMessage);
    } finally {
      console.log('=== Form Submission Ended ===');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">Admin Login</h2>
          <p className="text-gray-300">Sign in to access the admin panel</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300 focus:border-primary'
                  }`}
                placeholder="admin@leadgen.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.password ? 'border-red-500' : 'border-gray-300 focus:border-primary'
                  }`}
                placeholder="admin@123"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-600 text-sm">Remember me</span>
              </label>
              <a href="#" className="text-primary text-sm hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-primary text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
