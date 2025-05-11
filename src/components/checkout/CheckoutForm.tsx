
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cart-store';
import { useOrderStore } from '@/store/order-store';
import { toast } from '@/components/ui/use-toast';
import { Mail, Phone, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Address } from '@/types';

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  paymentMethod: string;
}

const CheckoutForm: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, clearCart, getTotalPrice } = useCartStore();
  const { createOrder } = useOrderStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    defaultValues: {
      country: 'India',
      paymentMethod: 'cash_on_delivery'
    }
  });
  
  const onSubmit = (data: CheckoutFormData) => {
    setIsSubmitting(true);
    
    try {
      const shippingAddress: Address = {
        street: data.street,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country
      };
      
      const orderId = createOrder(items, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: shippingAddress,
        paymentMethod: data.paymentMethod
      });
      
      // Clear the cart after successful order
      clearCart();
      
      // Redirect to success page
      navigate(`/order-success?id=${orderId}`);
      
      toast({
        title: "Order placed successfully",
        description: "Thank you for your purchase!",
      });
    } catch (error) {
      console.error("Error placing order:", error);
      
      toast({
        title: "Error placing order",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={16} />
              </div>
              <Input
                id="name"
                className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Enter your full name"
                {...register('name', { required: 'Name is required' })}
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={16} />
              </div>
              <Input
                id="email"
                type="email"
                className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Enter your email address"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Phone size={16} />
              </div>
              <Input
                id="phone"
                className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                placeholder="Enter your phone number"
                {...register('phone', { required: 'Phone number is required' })}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="street">Street Address</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <MapPin size={16} />
              </div>
              <Input
                id="street"
                className={`pl-10 ${errors.street ? 'border-red-500' : ''}`}
                placeholder="Street address, apartment, etc."
                {...register('street', { required: 'Street address is required' })}
              />
            </div>
            {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                className={errors.city ? 'border-red-500' : ''}
                {...register('city', { required: 'City is required' })}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                className={errors.state ? 'border-red-500' : ''}
                {...register('state', { required: 'State is required' })}
              />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                className={errors.postalCode ? 'border-red-500' : ''}
                {...register('postalCode', { required: 'Postal code is required' })}
              />
              {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                className={errors.country ? 'border-red-500' : ''}
                {...register('country', { required: 'Country is required' })}
              />
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="cash_on_delivery"
              value="cash_on_delivery"
              className="h-4 w-4 text-agro-primary focus:ring-agro-primary border-gray-300"
              {...register('paymentMethod', { required: 'Payment method is required' })}
            />
            <Label htmlFor="cash_on_delivery" className="cursor-pointer">Cash on Delivery</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="upi"
              value="upi"
              className="h-4 w-4 text-agro-primary focus:ring-agro-primary border-gray-300"
              {...register('paymentMethod')}
            />
            <Label htmlFor="upi" className="cursor-pointer">UPI</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="card"
              value="card"
              className="h-4 w-4 text-agro-primary focus:ring-agro-primary border-gray-300"
              {...register('paymentMethod')}
            />
            <Label htmlFor="card" className="cursor-pointer">Credit/Debit Card</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="bank_transfer"
              value="bank_transfer"
              className="h-4 w-4 text-agro-primary focus:ring-agro-primary border-gray-300"
              {...register('paymentMethod')}
            />
            <Label htmlFor="bank_transfer" className="cursor-pointer">Bank Transfer</Label>
          </div>
        </div>
        {errors.paymentMethod && <p className="text-red-500 text-xs mt-1">{errors.paymentMethod.message}</p>}
      </div>
      
      <div className="pt-6">
        <Button 
          type="submit" 
          className="w-full bg-agro-primary hover:bg-agro-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : `Place Order - ₹${getTotalPrice().toFixed(2)}`}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
