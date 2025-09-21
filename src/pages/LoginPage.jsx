import React, { useState } from 'react';
import { useAuth } from '../context/authContext.jsx'; 
import { useNavigate } from 'react-router-dom';


const BackgroundPattern = () => (
  <div className="absolute inset-0 opacity-40">
    <svg
      className="w-full h-full"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <g fill="#059669" fillOpacity="0.03">
          <path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/>
        </g>
      </g>
    </svg>
  </div>
);

// -------------------- LOGIN PAGE --------------------
const LoginPage = () => {
  const { login } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await login(email, password);
    if (success) {
      navigate('/dashboard'); 
    } else {
      setError('Invalid email or password');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center p-4 relative">
      <BackgroundPattern />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl shadow-lg mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            GreenCard Logistics
          </h1>
          <p className="text-gray-600 mt-2">Welcome back! Please sign in to continue</p>
        </div>

        <form className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6" onSubmit={handleLogin}>
          {error && <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg text-red-700 text-sm">{error}</div>}
          <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition" required />
          <button type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-200 transition">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-500">
          <span>Don't have an account? </span>
          <button onClick={() => navigate('/register')} className="text-emerald-600 hover:underline">Create one</button>
        </div>
      </div>
    </div>
  );
};

// -------------------- REGISTER PAGE --------------------
const RegisterPage = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('manager');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    const success = await register(username, email, password, role); 
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Registration failed');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center p-4 relative">
      <BackgroundPattern />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl shadow-lg mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            GreenCard Logistics
          </h1>
          <p className="text-gray-600 mt-2">Join us today and start your journey</p>
        </div>

        <form className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 space-y-4" onSubmit={handleRegister}>
          {error && <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg text-red-700 text-sm">{error}</div>}
          
          <input type="text" placeholder="Full Name" value={username} onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition" required />

          <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition" required />

          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition" required />

          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition" required />

          {/* Role Select */}
          <select value={role} onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition">
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="driver">Driver</option>
          </select>

          <button type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-200 transition">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-500">
          <span>Already have an account? </span>
          <button onClick={() => navigate('/login')} className="text-emerald-600 hover:underline">Sign In</button>
        </div>
      </div>
    </div>
  );
};

// -------------------- AUTH DEMO --------------------
const AuthDemo = () => {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <div>
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button onClick={() => setCurrentPage('login')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === 'login' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-emerald-600 border border-emerald-200 hover:bg-emerald-50'}`}>
          Login
        </button>
        <button onClick={() => setCurrentPage('register')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === 'register' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-emerald-600 border border-emerald-200 hover:bg-emerald-50'}`}>
          Register
        </button>
      </div>

      {currentPage === 'login' ? <LoginPage /> : <RegisterPage />}
    </div>
  );
};

export default AuthDemo;
