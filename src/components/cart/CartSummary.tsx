
import React from 'react';
import { useCartStore } from '@/store/cart-store';
import { Button } from '@/components/ui/button';

interface CartSummaryProps {
  onProceedToCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onProceedToCheckout }) => {
  const { items, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();
  const shippingCost = totalPrice > 1000 ? 0 : 100;
  const tax = totalPrice * 0.05; // 5% tax
  const finalTotal = totalPrice + shippingCost + tax;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-agro-text mb-4">Order Summary</h3>
      
      <div className="space-y-3 pb-4 border-b border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-agro-light-text">Subtotal ({items.length} items)</span>
          <span className="text-agro-text">₹{totalPrice.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-agro-light-text">Shipping</span>
          {shippingCost === 0 ? (
            <span className="text-green-500">Free</span>
          ) : (
            <span className="text-agro-text">₹{shippingCost.toFixed(2)}</span>
          )}
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-agro-light-text">Tax (5%)</span>
          <span className="text-agro-text">₹{tax.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="flex justify-between pt-4 mb-6">
        <span className="font-semibold text-agro-text">Total</span>
        <span className="font-semibold text-agro-text">₹{finalTotal.toFixed(2)}</span>
      </div>
      
      <Button 
        onClick={onProceedToCheckout} 
        className="w-full bg-agro-primary hover:bg-agro-primary/90"
        disabled={items.length === 0}
      >
        Proceed to Checkout
      </Button>
      
      {shippingCost > 0 && (
        <p className="text-xs text-center mt-4 text-agro-light-text">
          Add ₹{(1000 - totalPrice).toFixed(2)} more to get free shipping
        </p>
      )}
      
      <div className="mt-6 text-center text-xs text-agro-light-text">
        <p>We accept</p>
        <div className="flex justify-center space-x-2 mt-2">
          <div className="bg-gray-100 p-1 rounded">
            <svg className="w-8 h-5" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="24" rx="4" fill="#E6E6E6" />
              <path d="M19.3807 7.0948H15.5718V16.9052H19.3807V7.0948Z" fill="#0A64A4" />
              <path d="M15.9536 12.0002C15.9536 10.0219 16.8645 8.25 18.3288 7.09523C17.418 6.40476 16.2599 6 15.0009 6C11.8125 6 9.21918 8.71429 9.21918 12.0002C9.21918 15.2861 11.8125 18.0004 15.0009 18.0004C16.2599 18.0004 17.418 17.5957 18.3288 16.9052C16.8645 15.7957 15.9536 13.9786 15.9536 12.0002Z" fill="#0A64A4" />
              <path d="M33.0822 7.0948V7.71429C32.3681 7.19048 31.5059 6.85715 30.5464 6.85715C27.8509 6.85715 25.6742 9.14286 25.6742 12.0002C25.6742 14.8576 27.8509 17.1434 30.5464 17.1434C31.5059 17.1434 32.3681 16.81 33.0822 16.2862V16.9057H36.891V7.0948H33.0822Z" fill="#0A64A4" />
              <path d="M31.1603 14.2861C29.9013 14.2861 28.8909 13.2862 28.8909 12.0002C28.8909 10.7143 29.9013 9.71438 31.1603 9.71438C32.4193 9.71438 33.4297 10.7143 33.4297 12.0002C33.4297 13.2862 32.4193 14.2861 31.1603 14.2861Z" fill="#0A64A4" />
              <path d="M20.4397 12.0002C20.4397 8.71429 23.033 6 26.2214 6C27.4804 6 28.6384 6.40476 29.5493 7.09523C28.085 8.25 27.174 10.0219 27.174 12.0002C27.174 13.9786 28.085 15.7957 29.5493 16.9052C28.6384 17.5957 27.4804 18.0005 26.2214 18.0005C23.033 18.0005 20.4397 15.2814 20.4397 12.0002Z" fill="#0A64A4" />
            </svg>
          </div>
          <div className="bg-gray-100 p-1 rounded">
            <svg className="w-8 h-5" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="24" rx="4" fill="#E6E6E6" />
              <path d="M20 9H28L26 15H18L20 9Z" fill="#FF5F00" />
              <path d="M20.5 12C20.5 10.8 21.0599 9.73333 21.9666 9C21.3621 8.5 20.6095 8.16667 19.7633 8.05C18.9171 7.93333 18.054 8.03333 17.274 8.33333C16.494 8.63333 15.8235 9.13333 15.3634 9.75C14.9033 10.3667 14.6667 11.1667 14.6667 12C14.6667 12.8333 14.9033 13.6333 15.3634 14.25C15.8235 14.8667 16.494 15.3667 17.274 15.6667C18.054 15.9667 18.9171 16.0667 19.7633 15.95C20.6095 15.8333 21.3621 15.5 21.9666 15C21.0599 14.2667 20.5 13.2 20.5 12Z" fill="#EB001B" />
              <path d="M33.3333 12C33.3333 12.8333 33.0967 13.6333 32.6366 14.25C32.1765 14.8667 31.5059 15.3667 30.726 15.6667C29.946 15.9667 29.0828 16.0667 28.2366 15.95C27.3904 15.8333 26.6378 15.5 26.0333 15C26.94 14.2667 27.5 13.2 27.5 12C27.5 10.8 26.94 9.73333 26.0333 9C26.6378 8.5 27.3904 8.16667 28.2366 8.05C29.0828 7.93333 29.946 8.03333 30.726 8.33333C31.5059 8.63333 32.1765 9.13333 32.6366 9.75C33.0967 10.3667 33.3333 11.1667 33.3333 12Z" fill="#F79E1B" />
              <path d="M32 12C32 13.0609 31.5786 14.0783 30.8284 14.8284C30.0783 15.5786 29.0609 16 28 16C26.9391 16 25.9217 15.5786 25.1716 14.8284C24.4214 14.0783 24 13.0609 24 12C24 10.9391 24.4214 9.92172 25.1716 9.17157C25.9217 8.42143 26.9391 8 28 8C29.0609 8 30.0783 8.42143 30.8284 9.17157C31.5786 9.92172 32 10.9391 32 12V12Z" fill="#FF9A00" />
            </svg>
          </div>
          <div className="bg-gray-100 p-1 rounded">
            <svg className="w-8 h-5" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="24" rx="4" fill="#E6E6E6" />
              <path d="M16.6001 8.8H31.4001V15.2H16.6001V8.8Z" fill="#012169" />
              <path d="M20.5 12H27.5M19 10L29 14M29 10L19 14" stroke="white" strokeWidth="1.2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
