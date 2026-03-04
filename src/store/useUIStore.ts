import { create } from 'zustand';

interface UIStore {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  isCartDrawerOpen: boolean;
  isFilterSidebarOpen: boolean;

  setMobileMenuOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setCartDrawerOpen: (open: boolean) => void;
  setFilterSidebarOpen: (open: boolean) => void;
  closeAll: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isCartDrawerOpen: false,
  isFilterSidebarOpen: false,

  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setCartDrawerOpen: (open) => set({ isCartDrawerOpen: open }),
  setFilterSidebarOpen: (open) => set({ isFilterSidebarOpen: open }),

  closeAll: () =>
    set({
      isMobileMenuOpen: false,
      isSearchOpen: false,
      isCartDrawerOpen: false,
      isFilterSidebarOpen: false,
    }),
}));
