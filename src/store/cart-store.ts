import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getMenuItem, getRestaurantById } from "@/lib/mock-data";
import type { CartLine } from "@/lib/types";

type CartState = {
  restaurantId: string | null;
  lines: CartLine[];
  addItem: (menuItemId: string, restaurantId: string) => void;
  removeItem: (menuItemId: string) => void;
  setQuantity: (menuItemId: string, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      restaurantId: null,
      lines: [],
      addItem: (menuItemId, restaurantId) => {
        const state = get();
        if (state.restaurantId && state.restaurantId !== restaurantId) {
          set({ restaurantId, lines: [{ menuItemId, restaurantId, quantity: 1 }] });
          return;
        }
        const existing = state.lines.find((l) => l.menuItemId === menuItemId);
        if (existing) {
          set({
            restaurantId,
            lines: state.lines.map((l) =>
              l.menuItemId === menuItemId ? { ...l, quantity: l.quantity + 1 } : l,
            ),
          });
        } else {
          set({
            restaurantId,
            lines: [...state.lines, { menuItemId, restaurantId, quantity: 1 }],
          });
        }
      },
      removeItem: (menuItemId) => {
        const lines = get().lines.filter((l) => l.menuItemId !== menuItemId);
        set({ lines, restaurantId: lines.length ? get().restaurantId : null });
      },
      setQuantity: (menuItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId);
          return;
        }
        set({
          lines: get().lines.map((l) =>
            l.menuItemId === menuItemId ? { ...l, quantity } : l,
          ),
        });
      },
      clear: () => set({ lines: [], restaurantId: null }),
    }),
    { name: "go2eats-cart" },
  ),
);

export function useCartSummary() {
  const lines = useCartStore((s) => s.lines);
  const restaurantId = useCartStore((s) => s.restaurantId);
  const restaurant = restaurantId ? getRestaurantById(restaurantId) : undefined;
  const enriched = lines
    .map((line) => ({ line, item: getMenuItem(line.menuItemId) }))
    .filter((x): x is { line: CartLine; item: NonNullable<ReturnType<typeof getMenuItem>> } => !!x.item);
  const subtotalCents = enriched.reduce((sum, { line, item }) => sum + item.priceCents * line.quantity, 0);
  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);
  const deliveryFeeCents = restaurant?.deliveryFeeCents ?? 0;
  const totalCents = subtotalCents + (enriched.length ? deliveryFeeCents : 0);
  return { restaurant, enriched, subtotalCents, deliveryFeeCents, totalCents, itemCount };
}
