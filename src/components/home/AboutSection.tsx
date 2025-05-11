
import React from 'react';
import { Link } from 'react-router-dom';

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Image */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <div className="relative">
              <img 
                src="/placeholder.svg" 
                alt="Farmers at work" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-agro-primary text-white p-4 rounded-lg shadow-lg max-w-xs hidden md:block">
                <p className="text-sm">
                  "Our mission is to empower farmers and promote natural, healthy food products."
                </p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold text-agro-text mb-4">About Ramtek Agro Vision</h2>
            <p className="text-agro-light-text mb-4">
              Established in 2023 under the financial support of the Government of India's NABARD scheme, 
              we are committed to supporting farmers by enhancing their agricultural productivity and providing 
              them with better value for their produce.
            </p>
            <p className="text-agro-light-text mb-6">
              Our core product is natural, chemical-free, sugar-free jaggery made from sugarcane, with over 
              11 years of experience in jaggery production—ensuring high quality and health-conscious standards.
            </p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-agro-text mb-3">Our Vision</h3>
              <p className="text-agro-light-text">
                To promote natural, healthy food products while economically uplifting farmers and contributing to rural development.
              </p>
            </div>
            
            <Link 
              to="/about" 
              className="btn-primary inline-block"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
