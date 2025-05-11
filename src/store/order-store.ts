
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, CartItem, Address } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface OrderStore {
  orders: Order[];
  createOrder: (items: CartItem[], customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: Address;
    paymentMethod: string;
  }) => string; // returns order ID
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => void;
  getOrderById: (id: string) => Order | undefined;
  getAllOrders: () => Order[];
  getPendingOrders: () => Order[];
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      
      createOrder: (items, customerInfo) => {
        const totalAmount = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        
        const newOrder: Order = {
          id: uuidv4(),
          items: [...items],
          totalAmount,
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone,
          shippingAddress: customerInfo.address,
          orderDate: new Date(),
          status: 'pending',
          paymentMethod: customerInfo.paymentMethod,
          paymentStatus: 'pending'
        };
        
        set((state) => ({
          orders: [newOrder, ...state.orders]
        }));
        
        return newOrder.id;
      },
      
      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          )
        }));
      },
      
      updatePaymentStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, paymentStatus: status } : order
          )
        }));
      },
      
      getOrderById: (id) => {
        return get().orders.find((order) => order.id === id);
      },
      
      getAllOrders: () => {
        return get().orders;
      },
      
      getPendingOrders: () => {
        return get().orders.filter((order) => 
          order.status === 'pending' || order.status === 'processing'
        );
      }
    }),
    {
      name: 'order-storage',
    }
  )
);
