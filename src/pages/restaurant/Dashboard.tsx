import { Link } from "react-router-dom";
import { CheckCheck, Clock3, DollarSign, ReceiptText, Star, X } from "lucide-react";
import { toast } from "@/components/ui/sonner";

import { formatMoney } from "@/lib/format";
import { useSessionStore } from "@/store/session-store";
import { useOrdersStore } from "@/store/orders-store";
import { getRestaurantById } from "@/lib/mock-data";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
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

const WEEK_DATA = [
  { day: "Mon", orders: 42 },
  { day: "Tue", orders: 38 },
  { day: "Wed", orders: 51 },
  { day: "Thu", orders: 47 },
  { day: "Fri", orders: 68 },
  { day: "Sat", orders: 74 },
  { day: "Sun", orders: 59 },
];

const chartConfig = {
  orders: { label: "Orders", color: "var(--primary)" },
} satisfies ChartConfig;

export default function RestaurantDashboard() {
  const restaurantId = useSessionStore((s) => s.restaurantId)!;
  const restaurant = getRestaurantById(restaurantId)!;
  const allOrders = useOrdersStore((s) => s.orders);
  const orders = allOrders.filter((o) => o.restaurantId === restaurantId);
  const setStatus = useOrdersStore((s) => s.setStatus);

  const incoming = orders.filter((o) => o.status === "placed");
  const todayRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.subtotalCents, 0);

  function accept(id: string) {
    setStatus(id, "accepted");
    toast.success(`Order ${id} accepted`);
  }
  function decline(id: string) {
    setStatus(id, "cancelled");
    toast.error(`Order ${id} declined`);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${restaurant.ownerName.split(" ")[0]}`}
        description={`Here's how ${restaurant.name} is doing today.`}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Orders today" value={String(orders.length)} icon={ReceiptText} trend={{ value: "12%", direction: "up" }} />
        <StatCard label="Revenue today" value={formatMoney(todayRevenue)} icon={DollarSign} trend={{ value: "8%", direction: "up" }} />
        <StatCard label="Avg. prep time" value="18 min" icon={Clock3} trend={{ value: "3%", direction: "down" }} />
        <StatCard label="Rating" value={restaurant.rating.toFixed(1)} icon={Star} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-semibold">Incoming orders</h2>
            <Button variant="ghost" size="sm" render={<Link to="/restaurant/orders">View board</Link>} />
          </div>

          {incoming.length === 0 ? (
            <Empty className="mt-2">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CheckCheck />
                </EmptyMedia>
                <EmptyTitle>All caught up</EmptyTitle>
                <EmptyDescription>New orders will appear here as they come in.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <ul className="mt-3 space-y-3">
              {incoming.map((order) => (
                <li key={order.id} className="rounded-2xl border border-border p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                      </p>
                    </div>
                    <span className="shrink-0 font-medium tabular-nums">{formatMoney(order.totalCents)}</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => accept(order.id)}>
                      <CheckCheck className="size-3.5" />
                      Accept
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => decline(order.id)}>
                      <X className="size-3.5" />
                      Decline
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-5">
          <h2 className="font-heading font-semibold">Orders this week</h2>
          <ChartContainer config={chartConfig} className="mt-4 aspect-auto h-64 w-full">
            <BarChart data={WEEK_DATA}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="orders" fill="var(--color-orders)" radius={6} />
            </BarChart>
          </ChartContainer>
        </Card>
      </div>
    </div>
  );
}
