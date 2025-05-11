
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cart-store';
import { useOrderStore } from '@/store/order-store';
import { Address } from '@/types';
import { toast } from '@/components/ui/use-toast';

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  paymentMethod: 'credit_card' | 'upi' | 'cod';
}

const CheckoutForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { createOrder } = useOrderStore();
  
  const onSubmit = async (data: CheckoutFormData) => {
    try {
      setIsSubmitting(true);
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const address: Address = {
        street: data.street,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country
      };
      
      // Create order
      const orderId = createOrder(items, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address,
        paymentMethod: data.paymentMethod
      });
      
      // Clear cart after successful order
      clearCart();
      
      // Redirect to success page with order ID
      navigate(`/order-success?id=${orderId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
      console.error("Checkout error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-agro-text mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-agro-text mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Full name is required' })}
              className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-agro-text mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-agro-text mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone', { 
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Please enter a valid 10-digit phone number'
                }
              })}
              className={`w-full p-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="9876543210"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-agro-text mb-4">Shipping Address</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="street" className="block text-sm font-medium text-agro-text mb-1">
              Street Address
            </label>
            <input
              id="street"
              type="text"
              {...register('street', { required: 'Street address is required' })}
              className={`w-full p-2 border rounded-md ${errors.street ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="123 Main St"
            />
            {errors.street && (
              <p className="mt-1 text-xs text-red-500">{errors.street.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-agro-text mb-1">
              City
            </label>
            <input
              id="city"
              type="text"
              {...register('city', { required: 'City is required' })}
              className={`w-full p-2 border rounded-md ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Mumbai"
            />
            {errors.city && (
              <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-agro-text mb-1">
              State
            </label>
            <input
              id="state"
              type="text"
              {...register('state', { required: 'State is required' })}
              className={`w-full p-2 border rounded-md ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Maharashtra"
            />
            {errors.state && (
              <p className="mt-1 text-xs text-red-500">{errors.state.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-agro-text mb-1">
              Postal Code
            </label>
            <input
              id="postalCode"
              type="text"
              {...register('postalCode', { 
                required: 'Postal code is required',
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: 'Please enter a valid 6-digit postal code'
                }
              })}
              className={`w-full p-2 border rounded-md ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="400001"
            />
            {errors.postalCode && (
              <p className="mt-1 text-xs text-red-500">{errors.postalCode.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-agro-text mb-1">
              Country
            </label>
            <input
              id="country"
              type="text"
              {...register('country', { required: 'Country is required' })}
              className={`w-full p-2 border rounded-md ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="India"
              defaultValue="India"
            />
            {errors.country && (
              <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>
            )}
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-agro-text mb-4">Payment Method</h3>
        <div className="space-y-3">
          <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              value="credit_card"
              {...register('paymentMethod', { required: 'Please select a payment method' })}
              className="mr-3"
            />
            <div className="flex items-center">
              <div className="bg-gray-100 rounded p-1 mr-3">
                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="16" rx="2" fill="#E6E6E6"/>
                  <path d="M7 6H14L13 9H6L7 6Z" fill="#FF5F00"/>
                  <path d="M7.25 7.5C7.25 6.9 7.52995 6.36667 7.98331 6C7.68103 5.75 7.30477 5.58333 6.88164 5.525C6.45851 5.46667 6.02699 5.51667 5.637 5.66667C5.24702 5.81667 4.91174 6.06667 4.6817 6.375C4.45166 6.68333 4.33333 7.08333 4.33333 7.5C4.33333 7.91667 4.45166 8.31667 4.6817 8.625C4.91174 8.93333 5.24702 9.18333 5.637 9.33333C6.02699 9.48333 6.45851 9.53333 6.88164 9.475C7.30477 9.41667 7.68103 9.25 7.98331 9C7.52995 8.63333 7.25 8.1 7.25 7.5Z" fill="#EB001B"/>
                  <path d="M19.6667 7.5C19.6667 7.91667 19.5483 8.31667 19.3183 8.625C19.0883 8.93333 18.753 9.18333 18.363 9.33333C17.973 9.48333 17.5414 9.53333 17.1183 9.475C16.6952 9.41667 16.3189 9.25 16.0167 9C16.47 8.63333 16.75 8.1 16.75 7.5C16.75 6.9 16.47 6.36667 16.0167 6C16.3189 5.75 16.6952 5.58333 17.1183 5.525C17.5414 5.46667 17.973 5.51667 18.363 5.66667C18.753 5.81667 19.0883 6.06667 19.3183 6.375C19.5483 6.68333 19.6667 7.08333 19.6667 7.5Z" fill="#F79E1B"/>
                </svg>
              </div>
              <div>
                <div className="font-medium text-agro-text">Credit / Debit Card</div>
                <div className="text-xs text-agro-light-text">Pay securely with your card</div>
              </div>
            </div>
          </label>
          
          <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              value="upi"
              {...register('paymentMethod', { required: 'Please select a payment method' })}
              className="mr-3"
            />
            <div className="flex items-center">
              <div className="bg-gray-100 rounded p-1 mr-3">
                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="16" rx="2" fill="#E6E6E6"/>
                  <path d="M13.3367 3.33333L8.00333 12.6667H10.67L16 3.33333H13.3367Z" fill="#097939"/>
                  <path d="M6.66667 3.33333L4 8.66666L5.33333 12.6667L9.33333 3.33333H6.66667Z" fill="#747474"/>
                  <path d="M14.6667 12.6667H17.3333L20 3.33334H17.3333L14.6667 12.6667Z" fill="#747474"/>
                </svg>
              </div>
              <div>
                <div className="font-medium text-agro-text">UPI</div>
                <div className="text-xs text-agro-light-text">Pay using UPI apps</div>
              </div>
            </div>
          </label>
          
          <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              value="cod"
              {...register('paymentMethod', { required: 'Please select a payment method' })}
              className="mr-3"
            />
            <div>
              <div className="font-medium text-agro-text">Cash on Delivery</div>
              <div className="text-xs text-agro-light-text">Pay when you receive your order</div>
            </div>
          </label>
          
          {errors.paymentMethod && (
            <p className="mt-1 text-xs text-red-500">{errors.paymentMethod.message}</p>
          )}
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full bg-agro-primary hover:bg-agro-primary/90 text-white py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-agro-primary disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  );
};

export default CheckoutForm;
