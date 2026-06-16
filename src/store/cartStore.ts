import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Product = {
  id: string;
  price: number;
  [key: string]: unknown;
};

export interface CartItem {
  id: string; // unique key composite: id-color-storage
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedStorage: string;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, color: string, storage: string) => void;
  removeItem: (uniqueId: string) => void;
  updateQuantity: (uniqueId: string, delta: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, color, storage) => {
        const uniqueId = `${product.id}-${color}-${storage}`;
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === uniqueId);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === uniqueId ? { ...item, quantity: item.quantity + 1 } : item
            ),
          });
        } else {
          set({
            items: [...currentItems, { id: uniqueId, product, quantity: 1, selectedColor: color, selectedStorage: storage }],
          });
        }
      },

      removeItem: (uniqueId) => set({
        items: get().items.filter((item) => item.id !== uniqueId),
      }),

      updateQuantity: (uniqueId, delta) => set({
        items: get().items.map((item) => {
          if (item.id === uniqueId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: Math.max(1, newQty) };
          }
          return item;
        }),
      }),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      
      getSubtotal: () => get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    }),
    {
      name: 'berry-cart',
    }
  )
);