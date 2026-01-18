/**
 * Cart Drawer Store
 * Manages the open/close state of the cart drawer
 */

import { create } from 'zustand';

interface CartDrawerState {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

export const useCartDrawerStore = create<CartDrawerState>((set) => ({
  isOpen: false,
  openDrawer: () => set({ isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),
  toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
}));
