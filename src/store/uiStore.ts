import { create } from 'zustand';

interface UIState {
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  isCompareOpen: boolean;
  setCompareOpen: (open: boolean) => void;
  isGeniusOpen: boolean; // ✨ Added Genius Bar booking state track
  setGeniusOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  setCartOpen: (open) => set({ isCartOpen: open }),
  isCompareOpen: false,
  setCompareOpen: (open) => set({ isCompareOpen: open }),
  isGeniusOpen: false,
  setGeniusOpen: (open) => set({ isGeniusOpen: open }),
}));