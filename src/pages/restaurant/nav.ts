import { BarChart3, LayoutDashboard, ListOrdered, Settings, UtensilsCrossed } from "lucide-react";

import type { PortalNavGroup } from "@/components/layout/portal-shell";

export const RESTAURANT_NAV: PortalNavGroup[] = [
  {
    label: "Manage",
    items: [
      { to: "/restaurant", label: "Dashboard", icon: LayoutDashboard, end: true },
      { to: "/restaurant/orders", label: "Orders", icon: ListOrdered },
      { to: "/restaurant/menu", label: "Menu", icon: UtensilsCrossed },
      { to: "/restaurant/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Configuration",
    items: [{ to: "/restaurant/settings", label: "Settings", icon: Settings }],
  },
];
