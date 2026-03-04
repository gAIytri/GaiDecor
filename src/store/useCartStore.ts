import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/types';

interface CartStore {
  items: CartItem[];
  couponCode: string | null;
  discount: number;

  addItem: (product: Product, quantity: number, color: string, size?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;

  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  subtotal: () => number;
  shipping: () => number;
  tax: () => number;
  total: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discount: 0,

      addItem: (product, quantity, color, size) => {
        set((state) => {
          const existing = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.selectedColor === color &&
              item.selectedSize === size
          );

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === existing.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                id: `cart-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                product,
                selectedColor: color,
                selectedSize: size,
                quantity,
              },
            ],
          };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [], couponCode: null, discount: 0 }),

      applyCoupon: (code) => {
        const discountMap: Record<string, number> = {
          SAVE10: 0.1,
          SAVE20: 0.2,
          FREESHIP: 0,
        };
        const rate = discountMap[code.toUpperCase()];
        if (rate !== undefined) {
          set({ couponCode: code.toUpperCase(), discount: rate });
          return true;
        }
        return false;
      },

      removeCoupon: () => set({ couponCode: null, discount: 0 }),

      subtotal: () =>
        get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),

      shipping: () => {
        if (get().couponCode === 'FREESHIP') return 0;
        return get().subtotal() > 100 ? 0 : 9.99;
      },

      tax: () => get().subtotal() * 0.08,

      total: () => {
        const sub = get().subtotal();
        const discountAmount = sub * get().discount;
        return sub - discountAmount + get().shipping() + get().tax();
      },

      // Backward-compatible aliases
      getTotal: () => get().subtotal(),
      getItemCount: () =>
        get().items.reduce((count, item) => count + item.quantity, 0),
    }),
    { name: 'cart-storage' }
  )
);
