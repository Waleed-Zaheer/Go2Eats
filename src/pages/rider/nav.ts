import { LayoutDashboard, Wallet } from "lucide-react";

import type { PortalNavGroup } from "@/components/layout/portal-shell";

export const RIDER_NAV: PortalNavGroup[] = [
  {
    label: "Deliver",
    items: [
      { to: "/rider", label: "Dashboard", icon: LayoutDashboard, end: true },
      { to: "/rider/earnings", label: "Earnings", icon: Wallet },
    ],
  },
];
