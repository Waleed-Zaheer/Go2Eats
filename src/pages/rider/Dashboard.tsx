import { Link } from "react-router-dom";
import { Bike, Clock3, MapPin, Navigation, Wallet } from "lucide-react";
import { toast } from "@/components/ui/sonner";

import { formatMoney } from "@/lib/format";
import { RIDERS } from "@/lib/mock-data";
import { useSessionStore } from "@/store/session-store";
import { useOrdersStore } from "@/store/orders-store";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function RiderDashboard() {
  const riderId = useSessionStore((s) => s.riderId)!;
  const rider = RIDERS.find((r) => r.id === riderId)!;
  const orders = useOrdersStore((s) => s.orders);
  const setStatus = useOrdersStore((s) => s.setStatus);
  const assignRider = useOrdersStore((s) => s.assignRider);

  const active = orders.find(
    (o) => o.riderId === riderId && (o.status === "picked_up" || o.status === "out_for_delivery"),
  );
  const available = orders.filter((o) => o.status === "ready" && !o.riderId);

  function accept(orderId: string) {
    assignRider(orderId, riderId);
    setStatus(orderId, "picked_up");
    toast.success(`Delivery ${orderId} accepted`);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Hey, ${rider.name.split(" ")[0]}`}
        description="Here's what's happening on the road today."
        actions={
          <div className="flex items-center gap-2 rounded-full border border-border px-3.5 py-2">
            <Switch id="rider-online" defaultChecked />
            <Label htmlFor="rider-online" className="text-sm font-medium">Online</Label>
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Earnings today" value={formatMoney(rider.earningsTodayCents)} icon={Wallet} trend={{ value: "9%", direction: "up" }} />
        <StatCard label="Deliveries today" value="7" icon={Bike} />
        <StatCard label="Online time" value="4h 20m" icon={Clock3} />
        <StatCard label="Rating" value={rider.rating.toFixed(2)} />
      </div>

      {active ? (
        <Card className="border-primary/30 bg-primary/5 p-5">
          <p className="text-xs font-medium tracking-wide text-primary uppercase">Active delivery</p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-heading font-semibold">{active.restaurantName} → {active.customerName}</p>
              <p className="text-sm text-muted-foreground">{active.id} · {formatMoney(active.totalCents)}</p>
            </div>
            <Button render={<Link to={`/rider/delivery/${active.id}`} />}>
              <Navigation className="size-4" />
              Continue delivery
            </Button>
          </div>
        </Card>
      ) : null}

      <div>
        <h2 className="font-heading font-semibold">Available deliveries</h2>
        {available.length === 0 ? (
          <Empty className="mt-2">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Bike />
              </EmptyMedia>
              <EmptyTitle>No deliveries waiting</EmptyTitle>
              <EmptyDescription>New delivery requests will show up here.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {available.map((order) => (
              <Card key={order.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{order.restaurantName}</p>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="size-3.5" />
                      {order.deliveryAddress}
                    </p>
                  </div>
                  <span className="font-medium tabular-nums">{formatMoney(order.deliveryFeeCents)}</span>
                </div>
                <Button size="sm" className="mt-3 w-full" onClick={() => accept(order.id)} disabled={!!active}>
                  Accept delivery
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
