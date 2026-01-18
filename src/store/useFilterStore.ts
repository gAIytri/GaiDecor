import { create } from 'zustand';
import type { Product } from '@/types';

interface FilterStore {
  // Legacy filters (keeping for backward compatibility)
  priceRange: [number, number];
  selectedBrands: string[];
  minRating: number;
  selectedFeatures: string[];

  // New dynamic filter system
  selectedFilters: Record<string, string[]>;

  sortBy: 'price-asc' | 'price-desc' | 'popularity' | 'newest' | 'rating';

  // Legacy methods
  setPriceRange: (range: [number, number]) => void;
  toggleBrand: (brand: string) => void;
  setMinRating: (rating: number) => void;
  toggleFeature: (feature: string) => void;

  // New dynamic filter methods
  setFilter: (filterId: string, value: string) => void;
  clearFilter: (filterId: string) => void;
  clearAllFilters: () => void;

  setSortBy: (sort: 'price-asc' | 'price-desc' | 'popularity' | 'newest' | 'rating') => void;
  resetFilters: () => void;
  applyFilters: (products: Product[]) => Product[];
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  priceRange: [0, 10000],
  selectedBrands: [],
  minRating: 0,
  selectedFeatures: [],
  selectedFilters: {},
  sortBy: 'popularity',

  setPriceRange: (range) => set({ priceRange: range }),

  toggleBrand: (brand) => set((state) => ({
    selectedBrands: state.selectedBrands.includes(brand)
      ? state.selectedBrands.filter((b) => b !== brand)
      : [...state.selectedBrands, brand],
  })),

  setMinRating: (rating) => set({ minRating: rating }),

  toggleFeature: (feature) => set((state) => ({
    selectedFeatures: state.selectedFeatures.includes(feature)
      ? state.selectedFeatures.filter((f) => f !== feature)
      : [...state.selectedFeatures, feature],
  })),

  // New dynamic filter methods
  setFilter: (filterId, value) => set((state) => {
    const currentValues = state.selectedFilters[filterId] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    return {
      selectedFilters: {
        ...state.selectedFilters,
        [filterId]: newValues,
      },
    };
  }),

  clearFilter: (filterId) => set((state) => {
    const { [filterId]: _, ...rest } = state.selectedFilters;
    return { selectedFilters: rest };
  }),

  clearAllFilters: () => set({ selectedFilters: {} }),

  setSortBy: (sort) => set({ sortBy: sort }),

  resetFilters: () => set({
    priceRange: [0, 10000],
    selectedBrands: [],
    minRating: 0,
    selectedFeatures: [],
    selectedFilters: {},
    sortBy: 'popularity',
  }),

  applyFilters: (products) => {
    const { priceRange, selectedBrands, minRating, selectedFeatures, sortBy } = get();

    let filtered = products.filter((product) => {
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesRating = product.rating >= minRating;
      const matchesFeatures = selectedFeatures.length === 0 ||
        selectedFeatures.some((feature) => product.features.includes(feature));

      return matchesPrice && matchesBrand && matchesRating && matchesFeatures;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return 0; // Would use createdAt in real app
        case 'popularity':
        default:
          return b.reviewCount - a.reviewCount;
      }
    });

    return filtered;
  },
}));
