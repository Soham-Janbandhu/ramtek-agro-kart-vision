
import React from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '@/store/product-store';
import ProductCard from '../products/ProductCard';

const FeaturedProducts: React.FC = () => {
  const featuredProducts = useProductStore((state) => state.getFeaturedProducts());
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-agro-text">Featured Products</h2>
          <Link 
            to="/products" 
            className="text-agro-primary hover:text-agro-secondary font-medium transition-colors"
          >
            View All Products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
