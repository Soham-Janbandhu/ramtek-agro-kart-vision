
import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <section className="py-12 bg-agro-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">Our Impact</h2>
          <p className="mt-2 text-white/80">Making a difference in our farming community</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold">476</div>
            <p className="mt-2 text-white/80">Registered Farmers</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold">10+</div>
            <p className="mt-2 text-white/80">Farmer Groups</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold">11</div>
            <p className="mt-2 text-white/80">Years Experience</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold">100%</div>
            <p className="mt-2 text-white/80">Chemical-Free</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
