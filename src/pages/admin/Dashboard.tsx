import { Link } from "react-router-dom";
import { Bike, DollarSign, ShoppingBag, Store } from "lucide-react";

import { formatDay, formatMoney } from "@/lib/format";
import { RESTAURANTS, RIDERS } from "@/lib/mock-data";
import { useOrdersStore } from "@/store/orders-store";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/shared/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

const GMV_DATA = [
  { day: "Mon", gmv: 8200 },
  { day: "Tue", gmv: 7600 },
  { day: "Wed", gmv: 9100 },
  { day: "Thu", gmv: 8800 },
  { day: "Fri", gmv: 12400 },
  { day: "Sat", gmv: 14200 },
  { day: "Sun", gmv: 11100 },
];

const config = {
  gmv: { label: "GMV ($)", color: "var(--primary)" },
} satisfies ChartConfig;

export default function AdminDashboard() {
  const orders = useOrdersStore((s) => s.orders);
  const gmv = orders.filter((o) => o.status !== "cancelled").reduce((sum, o) => sum + o.totalCents, 0);
  const activeRestaurants = RESTAURANTS.filter((r) => r.status === "active").length;
  const activeRiders = RIDERS.filter((r) => r.partnerStatus === "active" && r.status !== "offline").length;
  const pendingRestaurants = RESTAURANTS.filter((r) => r.status === "pending");
  const pendingRiders = RIDERS.filter((r) => r.partnerStatus === "pending");
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <div className="space-y-6">
      <PageHeader title="Platform overview" description="How the GotoEats marketplace is performing." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Gross merchandise value" value={formatMoney(gmv)} icon={DollarSign} trend={{ value: "16%", direction: "up" }} />
        <StatCard label="Total orders" value={String(orders.length)} icon={ShoppingBag} trend={{ value: "9%", direction: "up" }} />
        <StatCard label="Active restaurants" value={String(activeRestaurants)} icon={Store} />
        <StatCard label="Active riders" value={String(activeRiders)} icon={Bike} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card className="p-5">
          <h2 className="font-heading font-semibold">GMV by day</h2>
          <ChartContainer config={config} className="mt-4 aspect-auto h-64 w-full">
            <BarChart data={GMV_DATA}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="gmv" fill="var(--color-gmv)" radius={6} />
            </BarChart>
          </ChartContainer>
        </Card>

        <Card className="p-5">
          <h2 className="font-heading font-semibold">Pending approvals</h2>
          {pendingRestaurants.length === 0 && pendingRiders.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">Nothing waiting on review.</p>
          ) : (
            <ul className="mt-3 space-y-2.5">
              {pendingRestaurants.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-muted-foreground">Restaurant · {r.ownerName}</p>
                  </div>
                  <Button size="sm" variant="outline" render={<Link to="/admin/restaurants" />}>Review</Button>
                </li>
              ))}
              {pendingRiders.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-muted-foreground">Rider · {r.vehicle}</p>
                  </div>
                  <Button size="sm" variant="outline" render={<Link to="/admin/riders" />}>Review</Button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between p-5 pb-0">
          <h2 className="font-heading font-semibold">Recent orders</h2>
          <Button variant="ghost" size="sm" render={<Link to="/admin/orders">View all</Link>} />
        </div>
        <div className="mt-3 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Restaurant</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell className="text-muted-foreground">{order.restaurantName}</TableCell>
                  <TableCell className="text-muted-foreground">{order.customerName}</TableCell>
                  <TableCell><OrderStatusBadge status={order.status} /></TableCell>
                  <TableCell className="text-muted-foreground">{formatDay(order.createdAt)}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatMoney(order.totalCents)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
