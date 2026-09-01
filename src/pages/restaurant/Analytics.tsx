import { DollarSign, ShoppingBag, Star, Users } from "lucide-react";

import { formatMoney } from "@/lib/format";
import { getMenuItemsFor } from "@/lib/mock-data";
import { useSessionStore } from "@/store/session-store";
import { getRestaurantById } from "@/lib/mock-data";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  XAxis,
  type ChartConfig,
} from "@/components/ui/chart";

const REVENUE_DATA = [
  { day: "Mon", revenue: 812 },
  { day: "Tue", revenue: 690 },
  { day: "Wed", revenue: 940 },
  { day: "Thu", revenue: 875 },
  { day: "Fri", revenue: 1320 },
  { day: "Sat", revenue: 1510 },
  { day: "Sun", revenue: 1180 },
];

const revenueConfig = {
  revenue: { label: "Revenue ($)", color: "var(--primary)" },
} satisfies ChartConfig;

const itemsConfig = {
  sold: { label: "Units sold", color: "var(--chart-2)" },
} satisfies ChartConfig;

export default function RestaurantAnalytics() {
  const restaurantId = useSessionStore((s) => s.restaurantId)!;
  const restaurant = getRestaurantById(restaurantId)!;
  const items = getMenuItemsFor(restaurantId);
  const topItems = items
    .filter((i) => i.isPopular)
    .slice(0, 5)
    .map((i, idx) => ({ name: i.name.length > 14 ? `${i.name.slice(0, 14)}…` : i.name, sold: 120 - idx * 18 }));

  const weeklyRevenue = REVENUE_DATA.reduce((sum, d) => sum + d.revenue, 0);

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Performance over the last 7 days." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Weekly revenue" value={formatMoney(weeklyRevenue * 100)} icon={DollarSign} trend={{ value: "14%", direction: "up" }} />
        <StatCard label="Orders fulfilled" value="341" icon={ShoppingBag} trend={{ value: "6%", direction: "up" }} />
        <StatCard label="Repeat customers" value="58%" icon={Users} trend={{ value: "2%", direction: "up" }} />
        <StatCard label="Rating" value={restaurant.rating.toFixed(1)} icon={Star} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="font-heading font-semibold">Revenue by day</h2>
          <ChartContainer config={revenueConfig} className="mt-4 aspect-auto h-64 w-full">
            <BarChart data={REVENUE_DATA}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={6} />
            </BarChart>
          </ChartContainer>
        </Card>

        <Card className="p-5">
          <h2 className="font-heading font-semibold">Top selling items</h2>
          <ChartContainer config={itemsConfig} className="mt-4 aspect-auto h-64 w-full">
            <BarChart data={topItems}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="sold" fill="var(--color-sold)" radius={6} />
            </BarChart>
          </ChartContainer>
        </Card>
      </div>
    </div>
  );
}
