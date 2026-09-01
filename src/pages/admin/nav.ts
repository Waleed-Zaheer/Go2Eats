import { Bike, LayoutDashboard, ListOrdered, Store, Users } from "lucide-react";

import type { PortalNavGroup } from "@/components/layout/portal-shell";

export const ADMIN_NAV: PortalNavGroup[] = [
  {
    label: "Overview",
    items: [{ to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true }],
  },
  {
    label: "Marketplace",
    items: [
      { to: "/admin/restaurants", label: "Restaurants", icon: Store },
      { to: "/admin/riders", label: "Riders", icon: Bike },
      { to: "/admin/orders", label: "Orders", icon: ListOrdered },
      { to: "/admin/users", label: "Customers", icon: Users },
    ],
  },
];
