import { create } from 'zustand';
import type { Product, SortOption, FilterState } from '@/types';

interface FilterStore extends FilterState {
  // Dynamic filter system
  selectedFilters: Record<string, string[]>;

  // State setters
  setColors: (colors: string[]) => void;
  toggleColor: (color: string) => void;
  setMaterials: (materials: string[]) => void;
  toggleMaterial: (material: string) => void;
  setStyles: (styles: string[]) => void;
  toggleStyle: (style: string) => void;
  setRooms: (rooms: string[]) => void;
  toggleRoom: (room: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSort: (sort: SortOption) => void;
  setPage: (page: number) => void;

  // Dynamic filter methods
  setFilter: (filterId: string, value: string) => void;
  clearFilter: (filterId: string) => void;
  clearAllFilters: () => void;
  resetFilters: () => void;
  hasActiveFilters: () => boolean;

  // Client-side filter (for mock data; will be replaced by API calls)
  applyFilters: (products: Product[]) => Product[];
}

const initialState: FilterState = {
  colors: [],
  materials: [],
  styles: [],
  rooms: [],
  priceRange: [0, 10000],
  sort: 'best-selling',
  page: 1,
  perPage: 20,
};

function toggleItem(arr: string[], item: string): string[] {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  ...initialState,
  selectedFilters: {},

  setColors: (colors) => set({ colors, page: 1 }),
  toggleColor: (color) => set({ colors: toggleItem(get().colors, color), page: 1 }),
  setMaterials: (materials) => set({ materials, page: 1 }),
  toggleMaterial: (material) => set({ materials: toggleItem(get().materials, material), page: 1 }),
  setStyles: (styles) => set({ styles, page: 1 }),
  toggleStyle: (style) => set({ styles: toggleItem(get().styles, style), page: 1 }),
  setRooms: (rooms) => set({ rooms, page: 1 }),
  toggleRoom: (room) => set({ rooms: toggleItem(get().rooms, room), page: 1 }),
  setPriceRange: (priceRange) => set({ priceRange, page: 1 }),
  setSort: (sort) => set({ sort, page: 1 }),
  setPage: (page) => set({ page }),

  setFilter: (filterId, value) =>
    set((state) => {
      const currentValues = state.selectedFilters[filterId] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return {
        selectedFilters: { ...state.selectedFilters, [filterId]: newValues },
      };
    }),

  clearFilter: (filterId) =>
    set((state) => {
      const { [filterId]: _, ...rest } = state.selectedFilters;
      return { selectedFilters: rest };
    }),

  clearAllFilters: () => set({ ...initialState, selectedFilters: {} }),

  resetFilters: () => set({ ...initialState, selectedFilters: {} }),

  hasActiveFilters: () => {
    const s = get();
    return (
      s.colors.length > 0 ||
      s.materials.length > 0 ||
      s.styles.length > 0 ||
      s.rooms.length > 0 ||
      s.priceRange[0] > 0 ||
      s.priceRange[1] < 10000
    );
  },

  applyFilters: (products) => {
    const { colors, materials, styles, rooms, priceRange, sort } = get();

    let filtered = products.filter((product) => {
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesColor =
        colors.length === 0 ||
        colors.some((c) => product.attributes.color?.includes(c));
      const matchesMaterial =
        materials.length === 0 ||
        materials.some((m) => product.attributes.material?.includes(m));
      const matchesStyle =
        styles.length === 0 ||
        styles.some((s) => product.attributes.style?.includes(s));
      const matchesRoom =
        rooms.length === 0 ||
        rooms.some((r) => product.attributes.room?.includes(r));

      return matchesPrice && matchesColor && matchesMaterial && matchesStyle && matchesRoom;
    });

    filtered.sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'top-rated':
          return (b.metadata?.rating || 0) - (a.metadata?.rating || 0);
        case 'newest':
          return new Date(b.metadata?.createdAt || 0).getTime() - new Date(a.metadata?.createdAt || 0).getTime();
        case 'best-selling':
        default:
          return (b.metadata?.reviewCount || 0) - (a.metadata?.reviewCount || 0);
      }
    });

    return filtered;
  },
}));
