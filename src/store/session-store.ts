import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DEMO_RESTAURANT_ID, DEMO_RIDER_ID } from "@/lib/mock-data";

type SessionState = {
  customerName: string | null;
  restaurantId: string | null;
  riderId: string | null;
  isAdmin: boolean;
  signInCustomer: (name: string) => void;
  signOutCustomer: () => void;
  signInRestaurant: () => void;
  signOutRestaurant: () => void;
  signInRider: () => void;
  signOutRider: () => void;
  signInAdmin: () => void;
  signOutAdmin: () => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      customerName: null,
      restaurantId: null,
      riderId: null,
      isAdmin: false,
      signInCustomer: (name) => set({ customerName: name }),
      signOutCustomer: () => set({ customerName: null }),
      signInRestaurant: () => set({ restaurantId: DEMO_RESTAURANT_ID }),
      signOutRestaurant: () => set({ restaurantId: null }),
      signInRider: () => set({ riderId: DEMO_RIDER_ID }),
      signOutRider: () => set({ riderId: null }),
      signInAdmin: () => set({ isAdmin: true }),
      signOutAdmin: () => set({ isAdmin: false }),
    }),
    { name: "go2eats-session" },
  ),
);
