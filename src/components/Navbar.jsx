import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 backdrop-blur-lg bg-opacity-90 shadow-2xl border-b border-white/20">
      
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-teal-400/10 to-cyan-400/10 animate-pulse"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
              </svg>
            </div>
            <div className="text-2xl font-bold text-white">
              <span className="bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                GreenCart
              </span>
              <span className="text-emerald-100 font-light ml-1">Logistics</span>
            </div>
          </div>

          
          <div className="hidden md:flex items-center space-x-1">
            {[
              { name: 'Dashboard', path: '/dashboard', icon: '📊' },
              { name: 'Drivers', path: '/drivers', icon: '👨‍💼' },
              { name: 'Orders', path: '/orders', icon: '📦' },
              { name: 'Routes', path: '/routes', icon: '🗺️' },
              { name: 'Simulation', path: '/simulation', icon: '⚡' }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="group relative px-4 py-2 text-white/90 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/10 backdrop-blur-sm"
              >
                <span className="flex items-center space-x-2">
                  <span className="text-sm group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </span>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></div>
              </Link>
            ))}
          </div>

          
          <div className="flex items-center space-x-4">
            {user && (
              <div className="hidden md:flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-white/90 font-medium">
                  Hello, <span className="text-white">{user.username}</span>
                </span>
              </div>
            )}

            
            <button
              onClick={handleLogout}
              className="group relative bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-red-400/30"
            >
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z"/>
                </svg>
                <span>Logout</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600/0 via-rose-400/30 to-red-600/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </button>

            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}>
          <div className="pt-4 space-y-2">
            {[
              { name: 'Dashboard', path: '/dashboard', icon: '📊' },
              { name: 'Drivers', path: '/drivers', icon: '👨‍💼' },
              { name: 'Orders', path: '/orders', icon: '📦' },
              { name: 'Routes', path: '/routes', icon: '🗺️' },
              { name: 'Simulation', path: '/simulation', icon: '⚡' }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg backdrop-blur-sm transition-all duration-200"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
            
            {user && (
              <div className="flex items-center space-x-3 px-4 py-3 bg-white/5 rounded-lg border border-white/10">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-white/90">Hello, <span className="text-white font-medium">{user.username}</span></span>
              </div>
            )}
          </div>
        </div>
      </div>

      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
    </nav>
  );
};

export default Navbar;