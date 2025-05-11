
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '@/types';

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

// Define the store state type
interface ProductState {
  products: Product[];
  addProduct: (productData: Omit<Product, 'id'>) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (id: string) => void;
}

// Create the store
export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: initialProducts,
      
      // Store actions
      addProduct: (productData) => {
        const newProduct = {
          ...productData,
          id: uuidv4()
        } as Product;
        
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
    }),
    {
      name: 'product-storage'
    }
  )
);

// Separate selector functions to avoid infinite renders
export const searchProducts = (query: string): Product[] => {
  const products = useProductStore.getState().products;
  const lowerCaseQuery = query.toLowerCase();
  return products.filter(
    product =>
      product.name.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery) ||
      product.category.toLowerCase().includes(lowerCaseQuery)
  );
};

export const filterByCategory = (category: string): Product[] => {
  const products = useProductStore.getState().products;
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  const products = useProductStore.getState().products;
  return products.filter(product => product.featured);
};

export const getProductById = (id: string): Product | undefined => {
  const products = useProductStore.getState().products;
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (id: string, category: string, limit = 4): Product[] => {
  const products = useProductStore.getState().products;
  return products
    .filter(product => product.id !== id && product.category === category)
    .slice(0, limit);
};
