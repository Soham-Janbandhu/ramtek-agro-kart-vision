
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/cart-store';
import { Heart, Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartItemCount = useCartStore((state) => state.getTotalItems());
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-agro-primary font-heading font-bold text-xl md:text-2xl">
              Ramtek Agro
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-agro-text hover:text-agro-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-agro-text hover:text-agro-primary transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-agro-text hover:text-agro-primary transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-agro-text hover:text-agro-primary transition-colors">
              Contact
            </Link>
          </nav>
          
          {/* Desktop Action Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleSearch}
              className="text-agro-text hover:text-agro-primary transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <Link to="/wishlist" className="text-agro-text hover:text-agro-primary transition-colors relative">
              <Heart size={20} />
            </Link>
            
            <Link to="/cart" className="text-agro-text hover:text-agro-primary transition-colors relative">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-agro-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <Link to="/staff/dashboard" className="text-agro-text hover:text-agro-primary transition-colors">
                <User size={20} />
              </Link>
            ) : (
              <Link to="/staff/login" className="text-agro-text hover:text-agro-primary transition-colors">
                <User size={20} />
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <Link to="/cart" className="text-agro-text hover:text-agro-primary transition-colors relative">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-agro-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            <button 
              onClick={toggleMenu}
              className="text-agro-text hover:text-agro-primary transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-3 border-t mt-3 transition-all duration-300">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-agro-primary"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-agro-light-text">
                <Search size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <nav className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-agro-text hover:text-agro-primary transition-colors px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-agro-text hover:text-agro-primary transition-colors px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className="text-agro-text hover:text-agro-primary transition-colors px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="text-agro-text hover:text-agro-primary transition-colors px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex space-x-4 px-2 py-1">
              <button 
                onClick={() => {
                  toggleSearch();
                  setIsMenuOpen(false);
                }}
                className="text-agro-text hover:text-agro-primary transition-colors"
              >
                <Search size={20} />
                <span className="ml-2">Search</span>
              </button>
              <Link 
                to="/wishlist" 
                className="text-agro-text hover:text-agro-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart size={20} />
                <span className="ml-2">Wishlist</span>
              </Link>
            </div>
            {isAuthenticated ? (
              <Link 
                to="/staff/dashboard" 
                className="text-agro-text hover:text-agro-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={20} className="inline mr-2" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link 
                to="/staff/login" 
                className="text-agro-text hover:text-agro-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={20} className="inline mr-2" />
                <span>Staff Login</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
