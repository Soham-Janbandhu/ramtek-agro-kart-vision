
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const AboutPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-center mb-10">About Us</h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-64 md:h-96">
              <img 
                src="/placeholder.svg" 
                alt="Ramtek Agro Vision" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 md:p-8 text-white">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-2">Ramtek Agro Vision</h2>
                  <p className="text-white/80">Founded in 2023, supporting farmers and promoting healthy food</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-4">Our Story</h3>
              <p className="text-agro-light-text mb-6">
                Ramtek Agro Vision Farmer Producer Company Limited was established in 2023 under the financial 
                support of the Government of India's NABARD scheme, facilitated by CBBO – Savitribai Phule 
                Mahila Ekatma Samaj Mandal, Chhatrapati Sambhajinagar.
              </p>
              <p className="text-agro-light-text mb-6">
                The company is committed to supporting farmers by enhancing their agricultural productivity 
                and providing them with better value for their produce. Our core product is natural, chemical-free, 
                sugar-free jaggery made from sugarcane, with over 11 years of experience in jaggery production—ensuring 
                high quality and health-conscious standards.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                  <p className="text-agro-light-text">
                    To empower farmers by providing sustainable agricultural solutions, technical support, 
                    and better market access to maximize the value of their produce.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                  <p className="text-agro-light-text">
                    To promote natural, healthy food products while economically uplifting farmers and 
                    contributing to rural development.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Core Values</h3>
              <ul className="list-disc pl-5 mb-8 space-y-2 text-agro-light-text">
                <li>Premium quality jaggery production</li>
                <li>100% chemical-free and sugar-free commitment</li>
                <li>Focus on health and natural ingredients</li>
                <li>Transparency and farmer-centric operations</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-4">Leadership Team</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3"></div>
                  <h4 className="font-medium">Mr. Bhaskar Rayba Gaygaye</h4>
                  <p className="text-sm text-agro-light-text">Chairman & Founder</p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3"></div>
                  <h4 className="font-medium">Mr. Snehal Ganesh Awathare</h4>
                  <p className="text-sm text-agro-light-text">Vice Chairman</p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3"></div>
                  <h4 className="font-medium">Mr. Pratik Sakharam Thakur</h4>
                  <p className="text-sm text-agro-light-text">Secretary</p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3"></div>
                  <h4 className="font-medium">Mr. Rakesh Mahadeo Gadhave</h4>
                  <p className="text-sm text-agro-light-text">CEO</p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Our Performance</h3>
              <ul className="list-disc pl-5 mb-8 space-y-2 text-agro-light-text">
                <li>Procure sugarcane directly from farmers at fair rates</li>
                <li>Produce high-quality jaggery with farmer benefits</li>
                <li>Company structured through 10 farmer groups</li>
                <li>Total of 476 registered farmer members</li>
                <li>Awareness programs on agriculture and health in schools, colleges, and farming communities</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-4">Future Plans</h3>
              <p className="text-agro-light-text">
                Our next step is to establish agri-processing units that buy raw produce from farmers at 
                competitive prices, process it for value addition, and ensure better returns through 
                market linkage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
