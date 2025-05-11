
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductSearch from '@/components/products/ProductSearch';
import { useProductStore } from '@/store/product-store';
import { Product } from '@/types';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categoryParam = query.get('category');
  
  const { products, filterByCategory } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(
    categoryParam ? filterByCategory(categoryParam) : products
  );
  
  const handleSearch = (results: Product[]) => {
    setFilteredProducts(results);
  };
  
  return (
    <MainLayout>
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold text-center mb-8">
            {categoryParam ? `${categoryParam} Products` : 'All Products'}
          </h1>
          
          <ProductSearch onSearch={handleSearch} />
          
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
