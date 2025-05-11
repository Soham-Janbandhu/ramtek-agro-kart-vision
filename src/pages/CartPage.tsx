
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { useCartStore } from '@/store/cart-store';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  
  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };
  
  return (
    <MainLayout>
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold mb-8">Shopping Cart</h1>
          
          {items.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart size={24} className="text-agro-light-text" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-agro-light-text mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link 
                to="/products" 
                className="btn-primary inline-block"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">
                      Cart Items ({items.length})
                    </h2>
                    <button 
                      onClick={() => clearCart()}
                      className="text-sm text-red-500 hover:text-red-700 transition-colors"
                    >
                      Clear Cart
                    </button>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Link 
                      to="/products" 
                      className="text-agro-primary hover:text-agro-secondary transition-colors text-sm"
                    >
                      ← Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <CartSummary onProceedToCheckout={handleProceedToCheckout} />
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CartPage;
