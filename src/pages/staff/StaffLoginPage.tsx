
import React from 'react';
import LoginForm from '@/components/staff/LoginForm';
import StaffLayout from '@/components/layout/StaffLayout';
import { Link } from 'react-router-dom';

const StaffLoginPage: React.FC = () => {
  return (
    <StaffLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center mb-8">
              <Link to="/" className="flex items-center justify-center">
                <span className="text-2xl font-bold text-agro-primary">
                  Ramtek Agro
                </span>
              </Link>
              <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                Staff Login
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Log in to access the staff dashboard
              </p>
            </div>
            
            <LoginForm />
          </div>
        </div>
      </div>
    </StaffLayout>
  );
};

export default StaffLoginPage;
