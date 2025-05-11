import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);
          
          if (existingItem) {
            // If item exists, increase quantity
            return {
              items: state.items.map(item => 
                item.id === product.id 
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            // Otherwise add new item with quantity 1
            return {
              items: [...state.items, { ...product, quantity: 1 }],
            };
          }
        });
      },
      
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId),
        }));
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        set((state) => ({
          items: state.items.map(item => 
            item.id === productId 
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity, 
          0
        );
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
