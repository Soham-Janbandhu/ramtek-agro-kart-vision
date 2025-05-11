import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

// Initial products data
const initialProducts = [
  {
    id: '1',
    name: 'Natural Sugarcane Jaggery',
    description: 'Pure, chemical-free jaggery made from organically grown sugarcane. Rich in iron and natural minerals.',
    price: 199,
    imageUrl: '/placeholder.svg',
    category: 'Jaggery',
    featured: true,
    stock: 50
  },
  {
    id: '2',
    name: 'Premium Jaggery Powder',
    description: 'Finely ground jaggery powder, perfect for baking and sweetening beverages. 100% natural with no additives.',
    price: 249,
    imageUrl: '/placeholder.svg',
    category: 'Jaggery',
    featured: true,
    stock: 45
  },
  {
    id: '3',
    name: 'Organic Jaggery Cubes',
    description: 'Convenient jaggery cubes perfect for tea and coffee. Each cube is carefully molded from our premium jaggery.',
    price: 299,
    imageUrl: '/placeholder.svg',
    category: 'Jaggery',
    featured: true,
    stock: 30
  },
  {
    id: '4',
    name: 'Jaggery Gift Box',
    description: 'Assorted jaggery varieties elegantly packaged in a gift box. Perfect for festivals and special occasions.',
    price: 499,
    imageUrl: '/placeholder.svg',
    category: 'Gift Sets',
    featured: true,
    stock: 20
  },
  {
    id: '5',
    name: 'Traditional Block Jaggery',
    description: 'Classic block jaggery made using traditional methods. Pure, unrefined and full of natural goodness.',
    price: 179,
    imageUrl: '/placeholder.svg',
    category: 'Jaggery',
    featured: false,
    stock: 60
  },
  {
    id: '6',
    name: 'Jaggery with Ginger',
    description: 'Jaggery infused with organic ginger. Perfect for winter and known for its immunity-boosting properties.',
    price: 219,
    imageUrl: '/placeholder.svg',
    category: 'Flavored Jaggery',
    stock: 25
  }
];

export const useProductStore = create()(
  persist(
    (set, get) => ({
      products: initialProducts,
      
      // Store actions
      addProduct: (productData) => {
        const newProduct = {
          ...productData,
          id: uuidv4()
        };
        set((state) => ({
          products: [...state.products, newProduct]
        }));
      },
      
      updateProduct: (updatedProduct) => {
        set((state) => ({
          products: state.products.map((product) => 
            product.id === updatedProduct.id ? updatedProduct : product
          )
        }));
      },
      
      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id)
        }));
      },
      
      // These selector methods have been removed to avoid infinite rendering loops
      // They'll be implemented as regular selector functions in the components
    }),
    {
      name: 'product-storage'
    }
  )
);

// These are utility functions that can be imported and used with the store
// without causing infinite loops
export const getFeaturedProducts = (state) => {
  return state.products.filter(product => product.featured);
};

export const getProductById = (state, id) => {
  return state.products.find(product => product.id === id);
};

export const getRelatedProducts = (state, id, category, limit = 4) => {
  return state.products
    .filter(product => product.id !== id && product.category === category)
    .slice(0, limit);
};

export const searchProducts = (state, query) => {
  const lowerCaseQuery = query.toLowerCase();
  return state.products.filter(
    product =>
      product.name.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery) ||
      product.category.toLowerCase().includes(lowerCaseQuery)
  );
};

export const filterByCategory = (state, category) => {
  return state.products.filter(product => product.category === category);
};
