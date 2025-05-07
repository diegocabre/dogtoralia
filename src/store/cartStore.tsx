'use client';

import React, {
  createContext,
  useContext,
  useRef,
  useEffect
} from "react";
import { create, StoreApi } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useSession } from "next-auth/react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  iva: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
}

type CartStore = StoreApi<CartState>;

const CartContext = createContext<CartStore | undefined>(undefined);

function getCartKey(email?: string) {
  return email ? `cart-storage-${email}` : "cart-storage-anon";
}

function createCartStore(key: string) {
  return create<CartState>()(
    persist(
      (set, get) => ({
        items: [],
        addToCart: (item) => {
          const existing = get().items.find((i) => i.id === item.id);
          if (existing) {
            set({
              items: get().items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            });
          } else {
            set({ items: [...get().items, item] });
          }
        },
        removeFromCart: (id) =>
          set({ items: get().items.filter((i) => i.id !== id) }),
        clearCart: () => set({ items: [] }),
        updateQuantity: (id, quantity) =>
          set({
            items: get().items.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
          }),
      }),
      {
        name: key,
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const email = session?.user?.email || undefined;
  const key = getCartKey(email);

  const storeRef = useRef<CartStore | undefined>(undefined);
  if (!storeRef.current) {
    storeRef.current = createCartStore(key);
  }

  useEffect(() => {
    if (storeRef.current && typeof storeRef.current.getState().clearCart === 'function') {
      storeRef.current.getState().clearCart();
    }
  }, [key]);

  return (
    <CartContext.Provider value={storeRef.current!}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartStore() {
  const store = useContext(CartContext);
  if (!store)
    throw new Error("useCartStore must be used within a CartProvider");
  return store.getState();
}
