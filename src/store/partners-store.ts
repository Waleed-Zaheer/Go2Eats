import { create } from "zustand";
import { persist } from "zustand/middleware";

import { RESTAURANTS, RIDERS } from "@/lib/mock-data";
import type { PartnerStatus, Restaurant, Rider } from "@/lib/types";

type PartnersState = {
  restaurants: Restaurant[];
  riders: Rider[];
  setRestaurantStatus: (id: string, status: PartnerStatus) => void;
  setRiderStatus: (id: string, status: PartnerStatus) => void;
};

export const usePartnersStore = create<PartnersState>()(
  persist(
    (set) => ({
      restaurants: RESTAURANTS,
      riders: RIDERS,
      setRestaurantStatus: (id, status) =>
        set((s) => ({
          restaurants: s.restaurants.map((r) => (r.id === id ? { ...r, status } : r)),
        })),
      setRiderStatus: (id, status) =>
        set((s) => ({
          riders: s.riders.map((r) => (r.id === id ? { ...r, partnerStatus: status } : r)),
        })),
    }),
    { name: "go2eats-partners" },
  ),
);
