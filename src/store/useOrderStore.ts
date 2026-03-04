import { create } from 'zustand';
import type { Order } from '@/types';

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;

  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  setCurrentOrder: (order: Order | null) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,

  setOrders: (orders) => set({ orders }),

  addOrder: (order) =>
    set((state) => ({ orders: [order, ...state.orders] })),

  setCurrentOrder: (order) => set({ currentOrder: order }),

  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status } : o
      ),
      currentOrder:
        state.currentOrder?.id === orderId
          ? { ...state.currentOrder, status }
          : state.currentOrder,
    })),

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
