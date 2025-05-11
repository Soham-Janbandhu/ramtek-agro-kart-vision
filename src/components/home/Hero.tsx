
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-green-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Content */}
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h1 className="text-4xl md:text-5xl font-bold text-agro-primary mb-4">
            Natural & Chemical-Free Jaggery
          </h1>
          <p className="text-lg text-agro-light-text mb-6">
            Experience the authentic taste of traditional jaggery, made with care by our farmer community 
            at Ramtek Agro Vision. 100% natural, sugar-free, and health-conscious.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/products" 
              className="btn-primary text-center sm:text-left"
            >
              Shop Products
            </Link>
            <Link 
              to="/about" 
              className="border border-agro-primary text-agro-primary hover:bg-agro-primary hover:text-white px-4 py-2 rounded-md transition-colors duration-200 text-center sm:text-left"
            >
              Learn About Us
            </Link>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap gap-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-agro-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-medium">100% Natural</span>
            </div>
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-agro-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-sm font-medium">Chemical-Free</span>
            </div>
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-agro-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <span className="text-sm font-medium">Farmer Supported</span>
            </div>
          </div>
        </div>
        
        {/* Image */}
        <div className="md:w-1/2 relative">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/placeholder.svg" 
              alt="Natural jaggery products" 
              className="w-full h-auto"
            />
          </div>
          
          {/* Floating Card */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-xs hidden md:block">
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-agro-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-sm">Supporting Farmers</h3>
                <p className="text-xs text-agro-light-text mt-1">
                  We pay fair prices directly to our farmer network, ensuring community growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
