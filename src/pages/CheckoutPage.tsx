
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { useCartStore } from '@/store/cart-store';
import CheckoutForm from '@/components/checkout/CheckoutForm';

const CheckoutPage: React.FC = () => {
  const { items, getTotalPrice } = useCartStore();
  
  // If cart is empty, redirect to cart page
  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }
  
  return (
    <MainLayout>
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <CheckoutForm />
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                
                <div className="max-h-80 overflow-y-auto mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center py-3 border-b border-gray-100 last:border-0">
                      <div className="w-12 h-12 mr-4 flex-shrink-0">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                        <div className="flex justify-between mt-1 text-sm text-agro-light-text">
                          <span>₹{item.price.toFixed(2)} x {item.quantity}</span>
                          <span className="font-medium text-agro-text">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 pb-4 border-b border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-agro-light-text">Subtotal</span>
                    <span className="font-medium">₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-agro-light-text">Shipping</span>
                    <span className="font-medium">
                      {getTotalPrice() > 1000 ? 'Free' : `₹100.00`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-agro-light-text">Tax (5%)</span>
                    <span className="font-medium">₹{(getTotalPrice() * 0.05).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4 font-semibold text-lg">
                  <span>Total</span>
                  <span>
                    ₹{(
                      getTotalPrice() + 
                      (getTotalPrice() > 1000 ? 0 : 100) + 
                      getTotalPrice() * 0.05
                    ).toFixed(2)}
                  </span>
                </div>
                
                <div className="mt-6 text-center">
                  <Link 
                    to="/cart" 
                    className="text-agro-primary hover:text-agro-secondary text-sm"
                  >
                    ← Back to Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
