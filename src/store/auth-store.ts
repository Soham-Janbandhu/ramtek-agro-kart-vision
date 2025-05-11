
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StaffUser } from '../types';

// Mock staff users for demo (in a real app, these would come from a backend)
const mockUsers = [
  {
    id: '1',
    email: 'admin@ramtekagro.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
  },
  {
    id: '2',
    email: 'staff@ramtekagro.com',
    password: 'staff123',
    name: 'Staff User',
    role: 'staff' as const,
  }
];

interface AuthStore {
  user: StaffUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = mockUsers.find(
          u => u.email === email && u.password === password
        );
        
        if (user) {
          const { password, ...userWithoutPassword } = user;
          set({
            user: userWithoutPassword,
            isAuthenticated: true
          });
          return true;
        }
        
        return false;
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false
        });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
