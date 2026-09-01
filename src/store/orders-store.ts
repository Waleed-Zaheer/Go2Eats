import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ORDERS } from "@/lib/mock-data";
import type { Order, OrderStatus } from "@/lib/types";

type OrdersState = {
  orders: Order[];
  placeOrder: (order: Order) => void;
  setStatus: (id: string, status: OrderStatus) => void;
  assignRider: (id: string, riderId: string) => void;
};

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: ORDERS,
      placeOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),
      setStatus: (id, status) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
      assignRider: (id, riderId) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, riderId } : o)),
        })),
    }),
    { name: "go2eats-orders" },
  ),
);

export const ORDER_STATUS_SEQUENCE: OrderStatus[] = [
  "placed",
  "accepted",
  "preparing",
  "ready",
  "picked_up",
  "out_for_delivery",
  "delivered",
];
