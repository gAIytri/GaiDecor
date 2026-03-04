import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Address } from '@/types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;

  login: (user: User, token: string, refreshToken?: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addAddress: (address: Address) => void;
  updateAddress: (id: string, updates: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      refreshToken: null,

      login: (user, token, refreshToken) =>
        set({ user, isAuthenticated: true, token, refreshToken: refreshToken ?? null }),

      logout: () =>
        set({ user: null, isAuthenticated: false, token: null, refreshToken: null }),

      updateUser: (updates) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },

      addAddress: (address) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, addresses: [...user.addresses, address] } });
        }
      },

      updateAddress: (id, updates) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              addresses: user.addresses.map((a) =>
                a.id === id ? { ...a, ...updates } : a
              ),
            },
          });
        }
      },

      removeAddress: (id) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              addresses: user.addresses.filter((a) => a.id !== id),
            },
          });
        }
      },

      setDefaultAddress: (id) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              addresses: user.addresses.map((a) => ({
                ...a,
                isDefault: a.id === id,
              })),
            },
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
