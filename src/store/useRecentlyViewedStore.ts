import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Store minimal product info to keep localStorage light
interface RecentlyViewedProduct {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  primaryImage: string;
  viewedAt: number; // timestamp for ordering
}

interface RecentlyViewedStore {
  // Array of recently viewed product IDs (most recent first)
  products: RecentlyViewedProduct[];

  // Add a product to recently viewed (called when visiting product detail page)
  addProduct: (product: {
    id: string;
    name: string;
    price: number;
    compareAtPrice?: number;
    primaryImage: string;
  }) => void;

  // Get recently viewed products (returns up to limit)
  getRecentlyViewed: (limit?: number, excludeId?: string) => RecentlyViewedProduct[];

  // Clear all recently viewed
  clearAll: () => void;
}

const MAX_STORED_PRODUCTS = 20; // Store more than we show, for variety

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      products: [],

      addProduct: (product) => {
        set((state) => {
          // Remove if already exists (to move to front)
          const filtered = state.products.filter((p) => p.id !== product.id);

          // Add to front with timestamp
          const newProduct: RecentlyViewedProduct = {
            ...product,
            viewedAt: Date.now(),
          };

          // Keep only the most recent MAX_STORED_PRODUCTS
          const updated = [newProduct, ...filtered].slice(0, MAX_STORED_PRODUCTS);

          return { products: updated };
        });
      },

      getRecentlyViewed: (limit = 5, excludeId) => {
        const { products } = get();

        // Filter out the excluded ID (current product) and return up to limit
        return products
          .filter((p) => p.id !== excludeId)
          .slice(0, limit);
      },

      clearAll: () => set({ products: [] }),
    }),
    {
      name: 'recently-viewed-storage',
    }
  )
);
