
import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth-store';

interface StaffLayoutProps {
  children: React.ReactNode;
}

const StaffLayout: React.FC<StaffLayoutProps> = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();
  
  // If not authenticated and not on login page, redirect to login
  if (!isAuthenticated && location.pathname !== '/staff/login') {
    return <Navigate to="/staff/login" replace />;
  }
  
  // If on the login page and already authenticated, redirect to dashboard
  if (isAuthenticated && location.pathname === '/staff/login') {
    return <Navigate to="/staff/dashboard" replace />;
  }
  
  // Only render the staff layout when authenticated (except for login page)
  if (!isAuthenticated && location.pathname === '/staff/login') {
    return <>{children}</>;
  }
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-agro-primary text-white">
        {/* Logo */}
        <div className="p-4 border-b border-white/20">
          <Link to="/" className="flex items-center">
            <span className="text-white font-heading font-bold text-xl">
              Ramtek Agro
            </span>
          </Link>
        </div>
        
        {/* User Info */}
        <div className="p-4 border-b border-white/20">
          <div className="text-sm opacity-80">Logged in as</div>
          <div className="font-medium">{user?.name}</div>
          <div className="text-xs opacity-70 capitalize">{user?.role}</div>
        </div>
        
        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-1">
            <li>
              <Link 
                to="/staff/dashboard" 
                className={`px-4 py-2 rounded-md block transition-colors ${
                  location.pathname === '/staff/dashboard' 
                    ? 'bg-white/10 font-medium' 
                    : 'hover:bg-white/5'
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/staff/orders" 
                className={`px-4 py-2 rounded-md block transition-colors ${
                  location.pathname === '/staff/orders' 
                    ? 'bg-white/10 font-medium' 
                    : 'hover:bg-white/5'
                }`}
              >
                Orders
              </Link>
            </li>
            <li>
              <Link 
                to="/staff/products" 
                className={`px-4 py-2 rounded-md block transition-colors ${
                  location.pathname === '/staff/products' 
                    ? 'bg-white/10 font-medium' 
                    : 'hover:bg-white/5'
                }`}
              >
                Products
              </Link>
            </li>
            <li className="pt-4 mt-4 border-t border-white/20">
              <button 
                onClick={() => logout()}
                className="px-4 py-2 rounded-md block transition-colors hover:bg-white/5 w-full text-left"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold text-agro-text">
              {location.pathname === '/staff/dashboard' && 'Dashboard'}
              {location.pathname === '/staff/orders' && 'Orders Management'}
              {location.pathname === '/staff/products' && 'Products Management'}
            </h1>
            <Link to="/" className="text-sm text-agro-primary hover:underline">
              View Store
            </Link>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StaffLayout;
