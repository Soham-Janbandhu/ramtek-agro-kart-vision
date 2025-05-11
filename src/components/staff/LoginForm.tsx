
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/auth-store';
import { toast } from '@/components/ui/use-toast';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const login = useAuthStore((state) => state.login);
  
  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const success = await login(data.email, data.password);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome to the staff dashboard",
        });
        navigate('/staff/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
          placeholder="staff@ramtekagro.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <a href="#" className="text-xs text-agro-primary hover:text-agro-secondary">
            Forgot password?
          </a>
        </div>
        <input
          id="password"
          type="password"
          {...register('password', { required: 'Password is required' })}
          className={`w-full p-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>
      
      <div>
        <button
          type="submit"
          className="w-full bg-agro-primary hover:bg-agro-primary/90 text-white py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-agro-primary disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </div>
      
      <div className="text-center text-sm text-gray-500">
        <p>For demo login use:</p>
        <p className="mt-1">Email: <span className="text-agro-text font-medium">staff@ramtekagro.com</span></p>
        <p>Password: <span className="text-agro-text font-medium">staff123</span></p>
      </div>
    </form>
  );
};

export default LoginForm;
