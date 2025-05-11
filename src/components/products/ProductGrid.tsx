
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl text-agro-light-text">No products found</h3>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8">
      {title && (
        <h2 className="text-2xl font-semibold mb-6 text-agro-text">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
