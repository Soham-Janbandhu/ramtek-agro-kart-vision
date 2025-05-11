
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useProductStore } from '@/store/product-store';

interface ProductSearchProps {
  onSearch: (results: any[]) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const searchProducts = useProductStore((state) => state.searchProducts);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = searchProducts(query);
    onSearch(results);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-agro-primary"
        />
        <button
          type="submit"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-agro-primary"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </form>
    </div>
  );
};

export default ProductSearch;
